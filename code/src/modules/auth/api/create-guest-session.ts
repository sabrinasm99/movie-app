import { useQuery } from "@tanstack/react-query";
import { guestService } from "../service";

export const useCreateGuestSession = () => {
  return useQuery({
    queryKey: ["createGuestSession"],
    queryFn: () => guestService.createGuestSession(),
    enabled: false,
  });
};
