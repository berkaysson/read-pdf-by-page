import { BrowserRouter } from "react-router-dom";
import { ProfileProvider } from "./context/profile.context";
import { Layout } from "./components/routes/Layout";
import { Navbar } from "./components/navigation/Navbar";
import { PDFProvider } from "./context/pdf.context";

function App() {
  return (
    <div className="h-screen bg-secondary">
      <ProfileProvider>
        <PDFProvider>
          <BrowserRouter>
            <main className="flex flex-col flex-1 text-primary bg-secondary">
              <Navbar />
              <section className="w-full h-full p-6 mt-8">
                <h2 className="mt-8 text-xl">
                  <span className="text-2xl font-bold">RPBP</span> (Read PDF By
                  Page) is a web application that allows users to read PDF files
                  by page. With RPBP, users can easily upload PDF files,
                  navigate through pages, and view PDF content conveniently.
                </h2>
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
