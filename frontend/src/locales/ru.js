const ru = {
  translation: {
    fields: {
      username: 'Ваш ник',
      password: 'Пароль',
      passwordConfirm: 'Подтвердите пароль',
      signupName: 'Имя пользователя',
    },
    buttons: {
      enter: 'Войти',
      signup: 'Зарегистрироваться',
      send: 'Отправить',
      channelRename: 'Переименовать',
      channelRemove: 'Удалить',
    },
    titles: {
      signup: 'Регистрация',
    },
    channelsHandlers: {
      channelName: 'Имя канала',
      channelHandle: 'Управление каналом',
      channelAdded: 'Канал создан',
      channelRenamed: 'Канал переименован',
      channelRemoved: 'Канал удалён',
    },
    errors: {
      required: 'Обязательное поле',
      username: 'От 3 до 20 символов',
      password: 'Не менее 6 символов',
      passwordConfirm: 'Пароли должны совпадать',
      loginFail: 'Неверные имя пользователя или пароль',
      connectErr: 'Ошибка соединения',
    },
    messages: {
      message_one: '{{count}} сообщение',
      message_few: '{{count}} сообщения',
      message_many: '{{count}} сообщений',
    },
  },
};

export default { ru };
