import { useState } from "react";

export default function AddWordModal({
  showModal,
  setShowModal,
  selectedDeck,
  decks,
  setDecks,
  isDarkMode
}) {

  const [japanese, setJapanese] =
    useState("");

  const [reading, setReading] =
    useState("");

  const [meaning, setMeaning] =
    useState("");

  if (!showModal) {
    return null;
  }

  const addWord = () => {

    if (
      !japanese ||
      !reading ||
      !meaning
    ) {
      return;
    }

    const updatedDecks = decks.map(
      (deck) => {

        if (
          deck.id === selectedDeck.id
        ) {

          return {
            ...deck,
            words: [
              ...deck.words,
              {
                id: Date.now(),
                japanese,
                reading,
                meaning,
                favorite: false
              }
            ]
          };
        }

        return deck;
      }
    );

    setDecks(updatedDecks);

    setJapanese("");
    setReading("");
    setMeaning("");

    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div
        className={`
          w-full
          max-w-lg
          rounded-3xl
          p-8

          ${isDarkMode
            ? "bg-slate-800"
            : "bg-white"}
        `}
      >

        <h2
          className={`
            text-3xl
            font-bold
            mb-6

            ${isDarkMode
              ? "text-white"
              : "text-slate-800"}
          `}
        >
          Thêm từ vựng
        </h2>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Tiếng Nhật"
            value={japanese}
            onChange={(e) =>
              setJapanese(e.target.value)
            }
            className="w-full p-4 rounded-2xl border"
          />

          <input
            type="text"
            placeholder="Cách đọc"
            value={reading}
            onChange={(e) =>
              setReading(e.target.value)
            }
            className="w-full p-4 rounded-2xl border"
          />

          <input
            type="text"
            placeholder="Nghĩa"
            value={meaning}
            onChange={(e) =>
              setMeaning(e.target.value)
            }
            className="w-full p-4 rounded-2xl border"
          />

        </div>

        <div className="flex gap-4 mt-6">

          <button
            onClick={addWord}
            className="
              flex-1
              bg-blue-500
              text-white
              py-4
              rounded-2xl
            "
          >
            Thêm
          </button>

          <button
            onClick={() =>
              setShowModal(false)
            }
            className="
              flex-1
              bg-slate-500
              text-white
              py-4
              rounded-2xl
            "
          >
            Hủy
          </button>

        </div>

      </div>

    </div>
  );
}