import { useEffect, useState } from "react";
import { getMovieFavorites } from "../../../store/api";
import { userState } from "../../../store/firebase-config";
import { Movie } from "../../../store/types";
import classes from "./MovieFavoritesList.module.css";
import MovieFavoritesListItem from "./MovieFavoritesListItem";

const MovieFavoritesList: React.FC<{ onSelect: (movie: Movie) => void }> = (
  props
) => {
  const user = userState();
  const [favorites, setFavorites] = useState<Array<Movie> | null>(null);

  async function fetchFavorites() {
    try {
      const movieFavorites = await getMovieFavorites(user?.email as string);
      setFavorites(movieFavorites);
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  }

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <ul>
      {favorites &&
        favorites.map((movie) => (
          <MovieFavoritesListItem movie={movie} onSelect={props.onSelect} />
        ))}
    </ul>
  );
};

export default MovieFavoritesList;
