import React from 'react'

import './Producto.scss'

import { Link } from 'react-router-dom'

import { numberWithCommas } from '../../helpers'

const Producto = ({ producto }) => {
    return (
        <Link to={!producto ? '#' : `/items/${producto?.id}`} className={`producto-card ${!producto ? 'no-pointer' : ''}`}>
            <div className={`imagen ${!producto ? 'loading' : ''}`}>
                {producto && <img src={producto.picture} alt="Producto" />}
            </div>
            <div className="contenido">
                <div className={`precio ${!producto ? 'loading' : ''}`}>
                    <span>
                        {producto?.price?.currency === 'ARS' ? '$ ' : ''}
                        {numberWithCommas(producto?.price.amount)}
                    </span>
                    <div className={producto?.free_shipping ? 'free-shipping' : ''}></div>
                </div>
                <p className={`titulo ${!producto ? 'loading' : ''}`}> {producto?.title} </p>
            </div>
            <div className="lugar">
                <p className={`${!producto ? 'loading' : ''}`}> {producto?.state_name} </p>
            </div>

        </Link>
    )

}

export default Producto