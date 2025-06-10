import { MovieProps, TheaterProps } from "./movieTypes"

export interface MatchProps{
    movie: MovieProps
    theater: TheaterProps
    _id: string
}

export interface MatchState{
    matchList: MatchProps[],
    isLoading: boolean,
    isError: boolean,
}