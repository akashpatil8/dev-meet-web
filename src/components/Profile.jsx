import { useSelector } from "react-redux";
import EditProfileCard from "./EditProfileCard";
import PersonCard from "./PersonCard";

export default function Profile() {
  const user = useSelector((store) => store.user);
  return (
    <main className="flex flex-1 justify-center gap-8 p-4">
      {user && (
        <>
          <EditProfileCard user={user} />
          <PersonCard personData={user} />
        </>
      )}
    </main>
  );
}
