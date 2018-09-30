import { createClient } from 'lightrpc';

const options = {
  timeout: 15000,
};

const dpayUrl = process.env.DPAYJS_URL || 'https://api.dpays.io';

const client = createClient(dpayUrl, options);
client.sendAsync = (message, params) =>
  new Promise((resolve, reject) => {
    client.send(message, params, (err, result) => {
      if (err !== null) return reject(err);
      return resolve(result);
    });
  });

export default client;
