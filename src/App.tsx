import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <main>
        <nav />
        <section>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </section>
      </main>
    </BrowserRouter>
  );
}

export default App;
