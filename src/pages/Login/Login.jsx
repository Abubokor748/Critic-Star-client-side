import React, { useContext } from "react";
// import Lottie from 'lottie-react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-toastify';
import { AuthContext } from "../../provider/AuthProvider";
import LogInAnimation from '../../assets/Login.json'
import Lottie from "lottie-react";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import { Helmet } from "react-helmet-async";

const Login = () => {

  const { userLogin, user, setUser } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const { loginWithGoogle } = useContext(AuthContext);

  // console.log(location);

  // login user
  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    console.log({ email, password });

    userLogin(email, password)
      .then((result) => {
        console.log(result.user);
        setUser(result.user);
        navigate(location?.state ? location.state : "/");
        toast.success("Logged in Successfully");
      })
      .catch(() => {
        toast.error("Wrong Email or Password");
      });
  };

  // google login
  const handleGoogleLogin = async () => {
    loginWithGoogle()
      .then((result) => {
        console.log("Full Result Object:", result);
        console.log("Google Login Success:", result?.user);
        toast.success("Logged in Successfully");
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.error("Google Login Failed:", error.message);
        toast.error("Something went wrong, please try again.");
      });

  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <Helmet>
        <title>Critic Star | Login</title>
      </Helmet>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left w-96 p-2">
          <Lottie animationData={LogInAnimation}></Lottie>
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h2 className="m-3 mb-0 p-3 pb-0 mx-auto font-bold text-2xl">
            Login Your Account
          </h2>

          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />

              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control">
              <button className=" text-white bg-blue-600 hover:bg-white hover:text-blue-500 border-2 border-transparent hover:border-blue-500 px-2 py-3 rounded-3xl">Login</button>
            </div>
          </form>

          <p className="mx-auto">
            Don't Have An Account ? &nbsp;
            <Link
              className="text-white bg-blue-600 hover:bg-white hover:text-blue-500 border-2 border-transparent hover:border-blue-500 px-2 py-1 rounded-3xl"
              to="/auth/register"
            >
              Register
            </Link>
          </p>

          <div className="p-3">
            <SocialLogin></SocialLogin>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;


