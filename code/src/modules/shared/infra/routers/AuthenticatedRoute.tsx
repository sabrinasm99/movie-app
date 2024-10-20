import { Navigate } from "react-router-dom";
import { useGetAccountDetails } from "../../../profile/api";
import { useSessionStore } from "../../../../store/useSessionStore";
import Loading from "../../components/loading/Loading";

export default function AuthenticatedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const sessionId = useSessionStore((state: any) => state.sessionId);
  const { isLoading, isError } = useGetAccountDetails();

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && !isError) {
    return children;
  }

  if ((!isLoading && isError) || !sessionId) {
    return <Navigate to="/" replace={true} />;
  }
}
