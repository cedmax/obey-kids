import React, { PropTypes } from 'react';
import Sound from 'react-sound';

export default function Star(props) {
  return (
    <Sound
      playStatus={ Sound.status.PLAYING }
      onFinishedPlaying={ props.onEnd }
      url={ `/assets/audio/${props.direction}.mp3?refr` }
    />
  );
}

Star.propTypes = {
  onEnd: PropTypes.func,
  direction: PropTypes.string.isRequired
};