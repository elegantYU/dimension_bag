/*
 * @Author: elegantYU
 * @Date: 2019-11-16 11:31:44
 * @Last Modified by: elegantYU
 * @Last Modified time: 2019-11-17 09:47:38
 */
const appId = () =>
  new Promise(resolve => {
    chrome.runtime.sendMessage({ action: "appId" }, id => {
      resolve(id);
    });
  });

const getAll = () =>
  new Promise(resolve => {
    chrome.runtime.sendMessage({ action: "getAll" }, data => {
      resolve(data);
    });
  });

const setEnabled = data =>
  new Promise(resolve => {
    chrome.runtime.sendMessage({ action: "setEnabled", data }, () => {
      resolve();
    });
  });

export { appId, getAll, setEnabled };
