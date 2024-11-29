import { Cardback } from "./card/cardback"

type PlayerDeckProps = {
  playerName: string
  cardCount: number
}

export const PlayerDeck: React.FC<PlayerDeckProps> = ({
  playerName,
  cardCount,
}) => (
  <div className="flex flex-col items-center">
    <h2 className="text-white text-xl mb-2">{playerName}</h2>
    <Cardback width={96} />
    <p className="text-white">
      {cardCount} carte{cardCount > 1 ? "s" : ""}
    </p>
  </div>
)
