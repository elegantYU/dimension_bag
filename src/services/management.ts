/*
 * @Author: elegantYU
 * @Date: 2019-11-16 11:31:44
 * @Last Modified by: elegantYU
 * @Last Modified time: 2020-01-18 20:21:19
 */
const appId = (): Promise<string> =>
  new Promise(resolve => {
    chrome.runtime.sendMessage(
      { command: "management", action: "appId" },
      (id: string) => {
        resolve(id);
      }
    );
  });

const get = (data: Object) =>
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

const getSelf = (): Promise<Object> => 
  new Promise(resolve => {
    chrome.runtime.sendMessage({
      command: "management",
      action: "getSelf",
    }, info => {
      resolve(info)
    })
  })

interface Exts {
  [index: string]: any;
}

const getAll = (): Promise<Exts> =>
  new Promise(resolve => {
    chrome.runtime.sendMessage(
      { command: "management", action: "getAll" },
      data => {
        resolve(data);
      }
    );
  });

interface SetEnabled {
  id: string;
  enabled: boolean;
}

const setEnabled = (data: SetEnabled): Promise<void> =>
  new Promise(resolve => {
    chrome.runtime.sendMessage(
      { command: "management", action: "setEnabled", data },
      () => {
        resolve();
      }
    );
  });

const uninstall = (data: Object): Promise<void> =>
  new Promise(resolve => {
    chrome.runtime.sendMessage(
      { command: "management", action: "uninstall", data },
      () => {
        resolve();
      }
    );
  });

export { appId, get, getSelf, getAll, setEnabled, uninstall };
