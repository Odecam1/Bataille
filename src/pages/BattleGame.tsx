import React, { useReducer } from "react"
import { BattleZone } from "../components/BattleZone"
import { PlayButton } from "../components/PlayButton"
import { PlayerDeck } from "../components/PlayerDeck"
import { allDeck, PlayingCard } from "../utils/constants"
import { shuffleArray } from "../utils/functions"
import { gameReducer } from "./gameReducer"
import { State } from "./types"

const initializeDecks = () => {
  const deck = shuffleArray(allDeck)
  return {
    player1Deck: deck.slice(0, 26),
    player2Deck: deck.slice(26),
    battleCards: [],
    warPile: [],
    message: "Cliquez pour jouer un tour!",
  }
}

const initialState: State = {
  player1Deck: [],
  player2Deck: [],
  battleCards: [],
  warPile: [],
  message: "Cliquez pour jouer un tour!",
}

export const BattleGame: React.FC = () => {
  const [state, dispatch] = useReducer(
    gameReducer,
    initialState,
    initializeDecks
  )

  const checkGameOver = () => {
    const { player1Deck, player2Deck } = state
    const gameOver = player1Deck.length === 0 || player2Deck.length === 0

    if (gameOver) {
      const winner = player1Deck.length === 0 ? "Joueur 2" : "Joueur 1"
      dispatch({ type: "GAME_OVER", winner })
    }

    return gameOver
  }

  const prepareTurn = () => {
    const { player1Deck, player2Deck, warPile } = state
    const card1 = player1Deck[0]
    const card2 = player2Deck[0]
    const newWarPile = [...warPile, card1, card2]

    return { card1, card2, newWarPile }
  }

  const handleBattle = () => {
    const { player1Deck, player2Deck } = state

    if (player1Deck.length < 3 || player2Deck.length < 3) {
      const winner = player1Deck.length < 3 ? "Joueur 2" : "Joueur 1"
      dispatch({ type: "GAME_OVER", winner })
      return
    }

    const additionalCards = [
      player1Deck[1],
      player2Deck[1],
      player1Deck[2],
      player2Deck[2],
    ]

    dispatch({ type: "HANDLE_BATTLE", additionalCards })
  }

  const resolveRoundWinner = (
    card1: PlayingCard,
    card2: PlayingCard,
    newWarPile: PlayingCard[]
  ) => {
    let winner: "player1" | "player2"
    if (card1.value > card2.value) {
      winner = "player1"
    } else if (card1.value < card2.value) {
      winner = "player2"
    } else {
      handleBattle()
      return
    }

    dispatch({
      type: "RESOLVE_WINNER",
      winner,
      warPile: newWarPile,
    })
  }

  const playTurn = () => {
    if (checkGameOver()) return

    const { card1, card2, newWarPile } = prepareTurn()
    dispatch({ type: "PLAY_TURN" })
    resolveRoundWinner(card1, card2, newWarPile)
  }

  return (
    <div className="flex flex-col items-center bg-green-700 h-screen p-4">
      <h1 className="text-white text-3xl font-bold mb-4">Jeu de la Bataille</h1>
      <div className="flex justify-between w-full max-w-4xl mb-4">
        <PlayerDeck
          playerName="Joueur 1"
          cardCount={state.player1Deck.length}
        />
        <PlayerDeck
          playerName="Joueur 2"
          cardCount={state.player2Deck.length}
        />
      </div>
      <p className="text-white text-lg ">
        Carte en jeu : {state.warPile.length}
      </p>
      <BattleZone battleCards={state.battleCards} />
      <p className="text-white text-lg mb-4">{state.message}</p>
      <PlayButton onClick={playTurn} />
    </div>
  )
}
