import { useState } from "react";
import { EditForm } from "./forms/edit-form";
import type { Post } from "@/pages/dashbord";
import { useAuth } from "@/context/auth-context";
import { UserLoginForm } from "@/pages/login-form";
import { CiEdit } from "react-icons/ci";

type EditPostBtnType = {
  post: Post;
  onEdit: React.Dispatch<React.SetStateAction<Post[]>>;
};

export const EditPostBtn = ({ post, onEdit }: EditPostBtnType) => {
  const userContext = useAuth();
  if (!userContext) {
    console.log("!userc");

    return <UserLoginForm />;
  }
  const [toEdit, setToEdit] = useState(false);

  return (
    <>
      <button className="cursor-pointer" onClick={() => setToEdit(true)}>
        <CiEdit />
      </button>
      {toEdit && <EditForm post={post} onEdit={onEdit} onCancel={setToEdit} />}
    </>
  );
};
