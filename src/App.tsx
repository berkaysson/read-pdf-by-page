import { BrowserRouter } from "react-router-dom";
import { ProfileProvider } from "./context/profile.context";
import { Layout } from "./components/routes/Layout";
import { Navbar } from "./components/navigation/Navbar";
import { PDFProvider } from "./context/pdf.context";
import { useEffect, useRef, useState } from "react";

function App() {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const navRef = useRef<HTMLElement | null>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (isNavOpen && !navRef.current?.contains(event.target as Node)) {
      setIsNavOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className="h-screen bg-secondary">
      <ProfileProvider>
        <PDFProvider>
          <BrowserRouter>
            <main className="flex flex-row flex-1 text-primary bg-secondary">
              <div>
                <Navbar
                  isNavOpen={isNavOpen}
                  navRef={navRef}
                  setIsNavOpen={setIsNavOpen}
                />
              </div>
              <section className="w-full h-full p-6">
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
