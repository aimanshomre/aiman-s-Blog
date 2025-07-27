import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/auth-context";
import { MembersOnlyPopup } from "./no-member-popup";

export const CreatePost = () => {
  const BASEURL = "http://localhost:3001/api";
  const navigate = useNavigate();

  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const userContext = useAuth();

  if (!userContext) {
    return <MembersOnlyPopup />;
  }
  if (!userContext.user) {
    return <MembersOnlyPopup />;
  }

  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const newPost = { title: postTitle, content: postContent };

    try {
      const res = await axios.post(`${BASEURL}/posts/`, newPost, {});
      console.log("hehehe111111h:   ", res.data.message);
      alert("post created! redirecting to feed");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("something went wrong!\n please try again...");
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Create a New Post
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
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
            name="title"
            value={postTitle}
            onChange={(ev) => setPostTitle(ev.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter post title"
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
            name="content"
            value={postContent}
            onChange={(ev) => setPostContent(ev.target.value)}
            rows={5}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write your post content here..."
            required
          ></textarea>
        </div>

        <div className="flex justify-between items-center ">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 transition"
          >
            Create
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
