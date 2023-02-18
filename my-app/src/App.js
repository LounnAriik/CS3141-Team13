import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './App.css';

const listOfAvailableClasses = [
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

const listOfCurrentClasses = [
  {
    id: 'prog',
    name: 'Current Class 1',
    
  },
  {
    id: 'calc',
    name: 'Current Class 2',
 
  },
  {
    id: 'comp',
    name: 'Current Class 3',
   
  },
  {
    id: 'chem',
    name: 'Current Class 4',
   
  },
  {
    id: 'elec',
    name: 'Current Class 5',
    
  }
]

function App() {
  const [availableclasses, updateCharacters] = useState(listOfAvailableClasses);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(availableclasses);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='Current'>Current Classes</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="classes">
            {(provided) => (
              <ul className="classes" {...provided.droppableProps} ref={provided.innerRef}>
                {availableclasses.map(({id, name}, index) => {
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
        <h1 className='Avaliable'>Avaliable Courses</h1>
         <table></table>

         
        <h1 className='Taken'>Taken Courses</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="taken">
            {(provided) => (
              <ul className="taken" {...provided.droppableProps} ref={provided.innerRef}>
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