import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { AuthContext } from "../../provider/AuthProvider";
import SignInAnimation from '../../assets/registration.json'
import Lottie from "lottie-react";


const Register = () => {
  const { createNewUser, setUser, user, updateUserProfile } =
    useContext(AuthContext);

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
      setError({
        ...error,
        password:
          "Password must be at least 6 characters long, include one uppercase letter, and one lowercase letter.",
      });
      return;
    } else {
      setError(() => ({ password: null }));
    }

    // Create new user

    createNewUser(email, password)
      .then((result) => {
        console.log(result.user);
        const user = result.user;

        // setUser(result.user);
        updateUserProfile({ displayName: name, photoURL: photoURL })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photoURL });
            toast.success("Registration successful!");
            navigate(location?.state || "/");
          })
          .catch((err) => {
            console.log(err);
            toast.error("Failed to register.");
          });
      })
      .catch((err) => {
        console.log("Error:", err.message);
        toast.error("Error creating user. Please try again.");
      });

    // createNewUser(email, password)
    //   .then((result) => {
    //     console.log(result.user);
    //     setUser(result.user);
    //         navigate("/");

    // const newUser = { email }

    // https://assignment-10-backend-ph.vercel.app/users
    // save new user info in db
    // fetch('', {
    //   method: 'POST',
    //   headers: {
    //     'content-type': 'application/json'
    //   },
    //   body: JSON.stringify(newUser)
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log('user created', data);
    //   })

    //   updateUserProfile({ displayName: name, photoURL: photo })
    //     .then(() => {
    //       navigate("/");
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // })
    //   .catch((err) => {
    //     console.log("Error:", err.message);
    //   });
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
                type="name"
                name="name"
                placeholder="Enter Your Name"
                className="input input-bordered"
                required
              />
            </div>

            {error.name && (
              <label className="label text-red-600">{error.name}</label>
            )}

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

            {error.password && (
              <label className="label text-red-600">{error.password}</label>
            )}

            <div className="form-control mt-6 hover:border-blue-500">
              <button className="text-white bg-blue-600 hover:bg-white hover:text-blue-500 border-2 border-transparent hover:border-blue-500 py-3  rounded-3xl">
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


{/* <div className="hero bg-base-200 min-h-screen"> */ }
{/* <div className="hero-content flex-col lg:flex-row-reverse">
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
          type="name"
          name="name"
          placeholder="Enter Your Name"
          className="input input-bordered"
          required
        />
      </div>

      {error.name && (
        <label className="label text-red-600">{error.name}</label>
      )}

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

      {error.password && (
        <label className="label text-red-600">{error.password}</label>
      )}

      <div className="form-control mt-6 hover:border-blue-500">
        <button className="text-white bg-blue-600 hover:bg-white hover:text-blue-500 border-2 border-transparent hover:border-blue-500 mx-32 px-2 py-3 rounded-3xl">
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
</div> */}

{/* </div> */ }

{/* <div> */ }
{/* <div className="flex min-h-screen justify-center items-center">
  <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
    <h2 className="m-3 mb-0 p-3 pb-0 mx-auto font-bold text-2xl">
      Register Your Account
    </h2>
    <form onSubmit={handleSubmit} className="card-body">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="name"
          name="name"
          placeholder="Enter Your Name"
          className="input input-bordered"
          required
        />
      </div>

      {error.name && (
        <label className="label text-red-600">{error.name}</label>
      )}

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

      {error.password && (
        <label className="label text-red-600">{error.password}</label>
      )}

      <div className="form-control mt-6 hover:border-blue-500">
        <button className="text-white bg-blue-600 hover:bg-white hover:text-blue-500 border-2 border-transparent hover:border-blue-500 mx-32 px-2 py-3 rounded-3xl">
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
</div> */}
{/* </div> */ }