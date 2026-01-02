import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export const apiCall = async (method, url, data, showToast = true) => {
  try {
    const response = await axios({
      method,
      url,
      data
    });
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError && err.response) {
      if (
        err.response.data.success === true ||
        err.response.data.success === false
      ) {
        showToast && toast.error(err.response.data.message);
        return err.response.data;
      } else {
        showToast && toast.error("No Response From Server");
        return {
          success: false,
          message: "No Response From Server",
        };
      }
    } else {
      showToast && toast.error("No Response From Server");
      return {
        success: false,
        message: "No Response From Server",
      };
    }
  }
};
