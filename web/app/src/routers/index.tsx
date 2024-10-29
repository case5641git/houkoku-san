import { createBrowserRouter } from "react-router-dom";
import { ROUTE_LIST } from "../constants/route.js";
import { Register } from "../pages/Register/Register";
import { Login } from "../pages/Login/Login";

export const router = createBrowserRouter([
  {
    path: ROUTE_LIST.REGISTER,
    element: <Register />,
  },
  {
    path: ROUTE_LIST.LOGIN,
    element: <Login />,
  },
]);
