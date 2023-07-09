import { useSelector } from 'react-redux'
import './App.css'
import Home from './components/Home'
import { themeSelector } from './redux/slices/theme'

function App() {

  const { isDark } = useSelector(themeSelector)

  return (
    <div className={`app ${isDark && 'dark'}`}>
      <Home/>
    </div>
  )
}

export default App
