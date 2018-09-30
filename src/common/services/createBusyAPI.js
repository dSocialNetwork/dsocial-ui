import { Client } from 'dsocialjs';

function createDSocialAPI() {
  const client = new Client('wss://api.dsocial.io');

  client.sendAsync = (message, params) =>
    new Promise((resolve, reject) => {
      client.call(message, params, (err, result) => {
        if (err !== null) return reject(err);
        return resolve(result);
      });
    });

  return client;
}

export default createDSocialAPI;
