import CollapsibleExample from './react-bootstrap/CollapsibleExample';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from "react"; 
import useSound from "use-sound"
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; 
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"; 
import {RiArrowRightDoubleLine,RiArrowLeftDoubleLine} from "react-icons/ri"
import { IconContext } from "react-icons"; 

function App() {
  let audioFiles = []; 

  function importAll(r) {
    r.keys().forEach((s, i, arr) => audioFiles[i] = r(s));
    }
  importAll(require.context('./audio/', true, /\.mp3$/));

  const [isPlaying, setIsPlaying] = useState(false);
  const [n, setN] = useState(0);

 
 const [play, { pause, duration, sound ,soundEnabled}] = useSound(audioFiles[n])
  
  const [currTime, setCurrTime] = useState({
    min: "",
    sec: "",
  }); 

  const [seconds, setSeconds] = useState();

  let time = {
    min: Math.floor(duration / 1000 / 60),
    sec: Math.floor(duration / 1000 % 60)
    }
  useEffect(() => {
      const interval = setInterval(() => {
        if (sound) {
          setSeconds(sound.seek([])); 
          const min = Math.floor(sound.seek([]) / 60);
          const sec = Math.floor(sound.seek([]) % 60);
          setCurrTime({
            min,
            sec,
          });
        }
      }, 1000);
      return () => clearInterval(interval);
    }, [sound]);

  const playingButton = () => {
    console.log(sound)
    if (isPlaying) {
      pause(); 
      setIsPlaying(false);
    } else {
      play(); 
      setIsPlaying(true);
    }
  };
  function nextTrack(){
    if(n < audioFiles.length - 1) {
      if(!sound._sounds[0]._paused)  setIsPlaying(false)
      pause()
      setN(n+1)

    }
  }
  function backTrack(){
    if(n > -1) {
      if(!sound._sounds[0]._paused)  setIsPlaying(false)
      pause()
      setN(n-1)

    }
  }
  return (
    
    <div >

        <div class="media-controls">
  <div class="media-buttons">
    <button class="back-button media-button" label="back" onClick={() => sound.seek(sound._sounds[0]._seek-5)}>
      <i class="fas fa-step-backward button-icons">
      <IconContext.Provider value={{ size: "3em", color: "#CC00FF" }}>
            <RiArrowLeftDoubleLine />
      </IconContext.Provider>
      </i>
      <span class="button-text milli">Back</span>
    </button>

    <button class="rewind-button media-button" label="rewind" onClick={() => {backTrack()}}>
      <i class="fas fa-backward button-icons">
      <IconContext.Provider value={{ size: "3em", color: "#CC00FF" }}>
            <BiSkipPrevious />
      </IconContext.Provider>
      </i>
      <span class="button-text milli">Rewind</span>
    </button>

    <button class="play-button media-button" label="play" onClick={() => playingButton()}>
      <i class="fas fa-play button-icons delta">
      {!isPlaying ? (
            <IconContext.Provider value={{ size: "3em", color: "#CC00FF" }}>
              <AiFillPlayCircle />
            </IconContext.Provider> )
             : 
             (
              <IconContext.Provider value={{ size: "3em", color: "#CC00FF" }}>
              <AiFillPauseCircle />
            </IconContext.Provider>
            )}
        </i>
        <span class="button-text milli">Play</span>
     
    </button>

    <button class="fast-forward-button media-button" label="fast forward" onClick={() => nextTrack()}>

      <i class="fas fa-forward button-icons">
      <IconContext.Provider value={{ size: "3em", color: "#CC00FF" }}>
            <BiSkipNext />
          </IconContext.Provider>
      </i>
      <span class="button-text milli">Forward</span>
    </button>

    <button class="skip-button media-button" label="skip" onClick={() => sound.seek(sound._sounds[0]._seek+5)}>
      <i class="fas fa-step-forward button-icons">
      <IconContext.Provider value={{ size: "3em", color: "#CC00FF" }}>
            <RiArrowRightDoubleLine />
          </IconContext.Provider>
      </i>
      <span class="button-text milli">Skip</span>
    </button>
  </div>
  <div class="media-progress">
    <div class="progress-bar-wrapper progress">
      <div class="progress-bar">
      <input
          type="range"
          min="0"
          max={duration / 1000}
          default="0"
          value={seconds}
          className="timeline"
          onChange={(e) => {
            sound.seek([e.target.value]);
          }}/>
      </div>
    </div>
    <div class="progress-time-current milli">
    {currTime?`${currTime.min}:${currTime.sec}`:'0:0'}
    </div>
    <div class="progress-time-total milli">
    {time.min}:{time.sec}
    </div>
  </div>
</div>
             
    </div>
  );
}

export default App;
