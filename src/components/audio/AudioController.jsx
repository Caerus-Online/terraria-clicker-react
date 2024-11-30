import React, { useRef, useEffect } from 'react';
import backgroundMusic from '../../audio/terrariamusic.mp3';
import clickSound from '../../audio/click.mp3';
import purchaseSound from '../../audio/purchase.mp3';

const AudioController = ({ 
  bgVolume, 
  effectsVolume,
  onSoundLoad 
}) => {
  const bgMusicRef = useRef(null);
  const clickSoundRef = useRef(null);
  const purchaseSoundRef = useRef(null);

  // Initialize audio on mount
  useEffect(() => {
    if (bgMusicRef.current) {
      bgMusicRef.current.volume = bgVolume;
      bgMusicRef.current.loop = true;
      
      // Auto-play background music (with user interaction requirement handling)
      const playMusic = () => {
        bgMusicRef.current.play().catch(error => {
          console.log("Audio autoplay failed:", error);
        });
      };
      
      document.addEventListener('click', playMusic, { once: true });
      return () => document.removeEventListener('click', playMusic);
    }
  }, []);

  // Update volumes when changed
  useEffect(() => {
    if (bgMusicRef.current) bgMusicRef.current.volume = bgVolume;
    if (clickSoundRef.current) clickSoundRef.current.volume = effectsVolume;
    if (purchaseSoundRef.current) purchaseSoundRef.current.volume = effectsVolume;
  }, [bgVolume, effectsVolume]);

  // Expose sound playing functions
  const playClickSound = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play().catch(error => {
        console.log("Click sound play failed:", error);
      });
    }
  };

  const playPurchaseSound = () => {
    if (purchaseSoundRef.current) {
      purchaseSoundRef.current.currentTime = 0;
      purchaseSoundRef.current.play().catch(error => {
        console.log("Purchase sound play failed:", error);
      });
    }
  };

  // Make sound functions available to parent
  useEffect(() => {
    if (onSoundLoad) {
      onSoundLoad({
        playClickSound,
        playPurchaseSound
      });
    }
  }, [onSoundLoad]);

  return (
    <div className="hidden">
      <audio 
        ref={bgMusicRef} 
        src={backgroundMusic} 
        preload="auto"
      />
      <audio 
        ref={clickSoundRef} 
        src={clickSound} 
        preload="auto"
      />
      <audio 
        ref={purchaseSoundRef} 
        src={purchaseSound} 
        preload="auto"
      />
    </div>
  );
};

export default AudioController; 