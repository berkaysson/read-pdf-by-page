import { BrowserRouter } from "react-router-dom";
import { ProfileProvider } from "./context/profile.context";
import { Layout } from "./components/routes/Layout";
import { Navbar } from "./components/navigation/Navbar";

function App() {
  return (
    <div>
      <ProfileProvider>
        <BrowserRouter>
          <main>
            <Navbar />
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
