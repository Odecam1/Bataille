import { FC } from "react"

type Props = {
  width?: number
  height?: number
}

export const Cardback: FC<Props> = ({ width, height }) => (
  <img width={width} height={height} src="/cards/cardback_red.svg" />
)
