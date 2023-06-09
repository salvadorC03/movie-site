import { Movie } from "../../store/types";
import MovieListItem from "./MovieListItem";
import classes from "./MovieList.module.css";
import React from "react";

const MovieList: React.FC<{
  list: Array<Movie>;
  onSelect: (movie: Movie) => void;
}> = React.memo((props) => {
  return (
    <div className={classes.group}>
      <h2 style={{ paddingLeft: "1.5rem" }}>Trending movies:</h2>
      <ul className={classes["movie-list"]}>
        {props.list.map((movie) => (
          <MovieListItem
            key={movie.id}
            movie={movie}
            onSelect={props.onSelect}
          />
        ))}
      </ul>
    </div>
  );
});

export default MovieList;
