import React, { useEffect } from 'react';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import MusicGallery from './components/music/musicGallary';
import MusicPlayerIcon from './components/music/musicplayer/musicPlayerIcon';
import './App.css'; 

const App: React.FC = () => {

  useEffect(() => {

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.classList.toggle('dark-theme', prefersDark);
    document.body.classList.toggle('light-theme', !prefersDark);
  }, []);

  return (
    <div className="App">
      <Header />
      <MusicGallery /> 
      <MusicPlayerIcon />
      <Footer />
    </div>
  );
}

export default App;
