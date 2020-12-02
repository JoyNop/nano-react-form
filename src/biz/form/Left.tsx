/*
 * @Author: HanRui(JoyNop)
 * @Date: 2020-11-30 14:28:45
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2020-12-01 17:58:51
 * @Description: file content
 */
 

import React, { Component } from "react";
import Seed from "./Seed";
import { Droppable } from "react-beautiful-dnd";
import * as style from "./form.module.less";

interface LeftProps {
  items: any;
}

class Left extends Component<LeftProps> {
  render() {
    return (
      <div className={style.left}>
        {this.props.items.map((el: any, i: number) => (
          <React.Fragment key={i}>
            <h3 className={style.left_title}>{el.title}55</h3>
            <Droppable droppableId={el.id}>
              {(provided, snapshot) => {
                return (
                  <div
                    className={style.left_shell}
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
