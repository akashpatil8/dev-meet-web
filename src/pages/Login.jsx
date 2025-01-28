import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, loadingUser, errorUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("rohit@gmail.com");
  const [password, setPassword] = useState("Rohit@123");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const { user, isUserLoading, userError } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogin() {
    dispatch(loadingUser());
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
      toast.error(userError || error?.response?.data?.message);
      dispatch(errorUser(error?.response?.data?.message));
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
      toast.error(userError || error?.response?.data?.message);
      console.log(error?.response?.data?.message);
      dispatch(errorUser(error?.response?.data?.message));
    }
  }

  console.log(user, isUserLoading, userError);

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
              {isUserLoading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
