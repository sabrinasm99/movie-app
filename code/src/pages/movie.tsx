import Layout from "../modules/shared/layout/Layout";
import Footer from "../modules/shared/components/Footer";
import Header from "../modules/shared/components/Header";
import PopularMovies from "../modules/movie/features/popular";
import NowPlaying from "../modules/movie/features/now-playing";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useCreateSession } from "../modules/auth/api";
import {
  useGetAccountDetails,
  useGetFavoriteMovies,
} from "../modules/profile/api";
import { useSessionStore } from "../store/useSessionStore";
import { useAccountStore } from "../store/useAccountStore";

export default function MoviePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const createSession = useCreateSession();
  const accountId = useAccountStore((state: any) => state.accountId);
  const sessionId = useSessionStore((state: any) => state.sessionId);
  const updateAccountId = useAccountStore(
    (state: any) => state.updateAccountId
  );
  const {
    refetch: refetchAccount,
    data: account,
    isSuccess,
  } = useGetAccountDetails();
  const { data: favMovies, refetch: refetchFavMovies } = useGetFavoriteMovies();

  useEffect(() => {
    const requestToken = searchParams.get("request_token");
    if (requestToken) {
      createSession.mutate(requestToken);
      searchParams.delete("request_token");
      searchParams.delete("approved");
      setSearchParams(searchParams);
    }
  }, []);

  useEffect(() => {
    refetchAccount();
  }, [sessionId]);

  useEffect(() => {
    refetchFavMovies();
  }, [accountId]);

  useEffect(() => {
    if (account) {
      updateAccountId(account.id);
    } else {
      updateAccountId("");
    }
  }, [isSuccess, account]);

  return (
    <Layout>
      <Header />
      <div className="flex grow">
        <div className="mx-auto w-4/5 py-5">
          <NowPlaying favMovies={favMovies} />
          <PopularMovies favMovies={favMovies} />
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
