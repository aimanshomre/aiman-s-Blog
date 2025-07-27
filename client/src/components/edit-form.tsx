import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import type { Post } from "@/pages/dashbord";
import { useAuth } from "@/context/auth-context";
import { UserLoginForm } from "@/pages/login-form";

type EditFormProps = {
  post: Post;
  onEdit: React.Dispatch<React.SetStateAction<Post[]>>;
  onCancel: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EditForm = ({ post, onCancel, onEdit }: EditFormProps) => {
  const [postTitle, setPostTitle] = useState(post.title);
  const [postContent, setPostContent] = useState(post.content);
  const userContext = useAuth();

  if (!userContext) {
    console.log("!userc");

    return <UserLoginForm />;
  }

  async function handleEditPost(
    ev: React.FormEvent<HTMLFormElement>,
    post: Post
  ) {
    ev.preventDefault();
    const newPost = { title: postTitle, content: postContent };

    try {
      const res = await axios.put(
        `http://localhost:3001/api/posts/${post.id}`,
        newPost
      );
      const edited = res.data.updatedPost as Post;
      // alert("post Edited succesfully!");
      onEdit((prev) => {
        return prev.map((p) => {
          if (p.id === post.id) return edited;
          else return p;
        });
      });
      onCancel(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative">
        <button
          onClick={() => onCancel(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-xl font-bold"
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Edit Post
        </h2>
        <form onSubmit={(ev) => handleEditPost(ev, post)} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={postTitle}
              onChange={(ev) => setPostTitle(ev.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Content
            </label>
            <textarea
              id="content"
              value={postContent}
              onChange={(ev) => setPostContent(ev.target.value)}
              rows={5}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => onCancel(false)}
              className="text-gray-600 hover:underline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
