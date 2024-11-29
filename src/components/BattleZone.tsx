import { Card, Rank, Suit } from "./card"

type BattleZoneProps = {
  battleCards: { rank: Rank; suit: Suit }[]
}

export const BattleZone: React.FC<BattleZoneProps> = ({ battleCards }) => (
  <div className="flex items-center justify-center bg-yellow-500 rounded-lg w-64 h-40 mb-4">
    {battleCards.length > 0 ? (
      <>
        <Card
          rank={battleCards[0].rank}
          suit={battleCards[0].suit}
          width={80}
          height={120}
        />
        <Card
          rank={battleCards[1].rank}
          suit={battleCards[1].suit}
          width={80}
          height={120}
        />
      </>
    ) : (
      <span className="text-white">Placez les cartes ici</span>
    )}
  </div>
)
