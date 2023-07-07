import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import BasicExample from "./Spinner";

function Movie({ rating, movies, setMovies }) {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setPage(1);
    const getMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=ca9b63e0f514a34c2d3bd66bf826c4ce&page=1&vote_average.gte=${
            (rating - 1) * 2
          }`
        );
        setMovies(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, [rating]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?page=${page}&api_key=ca9b63e0f514a34c2d3bd66bf826c4ce&vote_average.gte=${
            (rating - 1) * 2
          }`
        );

        setMovies((movies) => [...movies, ...response.data.results]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    page > 1 && getMovies();
  }, [page]);

  return isLoading ? (
    <div className="d-flex justify-content-center align-items-center">
      <BasicExample />
    </div>
  ) : (
    movies && (
      <div>
        <InfiniteScroll
          dataLength={movies.length} //This is important field to render the next data
          next={() => setPage((prevPage) => prevPage + 1)}
          hasMore={true}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="row g-4">
            {movies.map((movie) => (
              <div className="col-6 col-md-6 col-lg-3" key={movie.id}>
                <Link to={`/pelicula/${movie.id}`}>
                  <img
                    className=" img-fluid  rounded shadow"
                    key={movie.id}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={`imagen de ${movie.title} `}
                  />
                </Link>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    )
  );
}

export default Movie;
