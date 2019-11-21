/*
 * @Author: elegantYU
 * @Date: 2019-11-20 15:29:13
 * @Last Modified by: elegantYU
 * @Last Modified time: 2019-11-20 16:05:55
 */
import { create } from "./utils";

const actionMap = new Map([
  ["create", sendResponse => data => create(data).then(_ => sendResponse())]
]);

// 请求监听
chrome.runtime.onMessage.addListener(
  ({ command, action, data }, _, sendResponse) => {
    command === "tabs" && actionMap.get(action)(sendResponse)(data);
    return true;
  }
);
