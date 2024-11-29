import { FC } from "react"

export type Rank =
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K"
  | "A"
export type Suit = "spades" | "hearts" | "diamonds" | "clubs"

type Props = {
  rank: Rank
  suit: Suit
  width?: number
  height?: number
}

export const Card: FC<Props> = ({ rank, suit, width, height }) => (
  <img width={width} height={height} src={`/cards/${suit}/${rank}.svg`} />
)
