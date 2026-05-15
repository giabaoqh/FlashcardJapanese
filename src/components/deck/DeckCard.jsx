export default function DeckCard({
  deck,
  setSelectedDeck,
  isDarkMode,
  deleteDeck
}) {

  return (
    <div
      onClick={() => setSelectedDeck(deck)}
      className={`
        p-6
        rounded-3xl
        cursor-pointer
        transition-all
        duration-300
        hover:scale-105
        shadow-lg

        ${isDarkMode
          ? "bg-slate-800 hover:bg-slate-700"
          : "bg-white hover:bg-slate-50"}
      `}
    >

      <h2
        className={`
          text-2xl
          font-bold
          mb-4

          ${isDarkMode
            ? "text-white"
            : "text-slate-800"}
        `}
      >
        {deck.title}
      </h2>

      <p
        className={`
          text-lg

          ${isDarkMode
            ? "text-slate-300"
            : "text-slate-600"}
        `}
      >
        {deck.words.length} từ vựng
      </p>
      <button
        onClick={(e) => {

          e.stopPropagation();

          const confirmDelete =
            window.confirm(
              `Xóa deck "${deck.title}" ?`
            );

          if (confirmDelete) {

            deleteDeck(deck.id);

          }

        }}
        className="
    absolute
    top-4
    right-4
    bg-red-500
    hover:bg-red-600
    text-white
    w-10
    h-10
    rounded-full
    flex
    items-center
    justify-center
    transition
  "
      >
        🗑
      </button>
    </div>
  );
}