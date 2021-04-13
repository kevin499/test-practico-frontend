const express = require('express')
const cors = require('cors')
const axios = require('axios')
const { response } = require('express')

const app = express()

app.use(express.json())

app.use(cors())

app.get('/api/items', async (req, res) => {

    const resultado = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${req.query.q}&limit=4`)

    let categories = resultado.data.filters.find(filtro => filtro.id == 'category')?.values[0].path_from_root

    if (!categories) {

        let categoria_id = resultado.data.available_filters
            .find(filtro => filtro.id == 'category').values
            .sort((a, b) => b.results - a.results)[0].id

        const resultado_2 = await axios.get(`https://api.mercadolibre.com/categories/${categoria_id}`)

        categories = resultado_2.data.path_from_root
    }

    categories = categories.map(c => c.name)

    const busqueda = {
        author: {
            name: 'Kevin',
            lastname: 'Palacios'
        },
        categories: categories,
        items: [
            ...resultado.data.results.map(item => {
                return {
                    id: item.id,
                    title: item.title,
                    price: {
                        currency: item.currency_id,
                        amount: parseInt(item.price.toString().split('.')[0]),
                        decimals: parseInt(item.price.toString().split('.')[1] ?? 0)
                    },
                    picture: item.thumbnail,
                    condition: item.condition,
                    free_shipping: item.shipping.free_shipping
                }
            }),
        ]

    }
    res.status(200).json(busqueda)
})

app.get('/api/items/:id', async (req, res) => {

    const item = await axios.get(`https://api.mercadolibre.com/items/${req.params.id}`).then(res => res.data)

    const description = await axios.get(`https://api.mercadolibre.com/items/${req.params.id}/description`).then(res => res.data)


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

    const resultado = {
        author: {
            name: 'Kevin',
            lastname: 'Palacios'
        },
        item: {
            id: item.id,
            title: item.title,
            price: {
                currency: item.currency_id,
                amount: parseInt(item.price.toString().split('.')[0]),
                decimals: parseInt(item.price.toString().split('.')[1] ?? 0)
            },
            picture: item.thumbnail,
            condition: item.condition,
            free_shipping: item.shipping.free_shipping,
            sold_quantity: item.sold_quantity,
            description: description.plain_text

        }
    }


    res.status(200).json(resultado)



})


app.listen('8080', () => {
    console.log("Running on 8080")
})