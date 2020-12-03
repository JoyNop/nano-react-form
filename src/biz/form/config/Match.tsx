/*
 * @Author: HanRui(JoyNop)
 * @Date: 2020-12-02 14:14:42
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2020-12-03 18:01:41
 * @Description: 预览窗口匹配自定义组件
 * @FilePath: /nano-react-form/src/biz/form/config/Match.tsx
 */
import { Checkbox, DatePicker, Input, Radio, Select, Switch } from "antd";
import React from "react";
import * as common from "@/utils/common";

export enum ComponentType {
  Input = "input",
  Textarea = "textarea",
  Radio = "radio",
  CheckBox = "checkBox",
  Select = "select",
  Date = "date",
  Switch = "switch",
  Calculation="calculation"
}

export function matchComponment(config: any, el: any) {
  switch (el.type) {
    case ComponentType.Input:
      return (
        <Input
          style={{ width: el.options.width }}
          size={config.size}
          placeholder={el.options.placeholder}
        />
      );
    case ComponentType.Textarea:
      return (
        <Input.TextArea
          style={{ width: el.options.width }}
          rows={4}
          size={config.size}
          placeholder={el.options.placeholder}
          defaultValue={el.options.defaultValue}
        />
      );
    case ComponentType.Radio:
      return (
        <Radio.Group defaultValue={el.options.defaultValue}>
          {el.options.options.map((el2: any, j: number) => (
            <Radio value={el2.value} key={j}>
              {el2.label}
            </Radio>
          ))}
        </Radio.Group>
      );
    case ComponentType.CheckBox:
      return (
        <Checkbox.Group
          options={el.options.options}
          defaultValue={el.options.defaultValue}
        />
      );
    case ComponentType.Select:
      return (
        <Select
          style={{ width: el.options.width, minWidth: "180px" }}
          size={config.size}
          placeholder={el.options.placeholder}
          defaultValue={
            common.isEmpty(el.options.defaultValue)
              ? undefined
              : el.options.defaultValue
          }
        >
          {el.options.options.map((el2: any, j: number) => (
            <Select.Option value={el2.value} key={j}>
              {el2.label}
            </Select.Option>
          ))}
        </Select>
      );
    case "date":
      return (
        <DatePicker
          style={{ width: el.options.width }}
          size={config.size}
          showTime={el.options.format === "YYYY-MM-DD HH:mm"}
          format={el.options.format}
        />
      );
    case "switch":
      return (
        <Switch defaultChecked={el.options.defaultValue} size={config.size} />
      );

    default:
      break;
  }
}
