import sc2 from 'sc2-sdk';

const api = sc2.Initialize({
  app: process.env.DPAYID_CLIENT_ID,
  baseURL: process.env.DPAYID_HOST,
  callbackURL: process.env.DPAYID_REDIRECT_URL,
});

export default api;
