/*
 * @Author: HanRui(JoyNop)
 * @Date: 2020-11-30 11:17:38
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2020-12-01 10:53:56
 * @Description: file content
 */
import React, { Component } from "react";
 import { Input, Switch, Select } from "antd";
import { BaseFormItemProps } from "../form";

class NanoDate extends Component<BaseFormItemProps> {
  render() {
    const { label, code, options } = this.props.item;
    const { required, format } = options;
    return (
      <React.Fragment>
        <div style={{ marginBottom: "15px" }}>
          <p style={{ marginBottom: "5px" }}>标题：</p>
          <Input
            placeholder="请输入"
            size="small"
            value={label}
            onChange={(e) => this.props.callback("label", e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <p style={{ marginBottom: "5px" }}>格式化：</p>
          <Select
            style={{ width: "100%" }}
            size="small"
            onChange={(value) => this.props.callback("format", value)}
            value={format}
            dropdownMatchSelectWidth={false}
          >
            {options.options.map((el: any, i: number) => (
              <Select.Option key={i} value={el.value}>
                {el.label}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <p style={{ marginBottom: "5px" }}>编码值：</p>
          <Input
            placeholder="请输入"
            size="small"
            value={code}
            onChange={(e) => this.props.callback("code", e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <p style={{ marginBottom: "5px" }}>是否必填：</p>
          <Switch
            size="small"
            checked={required}
            onChange={(checked) => this.props.callback("required", checked)}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default NanoDate;
