import { useMutation } from "@tanstack/react-query";
import { loginService } from "../service";
import { useSessionStore } from "../../../store/useSessionStore";

export const useCreateSession = () => {
  const updateSessionId = useSessionStore(
    (state: any) => state.updateSessionId
  );

  return useMutation({
    mutationFn: (requestToken: string) =>
      loginService.createSession(requestToken),
    onSuccess: (res) => {
      updateSessionId(res.data.session_id);
    },
  });
};
