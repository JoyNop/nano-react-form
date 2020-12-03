import React, { Component } from "react";
import { Input, Select, Switch } from "antd";
import { BaseFormItemProps } from "../form";

interface NanoCalculationProps extends BaseFormItemProps {
  content: any;
}

class NanoCalculation extends Component<NanoCalculationProps> {

 handleChange=(e:Array<any>)=>{
console.log(e);
let str=e.join("+")
this.props.callback("calculation",str)

 }
  render() {
    console.log(this.props.content);

    const { label, code, options } = this.props.item;
    const { width, defaultValue, required, placeholder } = options;
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
          <p style={{ marginBottom: "5px" }}>宽度：</p>
          <Input
            placeholder="请输入"
            size="small"
            value={width}
            onChange={(e) => this.props.callback("width", e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <p style={{ marginBottom: "5px" }}>占位内容：</p>
          <Input
            placeholder="请输入"
            size="small"
            value={placeholder}
            onChange={(e) => this.props.callback("placeholder", e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <p style={{ marginBottom: "5px" }}>默认值：</p>
          <Input
            placeholder="请输入"
            size="small"
            value={defaultValue}
            onChange={(e) =>
              this.props.callback("defaultValue", e.target.value)
            }
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
          <p style={{ marginBottom: "5px" }}>计算属性(demo中只测试加法可行性)</p>

          <Select
            mode="multiple"
            placeholder="Please select"
            // defaultValue={["a10", "c12"]}
            onChange={this.handleChange}
            style={{ width: "100%" }}
          >
            {this.props.content.map((i: any, index: number) => {
             return <Select.Option key={index} value={i.code}>
                {i.code}
              </Select.Option>;
            })}
          </Select>
        </div>
      </React.Fragment>
    );
  }
}

export default NanoCalculation;
