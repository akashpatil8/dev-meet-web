import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../redux/slices/connectionSlice";
import PersonCard from "./PersonCard";

export default function Connections() {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const getConnections = async () => {
    if (connections) return;
    try {
      const res = await axios.get("http://localhost:3000/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  return (
    <main className="flex-1 p-4">
      {connections?.length === 0 && (
        <h1 className="text-2xl font-bold">There are no connections</h1>
      )}
      {connections?.length > 0 && (
        <>
          <h1 className="text-center text-2xl font-bold">Connections</h1>
          <div className="m-8 flex flex-col items-center gap-4">
            {connections?.map((person) => (
              <div
                key={person?._id}
                className="flex w-1/2 items-center gap-10 rounded-lg bg-base-300 p-4"
              >
                <img
                  src={person.imageUrl}
                  className="h-32 w-32 rounded-full object-cover"
                />
                <div>
                  <h1 className="text-xl font-medium text-slate-100">
                    {person.firstName} {person.lastName}
                  </h1>
                  {person?.age && person?.gender && (
                    <h2 className="mt-1 text-lg">
                      {person.age}, {person.gender}
                    </h2>
                  )}
                  <p className="mt-3 text-slate-500">{person.about}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
