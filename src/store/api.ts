import { collection, getDocs } from "firebase/firestore";
import { firestore } from "./firebase-config";
import { Movie, Show } from "./types";

const api_url = "https://api.themoviedb.org/3/";
const api_key = "d84c24c285d89a2819f63b0b4c62e2b1";
const image_url = "https://image.tmdb.org/t/p/original/";

export async function fetchMovies() {
  const response = await fetch(
    api_url + "trending/movie/day?api_key=" + api_key
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.status_message);
  }

  const moviesList: Array<Movie> = await Promise.all(
    data.results.map(async (movie: any) => {
      let genres: string = await getMovieGenres(movie.genre_ids);

      return {
        id: movie.id,
        title: movie.original_title,
        genre: genres,
        poster_url: `${image_url}${movie.poster_path}`,
        backdrop_url: `${image_url}${movie.backdrop_path}`,
        release_date: movie.release_date,
        description: movie.overview,
        popularity: movie.vote_average.toFixed(1),
      };
    })
  );

  return moviesList;
}

export async function fetchShows() {
  const response = await fetch(api_url + "trending/tv/day?api_key=" + api_key);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.status_message);
  }

  const showsList: Array<Show> = await Promise.all(
    data.results.map(async (show: any) => {
      let genres: string = await getTvGenres(show.genre_ids);

      return {
        id: show.id,
        name: show.name,
        genre: genres,
        poster_url: `${image_url}${show.poster_path}`,
        backdrop_url: `${image_url}${show.backdrop_path}`,
        first_air_date: show.first_air_date,
        description: show.overview,
        popularity: show.vote_average.toFixed(1),
      };
    })
  );

  return showsList;
}

async function getMovieGenres(genre_ids: Array<number>): Promise<string> {
  const response = await fetch(api_url + "genre/movie/list?api_key=" + api_key);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.status_message);
  }

  const genreList = data.genres;

  return getGenres(genre_ids, genreList);
}

async function getTvGenres(genre_ids: Array<number>): Promise<string> {
  const response = await fetch(api_url + "genre/tv/list?api_key=" + api_key);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.status_message);
  }

  const genreList = data.genres;

  return getGenres(genre_ids, genreList);
}

function getGenres(genre_ids: Array<Number>, genreList: any): string {
  const genres: Array<string> = [];

  genre_ids.forEach((genre_id) => {
    genreList.forEach((genre: any) => {
      if (genre.id == genre_id) genres.push(genre.name);
    });
  });

  let genreString = "";

  for (var i = 0; i < genres.length; i++) {
    if (i == genres.length - 1) {
      genreString += genres[i];
    } else {
      genreString += genres[i] + ", ";
    }
  }

  return genreString;
}

async function getMovieFavoriteIds(email: string) {
  const collectionRef = collection(firestore, `${email}`, "favorites", "movie");

  const data = await getDocs(collectionRef);
  const docs = data.docs.map((doc) => ({ ...doc.data() }));
  return docs;
}

async function getShowFavoriteIds(email: string) {
  const collectionRef = collection(firestore, `${email}`, "favorites", "show");

  const data = await getDocs(collectionRef);
  const docs = data.docs.map((doc) => ({ ...doc.data() }));
  return docs;
}

export async function movieFavoriteExists(movie_id: number, email: string) {
  const favoriteIds = await getMovieFavoriteIds(email);
  const favoriteId = favoriteIds.filter(
    (favorite) => movie_id === favorite.movie_id
  );
  if (favoriteId.length !== 0) return true;

  return false;
}

export async function showFavoriteExists(show_id: number, email: string) {
  const favoriteIds = await getShowFavoriteIds(email);
  const favoriteId = favoriteIds.filter(
    (favorite) => show_id === favorite.show_id
  );
  if (favoriteId.length !== 0) return true;
  return false;
}

export async function getMovieFavorites(email: string): Promise<Array<Movie>> {
  const favoriteIds = await getMovieFavoriteIds(email);
  const movieFavorites: Array<Movie> = [];

  favoriteIds.forEach(async (favorite) => {
    const response = await fetch(
      api_url + "movie/" + favorite.movie_id + "?api_key=" + api_key
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.status_message);
    }

    let genreString = "";

    for (var i = 0; i < data.genres.length; i++) {
      if (i == data.genres.length - 1) {
        genreString += data.genres[i].name;
      } else {
        genreString += data.genres[i].name + ", ";
      }
    }

    const movie: Movie = {
      id: data.id,
      title: data.original_title,
      genre: genreString,
      poster_url: `${image_url}${data.poster_path}`,
      backdrop_url: `${image_url}${data.backdrop_path}`,
      release_date: data.release_date,
      description: data.overview,
      popularity: data.vote_average,
    };

    movieFavorites.push(movie);
  });

  return movieFavorites;
}

export async function getShowFavorites(email: string): Promise<Array<Show>> {
  const favoriteIds = await getShowFavoriteIds(email);
  const showFavorites: Array<Show> = [];

  favoriteIds.forEach(async (favorite) => {
    const response = await fetch(
      api_url + "tv/" + favorite.show_id + "?api_key=" + api_key
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.status_message);
    }

    let genreString = "";

    for (var i = 0; i < data.genres.length; i++) {
      if (i == data.genres.length - 1) {
        genreString += data.genres[i].name;
      } else {
        genreString += data.genres[i].name + ", ";
      }
    }

    const show: Show = {
      id: data.id,
      name: data.name,
      genre: genreString,
      poster_url: `${image_url}${data.poster_path}`,
      backdrop_url: `${image_url}${data.backdrop_path}`,
      first_air_date: data.first_air_date,
      description: data.overview,
      popularity: data.vote_average,
    };

    showFavorites.push(show);
  });

  return showFavorites;
}
