import { PlayingCard } from "../utils/constants"

export type Action =
  | { type: "PLAY_TURN" }
  | { type: "GAME_OVER"; winner: string }
  | {
      type: "START_BATTLE"
      newWarPile: PlayingCard[]
      battleCards: PlayingCard[]
    }
  | {
      type: "RESOLVE_WINNER"
      winner: "player1" | "player2"
      warPile: PlayingCard[]
    }
  | { type: "HANDLE_BATTLE"; additionalCards: PlayingCard[] }

export type State = {
  player1Deck: PlayingCard[]
  player2Deck: PlayingCard[]
  battleCards: PlayingCard[]
  warPile: PlayingCard[]
  message: string
}
