import { Rank, Suit } from "../components/card"

const ranks: { rank: Rank; value: number }[] = [
  { rank: "2", value: 2 },
  { rank: "3", value: 3 },
  { rank: "4", value: 4 },
  { rank: "5", value: 5 },
  { rank: "6", value: 6 },
  { rank: "7", value: 7 },
  { rank: "8", value: 8 },
  { rank: "9", value: 9 },
  { rank: "10", value: 10 },
  { rank: "J", value: 11 },
  { rank: "Q", value: 12 },
  { rank: "K", value: 13 },
  { rank: "A", value: 14 },
]
const suits: Suit[] = ["spades", "hearts", "diamonds", "clubs"]

export type PlayingCard = {
  rank: Rank
  suit: Suit
  value: number
}
export const allDeck: PlayingCard[] = suits.flatMap((suit) =>
  ranks.map(({ rank, value }) => ({ rank, suit, value }))
)
