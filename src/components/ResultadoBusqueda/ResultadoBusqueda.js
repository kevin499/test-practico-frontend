import React from 'react'
import { useSelector } from 'react-redux'
// import { useParams } from 'react-router-dom'


import './ResultadoBusqueda.scss'
import Producto from '../Producto/Producto'



const ResultadoBusqueda = () => {

    // const dispatch = useDispatch()

    const busqueda = useSelector(state => state)

    // const { search } = useParams()

    return (
        <section className='resultado-busqueda'>
            <p className="breadcrumb"> { busqueda.categories?.join(" > ") } </p>
            <div className="resultados">
                {
                    !busqueda.data_loading ?
                        busqueda.items?.map(producto => (
                            <Producto key={producto.id} producto={producto}></Producto>
                        ))
                        : ''
                }

                {

                    busqueda.items.length === 0 && !busqueda.data_loading ? 
                    <p>No hay publicaciones que coincidan con tu búsqueda.</p> 
                    : ''

                }

                {
                    busqueda.data_loading ? (
                        <>
                            <Producto></Producto>
                            <Producto></Producto>
                            <Producto></Producto>
                        </>

                    ) : ""}

            </div>
        </section>
    )

}

export default ResultadoBusqueda