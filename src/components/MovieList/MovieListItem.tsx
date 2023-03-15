import { Movie } from "../../store/types";
import classes from "./MovieListItem.module.css";
import StarIcon from "@mui/icons-material/Star";
import { yellow } from "@mui/material/colors";

const MovieListItem: React.FC<{
  movie: Movie;
  onSelect: (movie: Movie) => void;
}> = (props) => {
  return (
    <li
      className={classes["movie-list-item"]}
      onClick={() => props.onSelect(props.movie)}
    >
      <img src={props.movie.poster_url} />
      <div className={classes.popularity}>
        <StarIcon sx={{ color: yellow[800] }} />
        <span>{props.movie.popularity}</span>
      </div>
      <p className={classes.title}>{props.movie.title}</p>
    </li>
  );
};

export default MovieListItem;
