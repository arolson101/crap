import * as React from 'react'
import { FavicoProps } from '../util/getFavico'
import { Image } from 'react-native'

export const Favico: React.SFC<FavicoProps> = (props) => {
  const { width, height, uri } = props
  return (
    <Image style={{ width: 48, height: 48, resizeMode: 'contain' }} source={{ uri, width, height }} />
  )
}
