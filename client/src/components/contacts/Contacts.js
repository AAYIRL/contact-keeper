import React, { Fragment, useContext } from "react";

import ContactItem from "./ContactItem";

import ContactContext from "../../context/contact/contactContext";

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered } = contactContext;

  if (contacts.length === 0) {
    return <h4>Please Add a Contact</h4>;
  }

  const renderedList = contacts.map((contact) => {
    return <ContactItem key={contact.id} contact={contact} />;
  });

  const filteredList =
    filtered !== null
      ? filtered.map((contact) => (
          <ContactItem key={contact.id} contact={contact} />
        ))
      : renderedList;

  return <Fragment>{filteredList}</Fragment>;
};

export default Contacts;
