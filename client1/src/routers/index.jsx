import { createBrowserRouter, redirect } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/login";
import Home from "../pages/home";
import Province from "../pages/province";
import User from "../pages/users";
import AllData from "../pages/all-data-covid";
import DataIndonesia from "../pages/data-indonesia";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    loader: () => {
      const access_token = localStorage.getItem("access_token");
      if (access_token) {
        return redirect("/home");
      }
      return null;
    },
  },
  {
    loader: () => {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/all-data",
        element: <AllData />,
      },
      {
        path: "/data-indonesia",
        element: <DataIndonesia />,
      },
      {
        path: "/get-province",
        element: <Province />,
      },
      {
        path: "/get-users",
        element: <User />,
      },
    ],
  },
]);

export default router;
