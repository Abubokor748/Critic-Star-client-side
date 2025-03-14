import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { AuthContext } from "../../provider/AuthProvider";
import LogInAnimation from '../../assets/Login.json';
import Lottie from "lottie-react";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { userLogin, setUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    userLogin(email, password)
      .then((result) => {
        setUser(result.user);
        navigate(location?.state ? location.state : "/");
        toast.success("Logged in Successfully");
      })
      .catch(() => {
        toast.error("Wrong Email or Password");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Critic Star | Login</title>
      </Helmet>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12">
        {/* Animation Section */}
        <div className="w-full lg:w-1/2">
          <Lottie
            animationData={LogInAnimation}
            className="max-w-md mx-auto"
          />
        </div>

        {/* Login Form Section */}
        <div className="w-full lg:w-1/2 max-w-md">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Welcome Back
              </h2>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                    required
                  />
                  <div className="flex justify-end">
                    <Link
                      to="/forgot-password"
                      className="text-sm text-purple-600 hover:text-purple-500"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                >
                  Sign In
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <Link
                    to="/auth/register"
                    className="font-semibold text-purple-600 hover:text-purple-500"
                  >
                    Register here
                  </Link>
                </p>
              </div>

                {/* social login */}
              <div className="mt-6">
                <SocialLogin />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;