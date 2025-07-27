import axios from "axios";
// import type { Post } from "../types";
import { useNavigate } from "react-router";
import { useState } from "react";
import { EditForm } from "./edit-form";
import type { Post } from "@/pages/dashbord";
import { useAuth } from "@/context/auth-context";
import { UserLoginForm } from "@/pages/login-form";

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

  //   return <button onClick={() => handleEditPost(post)}>🖋️</button>;
  return (
    <>
      <button onClick={() => setToEdit(true)}>🖋️</button>;
      {toEdit && <EditForm post={post} onEdit={onEdit} onCancel={setToEdit} />}
      {/* <button onClick={() => handleEditPost(post)}>🖋️</button>; */}
    </>
  );
};
