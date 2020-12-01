/*
 * @Author: HanRui(JoyNop)
 * @Date: 2020-11-30 14:35:12
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2020-12-01 10:58:59
 * @Description: file content
 */
import { connect } from "react-redux";

import React, { Component } from "react";
import FormItem from "./FormItem";
import { Droppable } from "react-beautiful-dnd";
import { Form, Modal, Switch, Radio } from "antd";
import { AppState } from "@/store";

interface StoreProps {
  state: AppState;
}

interface MidProps extends StoreProps {
  config: any;
  // form:any
}
class Mid extends Component<MidProps> {
  state = {
    visible: false,
  };
  handleSubmit = () => {
    console.log(1);
  };
  render() {
    const { config, content, mode } = this.props.state.form;
    return (
      <div className="mid" style={{ width: "calc(100% - 416px)" }}>
        <h3 className="title">表单内容</h3>
        {/* <p style={{ width: "100%" }}>
          {" "}
          {common.isEmpty(content) ? (
            ""
          ) : (
            <a
              style={{ float: "left" }}
              onClick={() => this.setState({ visible: true })}
            >
              点击预览
            </a>
          )}
          <Radio.Group
            style={{ float: "right" }}
            onChange={(e) => {
              //  mode.set(e.target.value)
            }}
            value={mode}
          >
            <Radio value="pc">PC模式</Radio>
            <Radio value="phone">手机模式</Radio>
          </Radio.Group>
        </p> */}
        <Droppable droppableId={"content"}>
          {(provided, snapshot) => {
            return (
              <div
                className={mode === "pc" ? "shell" : "shell_phone"}
                ref={provided.innerRef}
                {...provided.droppableProps}
                // isDraggingOver={snapshot.isDraggingOver}
              >
                <Form
                  style={{ backgroundColor: "#FFF" }}
                  layout={config.layout as any}
                  labelAlign={config.labelAlign as any}
                  onFinish={this.handleSubmit}
                >
                  {content.map((el, i) => (
                    <FormItem
                      key={el.id}
                      data={el}
                      index={i}
                      // form={this.props.form}
                      layout={config.layout}
                      labelAlign={config.labelAlign}
                      size={config.size}
                    />
                  ))}
                </Form>
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>

        {/* <Modal
          title="表单预览"
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={() => this.setState({ visible: false })}
          destroyOnClose
          okText="模拟提交"
        >
          <Preview
            ref="Preview"
            config={this.props.store.config.get}
            content={this.props.store.content.get}
          />
        </Modal> */}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  state,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Mid);
