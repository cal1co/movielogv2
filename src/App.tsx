import './App.css'
import Routes from './routes'
import HomePageSettings from './components/HomePageSettings'

function App() {

  return (
    <div className="App">
      <div className="settings">
        <HomePageSettings/>
      </div>
      <Routes/>
    </div>
  )
}

export default App
