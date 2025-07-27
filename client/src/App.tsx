import { RouterProvider } from "react-router";
import { router } from "./router/router";

function App() {
  return (
    // <div className="max-w-2xl mx-auto p-8 font-sans">
    <div className="">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
