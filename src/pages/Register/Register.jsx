import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../provider/AuthProvider";
import SignInAnimation from "../../assets/registration.json";
import Lottie from "lottie-react";
import axios from "axios";

const Register = () => {
  const { createNewUser, setUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get form data
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
      setError((prevError) => ({
        ...prevError,
        password:
          "Password must be at least 6 characters long, include one uppercase letter, and one lowercase letter.",
      }));
      return;
    } else {
      setError((prevError) => ({ ...prevError, password: null }));
    }

    // Create new user
    createNewUser(email, password)
      .then((result) => {
        const user = result.user;

        const userJWT = { email: email}
        axios.post('https://assignment-11-backend-seven.vercel.app/jwt', userJWT, {
          withCredentials: true
        })
        .then(res => {
          console.log(res.data);
        })

        // Update Firebase user profile
        updateUserProfile({ displayName: name, photoURL: photoURL })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photoURL });
            toast.success("Registration successful!");

            // Save user info in MongoDB
            const newUser = { name, email, photoURL };

            fetch("http://localhost:5000/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newUser),
            })
              .then((res) => {
                if (!res.ok) {
                  return res.json().then((err) => {
                    throw new Error(err.message);
                  });
                }
                return res.json();
              })
              .then((data) => {
                console.log("User stored in DB:", data);
                navigate("/");
              })
              .catch((err) => {
                console.error("Error storing user:", err);
                toast.error(err.message || "Failed to register user.");
              });
          })
          .catch((err) => {
            console.error(err);
            toast.error("Failed to update profile.");
          });
      })
      .catch((err) => {
        console.error("Error:", err.message);
        toast.error("Error creating user. Please try again.");
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left w-96 p-2">
          <Lottie animationData={SignInAnimation}></Lottie>
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

            {error.name && <label className="label text-red-600">{error.name}</label>}

            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="Photo URL"
                className="input input-bordered"
                required
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

            {error.password && <label className="label text-red-600">{error.password}</label>}

            <div className="form-control mt-6">
              <button className="text-white bg-blue-600 hover:bg-white hover:text-blue-500 border-2 border-transparent hover:border-blue-500 py-3 rounded-3xl">
                Register
              </button>
            </div>
          </form>
          <p className="mx-auto mb-4">
            Already Have An Account? &nbsp;
            <Link
              className="text-white bg-blue-500 hover:bg-white hover:text-blue-500 border-2 border-transparent hover:border-blue-500 px-3 py-2 rounded-3xl"
              to="/auth/login"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
