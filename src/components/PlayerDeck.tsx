type PlayerDeckProps = {
  playerName: string
  cardCount: number
  color: string
}

export const PlayerDeck: React.FC<PlayerDeckProps> = ({
  playerName,
  cardCount,
  color,
}) => (
  <div className="flex flex-col items-center">
    <h2 className="text-white text-xl mb-2">{playerName}</h2>
    <div className={`rounded-lg p-4 text-center w-24 h-36 text-white ${color}`}>
      {cardCount} carte{cardCount > 1 ? "s" : ""}
    </div>
  </div>
)
