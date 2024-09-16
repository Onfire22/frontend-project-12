// import { useSelector } from 'react-redux';

const Message = ({ text, author }) => {
  // const username = useSelector((state) => state.auth.username);

  return (
    <div className="text-break mb-2">
      <b>{`${author}: `}</b>
      {text}
    </div>
  );
};

export default Message;
