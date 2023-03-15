export type Movie = {
  id: number;
  title: string;
  genre: string;
  poster_url: string;
  backdrop_url: string;
  release_date: string;
  description: string;
  popularity: number;
};

export type Show = {
  id: number;
  name: string;
  genre: string;
  poster_url: string;
  backdrop_url: string;
  first_air_date: string;
  description: string;
  popularity: number;
};
