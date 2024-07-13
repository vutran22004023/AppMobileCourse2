import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import YoutubePlayer from 'react-native-youtube-iframe';
const Youtube = () => {
    const [playing, setPlaying] = useState(false);
  const playerRef = useRef(null);

  const onStateChange = (state) => {
    if (state === 'ended') {
      setPlaying(false);
      alert('Video has finished playing!');
    }
  };

  const togglePlaying = () => {
    setPlaying((prev) => !prev);
  };
  return (
    <View>
      <YoutubePlayer
        ref={playerRef}
        height={250}
        play={playing}
        videoId={'ECxVfrwwTp0'}
        onChangeState={onStateChange}
      />
    </View>
  )
}

export default Youtube

const styles = StyleSheet.create({})