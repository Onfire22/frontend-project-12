const API_ROUTES = {
  login: '/api/v1/login',
  signup: '/api/v1/signup',
  getChannels: '/api/v1/channels',
  renameChannel: (id) => `/api/v1/channels/:${id}`,
  removeChannel: (id) => `/api/v1/channels/:${id}`,
  getMessages: '/api/v1/messages',
};

const ROUTES = {
  chat: '/',
  login: '/login',
  signup: '/signup',
};

export { API_ROUTES, ROUTES };
