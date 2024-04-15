import { BrowserRouter } from "react-router-dom";
import { ProfileProvider } from "./context/profile.context";
import { Layout } from "./components/routes/Layout";
import { Navbar } from "./components/navigation/Navbar";
import { PDFProvider } from "./context/pdf.context";
import { useState } from "react";

function App() {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(true);
  return (
    <div className="h-screen bg-secondary">
      <ProfileProvider>
        <PDFProvider>
          <BrowserRouter>
            <main className="flex flex-row flex-1 text-primary bg-secondary">
              <div>
                <Navbar isNavOpen={isNavOpen} />
                <button
                  onClick={() => setIsNavOpen(!isNavOpen)}
                  className="absolute right-0 m-4 btn"
                >
                  =
                </button>
              </div>
              <section className="w-full h-full p-6">
                <Layout />
              </section>
            </main>
          </BrowserRouter>
        </PDFProvider>
      </ProfileProvider>
    </div>
  );
}

export default App;
