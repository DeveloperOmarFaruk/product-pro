import { toast } from "@/lib/toast";
import { ApiErrorType } from "@/types/commonTypes";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect } from "react";

export default function useError(
  isError: boolean, // indicates if there is an error
  error: FetchBaseQueryError | SerializedError | undefined, // the error object from API or Redux
  message: string // fallback message to show if error data is unavailable
) {
  useEffect(() => {
    // Only run when there is an error
    if (isError && error) {
      const err = error as ApiErrorType; // cast to API error type
      const msg = err.data?.message; // attempt to read message from API response
      // Show toast with API message if available, otherwise fallback message
      toast("error", msg && typeof msg === "string" ? msg : message);
    }
  }, [error, isError, message]); // run effect when error, isError, or message changes

  return undefined; // hook does not return anything
}
