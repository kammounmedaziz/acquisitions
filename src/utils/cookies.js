
export const cookies = {
  getoptions: (isSecure) => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true : isSecure,
    sameSite: 'Strict',
    maxAge: 15 * 60 * 60 * 1000,
  }),
  set:(res, name, value, options ={}) => {
    res.cookie(name, value, {...cookies.getoptions(), ...options});

  },

  clear: (res, name, options = {}) => {
    res.clearCookie(name, { ...cookies.getoptions(), ...options });
  },

  get: (req, name) => {
    return req.cookies[name];
  }
};
