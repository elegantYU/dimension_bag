/*
 * @Author: elegantYU
 * @Date: 2019-11-16 11:31:44
 * @Last Modified by: elegantYU
 * @Last Modified time: 2019-11-21 18:20:29
 */
const appId = () =>
  new Promise(resolve => {
    chrome.runtime.sendMessage(
      { command: "management", action: "appId" },
      id => {
        resolve(id);
      }
    );
  });

const getAll = () =>
  new Promise(resolve => {
    chrome.runtime.sendMessage(
      { command: "management", action: "getAll" },
      data => {
        resolve(data);
      }
    );
  });

const setEnabled = data =>
  new Promise(resolve => {
    chrome.runtime.sendMessage(
      { command: "management", action: "setEnabled", data },
      () => {
        resolve();
      }
    );
  });

const uninstall = data =>
  new Promise(resolve => {
    chrome.runtime.sendMessage(
      { command: "management", action: "uninstall", data },
      () => {
        resolve();
      }
    );
  });

export { appId, getAll, setEnabled, uninstall };
