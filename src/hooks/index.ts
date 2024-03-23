import { useFetcher } from "react-router-dom";
import { useConfig } from "./useConfig";
import { useDarkMode } from "./useDarkMode";
import { useFetchAudioData } from "./useFetchAudioData";
import { useWindowWidth } from "./useWindowWidth";
import { useLoadingScreen } from "./useLoadingScreen";
import { useTypeEscapeToClose } from "./useTypeEscapeToClose";
import { useOutsideAlerter } from "./useOutsideAlerter";
import { useComponentFadeAnimator } from "./useComponentFadeAnimator";

export {
  useConfig,
  useDarkMode,
  useFetchAudioData,
  useFetcher,
  useWindowWidth,
  useLoadingScreen,
  useTypeEscapeToClose,
  useOutsideAlerter,
  useComponentFadeAnimator
}