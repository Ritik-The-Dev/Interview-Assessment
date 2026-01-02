import { useEffect, useState } from "react";
import ContactForm from "./features/contactForm";
import ContactList from "./features/contactList";
import {
  AddNewContactApi,
  DeleteContactApi,
  GetAllContactApi,
} from "./api/Api";

export default function App() {
  const [showAddContactForm, setShowAddContactForm] = useState(false);
  const [contactLists, setContactLists] = useState([]);

  const handleAddNewContact = async (payload) => {
    const result = await AddNewContactApi(payload);
    if (result && result?.success) {
      setShowAddContactForm(false);
      fetchAllContacts();
    }
  };

  const handleDeleteContact = async (id) => {
    const result = await DeleteContactApi(id);
    if (result && result?.success) {
      fetchAllContacts();
    }
  };

  const fetchAllContacts = async () => {
    const result = await GetAllContactApi();
    if (result && result?.success && result?.data?.length) {
      setContactLists(result?.data);
    }
  };

  useEffect(() => {
    fetchAllContacts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">
            Contact Management
          </h1>

          <button
            onClick={() => setShowAddContactForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
          >
            + Add Contact
          </button>
        </div>

        <ContactList
          handleDeleteContact={handleDeleteContact}
          contacts={contactLists}
        />

        {showAddContactForm && (
          <ContactForm
            handleAddNewContact={handleAddNewContact}
            onClose={() => setShowAddContactForm(false)}
          />
        )}
      </div>
    </div>
  );
}
