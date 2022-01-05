import { useState } from 'react'
import Header from './components/Header'

import initialEmails from './data/emails'

import './App.css'

function App() {
  // Use initialEmails for state
  // console.log(initialEmails)
  const [emails, setEmails] = useState(initialEmails);
  const [hideChecked, setHide] = useState(false);
  const [currentTab, setTab] = useState('home');
  const [countUnread, setUnreadCounter] = useState(getUnreadCount());
  const [countStarred, setStarredCounter] = useState(getStarredCount());

  function emailsToDisplayFunction() {
    let emailsToDisplay = emails;

    if (hideChecked) {
      emailsToDisplay = unreadEmails();
    }
    if (currentTab === 'inbox') {
      emailsToDisplay = unreadEmails();
    }
    if (currentTab === 'starred') {
      emailsToDisplay = starredEmails();

    }
    // let unreadEmailsToDisplay = unreadEmails()
    // let emailsToDisplay = [...readEmailsToDisplay, ...unreadEmailsToDisplay];
    return emailsToDisplay;
  }

  function readEmails() {
    return emails.filter(email => {
      return email.read;
    })
  }

  function unreadEmails() {
    return emails.filter(email => {
      return email.read === false;
    })
  }
  function starredEmails() {
    return emails.filter(email => {
      return email.starred;
    })
  }

  function toggleRead(email) {
    return !email.read;
  }
  function toggleStarred(email) {
    return !email.starred;
  }
  function toggleHideCheck() {
    setHide(!hideChecked);
  }
  function updateElement(id, read) {
    let foundElementIndex = emails.findIndex(email => email.id === id);
    emails[foundElementIndex].read = read;
    const newEmails = [...emails]
    // setEmails(newEmails);
    return newEmails
  }


  function updateStarred(id, starred) {
    let foundElementIndex = emails.findIndex(email => email.id === id);
    emails[foundElementIndex].starred = starred;
    const newEmails = [...emails]
    setEmails(newEmails);
  }
  function updateStarredCount() {
    let starredCount = getStarredCount()
    setStarredCounter(starredCount);
  }
  function getStarredCount() {
    let starred = starredEmails();
    return starred.length;
  }
  function getUnreadCount() {
    let unread = unreadEmails();
    return unread.length;
  }
  function updateUnreadCounter() {
    let unreadCount = getUnreadCount();
    setUnreadCounter(unreadCount);
  }
  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            onClick={() => {
              setTab('inbox');

            }}
          >
            <span className="label">Inbox</span>
            <span className="count">{countUnread}</span>
          </li>
          <li
            className="item"
            onClick={() => {
              setTab('starred');

            }}
          >
            <span className="label">Starred</span>
            <span className="count">{countStarred}</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideChecked}
              onChange={() => {
                toggleHideCheck();
              }}

            />
          </li>
        </ul>
      </nav>
      <main className="emails">{
        // emailsToDisplayFunction().map(email => {

        //   return <li className={email.read ? 'email read' : 'email'}>
        //     <input type="checkbox" onClick={function () {
        //       const changedReadProp = toggleRead(email);
        //       const newEmails = updateElement(email.id, changedReadProp)
        //       setEmails(newEmails)

        //     }}
        //       checked={email.read} />
        //     <input type='checkbox' class="star-checkbox" onClick={function () {
        //       const changedStarredProp = toggleStarred(email);
        //       updateStarred(email.id, changedStarredProp);
        //     }} />
        //     <span>{email.sender}</span>
        //     <span>{email.title}</span>

        //   </li>
        emailsToDisplayFunction().map(email => {
          return <li className={email.read ? 'email read' : 'email'}>
            <input type="checkbox" onClick={function () {
              const changedReadProp = toggleRead(email);
              const newEmails = updateElement(email.id, changedReadProp)
              setEmails(newEmails)
              updateUnreadCounter();
            }}
              checked={email.read} />
            <input type='checkbox' class="star-checkbox" onClick={function () {
              const changedStarredProp = toggleStarred(email);
              updateStarred(email.id, changedStarredProp);
              updateStarredCount()
            }}
              checked={email.starred} />
            <span>{email.sender}</span>
            <span>{email.title}</span>
          </li>
        })
        // })
      }
      </main>
    </div>
  )
}

export default App
