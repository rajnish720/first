import {Draggable, Droppable, DragDropContext} from 'react-beautiful-dnd';
import { useState } from 'react';

function DraggingDrop() {

  const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));

  // a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;
const [items, setItems] = useState(getItems(2));

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});



const onDragEnd = (result) => {
  // dropped outside the list
  if (!result.destination) {
    return;
  }

  const newItems = reorder(
    items,
    result.source.index,
    result.destination.index
  );

  return setItems(newItems)
}


  return (
    <div className="DraggingDrop">
      <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="sidebar">
       {(provided, snapshot) => (
        <div
        {...provided.droppableProps}
        ref = {provided.innerRef}
        style={getListStyle(snapshot.isDraggingOver)}
        >
            <Draggable key={1} draggableId={1} index={1}>
            {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <div>element 1</div>
                    </div>
                  )}
            </Draggable>
            <Draggable key={2} draggableId={2} index={2}>
            {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <div>element 2</div>
                    </div>
                  )}
            </Draggable>
                {provided.placeholder}
        </div>
       )}
    </Droppable>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
              <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default DraggingDrop;
