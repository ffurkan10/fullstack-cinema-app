import { ScreeningProps } from "./movieTypes";

export interface ScreeningState {
    screeningList: ScreeningProps[];
    isLoading: boolean;
    isError: boolean;
}