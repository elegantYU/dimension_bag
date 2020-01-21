/*
 * @Author: elegantYU
 * @Date: 2019-11-22 17:42:56
 * @Last Modified by: elegantYU
 * @Last Modified time: 2020-01-09 18:17:51
 */
import { syncGet, syncSet } from "./utils";

const funcMap = new Map([
  ["syncGet", sendResponse => data => syncGet(data).then(_ => sendResponse(_))],
  ["syncSet", sendResponse => data => syncSet(data).then(_ => sendResponse(_))]
]);

/**
 * @param {  } changes
 * @param { 'sync', 'local', 'managed' } areaName
 */
chrome.runtime.onMessage.addListener(
  ({ command, action, data }, _, sendResponse) => {
    command === "storage" && funcMap.get(action)(sendResponse)(data);
    return true;
  }
);
