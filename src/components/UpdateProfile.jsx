import { useState } from "react";
import { update, auth, resetPassword } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
const UpdateProfile = () => {
  const disPatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [avatar, setAvatar] = useState(user.photoURL || "");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await update({
      displayName,
      photoURL: avatar,
    });
    disPatch(login(auth.currentUser));
  };
  const handleResetSubmit = async () => {
    e.preventDefault();
    const result = await resetPassword(password);
    if (result) {
      setPassword("");
    }
  };
  return (
    <div className=" grid gap-y-10">
      <form onSubmit={handleSubmit} className=" grid gap-y-4 py-4">
        <h1 className=" text-xl font-bold mb-4">Profili Güncelle</h1>
        <div>
          <label className="block text-sm font-medium text-gray-900">
            Ad-Soyad
          </label>
          <div className="mt-1">
            <input
              type="text"
              className=" shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-50"
              placeholder="John Doe"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900">
            Fotoğraf
          </label>
          <div className="mt-1">
            <input
              type="text"
              className=" shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-50"
              placeholder="John Doe"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className=" disabled:opacity-20 cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Güncelle
          </button>
        </div>
      </form>
      <form onSubmit={handleResetSubmit} className=" grid gap-y-4 py-4">
        <h1 className=" text-xl font-bold mb-4">Parolayı Güncelle</h1>
        <div>
          <label className="block text-sm font-medium text-gray-900">
            parola
          </label>
          <div className="mt-1">
            <input
              type="text"
              className=" shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-50"
              placeholder="John Doe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            disabled={!password}
            type="submit"
            className=" disabled:opacity-20 cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Şifreyi Güncelle
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
