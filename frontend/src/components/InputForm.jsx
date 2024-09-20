import filter from 'leo-profanity';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { createMessage } from '../store/slices/messagesSlice';
import sendMessage from '../images/icons/send-message.svg';

const InputForm = () => {
  const [text, setText] = useState('');
  const { t } = useTranslation();
  const dispatch = useDispatch();
  filter.loadDictionary('ru');

  const handleSubmit = (e) => {
    e.preventDefault();
    const censured = filter.clean(text);
    dispatch(createMessage(censured));
    setText('');
  };

  return (
    <form className="py-1 border rounded-2" onSubmit={handleSubmit}>
      <div className="input-group has-validation">
        <input
          name="body"
          aria-label="Новое сообщение"
          placeholder={t('chat.input')}
          className="border-0 p-0 ps-2 form-control"
          type="text"
          value={text}
          onChange={({ target }) => setText(target.value)}
        />
        <button
          type="submit"
          className="btn btn-group-vertical"
          disabled={text.length === 0}
        >
          <img src={sendMessage} alt="send message" />
        </button>
      </div>
    </form>
  );
};

export default InputForm;
