import React, { Component } from "react";
import { DragDropContext, Droppable, DroppableProvided } from "react-beautiful-dnd";
import initialData from "./initialData";
import Left from "./Left";
import "./form.module.less";
import Mid from "./Mid";
import Column from "./column";

export default class Panel extends Component {
  state = initialData;
  _index = 0;
  getKey = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
    let content: any;

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
    // this.props.store.activeId.set(start.id)
    // this.props.store.content.set(content)
  };

 

  render() {


    const board = (
      <Droppable
        droppableId="board"
        type="COLUMN"
        direction="horizontal"
        // ignoreContainerClipping={Boolean(containerHeight)}
        // isCombineEnabled={isCombineEnabled}
      >
        {(provided: DroppableProvided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {this.state.seeds[0].items.map((item, index) => (
              <div style={{border:"1px solid black",width:"100px"}} key ={index}>
                 
                <Column index={index} title={item.label} />
              </div>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );


    
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="form-design-panel">
          {board}
        </div>
      </DragDropContext>
    );
  }
}
