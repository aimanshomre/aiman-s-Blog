// components/Header.tsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import { LogoutBtn } from "./logout";

export const Header = () => {
  const userContext = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold hover:text-blue-400">
        📝 Aiman's Blog
      </Link>

      <nav className="flex gap-6 items-center">
        <Link to="/" className="hover:text-blue-300">
          Dashboard
        </Link>
        <Link to="/create" className="hover:text-blue-300">
          Create Post
        </Link>

        {userContext?.user ? (
          <>
            <span className="text-sm text-gray-300">
              Hello,{" "}
              <span className="font-semibold">{userContext.user.name}</span>
            </span>
            <LogoutBtn />
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-green-600 px-3 py-1 rounded hover:bg-green-700 transition"
            >
              Register
            </button>
          </>
        )}
      </nav>
    </header>
  );
};
