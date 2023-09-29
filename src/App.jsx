import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Error404 from "./pages/Error404";
import Contact from "./pages/Contact";
import SobreNosotros from "./pages/SobreNosotros";
import MovieDetails from "./pages/MovieDetails";
import Navbar from "./components/Navbar";
import "./App.css";
import SearchMovie from "./pages/SearchMovie";
// import useIsOnline from "./components/useIsOnLine";

function App() {
  // const isOnline = useIsOnline();
  return (
    <>
      <Navbar />
      {/* {isOnline ? (
        <div className="container">
          <div
            className="position-fixed bottom-0 border mb-4 bg-transparent text-light"
            style={{ zIndex: "100" }}
          >
            🟢 The Site is On Line
          </div>
        </div>
      ) : (
        <div className="container">
          <div
            className="position-fixed bottom-0 border mb-4 ms-4 bg-transparent text-light"
            style={{ zIndex: "100" }}
          >
            🔴 The Site is Off Line
          </div>
        </div>
      )} */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        <Route path="/pelicula/:id" element={<MovieDetails />} />
        <Route path="/search" element={<SearchMovie />} />
        <Route path="*" element={<Error404 />} />
        <Route
          path="/movie/:id"
          element={<Navigate replace to="/pelicula/:id" />}
        />
      </Routes>
    </>
  );
}

export default App;
