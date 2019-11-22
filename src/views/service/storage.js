/*
 * @Author: elegantYU
 * @Date: 2019-11-22 18:27:44
 * @Last Modified by: elegantYU
 * @Last Modified time: 2019-11-22 18:34:24
 */
const syncGet = data =>
  new Promise(resolve => {
    chrome.runtime.sendMessage(data, () => {
      resolve();
    });
  });

export { syncGet };
