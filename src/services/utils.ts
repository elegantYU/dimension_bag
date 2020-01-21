/*
 * @Author: elegantYU
 * @Date: 2019-11-19 13:58:27
 * @Last Modified by: elegantYU
 * @Last Modified time: 2020-01-18 17:59:20
 */
// 中文 + 字母排序
const nameSort = (arr: any, attr = "name") =>
  arr.sort((a: any, b: any) =>
    a[attr].localeCompare(b[attr], "zh-Hans-CN", { sensitivity: "base" })
  );

// item位置
const dropPosition = () => {};

export { nameSort, dropPosition };
