/*
 * @Author: your name
 * @Date: 2020-06-01 11:41:44
 * @LastEditTime: 2020-06-03 11:35:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-form-design\src\container\column.js
 */

import React, { Component } from "react";
import Seed from "./Seed";
import { Droppable } from "react-beautiful-dnd";
interface LeftProps {
  items: any;
}

class Left extends Component<LeftProps> {
  render() {
    return (
      <div  style={{width:"100px"}}>
        {this.props.items.map((el: any, i: number) => (
          <React.Fragment key={i}>
            <h3 className="title">{el.title}</h3>
            <Droppable droppableId={el.id}>
              {(provided, snapshot) => {
                return (
                  <div
                    className="shell"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    // isDraggingOver={snapshot.isDraggingOver}
                  >
                    {el.items.map((el: any, index: number) => (
                      <Seed key={el.id} data={el} index={index} />
                    ))}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </React.Fragment>
        ))}
      </div>
    );
  }
}

export default Left;
