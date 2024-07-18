import Echo from 'laravel-echo';
const initializeEcho = (baseUrl,accessToken) => {
  try{
  const urlObject = new URL(baseUrl);
  const hostname = urlObject.hostname;

  window.Pusher = require('pusher-js');
  window.Echo = new Echo({
    authEndpoint: `${baseUrl}university/broadcasting/auth`,
    broadcaster: 'pusher',
    key: 'localapp', //import.meta.env.VITE_PUSHER_APP_KEY,
    wsHost: hostname, //import.meta.env.VITE_PUSHER_HOST,
    wsPort: 6001, //import.meta.env.VITE_PUSHER_PORT,
    wssPort:6001,    
    disableStats: true,
    cluster: 'mt1',
    forceTLS: true,
    auth: {
      bearerToken:accessToken,
      headers: {
        'Authorization': 'Bearer ' +accessToken
      }
    }
  });
}catch(e){
  console.log(e)
}
};

export default initializeEcho;