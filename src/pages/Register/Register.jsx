import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../provider/AuthProvider";
import SignInAnimation from "../../assets/registration.json";
import Lottie from "lottie-react";
import { FcGoogle } from "react-icons/fc";
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

        fetch("http://localhost:5000/users", {
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

  const handleGoogleLogin = () => {
    // Implement Google login logic here if needed
    toast.info("Google login functionality to be implemented");
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <Helmet>
        <title>Critic Star | Register</title>
      </Helmet>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left w-96 p-2">
          <Lottie animationData={SignInAnimation} />
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h2 className="m-3 mb-0 p-3 pb-0 mx-auto font-bold text-2xl">
            Register Your Account
          </h2>

          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="Photo URL"
                className="input input-bordered"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
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
                placeholder="Enter Your Password"
                className="input input-bordered"
                required
              />
            </div>

            {error.password && (
              <div className="text-red-600 text-sm mt-1">{error.password}</div>
            )}

            <div className="form-control mt-6">
              <button className="btn btn-primary">
                Register
              </button>
            </div>
          </form>

          <p className="text-center mb-4">
            Already have an account?{" "}
            <Link to="/auth/login" className="link link-primary">
              Login
            </Link>
          </p>

          <div className="p-3 mb-6 mx-6">

            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;