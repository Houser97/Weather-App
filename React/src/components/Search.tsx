import React, { useContext, useState } from 'react'
import '../styles/Search.css'
import searchIcon from '../assets/icons/general/search.svg'
import deleteIcon from '../assets/icons/general/delete.svg'
import { weatherContext } from '../App'

const Search = () => {

    const [showDeleteBtn, setShowDeleteBtn] = useState(false)
    const [localCity, setLocalCity] = useState('')
    const {setCity} = useContext(weatherContext)

    const isCityEmpty = (city: string) => {
        const cityLength = city.length
        if(cityLength) return true
        return false
    }

    const deleteCity = () => {
        setLocalCity('')
        setShowDeleteBtn(false)
    }

    const updateCityValue = (city: string) => {
        setLocalCity(city)
        setShowDeleteBtn(isCityEmpty(city))
    }

    const fetchWeatherData = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const city = localCity      
            .replace(/(,\s+)/g, ',') // Quitar espacios después de una coma.
            .replace(/(\s+,)/g, ',') // Quitar espacioes antes de una coma.
        setCity(city)
    }

  return (
    <form className='Search-form' onSubmit={(e) => fetchWeatherData(e)}>
        <button>
            <img src={searchIcon}></img>
        </button>

        <input 
         type='text' 
         name='search' 
         placeholder='Search for places...' 
         onChange={e => updateCityValue(e.target.value)}
         value={localCity}>
        </input>

        <span 
         className={`${!showDeleteBtn && 'hide-btn'}`} 
         onClick={deleteCity}>
            <img src={deleteIcon}></img>
        </span>
    </form>
  )
}

export default Search