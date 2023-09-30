import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import BasicExample from "../components/Spinner";

function MovieDetails() {
  const params = useParams();
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorCall, setErrorCall] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${params.id}?language=es-ES&api_key=ca9b63e0f514a34c2d3bd66bf826c4ce`
        );

        setMovieData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setErrorCall(true);
        console.log(errorCall);
        setIsLoading(false);
      }
    };
    getMovies();
  }, []);

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh", width: "100vw" }}
      >
        <BasicExample />
      </div>
    );
  }
  if (errorCall || !movieData) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: "100vh",
          width: "100vw",
          color: "white",
        }}
      >
        <h3
          style={{
            border: "1px solid red",
            padding: " 10px",
            color: "red",
          }}
        >
          Movie not found
        </h3>
      </div>
    );
  }
  if (movieData) {
    return (
      <div className="container">
        <div className="row mx-4 movie-detail-row">
          <div className="col-md-6 d-flex justify-content-center">
            <img
              src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
              alt=""
              className="img-fluid rounded"
              style={{ maxHeight: "85vh" }}
            />
          </div>
          <div className="col-md-6 ">
            <div className="mt-4">
              <h6 className="mt-2">
                <strong>Description: </strong>
              </h6>
              <h6 className="mt-2">{movieData.overview}</h6>
            </div>

            <div className="mt-2">
              <div className="d-flex">
                <h6 className="me-2 mt-2">
                  <strong>Rating: </strong>
                </h6>
                <h6 className=" mt-2">{movieData.vote_average}</h6>
              </div>
              <div id="stars-rating">
                <ReactStars
                  count={5}
                  size={24}
                  activeColor="#ffd700"
                  edit={false}
                  value={movieData.vote_average / 2 + 1}
                />
              </div>
            </div>
            <div className="mt-2">
              <div className="d-flex">
                <h6 className="me-2">
                  <strong>Release date: </strong>
                </h6>
                <h6>{movieData.release_date}</h6>
              </div>
            </div>
            <div className="mt-2">
              <div className="d-flex flex-wrap">
                <h6 className="me-2">
                  <strong>Gerero/s: </strong>
                </h6>
                {movieData.genres.map((genre) => (
                  <h6 key={genre.id}>{`${genre.name} / `}</h6>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieDetails;
