import { useSelector } from 'react-redux';
import trashCan from '../images/icons/trash-can.svg';
import { useRemoveMessageMutation } from '../store/api/messagesApi';

const Message = ({ text, author, id }) => {
  const [removeMessage] = useRemoveMessageMutation();
  const user = useSelector((state) => state.auth.username);

  return (
    <div className="message text-break mb-2">
      <div>
        <b>{`${author}: `}</b>
        {text}
      </div>
      {user === author && (
        <button className="message-trash" type="button" onClick={() => removeMessage(id)}>
          <img src={trashCan} alt="trash Can" />
        </button>
      )}
    </div>
  );
};

export default Message;
