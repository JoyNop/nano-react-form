/*
 * @Author: HanRui(JoyNop)
 * @Date: 2020-11-30 14:29:17
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2020-12-03 16:17:42
 * @Description: file content
 */

import {   PlusCircleOutlined } from '@ant-design/icons';
import React, { Component } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import * as style from "./form.module.less";



interface SeedProps{
  data:any 
  index:number
}
export default class Seed extends Component <SeedProps>{
    render() {
        return (
            <Draggable
                draggableId={this.props.data.id}
                index={this.props.index}
            // isDragDisabled={isDragDisabled}
            >
                {(provided, snapshot) => (
                    <div
                        className={style.seed_cell}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        // draggable={false}
                        // isDragging={snapshot.isDragging}

                    >
                        <div className={style.seed}>
                            <span className={style.iconfont} ><PlusCircleOutlined/></span>
                            {this.props.data.label}
                        </div>
                    </div>
                )}
            </Draggable>
        )
    }
}