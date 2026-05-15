export default function CreateDeckModal({
  showModal,
  setShowModal,
  deckName,
  setDeckName,
  createDeck,
  isDarkMode
}) {

  if (!showModal) return null;

  return (

    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

      <div
        className={`
          w-full
          max-w-md
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
              : "text-slate-800"
            }
  `}
        >
          Tạo bài mới
        </h2>

        <input
          type="text"
          value={deckName}
          onChange={(e) =>
            setDeckName(e.target.value)
          }
          placeholder="Nhập tên bài"
          className={`
  w-full
  rounded-2xl
  p-4
  mb-6
  outline-none
  border
  transition

  ${isDarkMode
              ? "bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
              : "bg-slate-100 border-slate-300 text-slate-800 placeholder:text-slate-500"
            }
`}
        />

        <div className="flex gap-4">

          <button
            onClick={createDeck}
            className="
              flex-1
              bg-blue-500
              text-white
              py-3
              rounded-2xl
            "
          >
            Tạo
          </button>

          <button
            onClick={() =>
              setShowModal(false)
            }
            className={`
  flex-1
  py-3
  rounded-2xl
  text-white
  transition

  ${isDarkMode
                ? "bg-slate-600 hover:bg-slate-700"
                : "bg-slate-500 hover:bg-slate-600"
              }
`}
          >
            Hủy
          </button>

        </div>

      </div>

    </div>
  );
}