/*
 * @Author: elegantYU
 * @Date: 2019-11-16 11:31:44
 * @Last Modified by: elegantYU
 * @Last Modified time: 2019-11-22 23:43:36
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

const get = data =>
  new Promise(resolve => {
    chrome.runtime.sendMessage(
      {
        command: "management",
        action: "get",
        data
      },
      info => {
        resolve(info);
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

export { appId, get, getAll, setEnabled, uninstall };
