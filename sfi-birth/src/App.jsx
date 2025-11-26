
import './App.css'
import { useState, useRef, useEffect } from 'react';
import { GiftSVG } from './GiftSVG';


function App() {
  const [celebrate, setCelebrate] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (celebrate && audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Fallback: try to play again after short delay
          setTimeout(() => {
            audioRef.current.play();
          }, 500);
        });
      }
    }
  }, [celebrate]);

  return (
    <div className={celebrate ? 'celebrate-bg' : 'app-bg'}>
      <audio
        ref={audioRef}
        src="../public/happy-birthday.mp3"
        preload="auto"
        style={{ display: 'none' }}
      />
      {!celebrate ? (
        <div className="gift-container" onClick={() => setCelebrate(true)}>
          <GiftSVG />
          <p className="click-text">Hədiyyəni aç sürpriz səni gözləyir Sofi</p>
        </div>
      ) : (
        <div className="celebrate-message">
          <h1>Happy Birthday Sofi 🎉</h1>
        </div>
      )}
    </div>
  );
}


export default App
