import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import css from './App.module.css';

import Form from '../Form/Form';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';

const App = () => {
  const phonebook = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];
  const [contacts, setContancts] = useState(phonebook);
  const [filter, setFilter] = useState('');

  const formSubmitData = (name, number) => {
    const subData = {
      id: nanoid(),
      name,
      number,
    };

    if (contacts.find(contact => contact.name === subData.name)) {
      return alert(`${subData.name} is already in contact list`);
    }

    setContancts([subData, ...contacts]);
  };

  const deleteContact = contactId => {
    setContancts(contacts.filter(contact => contact.id !== contactId));
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const getFilterContact = () => {
    const normalizeFilter = filter.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizeFilter)
    );
  };

  useEffect(() => {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    setContancts(parsedContacts);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className={css.phonebook}>
      <h1>Phonebook</h1>
      <Form onSubmit={formSubmitData} />
      <div>
        <h2>Contacts</h2>
        <Filter filter={filter} onChangeFilter={changeFilter} />
        <ContactList
          contacts={getFilterContact()}
          onDeleteContact={deleteContact}
        />
      </div>
    </div>
  );
};

export default App;
