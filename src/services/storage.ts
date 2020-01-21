/*
 * @Author: elegantYU
 * @Date: 2019-11-22 18:27:44
 * @Last Modified by: elegantYU
 * @Last Modified time: 2020-01-18 22:14:22
 */

const syncGet = (data: String): Promise<boolean> =>
  new Promise(resolve => {
    chrome.runtime.sendMessage(
      {
        command: "storage",
        action: "syncGet",
        data
      },
      storage => {
        resolve(storage);
      }
    );
  });

const syncSet = (data: any): Promise<void> =>
  new Promise(resolve => {
    chrome.runtime.sendMessage(
      {
        command: "storage",
        action: "syncSet",
        data
      },
      () => {
        resolve();
      }
    );
  });

export { syncGet, syncSet };
