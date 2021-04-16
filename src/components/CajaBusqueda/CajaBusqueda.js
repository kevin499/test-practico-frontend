import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import './CajaBusqueda.scss'
import logo from './logo.png'
import lupa from './lupa.svg'

import { useHistory, Link } from 'react-router-dom'
import { changeResults } from '../../store/busqueda/actions'


const CajaBusqueda = () => {

    const history = useHistory()

    const [search, setSearch] = useState("")

    const dispatch = useDispatch()

    const handleSearch = (e) => {
        e.preventDefault();

        const new_search = e.target.search.value

        if (search !== new_search) {
            dispatch(changeResults(new_search))
            setSearch(new_search)
        }

        history.push(`/items?search=${new_search}`)
    }

    return (
        <header className='caja-busqueda'>
            
            <Link to="/"><img className="logo" src={logo} alt="Mercado libre"></img></Link>

            <form onSubmit={handleSearch}>
                <input type="text" name="search" placeholder="Nunca dejes de buscar" />
                <button><img src={lupa} alt="Buscar"></img></button>
            </form>
        </header>
    )
}

export default CajaBusqueda