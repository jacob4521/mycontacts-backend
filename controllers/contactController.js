const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModels");
const userModel = require("../models/userModel");
//@desc Get all contacts
//@route GET api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//@desc Get contact by ID
//@route GET api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

//@desc Create contact
//@route POST api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory !")
  };
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id
  });
  res.status(200).json(contact);
});

//@desc Update contact
//@route PUT api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User dont have permission to update other users contacts");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  res.status(200).json(updatedContact); 
});

//@desc Delete contact
//@route DELETE api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  // Delete this specific contact by id
  await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: "Contact deleted",
    contact
  });
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact
};