import { SeatProps } from "../interfaces/movieTypes";

const groupSeatsByLetter = (seats: SeatProps[]) => {
  return seats.reduce<{ [key: string]: SeatProps[] }>((acc, seat) => {
    const { seatLetter } = seat;
    if (!acc[seatLetter]) {
      acc[seatLetter] = [];
    }
    acc[seatLetter].push(seat);
    return acc;
  }, {});
};

export default groupSeatsByLetter;