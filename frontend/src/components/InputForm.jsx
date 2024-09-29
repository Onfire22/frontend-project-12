import filter from 'leo-profanity';
import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useCreateMessageMutation } from '../store/api/messagesApi';
import sendMessage from '../images/icons/send-message.svg';

const InputForm = () => {
  const [text, setText] = useState('');
  const { id } = useSelector((state) => state.channels.activeChannel);
  const author = useSelector((state) => state.auth.username);
  const { t } = useTranslation();
  const [makeMessage] = useCreateMessageMutation();
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const censured = filter.clean(text);
    makeMessage({ text: censured, id, author });
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
          <span className="visually-hidden">{t('tips.send')}</span>
        </Button>
      </Form.Group>
    </Form>
  );
};

export default InputForm;
