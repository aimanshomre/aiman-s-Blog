import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const WEBHOOK_URL =
  "https://discord.com/api/webhooks/1398978982564593725/y2MI9K7jH27k1TmQo9GslhCNLpJBJSdcvF0xDgTPojObsCauuGLG8HneM57m9n1jIJ7A";

export function useDiscordMutation() {
  return useMutation({
    mutationFn: async (newPost: { title: string; content: string }) =>
      await axios.post(`${WEBHOOK_URL}`, {
        content: "new post created:",
        embeds: [
          {
            title: newPost.title,
            description: newPost.content,
            color: 3447003,
          },
        ],
      }),
    onSuccess: () => {
      console.log("success discord");
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        console.log("errdasfs");
        console.log(err.response?.data.message);
      } else console.log("unknown error", err);
    },
  });
}
