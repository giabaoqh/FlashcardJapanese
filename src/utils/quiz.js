export function generateQuizOptions(
  currentWord,
  allWords
) {

  if (!currentWord) {
    return [];
  }

  const wrongAnswers = allWords
    .filter(
      (word) =>
        word.meaning !== currentWord.meaning
    )
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const options = [
    currentWord,
    ...wrongAnswers
  ];

  return options.sort(
    () => Math.random() - 0.5
  );
}