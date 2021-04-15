import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import './DetalleProducto.scss'

import { changeItem } from '../../store/busqueda/actions'

const DetalleProducto = () => {

    let { id } = useParams()

    const producto = useSelector(state => state.items.find(item => item.id === id))

    const data_loading = useSelector(state => state.data_loading)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!producto?.description) {
            dispatch(changeItem(id))
        }
    }, [])

    const numberWithCommas = (x) => {
          if(x) return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return (
        <section className='detalle-producto'>
            <p className="breadcrumb"> { producto?.categories?.join(" > ") } </p>

            <article>
                <div className="contenido">
                    <figure >

                        {
                            producto ? (
                                <img src={producto.picture} alt="Producto" />
                            ) : ''
                        }

                    </figure>
                    <div className="descripcion">
                        <h2>Descripción del producto</h2>
                        <p className={data_loading && !producto?.description ? 'loading' : ''}>
                            {producto?.description}
                        </p>
                    </div>
                </div>
                <div className="contenido-derecha">
                    <p>
                        {
                            !data_loading && producto?.condition ? (
                                <span>{ producto?.condition} - {producto?.sold_quantity } vendidos</span>
                            ) : ''
                        }
                    </p>
                    <h1 className={data_loading && !producto?.title ? 'loading' : ''}>
                        { producto?.title }
                    </h1>
                    <p className={`precio ${data_loading && !producto?.price ? 'loading' : ''}`}>
                        {producto?.price?.currency === 'ARS' ? '$ ' : ''}
                        <span>
                            { numberWithCommas(producto?.price?.amount) }
                        </span>
                        <span className="decimales">
                            { producto?.price?.decimals < 10 ? `0${producto?.price?.decimals}` : producto?.price?.decimals }
                        </span>
                    </p>
                    <button className="btn-comprar">Comprar</button>
                </div>

            </article>

        </section>
    )

}

export default DetalleProducto