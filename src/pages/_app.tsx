import type { AppProps } from 'next/app'

import '@/styles/globals.scss'
import styles from '@/styles/app.module.scss'

import { Header } from '@/components/Header'
import { Player } from '@/components/Player'
import { PlayerContext } from '@/contexts/PlayerContext'
import { useState } from 'react'

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
}

export default function App({ Component, pageProps }: AppProps) {

  const [episodeList, setEpisodeList] = useState<Episode[]>([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function play(episode: Episode){
    console.log("Episode: "+ episode.title);
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function togglePlay(){
    setIsPlaying(!isPlaying);
  }

  function setPlayingState(state: boolean){
    setIsPlaying(state);
  }

  return (
    <PlayerContext.Provider value={{ episodeList: episodeList, currentEpisodeIndex: currentEpisodeIndex, play, isPlaying, togglePlay, setPlayingState }}>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContext.Provider>
  )
}
