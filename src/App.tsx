import { useEffect, useState } from "react";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import MovieList from "./components/MovieList/MovieList";
import Card from "./components/UI/Card";
import Navigation from "./components/UI/Navigation";
import { Movie, Show } from "./store/types";
import classes from "./App.module.css";
import UserSideBar from "./components/UserSideBar/UserSideBar";
import ShowList from "./components/ShowList/ShowList";
import { fetchMovies, fetchShows } from "./store/api";
import CircularProgress from "@mui/material/CircularProgress";
import ReplayIcon from "@mui/icons-material/Replay";
import { Button } from "@mui/material";
import ShowDetails from "./components/ShowDetails/ShowDetails";

function App() {
  const [moviesList, setMoviesList] = useState<Array<Movie> | null>(null);
  const [showsList, setShowsList] = useState<Array<Show> | null>(null);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [displayNav, setDisplayNav] = useState(true);

  function selectMovieHandler(movie: Movie) {
    setSelectedMovie(movie);
  }

  function selectShowHandler(show: Show) {
    setSelectedShow(show);
  }

  function closeMovieDetailsHandler() {
    setSelectedMovie(null);
  }

  function closeShowDetailsHandler() {
    setSelectedShow(null);
  }

  async function fetchData() {
    setHasError(false);
    setLoading(true);
    try {
      const moviesList = await fetchMovies();
      setMoviesList(moviesList);

      const showsList = await fetchShows();
      setShowsList(showsList);
    } catch (error) {
      setHasError(true);
      if (error instanceof Error) console.log(error.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card>
      {!loading && !hasError && (
        <main className={classes.main}>
          {selectedMovie ? (
            <>
              <Navigation onShowNav={() => {}} />
              <MovieDetails
                movie={selectedMovie}
                onClose={closeMovieDetailsHandler}
              />
            </>
          ) : selectedShow ? (
            <>
              <Navigation onShowNav={() => {}} />
              <ShowDetails
                show={selectedShow}
                onClose={closeShowDetailsHandler}
              />
            </>
          ) : (
            <div className={classes["card-group"]}>
              <div className={classes["left-side"]}>
                <Navigation
                  onShowNav={() => setDisplayNav((prevState) => !prevState)}
                />
                {showsList && (
                  <>
                    <h2 style={{ paddingLeft: "1.5rem" }}>Trending shows:</h2>
                    <ShowList list={showsList} onSelect={selectShowHandler} />
                  </>
                )}
                {moviesList && (
                  <>
                    <h2 style={{ paddingLeft: "1.5rem" }}>Trending movies:</h2>
                    <MovieList
                      list={moviesList}
                      onSelect={selectMovieHandler}
                    />
                  </>
                )}
              </div>
              <div
                className={`${classes["right-side"]} ${
                  !displayNav && classes.hide
                }`}
              >
                <UserSideBar />
              </div>
            </div>
          )}
        </main>
      )}
      {hasError && (
        <div className={classes.centered}>
          <div>
            <h1>Loading failed.</h1>
            <Button
              variant="contained"
              className={classes["retry-button"]}
              onClick={fetchData}
            >
              <ReplayIcon />
              <p>Retry</p>
            </Button>
          </div>
        </div>
      )}
      {loading && (
        <div className={classes.centered}>
          <CircularProgress />
        </div>
      )}
    </Card>
  );
}

export default App;
