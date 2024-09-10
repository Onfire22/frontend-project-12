const filterMessages = (filter, messages) => {
  if (messages.length === 0) {
    return messages;
  }
  return messages.filter((message) => message.channelId === filter);
};

export default filterMessages;
