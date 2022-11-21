export const deepSet = (obj: any, keys: (string | number)[], value: any) => {
  if (keys.length === 0) {
    return;
  }

  let cur = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!cur[keys[i]]) {
      cur[keys[i]] = {};
    }
    cur = cur[keys[i]];
  }

  cur[keys[keys.length - 1]] = value;
};

export const deepGet = (obj: any, keys: (string | number)[]) => {
  if (keys.length === 0) {
    return obj;
  }

  let cur = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!cur[keys[i]]) {
      return;
    }
    cur = cur[keys[i]];
  }

  return cur[keys[keys.length - 1]];
};
