import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import './CajaBusqueda.scss'
import logo from './logo.png'
import lupa from './lupa.svg'

import { useHistory, Link } from 'react-router-dom'
import { changeResults } from '../../store/busqueda/actions'


const CajaBusqueda = (props) => {

    const history = useHistory()

    const [search, setSearch] = useState("")

    const dispatch = useDispatch()

    const handleSearch = (e) => {
        e.preventDefault();
        // console.log(`BUSCAR : ${search}`)
        const nueva_busqueda = e.target.busqueda.value

        if(search != nueva_busqueda){
            dispatch(changeResults(nueva_busqueda))
            setSearch(nueva_busqueda)
        }

        history.push(`/items?search=${ nueva_busqueda }`)

    }

    return (
        <div className='caja-busqueda'>
            <Link to="/"><img className="logo" src={logo} alt="Mercado libre"></img></Link>

            <form onSubmit={handleSearch}>
                <input type="text" name="busqueda" placeholder="Nunca dejes de buscar" />
                <button><img src={lupa} alt="Buscar"></img></button>
            </form>
        </div>
    )

}

export default CajaBusqueda