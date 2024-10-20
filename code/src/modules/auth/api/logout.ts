import { useMutation } from "@tanstack/react-query";
import { logoutService } from "../service";
import { useSessionStore } from "../../../store/useSessionStore";
import { useAccountStore } from "../../../store/useAccountStore";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const updateSessionId = useSessionStore(
    (state: any) => state.updateSessionId
  );
  const updateAccountId = useAccountStore(
    (state: any) => state.updateAccountId
  );
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => logoutService.logout(),
    onSuccess: () => {
      updateSessionId("");
      updateAccountId("");
      navigate("/");
    },
  });
};
