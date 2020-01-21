/*
 * @Author: elegantYU
 * @Date: 2019-11-20 17:54:23
 * @Last Modified by: elegantYU
 * @Last Modified time: 2020-01-18 19:46:13
 */
interface Data {
  url: string;
  active: boolean;
}

const create = (data: Data): Promise<void> =>
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
