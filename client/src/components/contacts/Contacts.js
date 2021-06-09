import React, { Fragment, useContext, useEffect } from "react";

import ContactItem from "./ContactItem";
import Spinner from "../layout/Spinner";

import ContactContext from "../../context/contact/contactContext";

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();

    //eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please Add a Contact</h4>;
  }

  const renderedList =
    contacts !== null &&
    contacts.map((contact) => {
      return <ContactItem key={contact._id} contact={contact} />;
    });

  const filteredList =
    filtered !== null
      ? filtered.map((contact) => (
          <ContactItem key={contact._id} contact={contact} />
        ))
      : renderedList;

  return (
    <Fragment>
      {contacts !== null && !loading ? filteredList : <Spinner />}
    </Fragment>
  );
};

export default Contacts;
