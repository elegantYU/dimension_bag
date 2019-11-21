/*
 * @Author: elegantYU
 * @Date: 2019-11-19 13:58:27
 * @Last Modified by: elegantYU
 * @Last Modified time: 2019-11-21 15:35:53
 */
// 中文 + 字母排序
const nameSort = (arr, attr = "name") =>
  arr.sort((a, b) =>
    a[attr].localeCompare(b[attr], "zh-Hans-CN", { sensitivity: "base" })
  );

// item位置
const dropPosition = () => {};

export { nameSort, dropPosition };
