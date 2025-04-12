import { createBrowserRouter } from "react-router";

import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Welcome from "../pages/welcome";

export const router = createBrowserRouter([
  {
    path: "/",
    //element: <UserLayout />,
    children: [
      { index: true, element: <Welcome /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
