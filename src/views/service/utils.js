/*
 * @Author: elegantYU
 * @Date: 2019-11-19 13:58:27
 * @Last Modified by: elegantYU
 * @Last Modified time: 2019-11-19 14:09:43
 */
// 中文 + 字母排序
const nameSort = (arr, attr = "name") =>
  arr.sort((a, b) =>
    a[attr].localeCompare(b[attr], "zh-Hans-CN", { sensitivity: "base" })
  );

export { nameSort };
