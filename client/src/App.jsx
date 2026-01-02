import { useEffect, useState } from "react";
import ContactForm from "./features/contactForm";
import ContactList from "./features/contactList";
import {
  AddNewContactApi,
  DeleteContactApi,
  GetAllContactApi,
} from "./api/Api";

export default function App() {

  const [loadingId, setLoadingId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showAddContactForm, setShowAddContactForm] = useState(false);
  const [contactLists, setContactLists] = useState([]);

  const handleAddNewContact = async (payload) => {
    setIsLoading(true);
    const result = await AddNewContactApi(payload);
    if (result && result?.success) {
      setShowAddContactForm(false);
      fetchAllContacts();
    }
    setIsLoading(false);
  };

  const handleDeleteContact = async (id) => {
    setLoadingId(id);
    const result = await DeleteContactApi(id);
    if (result && result?.success) {
      fetchAllContacts();
    }
    setLoadingId(null);
  };

  const fetchAllContacts = async () => {
    setIsLoading(true);
    const result = await GetAllContactApi();
    if (result && result?.success && result?.data?.length) {
      setContactLists(result?.data);
    }
    setIsLoading(false);
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

          {!isLoading ? <button
            onClick={() => setShowAddContactForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
          >
            + Add Contact
          </button> : null }
        </div>

        <ContactList
          handleDeleteContact={handleDeleteContact}
          isLoading={isLoading}
          loadingId={loadingId}
          contacts={contactLists}
        />

        {showAddContactForm && (
          <ContactForm
            isLoading={isLoading}
            handleAddNewContact={handleAddNewContact}
            onClose={() => setShowAddContactForm(false)}
          />
        )}
      </div>
    </div>
  );
}
