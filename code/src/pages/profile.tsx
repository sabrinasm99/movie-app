import FavoriteMovies from "../modules/profile/features/favorite-movies";
import ProfileData from "../modules/profile/features/profile-data";
import Footer from "../modules/shared/components/Footer";
import Header from "../modules/shared/components/Header";
import Layout from "../modules/shared/layout/Layout";

export default function ProfilePage() {
  return (
    <Layout>
      <Header />
      <div className="flex grow">
        <div className="mx-auto w-4/5 py-5 flex flex-col">
          <ProfileData />
          <FavoriteMovies />
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
