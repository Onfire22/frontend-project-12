import filter from 'leo-profanity';
import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { createMessage } from '../store/slices/messagesSlice';
import sendMessage from '../images/icons/send-message.svg';

const InputForm = () => {
  const [text, setText] = useState('');
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  filter.loadDictionary('ru');

  const handleSubmit = (e) => {
    e.preventDefault();
    const censured = filter.clean(text);
    dispatch(createMessage(censured));
    setText('');
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Form className="py-1 rounded-2" onSubmit={handleSubmit}>
      <Form.Group className="input-group has-validation" controlId="text">
        <Form.Control
          type="text"
          name="text"
          aria-label="Новое сообщение"
          placeholder={t('chat.input')}
          ref={inputRef}
          value={text}
          onChange={({ target }) => setText(target.value)}
        />
        <Button
          className="btn-group-vertical no-hover"
          variant="outline-dark"
          disabled={text.length === 0}
          type="submit"
        >
          <img src={sendMessage} alt="send message" />
        </Button>
      </Form.Group>
    </Form>
  );
};

export default InputForm;
