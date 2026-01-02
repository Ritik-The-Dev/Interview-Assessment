export default function ContactCard({ _id, name, email, phone, message ,handleDelete}) {
  return (
    <div className="bg-white rounded-lg border p-4 shadow-sm transition hover:shadow-md group">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium text-gray-800 capitalize">{name}</p>
          <p className="text-xs text-gray-500">{email}</p>
        </div>

        <button
          onClick={() => handleDelete(_id)}
          className="
                  text-red-500 text-sm
                  opacity-0 cursor-pointer group-hover:opacity-100
                  transition-opacity
                  hover:text-red-600
                "
          title="Delete contact"
        >
          🗑
        </button>
      </div>

      <p className="text-sm text-gray-600 mt-2">📞 {phone}</p>

      {message && (
        <p className="text-sm text-gray-700 mt-2 line-clamp-2">{message}</p>
      )}
    </div>
  );
}
