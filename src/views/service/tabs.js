/*
 * @Author: elegantYU
 * @Date: 2019-11-20 17:54:23
 * @Last Modified by: elegantYU
 * @Last Modified time: 2019-11-20 18:01:49
 */
/**
 * @param { url, action, ... } data
 */
const create = data =>
  new Promise(resolve => {
    chrome.runtime.sendMessage(
      {
        command: "tabs",
        action: "create",
        data
      },
      () => {
        resolve();
      }
    );
  });

export { create };
