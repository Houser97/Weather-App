import React, { useEffect, useState } from 'react'
import '../styles/Search.css'
import searchIcon from '../assets/icons/general/search.svg'
import deleteIcon from '../assets/icons/general/delete.svg'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { fetchWeatherDataRedux, weatherDataSelector } from '../redux/slices/weather'
import { filterSelector } from '../redux/slices/filter'

const Search = () => {

    const dispatch = useDispatch<AppDispatch>()

    const { isCityValid, current } = useSelector(weatherDataSelector)
    const { metricOptions } = useSelector(filterSelector)

    const [showDeleteBtn, setShowDeleteBtn] = useState(false)
    const [city, setCity] = useState(current.city)
    const [lastValidCity, setLastValidCity] = useState(current.city) // Se utiliza para que botones Celisus y Farenheit puedan hacer
    // consultas con la última ciudad válida cuando la ciudad actual sea no válida.

    useEffect(() => {
        if(lastValidCity === '') return undefined;
        const cityCopy = lastValidCity      
            .replace(/(,\s+)/g, ',') // Quitar espacios después de una coma.
            .replace(/(\s+,)/g, ',') // Quitar espacioes antes de una coma
        dispatch(fetchWeatherDataRedux(cityCopy, metricOptions));
    }, [metricOptions])

    useEffect(() => {
        if(!isCityValid) return undefined
        setLastValidCity(current.city)
        setCity('')
    }, [isCityValid, current.city])
    

    const isCityEmpty = (city: string) => {
        const cityLength = city.length
        if(cityLength) return true
        return false
    }

    const deleteCity = () => {
        setCity('')
        setShowDeleteBtn(false)
    }

    const updateCityValue = (city: string) => {
        setCity(city)
        setShowDeleteBtn(isCityEmpty(city))
    }

    const fetchWeatherData = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(city === '') return undefined;
        const cityCopy = city      
            .replace(/(,\s+)/g, ',') // Quitar espacios después de una coma.
            .replace(/(\s+,)/g, ',') // Quitar espacioes antes de una coma
        dispatch(fetchWeatherDataRedux(cityCopy, metricOptions));
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
         value={city}>
        </input>

        <span 
         className={`${!showDeleteBtn && 'hide-btn'}`} 
         onClick={deleteCity}>
            <img src={deleteIcon}></img>
        </span>

        <span className={`city-error ${!isCityValid && 'show-error'}`}>City is not valid</span>
    </form>
  )
}

export default Search