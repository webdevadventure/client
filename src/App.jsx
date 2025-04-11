import "./assets/css/App.css";
import router from "./routers/router.jsx";
import { RouterProvider } from "react-router";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
