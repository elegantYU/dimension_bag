/*
 * @Author: elegantYU
 * @Date: 2019-11-20 15:32:48
 * @Last Modified by: elegantYU
 * @Last Modified time: 2019-11-20 15:36:27
 */
/**
 * 创建新tab
 * @param { url, active, ... } data
 */
const create = data =>
  new Promise(resolve => {
    chrome.tabs.create(data, () => {
      resolve();
    });
  });

export { create };
