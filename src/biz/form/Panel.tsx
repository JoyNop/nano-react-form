import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import initialData from "./initialData";
import Left from "./Left";
import * as style from "./form.module.less";
import Mid from "./Mid";

import { connect } from "react-redux";
import { AppState } from "@/store";

import * as action from "./service/formActions";
import Right from "./Right";

 
interface PanelProps {
  state: AppState;
  setFormActiveId: (activeId: string) => void;
  setFormContent: (content: any[]) => void;
}
class Panel extends Component<PanelProps> {
  public state = initialData;
  _index = 0;
  getKey = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    const { content } = this.props.state.form;

    console.warn(
      "destination, source, draggableId",
      destination,
      source,
      draggableId
    );
    let start: any;
    if (source.droppableId.indexOf("seeds") !== -1) {
      start = { ...this.state.seeds[0].items[source.index] };
    }
    if (source.droppableId.indexOf("content") !== -1) {
      start = { ...content[source.index] };
    }

    if (!destination) {
      // 表单原先为空
      start.id = `content-${this.getKey()}---${content.length}`;
      start.code = `code_${this.getKey()}${this.getKey()}`;
      delete start.icon;
      content.splice(0, 0, start);
    } else {
      if (destination.droppableId.indexOf("seeds") !== -1) return; // 任何地方拖放到菜单，不处理

      const finish = { ...content[destination.index] }; // 结束地必是表单面板
      const startIndex = source.index;
      const finishIndex = destination.index;
      console.warn("finishIndex", finishIndex);

      if (finish && start.id === finish.id) return; // 无拖动

      if (source.droppableId.indexOf("content") !== -1) {
        // 起点在表单面板
        console.warn("start", start);
        content.splice(startIndex, 1);
        content.splice(finishIndex, 0, start);
      } else if (source.droppableId.indexOf("seeds") !== -1) {
        // 起点在菜单
        start.id = `content-${this.getKey()}---${content.length}`;
        start.code = `code_${this.getKey()}${this.getKey()}`;
        delete start.icon;
        content.splice(finishIndex, 0, start);
      }
    }
    console.warn("最新content", content);
    this.props.setFormActiveId(start.id);
    this.props.setFormContent(content);
  };

  // private updateConfig = (type: any, key: any, value: any) => {
  //   console.log("type, key, value", type, key, value);
  //   if (type === "2") {
  //     // 更新表单配置
  //     let { config } = this.state as any;
  //     config[key] = value;
  //     this.setState({ config });
  //   }
  // };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className={style.form_design_panel}>
          <Left items={this.state.seeds} />
          <Mid config={this.state.config} />
          <Right
          // callback={this.updateConfig}
          />
        </div>
      </DragDropContext>
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

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
