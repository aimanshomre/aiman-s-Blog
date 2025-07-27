import { API_BASE_URL, useAuth } from "@/context/auth-context";
import { LogoutBtn } from "@/components/logout";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";
import { RemovePostBtn } from "@/components/remove-post-button";
import { EditPostBtn } from "@/components/edit-button";
import { useState } from "react";

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
}
export interface PostsResponse {
  message: string;
  posts: Post[];
}

export function Dashboard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);

  const userContext = useAuth();
  const { data, isPending, error } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axios.get<PostsResponse>(
        `${API_BASE_URL}/api/posts/`
      );
      setPosts(data.posts);
      return data.posts;
    },
  });

  if (error) return <h1>ERROR</h1>;
  if (isPending) return <h1>loading...</h1>;
  console.log(posts);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {userContext?.user ? (
        <h1 className="text-3xl font-bold mb-4">
          Hello {userContext.user.name}, nice to see you again!
        </h1>
      ) : (
        <h1 className="text-3xl font-bold mb-4">
          Hello guest , nice to have you here!
        </h1>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Your Feed</h2>
        <button
          onClick={() => navigate("/create")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
        >
          + Create Post
        </button>
      </div>

      <div className="space-y-6">
        {posts.map((post) => {
          if (!post) return null;

          const isOwner = post.authorId === userContext?.user?.id;

          return (
            <div
              key={post.id}
              className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {post.title}
                </h3>
                <div className="flex gap-2">
                  {isOwner && <EditPostBtn post={post} onEdit={setPosts} />}
                  {isOwner && <RemovePostBtn post={post} onRemove={setPosts} />}
                </div>
              </div>

              <p className="text-gray-700 mb-2">{post.content}</p>
              <div className="text-sm text-gray-500">
                By <span className="font-medium">{post.authorName}</span> •{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center gap-2">
        <span className="text-sm text-gray-600">Logout:</span>
        <LogoutBtn />
      </div>
    </div>
  );
}
