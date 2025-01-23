import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../redux/slices/feedSlice";
import PersonCard from "../components/PersonCard";

export default function Feed() {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed);

  const getFeedData = async () => {
    if (feedData) return;
    try {
      const res = await axios.get("http://localhost:3000/feed", {
        withCredentials: true,
      });
      console.log();
      dispatch(addFeed(res?.data?.users));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getFeedData();
  }, []);

  console.log(feedData);

  return (
    <main className="flex flex-1 justify-center py-4">
      {feedData?.length === 0 && (
        <h1 className="text-2xl font-bold">There are no new users</h1>
      )}
      {feedData?.length > 0 && (
        <div className="m-8">
          <PersonCard personData={feedData[0]} />
        </div>
      )}
    </main>
  );
}
