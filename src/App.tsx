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
      <PlayButton onClick={playTurn} />
    </div>
  )
}

export default App
