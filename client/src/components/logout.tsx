import { useAuth } from "@/context/auth-context";
import { Button } from "./ui/button";

export function LogoutBtn() {
  const userContext = useAuth();

  return (
    <>
      <Button
        variant={"destructive"}
        onClick={userContext?.logout}
        className="cursor-pointer"
      >
        logout
      </Button>
    </>
  );
}
