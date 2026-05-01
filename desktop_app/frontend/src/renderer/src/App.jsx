import Home from './components/Home/Home.jsx'

function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <div>
      <Home />
    </div>
  )
}

export default App
