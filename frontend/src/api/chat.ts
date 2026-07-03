import api from "./axios";

export async function askAI(
  workspaceId: number,
  question: string
) {
  const token = localStorage.getItem("token");

  const response = await api.post(
    `/chat/${workspaceId}`,
    {
      question,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}