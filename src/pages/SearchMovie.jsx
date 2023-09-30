import { useState, useEffect } from "react";
import axios from "axios";
import BasicExample from "../components/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

function SearchMovie() {
  const [movies, setMovies] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (event) => {
    setMovies([]);
    window.scrollTo(0, 0);
    setSearchField(event.target.value);
  };

  const getMovies = async (search) => {
    setIsLoading(true);
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${search}&page=${page}&api_key=ca9b63e0f514a34c2d3bd66bf826c4ce`
    );
    setMovies((movies) => [...movies, ...response.data.results]);
    setIsLoading(false);
  };

  useEffect(() => {
    getMovies(searchField);
  }, [page, searchField]);

  return (
    <div className="container">
      <div className="row ">
        <div className="col-12 col-sm-12 col-lg-6 mb-4">
          <div style={{ paddingTop: "60px" }}>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1">
                <i className="bi bi-search"></i>
              </span>
              <input
                className="form-control"
                type="search"
                placeholder="enter movie title..."
                aria-label="Search"
                value={searchField}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" />
        </div>
      ) : (
        !searchField && (
          <div className="row">
            <div className="col-12 col-sm-12 col-lg-6 mb-4">
              <div className="d-flex justify-content-center align-items-center text-light border rounded">
                <span className="my-2">Go for it! Search a Movie!</span>
              </div>
            </div>
          </div>
        )
      )}

      {searchField && !isLoading && (
        <InfiniteScroll
          dataLength={movies.length}
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
              <div className="col-12 col-md-6 col-lg-3" key={movie.id}>
                <Link to={`/pelicula/${movie.id}`}>
                  <img
                    className="img-fluid rounded shadow"
                    key={movie.id}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={`imagen de ${movie.title}`}
                  />
                </Link>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}

export default SearchMovie;
