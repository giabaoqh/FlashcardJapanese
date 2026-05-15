import { useState, useEffect } from "react";
import FlashCard from "../components/flashcard/FlashCard";
import { generateQuizOptions } from "../utils/quiz";
import useSpeech from "../hooks/useSpeech";

export default function StudyPage({
  selectedDeck,
  setSelectedDeck,
  decks,
  setDecks,
  isDarkMode,
  showFavorites,
  setShowFavorites
}) {

  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const [showMeaning, setShowMeaning] = useState(false);

  const [showJsonModal, setShowJsonModal] = useState(false);

  const [jsonInput, setJsonInput] = useState("");

  const [isQuizMode, setIsQuizMode] = useState(false);

  const [quizScore, setQuizScore] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const [isFinished, setIsFinished] = useState(false);

  const { speakJapanese } = useSpeech();

  const currentWord =
    selectedDeck.words[currentWordIndex];

  const quizOptions =
    currentWord
      ? generateQuizOptions(
        currentWord,
        selectedDeck.words
      )
      : [];

  const progressPercentage =
    ((currentWordIndex + 1)
      / selectedDeck.words.length) * 100;

  const saveWords = () => {

    try {

      const parsedWords = JSON.parse(jsonInput);

      // kiểm tra có phải array không
      if (!Array.isArray(parsedWords)) {

        alert("JSON phải là một mảng []");

        return;
      }

      // kiểm tra từng object
      const isValid = parsedWords.every((item) => {

        return (
          item.word &&
          item.reading &&
          item.meaning
        );

      });

      if (!isValid) {

        alert(
          "Mỗi từ phải có: word, reading, meaning"
        );

        return;
      }

      const updatedDeck = {
        ...selectedDeck,
        words: parsedWords
      };

      const updatedDecks = decks.map((deck) => {

        if (deck.id === selectedDeck.id) {
          return updatedDeck;
        }

        return deck;

      });

      setDecks(updatedDecks);

      setSelectedDeck(updatedDeck);

      localStorage.setItem(
        "japanese-flashcard-decks",
        JSON.stringify(updatedDecks)
      );

      setJsonInput("");

      setShowJsonModal(false);

      alert("Import từ vựng thành công!");

    } catch (error) {

      console.error(error);

      alert("JSON không hợp lệ");

    }

  };
  // =========================
  // KEYBOARD SHORTCUTS
  // =========================

  useEffect(() => {

    const handleKeyDown = (event) => {

      // SPACE = FLIP
      if (event.code === "Space") {

        event.preventDefault();

        if (!isQuizMode) {

          setShowMeaning(
            (prev) => !prev
          );

        }

      }

      // RIGHT = NEXT
      if (event.code === "ArrowRight") {

        if (!isQuizMode) {

          nextCard();

        }

      }

      // LEFT = PREV
      if (event.code === "ArrowLeft") {

        if (!isQuizMode) {

          prevCard();

        }

      }

      // S = SPEAK
      if (event.key.toLowerCase() === "s") {

        if (!isQuizMode) {

          speakJapanese(
            currentWord.word
          );

        }

      }

      // Q = QUIZ MODE
      if (event.key.toLowerCase() === "q") {

        setIsQuizMode(true);

        resetStudy();

      }

      // F = FLASHCARD MODE
      if (event.key.toLowerCase() === "f") {

        setIsQuizMode(false);

        resetStudy();

      }

    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

    };

  }, [
    currentWordIndex,
    isQuizMode,
    currentWord
  ]);

  // =========================
  // NEXT CARD
  // =========================

  const nextCard = () => {

    if (
      currentWordIndex <
      selectedDeck.words.length - 1
    ) {

      setCurrentWordIndex(
        currentWordIndex + 1
      );

      setShowMeaning(false);

    } else {

      setIsFinished(true);

    }

  };

  // =========================
  // PREV CARD
  // =========================

  const prevCard = () => {

    if (currentWordIndex > 0) {

      setCurrentWordIndex(
        currentWordIndex - 1
      );

      setShowMeaning(false);

    }

  };

  // =========================
  // QUIZ ANSWER
  // =========================

  const handleAnswer = (option) => {

    setSelectedAnswer(option);

    if (
      option === currentWord.meaning
    ) {

      setQuizScore(
        quizScore + 1
      );

    }

    setTimeout(() => {

      setSelectedAnswer(null);

      nextCard();

    }, 700);

  };

  // =========================
  // RESET
  // =========================

  const resetStudy = () => {

    setCurrentWordIndex(0);

    setShowMeaning(false);

    setQuizScore(0);

    setSelectedAnswer(null);

    setIsFinished(false);

  };

  // =========================
  // FINISHED SCREEN
  // =========================

  if (isFinished) {

    return (

      <div
        className={`
          min-h-screen
          flex
          items-center
          justify-center
          p-8

          ${isDarkMode
            ? "bg-slate-900"
            : "bg-slate-100"
          }
        `}
      >

        <div
          className={`
            w-full
            max-w-2xl
            rounded-3xl
            p-10
            text-center

            ${isDarkMode
              ? "bg-slate-800"
              : "bg-white"
            }
          `}
        >

          <div className="text-7xl mb-6">
            🎉
          </div>

          <h1
            className={`
              text-5xl
              font-bold
              mb-4

              ${isDarkMode
                ? "text-white"
                : "text-slate-800"
              }
            `}
          >
            Hoàn thành!
          </h1>

          <p
            className={`
              text-xl
              mb-10

              ${isDarkMode
                ? "text-slate-400"
                : "text-slate-500"
              }
            `}
          >
            Bạn đã học xong deck này
          </p>

          {/* SCORE */}
          {isQuizMode && (

            <div
              className="
                bg-blue-500
                text-white
                text-3xl
                font-bold
                py-6
                rounded-3xl
                mb-8
              "
            >
              {quizScore}
              /
              {selectedDeck.words.length}
            </div>

          )}

          <div className="flex gap-4 justify-center">

            <button
              onClick={resetStudy}
              className="
                bg-blue-500
                hover:bg-blue-600
                text-white
                px-8
                py-4
                rounded-2xl
                text-lg
                font-semibold
              "
            >
              Học lại
            </button>

            <button
              onClick={() =>
                setSelectedDeck(null)
              }
              className="
                bg-slate-500
                hover:bg-slate-600
                text-white
                px-8
                py-4
                rounded-2xl
                text-lg
                font-semibold
              "
            >
              Về trang chủ
            </button>

          </div>

        </div>

      </div>

    );

  }

  return (

    <div
      className={`
      min-h-screen
      p-8

      ${isDarkMode
          ? "bg-slate-900"
          : "bg-slate-100"
        }
    `}
    >

      <div className="max-w-5xl mx-auto">

        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-8">

          <button
            onClick={() =>
              setSelectedDeck(null)
            }
            className="
            bg-blue-500
            hover:bg-blue-600
            text-white
            px-6
            py-3
            rounded-2xl
            font-semibold
          "
          >
            ← Quay lại
          </button>

          {selectedDeck.words.length > 0 && (

            <div className="flex gap-4">

              <button
                onClick={() => {

                  setIsQuizMode(false);

                  resetStudy();

                }}
                className={`
                px-6
                py-3
                rounded-2xl
                font-semibold

                ${!isQuizMode
                    ? "bg-blue-500 text-white"
                    : isDarkMode
                      ? "bg-slate-700 text-white"
                      : "bg-white"
                  }
              `}
              >
                📚 Flashcard
              </button>

              <button
                onClick={() => {

                  setIsQuizMode(true);

                  resetStudy();

                }}
                className={`
                px-6
                py-3
                rounded-2xl
                font-semibold

                ${isQuizMode
                    ? "bg-orange-500 text-white"
                    : isDarkMode
                      ? "bg-slate-700 text-white"
                      : "bg-white"
                  }
              `}
              >
                📝 Quiz
              </button>
              <button
                onClick={() =>
                  setShowFavorites(true)
                }
                className={`
    px-6
    py-3
    rounded-2xl
    font-semibold

    ${isDarkMode
                    ? "bg-yellow-500 text-black"
                    : "bg-yellow-400 text-black"}
  `}
              >
                ⭐ Favorites
              </button>

            </div>

          )}

        </div>

        {/* TITLE */}
        <div className="mb-8">

          <h1
            className={`
            text-5xl
            font-bold
            mb-3

            ${isDarkMode
                ? "text-white"
                : "text-slate-800"
              }
          `}
          >
            {selectedDeck.title}
          </h1>

          <div className="flex gap-3">

            <button
              onClick={() =>
                setShowJsonModal(true)
              }
              className="
              px-5
              py-3
              rounded-2xl
              font-semibold
              bg-blue-500
              hover:bg-blue-600
              text-white
            "
            >
              📥 Nhập JSON
            </button>

          </div>

          <p
            className={`
            text-lg mt-3

            ${isDarkMode
                ? "text-slate-400"
                : "text-slate-500"
              }
          `}
          >
            {selectedDeck.words.length} từ vựng
          </p>

        </div>

        {/* EMPTY */}
        {selectedDeck.words.length === 0 ? (

          <div
            className={`
            rounded-3xl
            p-16
            text-center

            ${isDarkMode
                ? "bg-slate-800"
                : "bg-white"
              }
          `}
          >

            <div className="text-7xl mb-6">
              📚
            </div>

            <h2
              className={`
              text-4xl
              font-bold
              mb-4

              ${isDarkMode
                  ? "text-white"
                  : "text-slate-800"
                }
            `}
            >
              Deck chưa có từ vựng
            </h2>

            <p
              className={`
              text-lg

              ${isDarkMode
                  ? "text-slate-400"
                  : "text-slate-500"
                }
            `}
            >
              Hãy import JSON để bắt đầu học
            </p>

          </div>

        ) : isQuizMode ? (

          <>
            {/* QUIZ */}
            <div
              className={`
              rounded-3xl
              p-10

              ${isDarkMode
                  ? "bg-slate-800"
                  : "bg-white"
                }
            `}
            >

              <h2
                className={`
                text-6xl
                font-bold
                text-center
                mb-10

                ${isDarkMode
                    ? "text-white"
                    : "text-slate-800"
                  }
              `}
              >
                {currentWord.word}
              </h2>

              <div className="space-y-4">

                {quizOptions.map((option, index) => (

                  <button
                    key={index}
                    onClick={() =>
                      handleAnswer(option)
                    }
                    disabled={selectedAnswer !== null}
                    className={`
                    w-full
                    p-5
                    rounded-2xl
                    text-left
                    text-xl
                    border-2
                    transition

                    ${selectedAnswer === option
                        ? option === currentWord.meaning
                          ? "bg-green-500 border-green-500 text-white"
                          : "bg-red-500 border-red-500 text-white"
                        : isDarkMode
                          ? "bg-slate-700 border-slate-600 text-white"
                          : "bg-white border-slate-300"
                      }
                  `}
                  >
                    {option}
                  </button>

                ))}

              </div>

            </div>

          </>

        ) : (

          <>
            {/* FLASHCARD */}
            <FlashCard
              currentWord={currentWord}
              showMeaning={showMeaning}
              setShowMeaning={setShowMeaning}
              speakJapanese={speakJapanese}
              isDarkMode={isDarkMode}
              selectedDeck={selectedDeck}
              decks={decks}
              setDecks={setDecks}
              setSelectedDeck={setSelectedDeck}
            />

            {/* CONTROLS */}
            <div className="flex justify-center gap-4 mt-10">

              <button
                onClick={prevCard}
                className="
                bg-slate-500
                hover:bg-slate-600
                text-white
                px-6
                py-3
                rounded-2xl
                font-semibold
              "
              >
                ← Trước
              </button>

              <button
                onClick={() =>
                  speakJapanese(
                    currentWord.word
                  )
                }
                className="
                bg-green-500
                hover:bg-green-600
                text-white
                px-6
                py-3
                rounded-2xl
                font-semibold
              "
              >
                🔊
              </button>

              <button
                onClick={nextCard}
                className="
                bg-blue-500
                hover:bg-blue-600
                text-white
                px-6
                py-3
                rounded-2xl
                font-semibold
              "
              >
                Tiếp →
              </button>

            </div>

            {/* PROGRESS */}
            <div className="mt-10">

              <div className="flex justify-between mb-2">

                <span
                  className={
                    isDarkMode
                      ? "text-slate-300"
                      : "text-slate-600"
                  }
                >
                  Tiến độ
                </span>

                <span
                  className={
                    isDarkMode
                      ? "text-slate-300"
                      : "text-slate-600"
                  }
                >
                  {currentWordIndex + 1}
                  /
                  {selectedDeck.words.length}
                </span>

              </div>

              <div
                className={`
                h-4
                rounded-full
                overflow-hidden

                ${isDarkMode
                    ? "bg-slate-700"
                    : "bg-slate-300"
                  }
              `}
              >

                <div
                  className="
                  h-full
                  bg-blue-500
                  transition-all
                "
                  style={{
                    width: `${progressPercentage}%`
                  }}
                />

              </div>

            </div>

          </>

        )}

        {/* JSON MODAL */}
        {showJsonModal && (

          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div
              className={`
              w-full
              max-w-3xl
              rounded-3xl
              p-6

              ${isDarkMode
                  ? "bg-slate-800 text-white"
                  : "bg-white text-slate-800"
                }
            `}
            >

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-3xl font-bold">
                  Nhập JSON từ vựng
                </h2>

                <button
                  onClick={() =>
                    setShowJsonModal(false)
                  }
                  className="text-2xl"
                >
                  ✕
                </button>

              </div>

              <textarea
                value={jsonInput}
                onChange={(e) =>
                  setJsonInput(e.target.value)
                }
                placeholder="Dán JSON vào đây..."
                className={`
                w-full
                h-80
                rounded-2xl
                border
                p-4
                text-lg
                outline-none

                ${isDarkMode
                    ? "bg-slate-900 border-slate-700 text-white"
                    : "bg-white border-slate-300"
                  }
              `}
              />

              <div className="flex justify-end gap-4 mt-6">

                <button
                  onClick={() =>
                    setShowJsonModal(false)
                  }
                  className="
                  px-5
                  py-3
                  rounded-2xl
                  bg-slate-400
                  text-white
                "
                >
                  Hủy
                </button>

                <button
                  onClick={saveWords}
                  className="
                  px-5
                  py-3
                  rounded-2xl
                  bg-blue-500
                  text-white
                "
                >
                  Lưu từ vựng
                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>

  );
}