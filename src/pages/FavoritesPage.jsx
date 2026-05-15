export default function FavoritesPage({
    selectedDeck,
    setSelectedDeck,
    favoriteWords,
    isDarkMode,
    setShowFavorites
}) {

    return (

        <div
            className={`
        min-h-screen
        p-8

        ${isDarkMode
                    ? "bg-slate-900"
                    : "bg-slate-100"}
      `}
        >

            <div className="max-w-5xl mx-auto">

                {/* TOP */}
                <div className="flex justify-between items-center mb-10">

                    <button
                        onClick={() => {

                            setShowFavorites(false);

                        }}
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

                    <h1
                        className={`
              text-5xl
              font-bold

              ${isDarkMode
                                ? "text-white"
                                : "text-slate-800"}
            `}
                    >
                        ⭐ Favorites
                    </h1>

                </div>

                {/* EMPTY */}
                {favoriteWords.length === 0 ? (

                    <div
                        className={`
              rounded-3xl
              p-16
              text-center

              ${isDarkMode
                                ? "bg-slate-800"
                                : "bg-white"}
            `}
                    >

                        <div className="text-7xl mb-6">
                            ⭐
                        </div>

                        <h2
                            className={`
                text-3xl
                font-bold
                mb-4

                ${isDarkMode
                                    ? "text-white"
                                    : "text-slate-800"}
              `}
                        >
                            Chưa có từ yêu thích
                        </h2>

                        <p
                            className={`
                text-lg

                ${isDarkMode
                                    ? "text-slate-400"
                                    : "text-slate-500"}
              `}
                        >
                            Hãy nhấn ⭐ trên flashcard
                        </p>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {favoriteWords.map((word, index) => (

                            <div
                                key={index}
                                className={`
                  rounded-3xl
                  p-6
                  shadow-lg

                  ${isDarkMode
                                        ? "bg-slate-800"
                                        : "bg-white"}
                `}
                            >

                                <div className="flex justify-between items-start mb-4">

                                    <h2
                                        className={`
                      text-4xl
                      font-bold

                      ${isDarkMode
                                                ? "text-white"
                                                : "text-slate-800"}
                    `}
                                    >
                                        {word.word}
                                    </h2>

                                    <div className="text-3xl">
                                        ⭐
                                    </div>

                                </div>

                                <p
                                    className={`
                    text-2xl
                    mb-3

                    ${isDarkMode
                                            ? "text-slate-300"
                                            : "text-slate-600"}
                  `}
                                >
                                    {word.reading}
                                </p>

                                {word.hanviet && (

                                    <p
                                        className={`
                      text-xl
                      mb-3

                      ${isDarkMode
                                                ? "text-yellow-300"
                                                : "text-yellow-600"}
                    `}
                                    >
                                        {word.hanviet}
                                    </p>

                                )}

                                <p
                                    className={`
                    text-2xl
                    font-semibold

                    ${isDarkMode
                                            ? "text-blue-300"
                                            : "text-blue-600"}
                  `}
                                >
                                    {word.meaning}
                                </p>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>

    );

}