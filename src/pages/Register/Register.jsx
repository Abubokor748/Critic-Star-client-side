import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../provider/AuthProvider";
import SignInAnimation from "../../assets/registration.json";
import Lottie from "lottie-react";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const { createNewUser, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const photoURL = form.get("photo");
    const email = form.get("email");
    const password = form.get("password");

    // Name validation
    if (name.length < 3) {
      toast.error("Name must be more than 3 characters long");
      return;
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError({
        password: "Password must be at least 6 characters long, include one uppercase and one lowercase letter.",
      });
      return;
    }

    // Create new user
    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Registration successful!");

        // Save user info
        const newUser = { name, email, photoURL };

        fetch("https://assignment-11-backend-seven.vercel.app/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        })
          .then((res) => {
            if (!res.ok) throw new Error("Failed to save user data");
            navigate("/");
          })
          .catch((err) => {
            console.error("Error storing user:", err);
            toast.error(err.message);
          });
      })
      .catch((err) => {
        console.error("Registration Error:", err.message);
        toast.error("Error creating user: " + err.message);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Critic Star | Register</title>
      </Helmet>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12">
        {/* Animation Section */}
        <div className="w-full lg:w-1/2">
          <Lottie
            animationData={SignInAnimation}
            className="max-w-md mx-auto"
          />
        </div>

        {/* Registration Form Section */}
        <div className="w-full lg:w-1/2 max-w-md">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Create Your Account
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Photo URL
                  </label>
                  <input
                    type="text"
                    name="photo"
                    placeholder="Enter your photo URL"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  />
                </div>

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
                    placeholder="Create a password"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                    required
                  />
                  {error.password && (
                    <p className="text-sm text-red-600 mt-2">
                      {error.password}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                >
                  Create Account
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link
                    to="/auth/login"
                    className="font-semibold text-purple-600 hover:text-purple-500"
                  >
                    Login here
                  </Link>
                </p>
              </div>

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

export default Register;