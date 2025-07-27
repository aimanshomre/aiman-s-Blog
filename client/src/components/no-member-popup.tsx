import { useNavigate } from "react-router";

export const MembersOnlyPopup = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-10 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-8 shadow-xl max-w-md text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Members Only 🚫</h2>
        <p className="text-gray-600">
          This page is for registered users only. Please log in or sign up to
          continue.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
          >
            Log In
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-4 py-2 rounded-xl bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};
