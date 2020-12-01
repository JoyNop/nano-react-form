// @flow
import React, { Component } from 'react';


import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

 

 

type Props = {
  title: string,
  index: number,  
  quotes?: any
};

export default class Column extends Component<Props> {
  render() {
    const title: string = this.props.title;
    const quotes: any = this.props.quotes;
    const index: number = this.props.index;
    return (
      <Draggable draggableId={title} index={index}>
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
          <div ref={provided.innerRef} {...provided.draggableProps}>
           <div>
             {Math.random()}
           </div>
            {/* <QuoteList
              listId={title}
              listType="QUOTE"
              style={{
                backgroundColor: snapshot.isDragging ? colors.G50 : null,
              }}
              quotes={quotes}
              internalScroll={this.props.isScrollable}
              isCombineEnabled={Boolean(this.props.isCombineEnabled)}
              useClone={Boolean(this.props.useClone)}
            /> */}
          </div>
        )}
      </Draggable>
    );
  }
}
