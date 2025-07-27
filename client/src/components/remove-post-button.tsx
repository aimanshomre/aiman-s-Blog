import axios from "axios";

import type { Post } from "@/pages/dashbord";
import { useAuth } from "@/context/auth-context";
import { UserLoginForm } from "@/pages/login-form";

type RemovePostBtnType = {
  post: Post;
  onRemove: React.Dispatch<React.SetStateAction<Post[]>>;
};

export const RemovePostBtn = ({ post, onRemove }: RemovePostBtnType) => {
  const userContext = useAuth();
  if (!userContext) {
    console.log("!userc");

    return <UserLoginForm />;
  }
  async function handleRemovePost(post: Post) {
    try {
      const res = await axios.delete(
        `http://localhost:3001/api/posts/${post.id}`
      );
      alert("post removed succesfully!");
      onRemove((prev) => {
        return prev.filter((p) => p.id !== post.id);
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  return <button onClick={() => handleRemovePost(post)}>X</button>;
};
