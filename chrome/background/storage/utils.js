/*
 * @Author: elegantYU
 * @Date: 2019-11-22 16:01:51
 * @Last Modified by: elegantYU
 * @Last Modified time: 2019-11-22 17:54:00
 */
// 一般只使用sync 用户线上同步
const syncGet = name =>
  new Promise((resolve, reject) => {
    chrome.storage.sync.get(name, data => {
      if (chrome.runtime.lastError) {
        reject();
        return;
      }
      console.log("get的数据", data);
      resolve(data);
    });
  });

//  @params data Object
const syncSet = data =>
  new Promise((resolve, reject) => {
    chrome.storage.sync.set(data, () => {
      if (chrome.runtime.lastError) {
        reject();
        return;
      }
      console.log("set的数据", data);
      resolve();
    });
  });

export { syncGet, syncSet };
