import { BrowserRouter } from "react-router-dom";
import { ProfileProvider } from "./context/profile.context";
import { Layout } from "./components/routes/Layout";
import { Navbar } from "./components/navigation/Navbar";
import { PDFProvider } from "./context/pdf.context";

function App() {
  return (
    <div className="h-screen">
      <ProfileProvider>
        <PDFProvider>
          <BrowserRouter>
            <main className="flex flex-row">
              <Navbar />
              <section>
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
