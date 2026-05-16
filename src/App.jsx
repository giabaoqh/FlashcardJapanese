import { useEffect, useState } from "react";

import HomePage from "./pages/HomePage";
import StudyPage from "./pages/StudyPage";
import FavoritesPage from "./pages/FavoritesPage";

export default function App() {

  // =========================
  // STATES
  // =========================

  const [decks, setDecks] = useState([]);

  useEffect(() => {

    const savedDeckId =
      localStorage.getItem(
        "selected-deck-id"
      );

    if (!savedDeckId) return;

    const foundDeck = decks.find(
      (deck) =>
        deck.id.toString() === savedDeckId
    );

    if (foundDeck) {

      setSelectedDeck(foundDeck);

    }

  }, [decks]);

  const [selectedDeck, setSelectedDeck] =
    useState(null);

  // =========================
  // SAVE CURRENT DECK
  // =========================

  useEffect(() => {

    if (!selectedDeck) return;

    localStorage.setItem(
      "selected-deck-id",
      selectedDeck.id
    );

  }, [selectedDeck]);

  const [showFavorites, setShowFavorites] =
    useState(false);

  const [isDarkMode, setIsDarkMode] =
    useState(true);

  const [isLoaded, setIsLoaded] =
    useState(false);

  // =========================
  // LOAD LOCAL STORAGE
  // =========================

  useEffect(() => {

    const savedDecks =
      localStorage.getItem(
        "japanese-flashcard-decks"
      );

    if (savedDecks) {

      try {

        const parsedDecks =
          JSON.parse(savedDecks);

        setDecks(parsedDecks);

      } catch (error) {

        console.error(error);

        setDecks([]);

      }

    }

    setIsLoaded(true);

  }, []);
  // =========================
  // SAVE LOCAL STORAGE
  // =========================

  useEffect(() => {

    if (!isLoaded) return;

    localStorage.setItem(
      "japanese-flashcard-decks",
      JSON.stringify(decks)
    );

  }, [decks, isLoaded]);

  // =========================
  // FAVORITE WORDS
  // =========================

  const favoriteWords = selectedDeck
    ? selectedDeck.words.filter((word) =>
      selectedDeck.favorites?.includes(
        word.word
      )
    )
    : [];

  // =========================
  // FAVORITES PAGE
  // =========================

  if (selectedDeck && showFavorites) {

    return (

      <FavoritesPage
        selectedDeck={selectedDeck}
        setSelectedDeck={setSelectedDeck}
        favoriteWords={favoriteWords}
        isDarkMode={isDarkMode}
        setShowFavorites={setShowFavorites}
      />

    );

  }

  // =========================
  // STUDY PAGE
  // =========================

  if (selectedDeck) {

    return (

      <StudyPage
        selectedDeck={selectedDeck}
        setSelectedDeck={setSelectedDeck}
        decks={decks}
        setDecks={setDecks}
        isDarkMode={isDarkMode}
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
      />

    );

  }

  // =========================
  // HOME PAGE
  // =========================

  return (

    <div
      className={`

        min-h-screen

        ${isDarkMode
          ? "bg-slate-900"
          : "bg-slate-100"}

      `}
    >

      <HomePage
        decks={decks}
        setDecks={setDecks}
        setSelectedDeck={setSelectedDeck}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

    </div>

  );

}