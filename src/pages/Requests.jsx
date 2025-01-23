import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../redux/slices/requestSlice";
import RequestCard from "../components/RequestCard";

export default function Requests() {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const getRequests = async () => {
    if (requests) return;
    try {
      const res = await axios.get(
        "http://localhost:3000/user/requests/received",
        { withCredentials: true },
      );
      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);
  return (
    <main className="flex-1 p-4">
      {requests?.length === 0 && (
        <h1 className="text-2xl font-bold">There are no requests</h1>
      )}
      {requests?.length > 0 && (
        <>
          <h1 className="text-center text-2xl font-bold">
            Connections Requests
          </h1>
          <div className="m-8 flex flex-col items-center gap-4">
            {requests?.map((person) => (
              <RequestCard key={person._id} person={person} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
