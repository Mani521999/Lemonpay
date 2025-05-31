import { toast } from "react-toastify";

export const toaster = (data, type) => {
    
  if (type === "success") {
        console.log("toaster", data, type);

    toast.success(data);
  } else if (type === "error") {
    toast.error(data);
  }
};
