import { Movie } from "../../../store/types";
import classes from "./MovieFavoritesListItem.module.css";

const MovieFavoritesListItem: React.FC<{
  movie: Movie;
  onSelect: (movie: Movie) => void;
}> = (props) => {
  return (
    <li onClick={() => props.onSelect(props.movie)}>
      <img src={props.movie.poster_url} />

      <p>{props.movie.title}</p>
    </li>
  );
};

export default MovieFavoritesListItem;
