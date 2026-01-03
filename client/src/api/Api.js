import { apiCall } from "./axiosFactory";

const BaseUrl = import.meta.env.VITE_SERVER_URL;

export const GetAllContactApi = async () => {
  const apiUrl = `${BaseUrl}/api/v1/getAllContacts`;
  const result = await apiCall("GET", apiUrl, {}, false, "Loading Contacts...");
  return result;
};

export const AddNewContactApi = async (payload) => {
  const apiUrl = `${BaseUrl}/api/v1/createNewContact`;
  const result = await apiCall("POST", apiUrl, payload, true, "Creating Contact...");
  return result;
};

export const DeleteContactApi = async (id) => {
  const apiUrl = `${BaseUrl}/api/v1/deleteContact?id=${id}`;
  const result = await apiCall("DELETE", apiUrl, {}, true, "Deleting Contact...");
  return result;
};
