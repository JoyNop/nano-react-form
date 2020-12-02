import { AppState } from "@/store";
import { Checkbox, DatePicker, Form, Input, Radio, Select, Switch } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";

import * as common from "@/utils/common";

interface PreviewProps {
  state: AppState;
}
export class Preview extends Component<PreviewProps> {
  handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(e,"333");

    // this.props.form.validateFieldsAndScroll((err, values) => {
    //     if (!err) {
    //         console.log('Received values of form: ', values);
    //     }
    // });
  };

  render() {
    const { config, content } = this.props.state.form;

    const formItemLayout =
      config.layout === "horizontal"
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          }
        : null;

    return (
      <Form
        style={{ backgroundColor: "#FFF" }}
        layout={config.layout}
        labelAlign={config.labelAlign}
        onFinish={this.handleSubmit}
      >
        {content.map((el, i) =>
          el.type === "title" ? (
            <p
              style={{
                fontSize: el.options.fontSize,
                color: el.options.color,
                textAlign: el.options.textAlign,
                fontWeight: el.options.fontWeight,
              }}
            >
              {el.label}
            </p>
          ) : (
            <Form.Item
              label={el.label}
              {...formItemLayout}
              labelAlign={config.labelAlign}

              rules={[{ required: true, message: '不能为空' }]}
            >
              {
                // form.getFieldDecorator(el.code, {
                //   rules: [
                //     {
                //       required: ,
                //       message: "不能为空",
                //     },
                //   ],
                // } )
                (() => {
                  const { defaultValue, placeholder } = el.options;
                  switch (el.type) {
                    case "input":
                      return (
                        <Input
                          style={{ width: el.options.width }}
                          size={config.size}
                          placeholder={placeholder}
                          defaultValue={defaultValue}
                        />
                      );
                    case "textarea":
                      return (
                        <Input.TextArea
                          style={{ width: el.options.width }}
                          rows={4}
                          size={config.size}
                          placeholder={placeholder}
                          defaultValue={defaultValue}
                        />
                      );
                    case "radio":
                      return (
                        <Radio.Group defaultValue={defaultValue}>
                          {el.options.options.map((el2: any, j: number) => (
                            <Radio value={el2.value} key={j}>
                              {el2.label}
                            </Radio>
                          ))}
                        </Radio.Group>
                      );
                    case "checkbox":
                      return (
                        <Checkbox.Group
                          options={el.options.options}
                          defaultValue={defaultValue}
                        />
                      );
                    case "select":
                      return (
                        <Select
                          style={{ width: el.options.width, minWidth: "180px" }}
                          size={config.size}
                          placeholder={placeholder}
                          defaultValue={
                            common.isEmpty(defaultValue)
                              ? undefined
                              : defaultValue
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
                        <Switch
                          defaultChecked={defaultValue}
                          size={config.size}
                        />
                      );

                    default:
                      break;
                  }
                })()
              }
            </Form.Item>
          )
        )}
      </Form>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  state,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
