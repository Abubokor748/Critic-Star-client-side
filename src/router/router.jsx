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
import MyReviews from "../pages/MyReviews/MyReviews";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [

      // no security route
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/all_Services",
        element: <EveryServices></EveryServices>,
      },

      // private route
      {
        path: "/reviews",
        element: <PrivateRoute><AllReviews></AllReviews></PrivateRoute>
      },
      {
        path: "/services/:id",
        element: <PrivateRoute><ServiceDetails></ServiceDetails></PrivateRoute>,
        loader: ({ params }) => fetch(`https://assignment-11-backend-seven.vercel.app/services/${params.id}`)
        // loader: ({ params }) => fetch(`https://assignment-11-backend-seven.vercel.app/services/${params.id}`,)
      },
      {
        path: "/my_reviews",
        element: <PrivateRoute><MyReviews></MyReviews></PrivateRoute>
      },
      {
        path: "/add_services",
        element: <PrivateRoute><AddServices></AddServices></PrivateRoute>,
      },
      {
        path: "/write_review/:serviceId",
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