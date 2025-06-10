import { ScreeningProps, TheaterProps } from "./movieTypes";

export interface theaterTypes {
    theaterList: TheaterProps[];
    isLoading: boolean;
    isError: boolean;
}