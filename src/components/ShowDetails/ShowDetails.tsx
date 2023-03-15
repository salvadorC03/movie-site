import { Show } from "../../store/types";
import classes from "./ShowDetails.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { firestore, userState } from "../../store/firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { showFavoriteExists } from "../../store/api";
import Button from "@mui/material/Button";
import StarIcon from "@mui/icons-material/Star";
import { yellow } from "@mui/material/colors";

const ShowDetails: React.FC<{ show: Show; onClose: () => void }> = (props) => {
  const user = userState();

  async function addFavoriteHandler() {
    try {
      const collectionRef = collection(
        firestore,
        `${user?.email}/favorites/show`
      );

      const existingFavorite = await showFavoriteExists(
        props.show.id,
        user?.email as string
      );

      if (existingFavorite) {
        throw new Error("Favorite exists");
      }

      await addDoc(collectionRef, { show_id: props.show.id });
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
            <img src={props.show.poster_url} className={classes.poster} />
            <h1>{props.show.name}</h1>
          </header>
          <p>{props.show.description}</p>
          <p>
            <b>Genre:</b> {props.show.genre}
          </p>
          <p>
            <b>First Air Date:</b> {props.show.first_air_date}
          </p>
          <p>
            <b>Popularity:</b> {props.show.popularity}
          </p>
        </div>
      </div>
      <div
        className={classes["background-image"]}
        style={{ backgroundImage: `url("${props.show.backdrop_url}")` }}
      />
    </div>
  );
};

export default ShowDetails;
