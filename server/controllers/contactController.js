import Contact from "../models/Contact.js";

const GetAllContacts = async (req, res) => {
  try {
    const contactDetail = await Contact.find().sort({ createdAt: -1 }).lean();
    return res.status(200).json({
      success: true,
      data: contactDetail,
      message: "Contact Fetched Successfully",
    });
  } catch (err) {
    console.log("Error is ", err);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

const CreateNewContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone) {
      return res.status(402).json({
        success: false,
        message: "Name , Email and Phone are Required !!",
      });
    }

    const isDuplicateData = await Contact.find({
      $or: [{ email }, { phone }],
    }).lean();
    if (isDuplicateData && isDuplicateData?.length) {
      let isDuplicateEmail = false;
      let isDuplicateContact = false;
      isDuplicateData.forEach((e) => {
        if (e.email == email) isDuplicateEmail = true;
        if (e.phone == phone) isDuplicateContact = true;
      });
      return res.status(403).json({
        success: false,
        message:
          isDuplicateContact && isDuplicateEmail
            ? "Email and Phone Already Exist"
            : isDuplicateContact
            ? "Phone Already Exist"
            : "Email Already Exist",
      });
    }

    await Contact.create({
      name,
      phone,
      email,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "New Contact Added Successfully",
    });
  } catch (err) {
    console.log("Error is ", err);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

const DeleteContact = async (req, res) => {
  try {
    const { id } = req.query;
    const contactDetail = await Contact.findById(id);
    if (!contactDetail) {
      return res.status(404).json({
        success: false,
        message: "Contact Not Found ",
      });
    }

    await Contact.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Contact Deleted Successfully",
    });
  } catch (err) {
    console.log("Error is ", err);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

const ContactControllers = {
  GetAllContacts,
  CreateNewContact,
  DeleteContact,
};

export default ContactControllers;
