import React from 'react'
import { useSelector } from 'react-redux'

import './ResultadoBusqueda.scss'
import Producto from '../Producto/Producto'

const ResultadoBusqueda = () => {

    const { busqueda: {items, categories}, ui: {items_search_loading} } = useSelector(state => state)

    return (
        <main className='resultado-busqueda'>
            <p className="breadcrumb"> {categories.join(" > ")} </p>
            <section className="resultados">
                {
                    !items_search_loading ?
                        items?.map(producto => (
                            <Producto key={producto.id} producto={producto}></Producto>
                        ))
                        : ''
                }

                {
                    !items_search_loading && !items.length ?
                        <p className="no-items">No hay publicaciones que coincidan con tu búsqueda.</p>
                        : ''
                }

                {
                    items_search_loading ? (
                        <>
                            <Producto></Producto>
                            <Producto></Producto>
                            <Producto></Producto>
                            <Producto></Producto>
                        </>

                    ) : ""
                }

            </section>
        </main>
    )

}

export default ResultadoBusqueda