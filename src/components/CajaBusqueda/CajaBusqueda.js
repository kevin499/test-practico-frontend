import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import queryString from 'query-string';

import './CajaBusqueda.scss'
import logo from './logo.png'
import lupa from './lupa.svg'

import { useHistory, Link } from 'react-router-dom'
import { searchResults } from '../../store/busqueda/actions'


const CajaBusqueda = (props) => {

    const history = useHistory()

    const [search, setSearch] = useState("")

    const dispatch = useDispatch()

    const handleSearch = (e) => {
        e.preventDefault();

        updateResults(e.target.search.value)

    }

    const updateResults = (new_search) => {
        if (search !== new_search) {
            dispatch(searchResults(new_search))
            setSearch(new_search)
        }

        history.push(`/items?search=${new_search}`)
    }

    useEffect(() => {
        let params = queryString.parse(props.location.search)

        if (props.location.pathname === "/items" && params.search) {
            updateResults(params.search)
        }

    }, [])

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