import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.user));
      navigate("/feed");
    } catch (error) {
      setError(error?.response?.data);
    }
  }

  async function handleSignUp() {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          email,
          password,
          firstName,
          lastName,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.user));
      navigate("/profile/view");
    } catch (error) {
      setError(error?.response?.data);
    }
  }

  return (
    <main className="flex flex-1 items-center justify-center p-4">
      <div className="card mx-auto w-96 bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Login</h2>

          {isSignUp && (
            <>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">First name</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Last name</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </>
          )}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <p className="text-red-400">{error}</p>
          <button
            onClick={() => setIsSignUp((val) => !val)}
            className="mb-3 cursor-pointer text-center text-sm hover:text-white"
          >
            {isSignUp ? "Already a user? Login" : "New user? Sign Up"}
          </button>
          <div className="card-actions justify-center">
            <button
              onClick={() => {
                isSignUp ? handleSignUp() : handleLogin();
              }}
              className="btn btn-primary"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
