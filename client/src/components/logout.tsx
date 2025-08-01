import { useAuth } from "@/context/auth-context";
import { Button } from "./ui/button";
import { IoIosLogOut } from "react-icons/io";

export function LogoutBtn() {
  const userContext = useAuth();

  return (
    <>
      <Button
        variant={"destructive"}
        onClick={userContext?.logout}
        className="cursor-pointer"
      >
        <IoIosLogOut />
      </Button>
    </>
  );
}
