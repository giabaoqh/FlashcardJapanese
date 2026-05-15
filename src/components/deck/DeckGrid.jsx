export default function DeckGrid({
  decks,
  setSelectedDeck,
  isDarkMode
}) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

      {decks.map((deck) => (

        <div
          key={deck.id}
          onClick={() =>
            setSelectedDeck(deck)
          }
          className={`
            rounded-3xl
            p-6
            cursor-pointerexport default function DeckGrid({
            transition
            duration-300
            hover:scale-[1.02]
            hover:shadow-2xl

            ${isDarkMode
              ? "bg-slate-800 border border-slate-700 hover:border-blue-400"
              : "bg-white border border-slate-200 hover:border-blue-400"
            }
          `}
        >

          <div className="flex justify-between items-start">

            <div>

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
                {deck.title}
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
                {deck.words.length} từ vựng
              </p>

            </div>

            <div className="text-4xl">
              📘
            </div>

          </div>

          <div className="mt-6">

            <div
              className={`
                w-full
                h-3
                rounded-full

                ${isDarkMode
                  ? "bg-slate-700"
                  : "bg-slate-200"
                }
              `}
            >

              <div
                className="
                  h-3
                  bg-blue-500
                  rounded-full
                "
                style={{
                  width: `${deck.stats?.accuracy || 0}%`
                }}
              />

            </div>

            <div
              className={`
                mt-2
                text-sm

                ${isDarkMode
                  ? "text-slate-400"
                  : "text-slate-500"
                }
              `}
            >
              Accuracy: {deck.stats?.accuracy || 0}%
            </div>

          </div>

        </div>

      ))}

    </div>
  );
}