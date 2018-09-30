import dpid from 'dpayid';

const api = dpid.Initialize({
  app: process.env.DPAYID_CLIENT_ID,
  baseURL: process.env.DPAYID_HOST,
  callbackURL: process.env.DPAYID_REDIRECT_URL,
});

export default api;
