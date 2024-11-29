import React, { useState } from "react"
import { Card } from "./components/card"
import { allDeck, PlayingCard } from "./utils/constants"
import { shuffleArray } from "./utils/functions"

const App: React.FC = () => {
  const [deck] = useState(shuffleArray(allDeck))
  const [player1Deck, setPlayer1Deck] = useState(deck.slice(0, 26))
  const [player2Deck, setPlayer2Deck] = useState(deck.slice(26))
  const [battleCards, setBattleCards] = useState<PlayingCard[]>([])

  const playTurn = () => {
    if (player1Deck.length === 0 || player2Deck.length === 0) {
      return
    }

    const card1 = player1Deck[0]
    const card2 = player2Deck[0]
    setBattleCards([card1, card2])

    if (card1.value > card2.value) {
      setPlayer1Deck([...player1Deck.slice(1), card1, card2])
      setPlayer2Deck(player2Deck.slice(1))
    } else if (card1.value < card2.value) {
      setPlayer2Deck([...player2Deck.slice(1), card2, card1])
      setPlayer1Deck(player1Deck.slice(1))
      // l'égaliter ne gère pas encore la carte cacher mais juste la prochaine carte
    } else {
      setPlayer1Deck(player1Deck.slice(1))
      setPlayer2Deck(player2Deck.slice(1))
    }
  }

  return (
    <div className="flex flex-col items-center bg-blue-600 h-screen p-4">
      <h1 className="text-white text-3xl font-bold mb-4">Jeu de la Bataille</h1>
      <div className="flex">
        <div className="mx-6">
          <h2 className="text-white text-2xl font-bold mb-4">Joueur 1</h2>
          <p className="text-white">
            {player1Deck.length} carte{player1Deck.length > 1 ? "s" : ""}
          </p>
          {battleCards.length > 0 ? (
            <Card
              rank={battleCards[0].rank}
              suit={battleCards[0].suit}
              height={190}
              width={140}
            />
          ) : null}
        </div>
        <div className="mx-6">
          <h2 className="text-white text-2xl font-bold mb-4">Joueur 2</h2>{" "}
          <p className="text-white">
            {player2Deck.length} carte{player2Deck.length > 1 ? "s" : ""}
          </p>
          {battleCards.length > 0 ? (
            <Card
              rank={battleCards[1].rank}
              suit={battleCards[1].suit}
              height={190}
              width={140}
            />
          ) : null}
        </div>
      </div>
      <button
        onClick={playTurn}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Jouer le tour
      </button>
    </div>
  )
}

export default App
