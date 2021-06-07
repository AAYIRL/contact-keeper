import React, { Fragment, useContext } from "react";

import ContactItem from "./ContactItem";

import ContactContext from "../../context/contact/contactContext";

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts } = contactContext;

  const renderedList = contacts.map((contact) => {
    return <ContactItem key={contact.id} contact={contact} />;
  });

  return <Fragment>{renderedList}</Fragment>;
};

export default Contacts;
