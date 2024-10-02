import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import trashCan from '../images/icons/trash-can.svg';
import { useRemoveMessageMutation, useRenameMessageMutation } from '../store/api/messagesApi';
import pen from '../images/icons/pen.svg';

const Message = ({ text, author, id }) => {
  const [show, setShow] = useState(false);
  const [newText, setNewText] = useState(text);
  const inputRef = useRef(null);
  const [removeMessage] = useRemoveMessageMutation();
  const [renameMessage] = useRenameMessageMutation();
  const user = useSelector((state) => state.auth.username);

  const handleRename = () => {
    const newMessage = {
      id,
      text: newText,
    };
    renameMessage(newMessage)
      .then(() => {
        setShow(false);
      });
  };

  useEffect(() => {
    inputRef?.current?.focus();
  }, [show]);

  return (
    <div className="message text-break mb-2">
      <div>
        <b>{`${author}: `}</b>
        {
          show ? (
            <>
              <input className="message_controls-input" type="text" value={newText} ref={inputRef} onChange={({ target }) => setNewText(target.value)} />
              <button className="message_controls-button" type="button" onClick={handleRename}>Ok</button>
            </>
          ) : text
        }
      </div>
      {user === author && (
        <div className="message-controls">
          <button className="message_controls-button" type="button" disabled={show} onClick={() => setShow((prev) => !prev)}>
            <img src={pen} alt="pen" />
          </button>
          <button className="message_controls-button" type="button" onClick={() => removeMessage(id)}>
            <img src={trashCan} alt="trash Can" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Message;
