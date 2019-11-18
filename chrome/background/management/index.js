/*
 * @Author: elegantYU
 * @Date: 2019-11-16 10:40:14
 * @Last Modified by: elegantYU
 * @Last Modified time: 2019-11-18 17:45:51
 */
import { APPID, getAll, setEnabled } from "./utils";

const map = new Map([
  ["appId", sendResponse => ({ APPID }) => sendResponse(APPID) || true],
  [
    "getAll",
    sendResponse => () => getAll().then(async data => sendResponse(data))
  ],
  [
    "setEnabled",
    sendResponse => ({ data: { id, enabled } }) => {
      console.log("...", id, enabled);
      setEnabled(id, enabled).then(data => sendResponse(data));
    }
  ]
]);

const compose = map => (action, sendResponse) => (...args) =>
  map.get(action)(sendResponse)(...args);

const handler = compose(map);
// 监听management相关的指令
chrome.runtime.onMessage.addListener(({ action, data }, _, sendResponse) => {
  handler(action, sendResponse)({ APPID, data });
  return true;
});
