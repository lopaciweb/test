import * as React from 'react'
import { Image, TouchableOpacity } from 'react-native'

import { Colors } from '~/constants/Colors'
import { Layout } from '~/constants/Layout'
import { goTo } from '~/navigation/utils'

type Props = {
  readonly item: Playlist
}

const imageSize = (Layout.window.width - 40) / 2

export const PlaylistCard = (props: Props) => {
  const { item } = props

  const handlePress = React.useCallback(() => {
    goTo('Playlist', { id: item.id })
  }, [item.id])

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{ width: imageSize, height: imageSize, backgroundColor: Colors.Black }}
    >
      <Image
        source={item.images[0]}
        style={{ width: imageSize, height: imageSize, resizeMode: 'contain' }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  )
}
