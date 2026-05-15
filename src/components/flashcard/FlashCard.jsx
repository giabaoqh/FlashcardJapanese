export default function FlashCard({
  currentWord,
  showMeaning,
  setShowMeaning,
  speakJapanese,
  isDarkMode
}) {

  return (

    <div
      className="
        perspective-[1200px]
        w-full
        max-w-3xl
        h-[420px]
        mx-auto
        cursor-pointer
      "
      onClick={() =>
        setShowMeaning(!showMeaning)
      }
    >

      <div
        className={`
          relative
          w-full
          h-full
          duration-700
          transform-style-preserve-3d

          ${showMeaning
            ? "rotate-y-180"
            : ""}
        `}
      >

        {/* FRONT */}
        <div
          className={`
            absolute
            inset-0
            backface-hidden
            rounded-3xl
            shadow-2xl
            flex
            flex-col
            items-center
            justify-center
            p-10

            ${isDarkMode
              ? "bg-slate-800"
              : "bg-white"}
          `}
        >

          {/* FAVORITE */}
          <div
            className="
              absolute
              top-5
              right-5
              text-3xl
            "
          >
            ⭐
          </div>

          {/* GUIDE */}
          <div
            className={`
              absolute
              top-6
              left-1/2
              -translate-x-1/2
              text-sm
              tracking-widest
              uppercase

              ${isDarkMode
                ? "text-slate-500"
                : "text-slate-400"}
            `}
          >
            CLICK TO FLIP
          </div>

          {/* KANJI */}
          <h1
            className={`
              text-8xl
              font-bold
              mb-8

              ${isDarkMode
                ? "text-white"
                : "text-slate-800"}
            `}
          >
            {currentWord.word}
          </h1>

          {/* SPEAKER */}
          <button
            onClick={(e) => {

              e.stopPropagation();

              speakJapanese(
                currentWord.word
              );

            }}
            className="
              text-5xl
              hover:scale-110
              transition
            "
          >
            🔊
          </button>

        </div>

        {/* BACK */}
        <div
          className={`
            absolute
            inset-0
            rotate-y-180
            backface-hidden
            rounded-3xl
            shadow-2xl
            flex
            flex-col
            items-center
            justify-center
            p-10

            ${isDarkMode
              ? "bg-blue-900"
              : "bg-blue-100"}
          `}
        >

          {/* GUIDE */}
          <div
            className={`
              absolute
              top-6
              left-1/2
              -translate-x-1/2
              text-sm
              tracking-widest
              uppercase

              ${isDarkMode
                ? "text-blue-200"
                : "text-blue-500"}
            `}
          >
            CLICK TO FLIP
          </div>

          {/* KANJI */}
          <h1
            className={`
              text-6xl
              font-bold
              mb-4

              ${isDarkMode
                ? "text-white"
                : "text-slate-800"}
            `}
          >
            {currentWord.word}
          </h1>

          {/* READING */}
          <p
            className={`
              text-3xl
              mb-3

              ${isDarkMode
                ? "text-slate-200"
                : "text-slate-700"}
            `}
          >
            {currentWord.reading}
          </p>

          {/* HANVIET */}
          {currentWord.hanviet && (

            <p
              className={`
                text-2xl
                mb-3

                ${isDarkMode
                  ? "text-yellow-300"
                  : "text-yellow-700"}
              `}
            >
              {currentWord.hanviet}
            </p>

          )}

          {/* MEANING */}
          <p
            className={`
              text-4xl
              font-bold

              ${isDarkMode
                ? "text-blue-200"
                : "text-blue-700"}
            `}
          >
            {currentWord.meaning}
          </p>

        </div>

      </div>

    </div>

  );

}