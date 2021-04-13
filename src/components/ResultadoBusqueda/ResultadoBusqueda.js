import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'


import './ResultadoBusqueda.scss'
import Producto from '../Producto/Producto'
import DetalleProducto from '../DetalleProducto/DetalleProducto'



const ResultadoBusqueda = () => {

    const dispatch = useDispatch()

    const busqueda = useSelector(state => state)

    const { search } = useParams()

    // useEffect(() => {

    //     dispatch(changeResults(search))


    // }, [])

    // useEffect(() => {
    //     alert ("cambio")
    // }, [search])

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