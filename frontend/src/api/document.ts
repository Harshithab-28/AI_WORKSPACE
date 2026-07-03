import api from "./axios";

export const uploadDocument = async (
  workspaceId: number,
  file: File
) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    `/documents/${workspaceId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const getDocuments = async (
  workspaceId: number
) => {
  const token = localStorage.getItem("token");

  const response = await api.get(
    `/documents/${workspaceId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteDocument = async (
  documentId: number
) => {
  const token = localStorage.getItem("token");

  await api.delete(
    `/documents/${documentId}/delete`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};