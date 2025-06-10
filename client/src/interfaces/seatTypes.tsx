import { ScreeningProps, SeatProps } from "./movieTypes";

export interface SeatState {
    selectedScreening: ScreeningProps | null;
    selectedSeatList: SeatProps[] | [];
    isLoading: boolean;
    isError: boolean;
}