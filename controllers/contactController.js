//@desc Get all contacts
//@route GET api/contacts
//@access public
const getContacts = (req, res) => {
  res.status(200).json({ message: "Get all contacts" });
}

//@desc Get contact by ID
//@route GET api/contacts/:id
//@access public
const getContact = (req, res) => {
  res.status(201).json({ message: `Get contact with ID ${req.params.id}` });
}

//@desc Create contact
//@route POST api/contacts
//@access public
const createContact = (req, res) => {
  console.log("The request body is", req.body);
  const { name, email } = req.body;
  if(!name || !email) {
    res.status(400);
    throw new Error("All fields are mandatory !")
  }
  res.status(200).json({ message: `Create a new contact` });
}

//@desc Update contact
//@route PUT api/contacts/:id
//@access public
const updateContact = (req, res) => {
  res.status(200).json({ message: `Update contact with ID ${req.params.id}` });
}

//@desc Delete contact
//@route DELETE api/contacts/:id
//@access public
const deleteContact = (req, res) => {
  res.status(200).json({ message: `Delete contact with ID ${req.params.id}` });
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact
};