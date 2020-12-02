/*
 * @Author: your name
 * @Date: 2020-06-01 11:42:36
 * @LastEditTime: 2020-12-01 17:56:45
 * @LastEditors: HanRui(JoyNop)
 * @Description: In User Settings Edit
 * @FilePath: \react-form-design\src\container\Seed.js
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