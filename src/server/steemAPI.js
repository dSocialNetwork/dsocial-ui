const createClient = require('lightrpc').createClient;

const client = createClient(process.env.DPAYJS_URL || 'https://api.dpays.io');
client.sendAsync = (message, params) =>
  new Promise((resolve, reject) => {
    client.send(message, params, (err, result) => {
      if (err !== null) return reject(err);
      return resolve(result);
    });
  });

module.exports = client;
