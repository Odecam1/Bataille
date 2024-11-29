import React, { useState } from "react"
import { BattleZone } from "./components/BattleZone"
import { PlayButton } from "./components/PlayButton"
import { PlayerDeck } from "./components/PlayerDeck"
import { allDeck, PlayingCard } from "./utils/constants"
import { shuffleArray } from "./utils/functions"

const App: React.FC = () => {
  const [deck] = useState(shuffleArray(allDeck))
  const [player1Deck, setPlayer1Deck] = useState(deck.slice(0, 26))
  const [player2Deck, setPlayer2Deck] = useState(deck.slice(26))
  const [battleCards, setBattleCards] = useState<PlayingCard[]>([])
  const [warPile, setWarPile] = useState<PlayingCard[]>([])
  const [message, setMessage] = useState("Cliquez pour jouer un tour!")

  const checkGameOver = () => {
    const GameOver = player1Deck.length === 0 || player2Deck.length === 0
    if (GameOver) {
      setMessage(
        player1Deck.length === 0 ? "Joueur 2 a gagné!" : "Joueur 1 a gagné!"
      )
    }
    return GameOver
  }

  const resolveRoundWinner = (
    card1: PlayingCard,
    card2: PlayingCard,
    newWarPile: PlayingCard[]
  ) => {
    if (card1.value > card2.value) {
      setPlayer1Deck([...player1Deck.slice(1), ...newWarPile])
      setPlayer2Deck(player2Deck.slice(1))
      setWarPile([])
      setMessage("Joueur 1 remporte le tour!")
    } else if (card1.value < card2.value) {
      setPlayer2Deck([...player2Deck.slice(1), ...newWarPile])
      setPlayer1Deck(player1Deck.slice(1))
      setWarPile([])
      setMessage("Joueur 2 remporte le tour!")
    } else {
      handleBattle(newWarPile)
    }
  }

  const handleBattle = (newWarPile: PlayingCard[]) => {
    if (player1Deck.length < 3 || player2Deck.length < 3) {
      setMessage("Un joueur ne peut pas compléter une bataille, fin du jeu!")
      return
    }

    const additionalCards = [
      player1Deck[1],
      player2Deck[1],
      player1Deck[2],
      player2Deck[2],
    ]
    setWarPile([...newWarPile, ...additionalCards])

    setPlayer1Deck(player1Deck.slice(3))
    setPlayer2Deck(player2Deck.slice(3))
    setMessage("Bataille! Les cartes sont ajoutées à la pile.")
  }

  const playTurn = () => {
    if (checkGameOver()) return

    const card1 = player1Deck[0]
    const card2 = player2Deck[0]
    const newWarPile = [...warPile, card1, card2]

    setBattleCards([card1, card2])
    resolveRoundWinner(card1, card2, newWarPile)
  }

  return (
    <div className="flex flex-col items-center bg-green-700 h-screen p-4">
      <h1 className="text-white text-3xl font-bold mb-4">Jeu de la Bataille</h1>
      <div className="flex justify-between w-full max-w-4xl mb-4">
        <PlayerDeck
          playerName="Joueur 1"
          cardCount={player1Deck.length}
          color="bg-blue-500"
        />
        <PlayerDeck
          playerName="Joueur 2"
          cardCount={player2Deck.length}
          color="bg-red-500"
        />
      </div>
      <BattleZone battleCards={battleCards} />
      <p className="text-white text-lg mb-4">{message}</p>
      <PlayButton onClick={playTurn} />
    </div>
  )
}

export default App
