import {
  AudioPlays,
  ActiveLike,
  Next,
  Pause,
  PlayerIC,
  NewPrev,
  Repeat,
  Speaker,
} from "../../constants";
import "./audio.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { Audioprovider } from "../../context";
const AudioPlay = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const { audio } = useContext(Audioprovider);
  const [audioUrl, setaudioUrl] = useState("");

  const handelPlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Vulume
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const handleTimeChange = (event) => {
    const time = event.target.value;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  useEffect(() => {
    const audioUrl = JSON.parse(localStorage.getItem("audioUrl")) || "";
    setaudioUrl(audioUrl);
    setCurrentTime(0);
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [audio]);

  return (
    <div className="play_audio">
      <div className="one_audio">
        {audioUrl ? (
          <>
            <img src={audioUrl?.track?.album?.images[0].url} alt="" />
            <div>
              <h4>{audioUrl.track?.name}</h4>
              <p>{audioUrl.track?.artists[0].name}</p>
            </div>
            <div className="like">
              {audioUrl?.track?.explicit ? (
                <span>
                  <ActiveLike />
                </span>
              ) : (
                <span></span>
              )}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="two_audio">
        <div className="audio_plays">
          <AudioPlays />
          <span className="audio_play_contrlo_btns">
            <NewPrev />
            <span onClick={handelPlay}>
              {isPlaying ? <Pause /> : <PlayerIC />}
            </span>
            <Next />
          </span>
          <span>
            <Repeat />
          </span>
        </div>
        <div>
          <audio
            src={audioUrl?.track?.preview_url}
            type="audio/mp3"
            ref={audioRef}
            className="audioEL"
            controls
            onEnded={handleAudioEnded}
            onTimeUpdate={() =>
              setCurrentTime(audioRef.current.currentTime)
            }></audio>
          <span className="play_control">
            <input
              type="range"
              min="0"
              className="audio_play_control"
              id="play"
              max={audioRef.current ? audioRef.current.duration : 0}
              step="1"
              value={currentTime}
              onChange={handleTimeChange}
            />
          </span>
        </div>
      </div>
      <div className="audio_thre">
        <Speaker />
        <input
          type="range"
          id="play"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};

export default AudioPlay;
