import "./assets/css/App.css";
import { Header } from "./components/Header";
//import routers from './routers/router'
//import { RouterProvider } from 'react-router'

function App() {
  //return <RouterProvider router={routers} />
  return (
    <Header first="Trang chủ" second="Phòng trống" third="Đừng để bị lừa!" />
  );
}

export default App;
