import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export const apiCall = async (method, url, data, showToast = true, toastData) => {
  const toastId = toast.loading(toastData || "Loading...");

  try {
    const response = await axios({
      method,
      url,
      data
    });

    toast.success(response.data?.message || "Success!", { id: toastId });

    return response.data;
  } catch (err) {
    if (err instanceof AxiosError && err.response) {
      const { success, message } = err.response.data;

      if (success === true || success === false) {
        if (showToast) {
          toast.error(message || "An error occurred");
        }

        return err.response.data;
      } else {
        if (showToast) {
          toast.error("No Response From Server", { id: toastId });
        }

        return {
          success: false,
          message: "No Response From Server"
        };
      }
    } else {
      if (showToast) {
        toast.error("No Response From Server", { id: toastId });
      }

      return {
        success: false,
        message: "No Response From Server"
      };
    }
  }
};
