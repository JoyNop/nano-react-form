/*
 * @Author: HanRui(JoyNop)
 * @Date: 2020-11-30 14:35:12
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2020-12-03 17:12:40
 * @Description: file content
 */
import { connect } from "react-redux";
import * as common from "@/utils/common";
import * as action from "./service/formActions";
import * as style from "./form.module.less";

import React, { Component } from "react";
import FormItem from "./FormItem";
import { Droppable } from "react-beautiful-dnd";
import { Form, Modal, Switch, Radio } from "antd";
import { AppState } from "@/store";
import Preview from "./Preview";
import { Link } from "react-router-dom";

interface StoreProps {
  state: AppState;
  setFormClientMode: (mode: "phone"|"pc") => void
}

interface MidProps extends StoreProps {
  config: any;
  // form:any
}
class Mid extends Component<MidProps> {
  state = {
    visible: false,
  };
  handleSubmit = (e:any) => {
    Modal.info({
      width: '600px',
      title: '动态表单json数据',
      content: (
          <div >
              <div>
                  <span>表单配置(config)：</span>
                  <p><pre>{JSON.stringify(this.props.state.form.config, null, "\t")}</pre></p>
              </div>
              <div>
                  <span>表单项配置(content)：</span>
                  <p><pre>{JSON.stringify(this.props.state.form.content, null, "\t")}</pre></p>
              </div>
          </div>
      ),
      onOk() { },
  });
  };
  render() {
    const { config, content, mode } = this.props.state.form;
    return (
      <div className={style.mid} style={{ width: "calc(100% - 416px)" }}>
        <h3 className={style.mid_title}>表单内容</h3>
        <div style={{ width: "100%" }}>
          {common.isEmpty(content) ? (
            ""
          ) : (

            <div>

           
            <a
              style={{ float: "left" }}
              onClick={() => this.setState({ visible: true })}
            >
              点击预览
            </a>||
            <p><Link to="/s">单页面预览</Link></p>
             </div>
          )}
          <Radio.Group
            style={{ float: "right" }}
            onChange={(e) => {
              this.props.setFormClientMode(e.target.value)
            }}
            value={mode}
          >
            <Radio value="pc">PC模式</Radio>
            <Radio value="phone">手机模式</Radio>
          </Radio.Group>
        </div>
        <Droppable droppableId={"content"}>
          {(provided, snapshot) => {
            return (
              <div
                className={mode === "pc" ? style.mid_shell : style.mid_shell_phone}
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

        <Modal
          title="表单预览"
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={() => this.setState({ visible: false })}
          destroyOnClose
          okText="模拟提交"
        >
          <div>

          <Preview
            // ref="Preview"
            // config={this.props.store.config.get}
            // content={this.props.store.content.get}
            />
            </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  state,
});

const mapDispatchToProps = (dispatch: any) => ({
   
  setFormClientMode: (mode: "phone"|"pc") => dispatch(action.setFormClientMode(mode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Mid);
