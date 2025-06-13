import "./App.css";
import MoviePage from "./pages/movie";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProfilePage from "./pages/profile";
import LoginPage from "./pages/login";
import "react-multi-carousel/lib/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthenticatedRoute from "./modules/shared/infra/routers/AuthenticatedRoute";
import React from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
      networkMode: "always",
    },
  },
});

function App() {
  React.useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(async (registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);

  window.addEventListener("online", async () => {
    if ("serviceWorker" in navigator) {
      const registration = await navigator.serviceWorker.ready;

      if (registration.active) {
        registration.active.postMessage({
          type: "offline-mutations",
        });
      }
    }
  });

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
