import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './App.css';

const listOfClasses = [
  {
    id: 'prog',
    name: 'Intro to Programming',
    
  },
  {
    id: 'calc',
    name: 'Calculus I',
 
  },
  {
    id: 'comp',
    name: 'Composition',
   
  },
  {
    id: 'chem',
    name: 'Intro to Chemistry',
   
  },
  {
    id: 'elec',
    name: 'Elective',
    
  }
]

function App() {
  const [classes, updateCharacters] = useState(listOfClasses);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(classes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Current Classes</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="classes">
            {(provided) => (
              <ul className="classes" {...provided.droppableProps} ref={provided.innerRef}>
                {classes.map(({id, name}, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <p>
                            { name }
                          </p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>
    </div>
  );
}

export default App;