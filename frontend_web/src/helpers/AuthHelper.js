const ACCESS_TOKEN = "AccessToken";

const AuthHelper = {
  saveToken: (token, cb) => {
    sessionStorage.setItem(ACCESS_TOKEN, token);
    cb(true);
  },
  getToken: () => sessionStorage.getItem(ACCESS_TOKEN),
  removeToken: () => sessionStorage.removeItem(ACCESS_TOKEN),
};

export default AuthHelper;
