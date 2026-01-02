import express from "express";
import ContactControllers from "../controllers/contactController.js";
const ContactRouter = express.Router();

ContactRouter.get("/getAllContacts", ContactControllers.GetAllContacts);
ContactRouter.post("/createNewContact", ContactControllers.CreateNewContact);
ContactRouter.delete("/deleteContact", ContactControllers.DeleteContact);


export default ContactRouter;