import { useState } from 'react'
import '../styles/Search.css'
import searchIcon from '../assets/search.svg'
import deleteIcon from '../assets/delete.svg'

const Search = () => {

    const [showDeleteBtn, setShowDeleteBtn] = useState(false)
    const [city, setCity] = useState('')

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

  return (
    <form className='Search-form'>
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
    </form>
  )
}

export default Search