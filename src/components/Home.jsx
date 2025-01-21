import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  const getUser = async () => {
    if (user) return;

    try {
      const res = await axios.get("http://localhost:3000/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(res.data.user));
    } catch (error) {
      if (error.status === 401) navigate("/login");
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}
