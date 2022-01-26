import * as React from 'react'
import { Box, Stack } from '@mobily/stacks'

import { useCurrentTrack } from '~/hooks/useCurrentTrack'
import { Colors } from '~/constants/Colors'
import { Touchable } from '~/components/Touchable'
import { Typography } from '~/components/Typography'
import { Artist } from '~/components/Artist'

type Props = {
  readonly track: Track
}

export const Track = (props: Props) => {
  const { track } = props
  const { setCurrentTrack, currentTrack } = useCurrentTrack()

  const isDisabled = !track.preview_url
  const isCurrentTrack = track.id === currentTrack?.id

  const handlePress = React.useCallback(() => {
    setCurrentTrack({
      id: track.id,
      artists: track.artists,
      name: track.name,
      preview_url: track.preview_url,
    })
  }, [track.id])

  return (
    <Touchable isDisabled={isDisabled} onPress={handlePress}>
      <Box padding={4}>
        <Stack space={1}>
          <Typography
            lines={1}
            color={isDisabled ? Colors.dark : isCurrentTrack ? Colors.green : Colors.white}
          >
            {track.name}
          </Typography>
          <Artist color={isDisabled ? Colors.dark : Colors.grey} artists={track.artists} />
        </Stack>
      </Box>
    </Touchable>
  )
}
