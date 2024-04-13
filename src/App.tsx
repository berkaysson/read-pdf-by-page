import { BrowserRouter } from "react-router-dom";
import { ProfileProvider } from "./context/profile.context";
import { Layout } from "./components/routes/Layout";

function App() {
  return (
    <div>
      <ProfileProvider>
        <BrowserRouter>
          <main>
            <nav />
            <section>
              <Layout />
            </section>
          </main>
        </BrowserRouter>
      </ProfileProvider>
    </div>
  );
}

export default App;
