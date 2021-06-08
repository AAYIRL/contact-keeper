import React, { useReducer } from "react";
import uuid from "uuid";

import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACTS,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Aayush",
        email: "a@gmail.com",
        phone: "111-111-1111",
        type: "personal",
      },
      {
        id: 2,
        name: "Gulshan",
        email: "g@gmail.com",
        phone: "222-222-2222",
        type: "personal",
      },
      {
        id: 3,
        name: "Neha",
        email: "n@gmail.com",
        phone: "333-333-3333",
        type: "professional",
      },
      {
        id: 4,
        name: "Ashish",
        email: "as@gmail.com",
        phone: "444-444-4444",
        type: "professional",
      },
    ],
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  //Add Contact

  const addContact = (contact) => {
    contact.id = uuid.v4();
    dispatch({
      type: ADD_CONTACT,
      payload: contact,
    });
  };

  //Delete Contact

  //Set Current Contact

  //Clear Current Contact

  //Update Contact

  //Filter Contact

  //Clear Contact

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        addContact,
      }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
