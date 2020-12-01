/*
 * @Author: HanRui(JoyNop)
 * @Date: 2020-12-01 10:38:40
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2020-12-01 10:40:08
 * @Description: file content
 */

export interface BaseFormItemProps {
  item: any;
  callback: (key: string, value: any) => void;
}
