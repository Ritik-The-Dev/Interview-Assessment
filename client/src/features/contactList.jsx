import toast from "react-hot-toast";
import ContactCard from "../components/contactCard";
import Loader from "../components/loader";

export default function ContactList({
  contacts,
  handleDeleteContact,
  isLoading,
  loadingId
}) {
  const handleDelete = (id) => {
    const ok = window.confirm("Are you sure you want to delete this contact?");
    if (!ok) return;
    handleDeleteContact(id);
  };

  if (!contacts || !Array.isArray(contacts) || contacts?.length === 0) {
    return isLoading ? (
      <div className="border border-dashed rounded-lg p-6 text-center text-gray-500">
        <p className="text-sm">Loading Contacts...</p>
        <div className="h-50 flex items-center justify-center">
          <Loader size={40} />
        </div>
      </div>
    ) : (
      <div className="border border-dashed rounded-lg p-6 text-center text-gray-500">
        <p className="text-sm">No contacts yet.</p>
        <p className="text-xs mt-1">
          Click <span className="font-medium">Add Contact</span> to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded-xl bg-gray-50">
      <div className="px-4 py-3 border-b bg-white rounded-t-xl">
        <h3 className="text-sm font-semibold text-gray-700">
          Contacts ({contacts && Array.isArray(contacts) ? contacts?.length : 0}
          )
        </h3>
      </div>

      <div className="h-[70vh] overflow-y-auto scroll-hidden scroll-smooth p-3 space-y-3">
        {contacts &&
          Array.isArray(contacts) &&
          contacts?.map((c) => (
            <ContactCard {...c} key={c._id} loadingId={loadingId} handleDelete={handleDelete} />
          ))}
      </div>
    </div>
  );
}
