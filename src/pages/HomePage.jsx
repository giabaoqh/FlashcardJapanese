import { useState } from "react";
import DeckGrid from "../components/deck/DeckGrid";
import CreateDeckModal from "../components/modal/CreateDeckModal";

export default function HomePage({
  decks,
  setDecks,
  setSelectedDeck,
  isDarkMode,
  setIsDarkMode,
  showFavorites,
  setShowFavorites
}) {

  const [showModal, setShowModal] = useState(false);

  const [deckName, setDeckName] = useState("");

  const createDeck = () => {

  if (!deckName.trim()) {
    return;
  }

  const newDeck = {

    id: Date.now(),

    title: deckName,

    words: [],

    favorites: []

  };

  const updatedDecks = [
    ...decks,
    newDeck
  ];

  // UPDATE STATE
  setDecks(updatedDecks);

  // SAVE LOCAL STORAGE NGAY
  localStorage.setItem(
    "japanese-flashcard-decks",
    JSON.stringify(updatedDecks)
  );

  setDeckName("");

  setShowModal(false);

};
  return (
    <div
      className={`
        min-h-screen
        transition
        duration-300
        px-6
        py-8

        ${isDarkMode
          ? "bg-slate-900"
          : "bg-slate-100"
        }
      `}
    >

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

          <div>
            <h1
              className={`
                text-5xl
                font-bold

                ${isDarkMode
                  ? "text-white"
                  : "text-slate-800"
                }
              `}
            >
              🇯🇵 Flashcard Japanese
            </h1>

            <p
              className={`
                mt-2
                text-lg

                ${isDarkMode
                  ? "text-slate-400"
                  : "text-slate-500"
                }
              `}
            >
              Học từ vựng tiếng Nhật bằng Flashcard
            </p>
          </div>

          <div className="flex gap-4">

            
            {/* DARK MODE */}
            <button
              onClick={() =>
                setIsDarkMode(!isDarkMode)
              }
              className={`
                px-5
                py-3
                rounded-2xl
                font-semibold
                transition

                ${isDarkMode
                  ? "bg-yellow-400 text-black hover:bg-yellow-300"
                  : "bg-slate-800 text-white hover:bg-slate-700"
                }
              `}
            >
              {isDarkMode ? "☀ Light" : "🌙 Dark"}
            </button>

            {/* CREATE */}
            <button
              onClick={() =>
                setShowModal(true)
              }
              className="
                bg-blue-500
                hover:bg-blue-600
                text-white
                px-6
                py-3
                rounded-2xl
                font-semibold
                transition
              "
            >
              + Tạo Deck
            </button>

          </div>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">

          <div
            className={`
              rounded-3xl
              p-6
              shadow-sm

              ${isDarkMode
                ? "bg-slate-800"
                : "bg-white"
              }
            `}
          >
            <div
              className={`
                text-sm

                ${isDarkMode
                  ? "text-slate-400"
                  : "text-slate-500"
                }
              `}
            >
              Tổng Deck
            </div>

            <div
              className={`
                text-4xl
                font-bold
                mt-2

                ${isDarkMode
                  ? "text-white"
                  : "text-slate-800"
                }
              `}
            >
              {decks.length}
            </div>
          </div>

          <div
            className={`
              rounded-3xl
              p-6
              shadow-sm

              ${isDarkMode
                ? "bg-slate-800"
                : "bg-white"
              }
            `}
          >
            <div
              className={`
                text-sm

                ${isDarkMode
                  ? "text-slate-400"
                  : "text-slate-500"
                }
              `}
            >
              Tổng từ vựng
            </div>

            <div
              className={`
                text-4xl
                font-bold
                mt-2

                ${isDarkMode
                  ? "text-white"
                  : "text-slate-800"
                }
              `}
            >
              {
                decks.reduce(
                  (sum, deck) =>
                    sum + deck.words.length,
                  0
                )
              }
            </div>
          </div>

          <div
            className={`
              rounded-3xl
              p-6
              shadow-sm

              ${isDarkMode
                ? "bg-slate-800"
                : "bg-white"
              }
            `}
          >
            <div
              className={`
                text-sm

                ${isDarkMode
                  ? "text-slate-400"
                  : "text-slate-500"
                }
              `}
            >
              Trạng thái
            </div>

            <div
              className={`
                text-2xl
                font-bold
                mt-3

                ${isDarkMode
                  ? "text-green-400"
                  : "text-green-600"
                }
              `}
            >
              Sẵn sàng học 🚀
            </div>
          </div>

        </div>

        {/* EMPTY */}
        {decks.length === 0 ? (

          <div
            className={`
              rounded-3xl
              p-20
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
                text-3xl
                font-bold
                mb-3

                ${isDarkMode
                  ? "text-white"
                  : "text-slate-800"
                }
              `}
            >
              Chưa có deck nào
            </h2>

            <p
              className={`
                mb-8

                ${isDarkMode
                  ? "text-slate-400"
                  : "text-slate-500"
                }
              `}
            >
              Hãy tạo deck đầu tiên để bắt đầu học tiếng Nhật
            </p>

            <button
              onClick={() =>
                setShowModal(true)
              }
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
              + Tạo Deck
            </button>

          </div>

        ) : (

          <DeckGrid
            decks={decks}
            setSelectedDeck={setSelectedDeck}
            isDarkMode={isDarkMode}
          />

        )}

      </div>

      <CreateDeckModal
        showModal={showModal}
        setShowModal={setShowModal}
        deckName={deckName}
        setDeckName={setDeckName}
        createDeck={createDeck}
        isDarkMode={isDarkMode}
      />

    </div>
  );
}