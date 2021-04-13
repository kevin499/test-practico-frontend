import React from 'react'

import './Producto.scss'

import { useHistory } from 'react-router-dom'

const Producto = ({ producto }) => {

    const history = useHistory()

    const handleClick = (product_id) => {
        console.log("click")
        if (product_id) history.push(`/items/${product_id}`)

    }

    const numberWithCommas = (x) => {
        if (x) return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return (
        <article className="producto-card" onClick={() => handleClick(producto?.id)}>
            <div className={`imagen ${!producto ? 'loading' : ''}`}>
                {
                    producto ? (
                        <img src={producto.picture} alt="Producto" />
                    ) : ''
                }
            </div>
            <div className="contenido">
                <p className={`precio ${!producto ? 'loading' : ''}`}>
                    {producto?.price?.currency == 'ARS' ? '$ ' : ''}
                    {numberWithCommas(producto?.price.amount)}
                </p>
                <p className={`titulo ${!producto ? 'loading' : ''}`}> {producto?.title} </p>
            </div>
            <div className="lugar">
                <p className={`${!producto ? 'loading' : ''}`}> {producto?.address?.state_name} </p>
            </div>
        </article>
    )

}

export default Producto