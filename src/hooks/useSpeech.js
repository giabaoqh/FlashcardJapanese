export default function useSpeech() {

  const speakJapanese = (text) => {

    const utterance =
      new SpeechSynthesisUtterance(text);

    utterance.lang = "ja-JP";

    speechSynthesis.speak(utterance);
  };

  return {
    speakJapanese
  };
}