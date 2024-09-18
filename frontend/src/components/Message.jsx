const Message = ({ text, author }) => {
  return (
    <div className="text-break mb-2">
      <b>{`${author}: `}</b>
      {text}
    </div>
  );
};

export default Message;
