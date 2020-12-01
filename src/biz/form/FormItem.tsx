/*
 * @Author: HanRui(JoyNop)
 * @Date: 2020-11-30 14:35:39
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2020-12-01 10:59:42
 * @Description: file content
 */

import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Form, Input, Radio, Checkbox, DatePicker, Select, Switch } from "antd";
import * as action from "./service/formActions";

import * as common from "@/utils/common";
import { AppState } from "@/store";
import { connect } from "react-redux";
interface StoreProps {
  state: AppState;
  setFormActiveId: (activeId: string) => void;
  setFormContent: (content: any[]) => void;
}

interface FormItemProps extends StoreProps {
  data: any;

  // seedList: any;
  layout: any;
  labelAlign: any;
  size: any;
  index: any;
  form?: any;
}

class FormItem extends Component<FormItemProps> {
  getKey = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  render() {
    console.log(this.props, "=======");

    const { data } = this.props;
    const { activeId, content: FormContent } = this.props.state.form;
    const formItemLayout =
      this.props.layout === "horizontal"
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          }
        : null;
    console.warn(" activeId, data.id", activeId, data.id);
    const isActive = activeId === data.id;
    const {
      defaultValue,
      placeholder,
      // required
    } = data.options;
    const content = FormContent;

    return (
      <Draggable
        draggableId={data.id}
        index={this.props.index}
        // direction="vertical"
        // isDragDisabled={isDragDisabled}
      >
        {(provided, snapshot) => (
          <div
            className={`cell ${isActive ? "cell-active" : ""}`}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            // isDragging={snapshot.isDragging}
            onClick={() => {
              // activeId.set(data.id)
            }}
          >
            {(() => {
              switch (data.type) {
                case "input":
                  return (
                    <div className="form-item">
                      <Form.Item
                        label={data.label}
                        {...formItemLayout}
                        labelAlign={this.props.labelAlign}
                      >
                        <Input
                          style={{ width: data.options.width }}
                          size={this.props.size}
                          placeholder={placeholder}
                          value={defaultValue}
                        />
                      </Form.Item>
                    </div>
                  );
                case "textarea":
                  return (
                    <div className="form-item">
                      <Form.Item
                        label={data.label}
                        {...formItemLayout}
                        labelAlign={this.props.labelAlign}
                      >
                        <Input.TextArea
                          style={{ width: data.options.width }}
                          rows={4}
                          size={this.props.size}
                          placeholder={placeholder}
                          value={defaultValue}
                        />
                      </Form.Item>
                    </div>
                  );
                case "radio":
                  return (
                    <div className="form-item">
                      <Form.Item
                        label={data.label}
                        {...formItemLayout}
                        labelAlign={this.props.labelAlign}
                      >
                        <Radio.Group value={defaultValue}>
                          {data.options.options.map((el: any, i: number) => (
                            <Radio value={el.value} key={i}>
                              {el.label}
                            </Radio>
                          ))}
                        </Radio.Group>
                      </Form.Item>
                    </div>
                  );
                case "checkbox":
                  return (
                    <div className="form-item">
                      <Form.Item
                        label={data.label}
                        {...formItemLayout}
                        labelAlign={this.props.labelAlign}
                      >
                        <Checkbox.Group
                          options={data.options.options}
                          value={defaultValue}
                        />
                      </Form.Item>
                    </div>
                  );
                case "select":
                  return (
                    <div className="form-item">
                      <Form.Item
                        label={data.label}
                        {...formItemLayout}
                        labelAlign={this.props.labelAlign}
                      >
                        <Select
                          style={{
                            width: data.options.width,
                            minWidth: "180px",
                          }}
                          size={this.props.size}
                          placeholder={placeholder}
                          value={
                            common.isEmpty(defaultValue)
                              ? undefined
                              : defaultValue
                          }
                        >
                          {data.options.options.map((el: any, i: number) => (
                            <Select.Option value={el.value} key={i}>
                              {el.label}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                  );
                case "date":
                  return (
                    <div className="form-item">
                      <Form.Item
                        label={data.label}
                        {...formItemLayout}
                        labelAlign={this.props.labelAlign}
                      >
                        <DatePicker
                          style={{ width: data.options.width }}
                          size={this.props.size}
                          showTime={data.options.format === "YYYY-MM-DD HH:mm"}
                          format={data.options.format}
                        />
                      </Form.Item>
                    </div>
                  );
                case "switch":
                  return (
                    <div className="form-item">
                      <Form.Item
                        label={data.label}
                        {...formItemLayout}
                        labelAlign={this.props.labelAlign}
                      >
                        <Switch checked={defaultValue} size={this.props.size} />
                      </Form.Item>
                    </div>
                  );
                case "title":
                  return (
                    <div className="form-item">
                      <p
                        style={{
                          fontSize: data.options.fontSize,
                          color: data.options.color,
                          textAlign: data.options.textAlign,
                          fontWeight: data.options.fontWeight,
                        }}
                      >
                        {data.label}
                      </p>
                    </div>
                  );
                default:
                  break;
              }
            })()}
            {isActive && (
              <div style={{ position: "absolute", right: "0", bottom: "0" }}>
                <span
                  className="iconfont icon-fuzhi"
                  title="复制"
                  style={{
                    fontSize: "20px",
                    cursor: "pointer",
                    marginRight: "5px",
                  }}
                  onClick={() => {
                    let newFormItem = { ...data };
                    newFormItem.id = `content-${this.getKey()}---${
                      content.length
                    }`;
                    newFormItem.code = `code_${this.getKey()}${this.getKey()}`;
                    delete newFormItem.icon;
                    content.splice(this.props.index + 1, 0, newFormItem);
                    this.props.setFormActiveId(newFormItem.id);
                    this.props.setFormContent(content);
                  }}
                ></span>
                <span
                  className="iconfont icon-shanchu"
                  title="删除"
                  style={{ fontSize: "20px", cursor: "pointer" }}
                  onClick={() => {
                    if (content.length > 1) {
                      this.props.setFormActiveId(
                        content[this.props.index - 1].id
                      );
                    }
                    content.splice(this.props.index, 1);
                    this.props.setFormContent(content);
                  }}
                ></span>
              </div>
            )}
          </div>
        )}
      </Draggable>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  state,
});

const mapDispatchToProps = (dispatch: any) => ({
  setFormActiveId: (activeId: string) =>
    dispatch(action.setFormActiveId(activeId)),
  setFormContent: (content: any[]) => dispatch(action.setFormContent(content)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormItem);
