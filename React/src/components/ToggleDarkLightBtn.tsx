import { useDispatch, useSelector } from 'react-redux'
import { themeSelector, updateTheme } from '../redux/slices/theme'
import { AppDispatch } from '../redux/store'
import '../styles/ToggleDarkLightBtn.css'

const ToggleDarkLightBtn = () => {

  const dispatch = useDispatch<AppDispatch>()

  const { isDark } = useSelector(themeSelector)

  return (
    <div className={`toggle ${isDark && 'active'}`} onClick={() => dispatch(updateTheme(!isDark))}>
      <i className='indicator'></i>
    </div>
  )
}

export default ToggleDarkLightBtn