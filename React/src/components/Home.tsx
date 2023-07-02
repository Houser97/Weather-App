import '../styles/Home.css'
import Dashboard from './Dashboard'
import Sidebar from './Sidebar'

const Home = () => {
  return (
    <div className='Home-container'>
        <Sidebar />
        <Dashboard />
    </div>
  )
}

export default Home