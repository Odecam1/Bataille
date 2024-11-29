type PlayButtonProps = {
  onClick: () => void
}

export const PlayButton: React.FC<PlayButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
  >
    Jouer un tour
  </button>
)
