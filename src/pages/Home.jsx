import { useState } from "react";
import Movie from "../components/Movie";
import Header from "../components/Header";
import Filter from "../components/Filter";

function Home() {
  const [rating, setRating] = useState(0);
  const [movies, setMovies] = useState([]);

  return (
    <>
      <Header />
      <div className="container">
        <div className="container d-flex justify-content-center mt-2 mb-2 py-1 px-2">
          <Filter setRating={setRating} />
        </div>
        <Movie rating={rating} movies={movies} setMovies={setMovies} />
      </div>
    </>
  );
}

export default Home;
