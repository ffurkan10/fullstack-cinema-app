export interface SeatProps {
    _id: string;
    seatLetter: string;
    seatNumber: number;
    isAvailable: boolean;
    price: number;
}

export interface TheaterProps{
    _id: string;
    saloonId: number;
    name: string;
    facilities: string[];
    screenings: ScreeningProps[];
}

export interface ScreeningProps {
    _id: string;
    startTime: string;
    seats: SeatProps[];
}

export interface MovieProps {
    _id: string;
    title: string;
    description: string;
    duration: number;
    releaseDate: string;
    genre: string;
    photo: string;
    slug: string;
    theater: TheaterProps
}

export interface MovieState {
    movieList: MovieProps[];
    isLoading: boolean;
    isError: boolean;
    selectedMovie: MovieProps | null;
}

export interface FavoriteState {
    favoriteList: MovieProps[] | null;
    isLoading: boolean;
    isError: boolean;
}

export interface PatchMovieProps {
    title: string | undefined;
    description: string | undefined;
    duration: number;
    releaseDate: string;
    genre: string | undefined;
    photo: string | undefined;
}

export interface AddMovieProps {
    title: string | undefined;
    description: string | undefined;
    duration: number;
    releaseDate: string;
    genre: string | undefined;
    photo: string | undefined;
}
