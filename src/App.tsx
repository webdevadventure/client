import './assets/css/App.css'
import routers from './routers/router'
import { RouterProvider } from 'react-router'

function App() {
  return <RouterProvider router={routers} />
}

export default App
