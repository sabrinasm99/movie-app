import { useMutation } from "@tanstack/react-query";
import { loginService } from "../service";
import { apiConfig } from "../../../config/api";

export const useRequestToken = () => {
  return useMutation({
    mutationFn: () => loginService.requestToken(),
    onSuccess: (res) => {
      window.location.href = `https://www.themoviedb.org/authenticate/${res.data.request_token}?redirect_to=${apiConfig.redirectUrl}`;
    },
  });
};
