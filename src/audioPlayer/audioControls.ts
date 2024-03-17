import { audioPlayerStateIF } from "../Layout"

type audioPlayerStateSSA = React.Dispatch<React.SetStateAction<audioPlayerStateIF>>

export const startPlay = (audioPlayer: HTMLAudioElement, setAudioPlayerState: audioPlayerStateSSA, audioPlayerState: audioPlayerStateIF): void => {
  audioPlayer.src = (audioPlayerState.playList as any)[audioPlayerState.currentTrack].file
  audioPlayer.currentTime = audioPlayerState.progress
  audioPlayer.volume = 1
  audioPlayer.play()

  setAudioPlayerState((pS) => ({
    ...pS,
    hasPlayedOnce: true,
    playerStatus: 'play'
  }))
}

export const pausePlay = async (audioPlayer: HTMLAudioElement, setAudioPlayerState: audioPlayerStateSSA) => {

  const currentProgress = audioPlayer.currentTime

  audioPlayer.pause()

  setAudioPlayerState((pS) => ({
    ...pS,
    playerStatus: 'stop',
    progress: currentProgress
  }))
  
}

export const pausePlayWithFadeOut = async(audioPlayer: HTMLAudioElement, setAudioPlayerState: audioPlayerStateSSA) => {
  
  const currentProgress = audioPlayer.currentTime
  
  await adjustVolume(audioPlayer, 0)
  audioPlayer.pause()
  
  setAudioPlayerState((pS) => ({
    ...pS,
    playerStatus: 'stop',
    progress: currentProgress
  }))
}

export const next = (audioPlayer: HTMLAudioElement, setAudioPlayerState: audioPlayerStateSSA, audioPlayerState: audioPlayerStateIF) => {

  if (audioPlayerState.playerStatus === 'play') {
    audioPlayer.pause()
  }

  let newTrack = audioPlayerState.currentTrack + 1
  if (newTrack >= (audioPlayerState.playList as any).length) {
    newTrack = 0
  }

  setAudioPlayerState((pS) => ({
    ...pS,
    progress: 0,
    playerStatus: 'next',
    currentTrack: newTrack
  }))

}

export const prev = (audioPlayer: HTMLAudioElement, setAudioPlayerState: audioPlayerStateSSA, audioPlayerState: audioPlayerStateIF) => {
  if (audioPlayerState.playerStatus === 'play') {
    audioPlayer.pause()
  }

  let newTrack = audioPlayerState.currentTrack - 1
  if (newTrack < 0) {
    newTrack = (audioPlayerState.playList as any).length - 1
  }

  setAudioPlayerState((pS) => ({
    ...pS,
    progress: 0,
    playerStatus: 'prev',
    currentTrack: newTrack
  }))

}


export async function adjustVolume(
  element: HTMLAudioElement,
  newVolume: number,
  {
    duration = 1000,
    easing = swing,
    interval = 13,
  } = {},
) {
  const originalVolume = element.volume;
  const delta = newVolume - originalVolume;

  if (!delta || !duration || !easing || !interval) {
    element.volume = newVolume;
    return Promise.resolve();
  }

  const ticks = Math.floor(duration / interval);
  let tick = 1;

  return new Promise<void>(resolve => {
    const timer = setInterval(() => {
      element.volume = originalVolume + (
        easing(tick / ticks) * delta
      );

      if (++tick === ticks + 1) {
        clearInterval(timer);
        resolve();
      }
    }, interval);
  });
}

export function swing(p: number) {
  return 0.5 - Math.cos(p * Math.PI) / 2;
}