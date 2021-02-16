const lsTokenKey = 'my_app_token';

function setTokenOnRequest(req) {
  const isAuthUrl = req.url.includes('auth');

  if (!isAuthUrl) {
    const token = localStorage.getItem(lsTokenKey);
    // custom token*
    req.headers['x-access-token'] = token;
  }

  return req;
}

function setTokenOnLogin(res) {
  const isLoginUrl = res.config.url.includes('login');

  if (isLoginUrl) {
    const token = res.data.token;
    localStorage.setItem(lsTokenKey, token);
  }

  return res;
}

function getClearResponse({ data }) {
  return data;
}

function onError(err) {
  console.dir(err);
  return Promise.reject(err);
}

export default function (axios) {
  axios.interceptors.request.use(setTokenOnRequest);
  axios.interceptors.response.use(setTokenOnLogin);
  // must be last interceptor
  axios.interceptors.response.use(getClearResponse, onError);
}
