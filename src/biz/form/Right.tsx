/*
 * @Author: HanRui(JoyNop)
 * @Date: 2020-12-01 09:56:34
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2020-12-01 17:59:37
 * @Description: file content
 */
import { AppState } from "@/store";
import { Radio, Tabs } from "antd";
import React, { Component } from "react";
import * as style from "./form.module.less";

import { connect } from "react-redux";
import * as common from "@/utils/common";
import * as action from "./service/formActions";
import {
  NanoCheckbox,
  NanoDate,
  NanoInput,
  NanoRadio,
  NanoSelect,
  NanoSwitch,
  NanoTextArea,
  NanoTitle,
} from "./config/Index";

interface RightStoreProps {
  state: AppState;
  setFormActiveId: (activeId: string) => void;
  setFormContent: (content: any[]) => void;
  updateFormConfig: (key: string, value: string) => void;
}

interface RightProps extends RightStoreProps {
  // update
}
class Right extends Component<RightProps> {
  private updateConfig = (key: string, value: any) => {
    this.props.updateFormConfig(key, value);
  };

  private updateItem = (key: string, value: any) => {
    const { activeId, content } = this.props.state.form;
    let target = content.find((el) => el.id === activeId);
    if (key === "label") {
      target.label = value;
    } else {
      target.options[key] = value;
    }
    this.props.setFormContent(content);
  };

  render() {
    const { config, content, activeId } = this.props.state.form;

    console.warn("activeId, content", activeId, content);

    return (
      <div className={style.right}>
        <h3 className={style.right_title}>表单配置</h3>
        <Tabs defaultActiveKey="2" style={{ padding: "8px" }}>
          <Tabs.TabPane tab="字段属性" key="1">
            {(() => {
              if (common.isEmpty(activeId)) return;
              const target = content.find((el) => el.id === activeId);
              if (target)
                switch (target.type) {
                  case "input":
                    return (
                      <NanoInput item={target} callback={this.updateItem} />
                    );
                  case "textarea":
                    return (
                      <NanoTextArea item={target} callback={this.updateItem} />
                    );
                  case "radio":
                    return (
                      <NanoRadio item={target} callback={this.updateItem} />
                    );
                  case "checkbox":
                    return (
                      <NanoCheckbox item={target} callback={this.updateItem} />
                    );
                  case "select":
                    return (
                      <NanoSelect item={target} callback={this.updateItem} />
                    );
                  case "switch":
                    return (
                      <NanoSwitch item={target} callback={this.updateItem} />
                    );
                  case "date":
                    return (
                      <NanoDate item={target} callback={this.updateItem} />
                    );
                  case "title":
                    return (
                      <NanoTitle item={target} callback={this.updateItem} />
                    );
                  default:
                    break;
                }
            })()}
          </Tabs.TabPane>
          <Tabs.TabPane tab="表单属性" key="2">
            <div style={{ marginBottom: "15px" }}>
              <p style={{ marginBottom: "5px" }}>表单布局：</p>
              <Radio.Group
                value={config.layout}
                buttonStyle="solid"
                size="small"
                onChange={(e) => this.updateConfig("layout", e.target.value)}
              >
                <Radio.Button value="horizontal">水平</Radio.Button>
                <Radio.Button value="vertical">垂直</Radio.Button>
                <Radio.Button value="inline">行内</Radio.Button>
              </Radio.Group>
            </div>
            <div style={{ marginBottom: "15px" }}>
              <p style={{ marginBottom: "5px" }}>标签对齐方式：</p>
              <Radio.Group
                value={config.labelAlign}
                buttonStyle="solid"
                size="small"
                onChange={(e) =>
                  this.updateConfig("labelAlign", e.target.value)
                }
              >
                <Radio.Button value="left">左对齐</Radio.Button>
                <Radio.Button value="right">右对齐</Radio.Button>
              </Radio.Group>
            </div>
            <div style={{ marginBottom: "15px" }}>
              <p style={{ marginBottom: "5px" }}>控件大小：</p>
              <Radio.Group
                value={config.size}
                buttonStyle="solid"
                size="small"
                onChange={(e) => this.updateConfig("size", e.target.value)}
              >
                <Radio.Button value="large">大</Radio.Button>
                <Radio.Button value="default">中</Radio.Button>
                <Radio.Button value="small">小</Radio.Button>
              </Radio.Group>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
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
  updateFormConfig: (key: string, value: string) =>
    dispatch(action.updateFormConfig(key, value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Right);
