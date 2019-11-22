/*
 * @Author: elegantYU
 * @Date: 2019-11-16 10:40:14
 * @Last Modified by: elegantYU
 * @Last Modified time: 2019-11-22 23:59:37
 */
import { APPID, get, getAll, setEnabled, uninstall } from "./utils";

const actionMap = new Map([
  ["appId", sendResponse => ({ APPID }) => sendResponse(APPID) || true],
  [
    "getAll",
    sendResponse => () => getAll().then(async data => sendResponse(data))
  ],
  ["get", sendResponse => ({ id }) => get(id).then(info => sendResponse(info))],
  [
    "setEnabled",
    sendResponse => ({ data: { id, enabled } }) =>
      setEnabled(id, enabled).then(data => sendResponse(data))
  ],
  [
    "uninstall",
    sendResponse => ({ data: { id } }) =>
      uninstall(id)
        .then(sendResponse({ msg: true }))
        .catch(_ => _)
  ]
]);

const compose = actionMap => (action, sendResponse) => (...args) =>
  actionMap.get(action)(sendResponse)(...args);

const handler = compose(actionMap);
// 监听management相关的指令
chrome.runtime.onMessage.addListener(
  ({ command, action, data }, _, sendResponse) => {
    command === "management" && handler(action, sendResponse)({ APPID, data });
    return true;
  }
);
