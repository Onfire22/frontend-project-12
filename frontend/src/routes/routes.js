const API_ROUTES = {
  login: () => '/api/v1/login',
  signup: () => '/api/v1/signup',
  channels: () => '/api/v1/channels',
  handleChannel: (id) => `/api/v1/channels/${id}`,
  messages: () => '/api/v1/messages',
};

const ROUTES = {
  chat: '/',
  login: '/login',
  signup: '/signup',
  notFound: '*',
};

export { API_ROUTES, ROUTES };
