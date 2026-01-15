import { toast } from "@/lib/toast";
import { ApiErrorType } from "@/types/commonTypes";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect } from "react";

export default function useError(
  isError: boolean,
  error: FetchBaseQueryError | SerializedError | undefined,
  message: string
) {
  useEffect(() => {
    if (isError && error) {
      const err = error as ApiErrorType;
      const msg = err.data?.message;
      toast("error", msg && typeof msg === "string" ? msg : message);
    }
  }, [error, isError, message]);

  return undefined;
}
