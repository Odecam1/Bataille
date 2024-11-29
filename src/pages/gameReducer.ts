import { Action, State } from "./types"

export const gameReducer: React.Reducer<State, Action> = (
  prevState,
  action
) => {
  switch (action.type) {
    case "PLAY_TURN": {
      if (
        prevState.player1Deck.length === 0 ||
        prevState.player2Deck.length === 0
      ) {
        return {
          ...prevState,
          message:
            prevState.player1Deck.length === 0
              ? "L'ordinateur a gagné!"
              : "le joueur a gagné!",
        }
      }

      const card1 = prevState.player1Deck[0]
      const card2 = prevState.player2Deck[0]
      const newWarPile = [...prevState.warPile, card1, card2]

      return {
        ...prevState,
        battleCards: [card1, card2],
        warPile: newWarPile,
        message: "",
      }
    }

    case "RESOLVE_WINNER": {
      const newPlayer1Deck =
        action.winner === "player"
          ? [...prevState.player1Deck.slice(1), ...action.warPile]
          : prevState.player1Deck.slice(1)
      const newPlayer2Deck =
        action.winner === "computer"
          ? [...prevState.player2Deck.slice(1), ...action.warPile]
          : prevState.player2Deck.slice(1)

      return {
        ...prevState,
        player1Deck: newPlayer1Deck,
        player2Deck: newPlayer2Deck,
        warPile: [],
        message:
          action.winner === "player"
            ? "le joueur remporte le tour!"
            : "L'ordinateur remporte le tour!",
      }
    }

    case "START_BATTLE":
      return {
        ...prevState,
        battleCards: action.battleCards,
        warPile: action.newWarPile,
        message: "Bataille! Les cartes sont ajoutées à la pile.",
      }

    case "HANDLE_BATTLE":
      return {
        ...prevState,
        warPile: [...prevState.warPile, ...action.additionalCards],
        player1Deck: prevState.player1Deck.slice(2),
        player2Deck: prevState.player2Deck.slice(2),
        message: "Bataille! Les joueurs ajoutent des cartes supplémentaires.",
      }

    case "GAME_OVER":
      return {
        ...prevState,
        message: `${action.winner} a gagné!`,
      }

    default:
      return prevState
  }
}
