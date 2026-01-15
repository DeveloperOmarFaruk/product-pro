import { toast as toastMessage } from "react-toastify";
type Types = "success" | "error" | "info" | "warning";

export const toast = (type: Types, content: string) => {
  switch (type) {
    case "success":
      toastMessage.success(content);

      break;
    case "error":
      toastMessage.error(content);

      break;
    case "info":
      toastMessage.info(content);

      break;
    case "warning":
      toastMessage.warning(content);

      break;
    default:
      toastMessage.info(content);
  }
};
