/*
 * @Author: HanRui(JoyNop)
 * @Date: 2020-12-01 10:38:40
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2020-12-02 10:58:08
 * @Description: file content
 */

/**
 *
 * @description 基础表单组件Props
 * @export
 * @interface BaseFormItemProps
 */
export interface BaseFormItemProps {
  item: any;
  callback: (key: string, value: any) => void;
}

interface Config {
  layout: "horizontal" | "vertical" | "inline";
  labelAlign: "left" | "right" | "center";
  size: "default" | "small" | "large";
}
interface SeedItem {
  id: string;
  label: string;
  type: string;
  icon: string;
  options: any;
  code: string;
}
export interface Seed {
  id: string;
  title: string;
  item: Array<SeedItem>;
}

/**
 *
 * @description 数据格式
 * @export
 * @interface InitData
 */
export interface InitData {
  seeds: Array<SeedItem>;
  config: Config;
  activeId: string;
  content: Array<any>;
}
