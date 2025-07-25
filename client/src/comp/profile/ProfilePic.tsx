import { useAppSelector } from "../../context/hooks";

const ProfilePic: React.FC = () => {

   const {user} = useAppSelector((state) => state.user);
  return (
    <div className="bg-white shadow rounded-xl p-4 flex flex-col items-center justify-center h-48">
      <div className="w-24 h-24 rounded-full bg-gray-300 mb-2" ><img src="./profile-icon.jpg" alt="profilePic"  /></div>
      <p className="font-medium">{user?.name}</p>
    </div>
  );
};

export default ProfilePic;
