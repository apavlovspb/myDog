import cookie from 'cookie';

const set = (name, value, options = { Path: '/' }) => {
  let { expires } = options || 86400; // секунд в сутках

  if (typeof expires == 'number' && expires) {
    const d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = d;
    options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  let updatedCookie = `${name}=${value}`;

  const keys = Object.keys(options);
  for (let i = 0; i < keys.length; i += 1) {
    const propName = keys[i];
    updatedCookie += `; ${propName}`;
    const propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += `=${propValue}`;
    }
  }
  // updatedCookie += '; Path="/"';

  document.cookie = updatedCookie;
};

const get = name => cookie.parse(document.cookie)[name];

export const remove = name => {
  document.cookie = `${name}=''; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

export const helperCookie = {
  set,
  get,
  remove,
};
