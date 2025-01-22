import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/slices/userSlice";

export default function EditProfileCard({ user }) {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [gender, setGender] = useState(user?.gender);
  const [age, setAge] = useState(user?.age);
  const [about, setAbout] = useState(user?.about);
  const [imageUrl, setImageUrl] = useState(user?.imageUrl);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.patch(
        "http://localhost:3000/profile/edit",
        {
          firstName,
          lastName,
          gender,
          age,
          about,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
    } catch (error) {
      setError(error?.response?.data);
      console.log(error);
    }
  };

  return (
    <form
      className="card card-compact w-96 bg-base-300 p-4 shadow-xl"
      onSubmit={handleUpdateProfile}
    >
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">First Name</span>
        </div>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          className="input input-bordered w-full max-w-xs"
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Last Name</span>
        </div>
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          className="input input-bordered w-full max-w-xs"
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Age</span>
        </div>
        <input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          type="text"
          className="input input-bordered w-full max-w-xs"
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Gender</span>
        </div>
        <input
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          type="text"
          className="input input-bordered w-full max-w-xs"
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Image path</span>
        </div>
        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          type="text"
          className="input input-bordered w-full max-w-xs"
        />
      </label>
      <label className="form-control">
        <div className="label">
          <span className="label-text">Your bio</span>
        </div>
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          className="textarea textarea-bordered h-24"
        ></textarea>
      </label>
      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
      <div className="card-actions mt-4 justify-end">
        <button
          className="btn btn-outline"
          onClick={() => {
            setAbout("");
          }}
        >
          Clear
        </button>
        <button className="btn btn-primary" onClick={handleUpdateProfile}>
          Save
        </button>
      </div>
    </form>
  );
}
