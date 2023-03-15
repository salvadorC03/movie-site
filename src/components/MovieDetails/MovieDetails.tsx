import { Movie } from "../../store/types";
import classes from "./MovieDetails.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { addDoc, collection } from "firebase/firestore";
import { firestore, userState } from "../../store/firebase-config";
import { movieFavoriteExists } from "../../store/api";
import Button from "@mui/material/Button";
import StarIcon from "@mui/icons-material/Star";
import { yellow } from "@mui/material/colors";

const MovieDetails: React.FC<{ movie: Movie; onClose: () => void }> = (
  props
) => {
  const user = userState();

  async function addFavoriteHandler() {
    try {
      const collectionRef = collection(
        firestore,
        `${user?.email}/favorites/movie`
      );

      const existingFavorite = await movieFavoriteExists(
        props.movie.id,
        user?.email as string
      );

      if (existingFavorite) {
        throw new Error("Favorite exists")
      }

      await addDoc(collectionRef, { movie_id: props.movie.id });
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  }

  return (
    <div className={classes.group}>
      <div className={classes.details}>
        <table>
          <tbody>
            <tr>
              <td align="left">
                <Button variant="contained" onClick={props.onClose}>
                  <ArrowBackIcon />
                </Button>
              </td>
              <td align="right">
                <Button
                  onClick={addFavoriteHandler}
                  variant="contained"
                  sx={{ backgroundColor: yellow[500], color: yellow[900] }}
                >
                  <StarIcon />
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className={classes.group}>
          <header>
            <img src={props.movie.poster_url} className={classes.poster} />
            <h1>{props.movie.title}</h1>
          </header>
          <p>{props.movie.description}</p>
          <p>
            <b>Genre:</b> {props.movie.genre}
          </p>
          <p>
            <b>Release Date:</b> {props.movie.release_date}
          </p>
          <p>
            <b>Popularity:</b> {props.movie.popularity}
          </p>
        </div>
      </div>
      <div
        className={classes["background-image"]}
        style={{ backgroundImage: `url("${props.movie.backdrop_url}")` }}
      />
    </div>
  );
};

export default MovieDetails;
