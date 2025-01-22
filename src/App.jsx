import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";

import Feed from "./components/Feed";
import Connections from "./components/Connections";
import store from "./redux/store";

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Home />}>
              <Route index element={<Navigate to="/feed" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile/view" element={<Profile />} />
              <Route path="/feed" index element={<Feed />} />
              <Route path="/connections" element={<Connections />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
