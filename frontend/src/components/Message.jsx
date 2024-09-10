import { useSelector } from 'react-redux';

const Message = ({ text }) => {
  const username = useSelector((state) => state.auth.username);

  return (
    <div className="text-break mb-2">
      {`${username}: ${text}`}
    </div>
  );
};

export default Message;
