import api from "./axios";

export const getWorkspaces = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/workspaces/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const createWorkspace = async (
  title: string,
  description: string
) => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    "/workspaces/",
    {
      title,
      description,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteWorkspace = async (id: number) => {
  const token = localStorage.getItem("token");

  await api.delete(`/workspaces/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};