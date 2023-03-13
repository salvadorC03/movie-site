import { Movie } from "../../store/types";
import classes from "./MovieListItem.module.css";

const MovieListItem: React.FC<{
  movie: Movie;
  onSelect: (movie: Movie) => void;
}> = (props) => {
  return (
    <li
      className={classes["movie-list-item"]}
      onClick={() => props.onSelect(props.movie)}
    >
      <img src={props.movie.logo_url} />
      <p>Popularity: {props.movie.popularity}</p>
      <p>Name: {props.movie.title}</p>
    </li>
  );
};

export default MovieListItem;
