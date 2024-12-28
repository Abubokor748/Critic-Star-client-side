import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../Auth/AuthLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AddServices from "../pages/AddServices/AddServices";
import PrivateRoute from "./PrivateRoute";
import EveryServices from "../pages/EveryServices/EveryServices";
import ServiceDetails from "../pages/ServiceDetails/ServiceDetails";
import WriteAReview from "../pages/WriteAReview/WriteAReview";
import AllReviews from "../pages/AllReviews/AllReviews";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/reviews",
        element: <AllReviews></AllReviews>,
      },
      {
        path: "/services/:id",
        element: <ServiceDetails></ServiceDetails>,
        loader: ({ params }) => fetch(`http://localhost:5000/services/${params.id}`)
      },
      {
        path: "/all_Services",
        element: <EveryServices></EveryServices>,
      },
      {
        path: "/add_services",
        element: <PrivateRoute><AddServices></AddServices></PrivateRoute>,
      },
      {
        path: "/write_review",
        element: <PrivateRoute><WriteAReview></WriteAReview></PrivateRoute>,
      },
      {
        path: "/auth",
        element: <AuthLayout></AuthLayout>,
        children: [
          {
            path: "/auth/login",
            element: <Login></Login>,
          },
          {
            path: "/auth/register",
            element: <Register></Register>,
          },
        ]
      },
    ]
  },
]);

export default router;