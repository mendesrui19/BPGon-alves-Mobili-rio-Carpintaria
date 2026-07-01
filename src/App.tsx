import { Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { HomePage } from "./pages/HomePage";
import { CatalogPage } from "./pages/CatalogPage";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalogo" element={<CatalogPage />} />
      </Routes>
    </>
  );
}

export default App;
