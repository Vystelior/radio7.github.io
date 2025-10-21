import { useState, useEffect, useRef } from 'react';

export default function RadioStation() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [nextTrack, setNextTrack] = useState(null);
  const audioRef = useRef(null);

  // Your radio playlist - we'll populate this with real files later
  const playlist = [
    {
      type: 'song',
      title: 'First Song',
      artist: 'Unknown Artist',
      src: '/music/song1.mp3',
      duration: 180
    },
    {
      type: 'voice',
      title: 'AI Host',
      text: 'Welcome to Vystelior Radio!',
      src: '/voiceovers/welcome.mp3',
      duration: 8
    },
    {
      type: 'song', 
      title: 'Second Song',
      artist: 'Another Artist',
      src: '/music/song2.mp3',
      duration: 240
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;

    let currentIndex = 0;

    const playNext = () => {
      const track = playlist[currentIndex];
      const next = playlist[(currentIndex + 1) % playlist.length];
      
      setCurrentTrack(track);
      setNextTrack(next);

      if (audioRef.current) {
        audioRef.current.src = track.src;
        audioRef.current.play().catch(console.error);

        setTimeout(() => {
          currentIndex = (currentIndex + 1) % playlist.length;
          playNext();
        }, track.duration * 1000);
      }
    };

    playNext();
  }, [isPlaying]);

  return (
    <div style={{ 
      padding: '2rem', 
      fontFamily: 'system-ui, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      textAlign: 'center'
    }}>
      <h1>🎵 Vystelior Radio</h1>
      <p>Your AI-powered personal radio station</p>
      
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        style={{
          padding: '12px 24px',
          fontSize: '18px',
          backgroundColor: isPlaying ? '#ef4444' : '#10b981',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          margin: '20px 0'
        }}
      >
        {isPlaying ? '⏸️ Stop Radio' : '▶️ Start Radio'}
      </button>

      {currentTrack && (
        <div style={{
          background: '#f8fafc',
          padding: '20px',
          borderRadius: '12px',
          margin: '20px 0'
        }}>
          <h3>Now Playing:</h3>
          <p>
            {currentTrack.type === 'song' ? '🎵' : '🗣️'} 
            <strong> {currentTrack.title}</strong>
            {currentTrack.artist && ` by ${currentTrack.artist}`}
          </p>
          
          <audio 
            ref={audioRef}
            controls
            autoPlay
            style={{ width: '100%', marginTop: '10px' }}
          />
        </div>
      )}

      {nextTrack && (
        <div style={{ color: '#64748b', marginTop: '10px' }}>
          <small>Next: {nextTrack.title}</small>
        </div>
      )}
    </div>
  );
}
