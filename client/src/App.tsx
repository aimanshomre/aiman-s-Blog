// import { UserFormWithShadcn } from "@/components/UserFormWithShadcn";
import { useAuth } from "./context/auth-context";
import { UserLoginForm } from "@/pages/login-form";
import { UsersignupForm } from "./pages/signup-form";
import { Dashboard } from "./pages/dashbord";

function App() {
  // const user = useAuth();
  // console.log(user);

  // if (user) return <h1>hhhhhhhhh</h1>;

  // const []
  return (
    <div className="max-w-2xl mx-auto p-8 font-sans">
      {/* <UserLoginForm /> */}
      {/* <UserLoginForm /> */}
      {/* <UsersignupForm /> */}
      <Dashboard />
      {/* <UserFormWithShadcn /> */}
    </div>
  );
}

export default App;
