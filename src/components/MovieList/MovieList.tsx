import { Movie } from "../../store/types";
import MovieListItem from "./MovieListItem";
import classes from "./MovieList.module.css";

const MovieList: React.FC<{
  list: Array<Movie>;
  onSelect: (movie: Movie) => void;
}> = (props) => {
  return (
    <ul className={classes["movie-list"]}>
      {props.list.map((movie) => (
        <MovieListItem movie={movie} onSelect={props.onSelect} />
      ))}
    </ul>
  );
};

export default MovieList;
