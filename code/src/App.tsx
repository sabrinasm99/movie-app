import "./App.css";
import MoviePage from "./pages/movie";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProfilePage from "./pages/profile";
import LoginPage from "./pages/login";
import "react-multi-carousel/lib/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthenticatedRoute from "./modules/shared/infra/routers/AuthenticatedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<MoviePage />} />
          <Route
            path="/profile"
            element={
              <AuthenticatedRoute>
                <ProfilePage />
              </AuthenticatedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
