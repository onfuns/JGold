const IsomorphicFetch = require('isomorphic-fetch');
const electron = global.require('electron')
export const { remote } = electron
export const { BrowserWindow } = remote

export const createNewWindow = (options = {}) => {
  const win = new BrowserWindow(Object.assign({
    webPreferences: { webSecurity: false },
    height: 600,
    width: 1100,
    frame: false,
    resizable: false
  }, options))
  const { path = '', destroy = true } = options
  win.loadURL(`file://${__dirname}/index.html#${path}`)
  if (destroy) {
    const wins = BrowserWindow.getAllWindows()
    wins.length > 1 && wins[1].destroy()
  }
  return win
}

export const saveCache = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

export const getCache = (key) => {
  return JSON.parse(localStorage.getItem(key));
}

export const clearCacheByKey = (key) => {
  localStorage.removeItem(key);
}

export const request = ({ url, data = {}, method = 'GET', headers = {} }) => {
  let options = {}
  let params = Object.keys(data).length > 0 ? Object.keys(data).map(
    (k) => { return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
  ).join('&') : '';
  if (method == 'GET' && params) {
    url = `${url}?${params}`
  } else if (method == 'POST') {
    options.body = params || {}
  }

  options.headers = {
    ...headers
  }
  return IsomorphicFetch(url, options)
    .then((response) => {
      return response.json()
    })
    .catch((err) => {
      console.log('fetch failed', err)
    })
}

export const debounce = (callback, delay) => {
  let timeId = null
  return function () {
    timeId && clearTimeout(timeId)
    timeId = setTimeout(callback, delay)
  }
}