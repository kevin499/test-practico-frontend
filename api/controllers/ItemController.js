const axios = require('axios')

exports.index = async (req, res) => {
    const searchProducts = req.query.q

    const { data: data_search } = await axios.get(`https://api.mercadolibre.com/sites/MLA/search`, {
        params: {
            q: searchProducts,
            limit: 4
        }
    })

    if (!data_search.results.length) {
        return res.status(404).json({
            error: "No hay publicaciones que coincidan con tu búsqueda."
        })
    }

    let categories = data_search.filters.find(filter => filter.id == 'category')?.values[0].path_from_root

    if (!categories) {

        let category_id = data_search.available_filters
            .find(filter => filter.id == 'category').values
            .sort((a, b) => b.results - a.results)[0].id

        const { data: data_category } = await axios.get(`https://api.mercadolibre.com/categories/${category_id}`)

        categories = data_category.path_from_root
    }

    categories = categories.map(c => c.name)

    const busqueda = {
        author: {
            name: 'Kevin',
            lastname: 'Palacios'
        },
        categories: categories,
        items: [
            ...data_search.results.map(item => {
                const { id, title, currency_id, price, thumbnail, condition, shipping: { free_shipping }, address: { state_name } } = item
                return {
                    id: id,
                    title: title,
                    price: {
                        currency: currency_id,
                        amount: parseInt(price.toString().split('.')[0]),
                        decimals: parseInt(price.toString().split('.')[1] ?? 0)
                    },
                    picture: thumbnail,
                    condition: condition,
                    free_shipping: free_shipping,
                    state_name: state_name
                }
            }),
        ]

    }
    res.status(200).json(busqueda)
};


exports.show = async (req, res) => {
    const [item, description] = await Promise.all([
        axios.get(`https://api.mercadolibre.com/items/${req.params.id}`).then(res => res.data),
        axios.get(`https://api.mercadolibre.com/items/${req.params.id}/description`).then(res => res.data)
    ]).catch(err => console.log(err))

    switch (item.condition) {
        case 'new':
            item.condition = 'Nuevo'
            break;
        case "used":
            item.condition = 'Usado'
            break;
        case 'reconditioned':
            item.condition = 'Reacondicionado'
            break;
    }

    const { data: data_category } = await axios.get(`https://api.mercadolibre.com/categories/${item.category_id}`)

    categories = data_category.path_from_root

    categories = categories.map(c => c.name)


    const { id, title, currency_id, price, pictures, condition, shipping: { free_shipping }, sold_quantity } = item

    const resultado = {
        author: {
            name: 'Kevin',
            lastname: 'Palacios'
        },
        item: {
            id: id,
            title: title,
            price: {
                currency: currency_id,
                amount: parseInt(price.toString().split('.')[0]),
                decimals: parseInt(price.toString().split('.')[1] ?? 0)
            },
            picture: pictures[0].url,
            condition: condition,
            free_shipping: free_shipping,
            sold_quantity: sold_quantity,
            description: description.plain_text,
            categories: categories

        }
    }

    res.status(200).json(resultado)
};

