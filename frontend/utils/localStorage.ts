export const LocalStorage = {
  set: function (key: string, value: any) {
    localStorage[key] = value;
  },
  get: function (key: string, defaultValue: any) {
    return localStorage[key] || defaultValue;
  },
  setObject: function (key: string, value: any) {
    localStorage[key] = JSON.stringify(value);
  },
  getObject: function (key: string) {
    return JSON.parse(localStorage[key] || "{}");
  },
  clearObject: function (key: string) {
    localStorage.removeItem(key);
  },
};
