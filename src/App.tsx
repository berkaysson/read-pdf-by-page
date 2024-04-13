import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import PublicRoute from "./components/routes/PublicRoutes";
import PrivateRoute from "./components/routes/PrivateRoutes";
import { ProfileProvider } from "./context/profile.context";

function App() {
  return (
    <div>
      <ProfileProvider>
        <BrowserRouter>
          <main>
            <nav />
            <section>
              <Routes>
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <Login />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <PublicRoute>
                      <Register />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </section>
          </main>
        </BrowserRouter>
      </ProfileProvider>
    </div>
  );
}

export default App;
