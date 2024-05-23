import { Link } from "react-router-dom";
import { logout, emailVerification } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { logout as logouthandle } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const { user } = useSelector((store) => store.authReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await logout();
    dispatch(logouthandle());
    navigate("/login", {
      replace: true,
    });
  };
  const handleVerification = async () => {
    await emailVerification();
  };
  if (user) {
    return (
      <div className="max-w-xl mx-auto py-5">
        <h1
          className="flex
         gap-x-4 items-center"
        >
          {user.photoURL && (
            <img src={user.photoURL} className="w-5 h-7 rounded-full" />
          )}
          oturumunuz açık ({user.email})
          <button
            onClick={handleLogout}
            className=" h-8 rounded px-4  text-sm text-white bg-indigo-700"
          >
            Çıkış yap
          </button>
          {!user.emailVerified && (
            <button
              onClick={handleVerification}
              className=" h-8 rounded px-4  text-sm text-white bg-indigo-700"
            >
              Email doğrula
            </button>
          )}
        </h1>
      </div>
    );
  }
  return (
    <div className="flex flex-col border rounded-md w-[100px] my-3 p-3 bg-primary-50 cursor-pointer ">
      <div>
        <Link to="/register">Kayıt Ol</Link>
      </div>
      <div>
        <Link to="/login">Giriş yap</Link>
      </div>
    </div>
  );
}
