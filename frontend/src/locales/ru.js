const ru = {
  translation: {
    forms: {
      loginTitle: 'Войти',
      login: 'Ваш ник',
      password: 'Пароль',
      signupTitle: 'Регистрация',
      signupLogin: 'Имя пользователя',
      passwordConfirm: 'Подтвердите пароль',
      noAcc: 'Нет аккаунта? ',
      signUp: 'Зарегистрироваться',
      enterBtn: 'Войти',
      errors: {
        wrongData: 'Неверные имя пользователя или пароль',
        required: 'Обязательное поле',
        login: 'От 3 до 20 символов',
        password: 'Не менее 6 символов',
        passwordConfirm: 'Пароли должны совпадать',
        userExists: 'Такой пользователь уже существует',
      },
    },
    header: {
      title: 'Hexlet Chat',
      logout: 'Выйти',
    },
    chat: {
      input: 'Введите сообщение...',
      channels: 'Каналы',
      messages: {
        message_one: '{{count}} сообщение',
        message_few: '{{count}} сообщения',
        message_many: '{{count}} сообщений',
      },
    },
    modals: {
      addChannel: 'Добавить канал',
      renameChannel: 'Переименовать канал',
      removeChannel: 'Удалить канал',
      confirm: 'Уверены?',
      submit: 'Отправить',
      cancel: 'Отменить',
      remove: 'Удалить',
      rename: 'Переименовать',
      errors: {
        required: 'Обязательное поле',
        nameLength: 'От 3 до 20 символов',
        unique: 'Должно быть уникальным',
      },
    },
    toasts: {
      channelRename: 'Канал переименован',
      channelAdd: 'Канал создан',
      channelRemove: 'Канал удален',
    },
    errors: {
      connection: 'Ошибка соединения',
    },
  },
};

export default { ru };
