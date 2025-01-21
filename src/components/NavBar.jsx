import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function NavBar() {
  const user = useSelector((store) => store.user);

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          DevMeet
        </Link>
      </div>
      {user && (
        <div className="flex-none gap-2">
          <div className="form-control"></div>
          <div className="dropdown dropdown-end mr-4">
            <div
              tabIndex={0}
              role="button"
              className="avatar btn btn-circle btn-ghost"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.imageUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-300 p-2 shadow"
            >
              <li>
                <Link to="/profile/view" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
