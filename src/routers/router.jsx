import { createBrowserRouter } from "react-router-dom";

// Layouts
import AdminLayout from "../admin/AdminLayout";
import UserLayout from "../user/UserLayout";

// Pages - user
import Home from "../user/pages/Home";
import Login from "../user/pages/Login";
import RoomDetails from "../user/pages/RoomDetails";
import PostRoom from "../user/pages/PostRoom";
import NotFound from "../user/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "room/:id", element: <RoomDetails /> },
      { path: "post-room", element: <PostRoom /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
