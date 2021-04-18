import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import './DetalleProducto.scss'

import { searchItem } from '../../store/busqueda/actions'
import { itemLoading } from '../../store/ui/actions'

import { seo, numberWithCommas } from '../../helpers'


const DetalleProducto = () => {

    let { id } = useParams()

    const producto = useSelector(state => state.busqueda.items.find(item => item.id === id))

    const item_loading = useSelector(state => state.ui.item_loading)

    const dispatch = useDispatch()

    const [itemFound, setItemFound] = useState(true)

    useEffect(() => {
        if (!producto?.description) {
            dispatch(searchItem(id))
                .catch(e => setItemFound(false))
                .then(_ => dispatch(itemLoading(false)))
        }
        return () => seo()
    }, [])

    useEffect(() => {
        seo({
            title: producto?.title,
            metaDescription: `Compralo en Mercado Libre a $${numberWithCommas(producto?.price?.amount)} - ${producto?.free_shipping ? 'Envío gratis a todo el país' : ''}. Encontrá más productos de ${producto?.categories?.join(", ")}.`
        });
    }, [producto])

    return (
        <section className='detalle-producto'>
            <p className="breadcrumb"> {producto?.categories?.join(" > ")} </p>

            <article className={`contenido wrapper ${!itemFound ? 'hide' : ''}`}>
                <figure className="one">

                    {
                        producto ? (
                            <img src={producto.picture} alt="Producto" />
                        ) : ''
                    }

                </figure>
                <div className="two  contenido-derecha">
                    <p>
                        {
                            !item_loading && producto?.condition ? (
                                <span>{producto?.condition} - {producto?.sold_quantity} vendidos</span>
                            ) : ''
                        }
                    </p>
                    <h1 className={item_loading && !producto?.title ? 'loading' : ''}>
                        {producto?.title}
                    </h1>
                    <p className={`precio ${item_loading && !producto?.price ? 'loading' : ''}`}>
                        {producto?.price?.currency === 'ARS' ? '$ ' : ''}
                        <span>
                            {numberWithCommas(producto?.price?.amount)}
                        </span>
                        <span className="decimales">
                            {producto?.price?.decimals < 10 ? `0${producto?.price?.decimals}` : producto?.price?.decimals}
                        </span>
                    </p>
                    <button className="btn-comprar">Comprar</button>
                </div>
                <div className="three descripcion">
                    <h2>Descripción del producto</h2>
                    <p className={item_loading && !producto?.description ? 'loading' : ''}>
                        {producto?.description}
                    </p>
                </div>
            </article>

            <div className={`contenido ${itemFound ? 'hide' : ''}`}>
                <p className="no-item">No se encontró el producto que esta buscando.</p>
            </div>

        </section>
    )

}

export default DetalleProducto