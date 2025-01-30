import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/slices/userSlice";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function EditProfileForm({
  user,
  setIsInEditMode,
  isInEditMode,
}) {
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      gender: user?.gender,
      age: user?.age,
      about: user?.about,
      imageUrl: user?.imageUrl,
    },
  });

  const handleUpdateProfile = async (data) => {
    setError("");
    try {
      const res = await axios.patch(
        "http://localhost:3000/profile/edit",
        {
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          age: data.age,
          about: data.about,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      toast.success("Profile updated successfully");
      setIsInEditMode(false);
    } catch (error) {
      setError(error?.response?.data);
      console.log(error);
    }
  };

  return (
    <form
      className={`card card-compact w-96 bg-base-300 p-4 shadow-xl md:block ${isInEditMode ? "" : "hidden"}`}
      onSubmit={handleSubmit(handleUpdateProfile)}
    >
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">First Name</span>
        </div>
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          {...register("firstName")}
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Last Name</span>
        </div>
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          {...register("lastName")}
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Age</span>
        </div>
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          {...register("age")}
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Gender</span>
        </div>
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          {...register("gender")}
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Image path</span>
        </div>
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          {...register("imageUrl")}
        />
      </label>
      <label className="form-control">
        <div className="label">
          <span className="label-text">Your bio</span>
        </div>
        <textarea
          className="textarea textarea-bordered h-24"
          {...register("about")}
        ></textarea>
      </label>
      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
      <div className="card-actions mt-4 justify-end">
        <button className="btn btn-outline" onClick={() => {}}>
          Clear
        </button>
        <button className="btn btn-primary" onClick={handleUpdateProfile}>
          Save
        </button>
      </div>
    </form>
  );
}
