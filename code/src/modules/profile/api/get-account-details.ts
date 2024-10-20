import { useQuery } from "@tanstack/react-query";
import { accountService } from "../service";

export const useGetAccountDetails = () => {
  return useQuery({
    queryKey: ["getAccountDetails"],
    queryFn: () => accountService.getAccountDetails(),
  });
};
