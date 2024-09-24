const Message = ({ text, author }) => (
  <div className="text-break mb-2">
    <b>{`${author}: `}</b>
    {text}
  </div>
);

export default Message;
