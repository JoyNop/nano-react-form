import React, { Component } from "react";
import { Input, Switch, Radio } from "antd";
import { BaseFormItemProps } from "../form";
import Icon from "@ant-design/icons";

class NanoSelect extends Component<BaseFormItemProps> {
  render() {
    const { label, code, options } = this.props.item;
    const { defaultValue, required } = options;
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
        <div style={{ marginBottom: "15px" }}>
          <p style={{ marginBottom: "5px" }}>
            选项：
            <Icon
              type="plus-circle"
              title="添加"
              style={{ cursor: "pointer", color: "greed" }}
              onClick={() => {
                 let _options = options.options;
                _options.push({
                  label: `标题${_options.length + 1}`,
                  value: `值${_options.length + 1}`,
                });
                this.props.callback("options", _options);
              }}
            />
          </p>
          <Radio.Group
            onChange={(e) => {
              this.props.callback("defaultValue", e.target.value);
            }}
            value={defaultValue}
          >
            {options.options.map((el: any, i: number) => (
              <Radio style={radioStyle} value={el.value} key={i}>
                <div key={i} style={{ marginBottom: "3px", display: "inline" }}>
                  <span>标题</span>：
                  <Input
                    size="small"
                    style={{ width: "50px" }}
                    value={el.label}
                    onChange={(e) => {
                      let _options = options.options;
                      _options[i].label = e.target.value;
                      this.props.callback("options", _options);
                    }}
                  />
                  <span style={{ marginLeft: "15px" }}>值</span>：
                  <Input
                    size="small"
                    style={{ width: "50px" }}
                    value={el.value}
                    onChange={(e) => {
                      let _options = options.options;
                      _options[i].value = e.target.value;
                      this.props.callback("options", _options);
                    }}
                  />
                  <Icon
                    type="minus-circle"
                    title="删除"
                    style={{
                      cursor: "pointer",
                      color: "red",
                      marginLeft: "10px",
                    }}
                    onClick={() => {
                      let _options = options.options;
                      _options.splice(i, 1);
                      this.props.callback("options", _options);
                    }}
                  />
                </div>
              </Radio>
            ))}
          </Radio.Group>
        </div>
      </React.Fragment>
    );
  }
}

export default NanoSelect;

const radioStyle = {
  display: "block",
};
