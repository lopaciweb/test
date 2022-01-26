import React from 'react'
import { FlatList } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { Box } from '@mobily/stacks'

import { useTracksInfiniteQuery } from '~/hooks/useTracksInfiniteQuery'
import { usePlaylistQuery } from '~/hooks/usePlaylistQuery'
import { Typography } from '~/components/Typography'
import { ScreenView } from '~/components/ScreenView'
import { Loader } from '~/components/Loader'
import { Track } from '~/components/Track'
import { PlaylistHeader } from '~/components/PlaylistHeader'
import { Colors } from '~/constants/Colors'

import { RootStackParamList } from '../../../types'

export const PlaylistScreen = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, 'Playlist'>>()
  const { status: statusPlaylist, data: playlist } = usePlaylistQuery(params.id)
  const {
    status: statusTracks,
    data: dataTracks,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useTracksInfiniteQuery(params.id)

  const isLoading = statusTracks === 'loading' || statusPlaylist === 'loading'

  return (
    <ScreenView style={{ backgroundColor: Colors.black }}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <PlaylistHeader playlist={playlist} />
          <FlatList
            data={dataTracks?.pages}
            refreshing={isFetchingNextPage}
            renderItem={({ item }) => {
              return <Track track={item} />
            }}
            keyExtractor={item => item.id}
            onEndReached={() => {
              hasNextPage && fetchNextPage()
            }}
            ListEmptyComponent={() => (
              <Box paddingX={2} paddingTop={6}>
                <Typography>There's no playlists</Typography>
              </Box>
            )}
          />
        </>
      )}
    </ScreenView>
  )
}
