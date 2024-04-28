import { BrowserRouter } from "react-router-dom";
import { ProfileProvider } from "./context/profile.context";
import { Layout } from "./components/routes/Layout";
import { Navbar } from "./components/navigation/Navbar";
import { PDFProvider } from "./context/pdf.context";
import { useRef, useState } from "react";

function App() {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const navRef = useRef<HTMLElement>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (isNavOpen && !navRef.current?.contains(event.target as Node)) {
      setIsNavOpen(false);
    }
  };
  document.addEventListener("click", handleOutsideClick);
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
