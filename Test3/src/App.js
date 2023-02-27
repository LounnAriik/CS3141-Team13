import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "uuid/v4";
import './App.css';

const itemsFromBackend = [
  { id: uuid(), content: "Intro to CS" },
  { id: uuid(), content: "Calculus" },
  { id: uuid(), content: "Composition" },
  { id: uuid(), content: "Intro to Chemistry" },
  { id: uuid(), content: "Elective" }
];

const columnsFromBackend = {
  [uuid()]: {
    name: "Avaliable Courses",
    items: itemsFromBackend
  },
 /* [uuid()]: {
    name: "Course Workspace",
    items: []
  },*/
  [uuid()]: {
    name: "Taken Courses",
    items: []
  }
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

console.log(new Date().getFullYear());
function clickClass(){
  console.log('click');
}


// This function is intended to build the list of classes offered for a particular semester and year
function buildCourseByYearSelect(registrationClass, semester){

  // Overview:
      // Build HTTP Request Body
      // Send Request
      // Set Response to a JSON array object
      // Parse JSON response
          // For each element in JSON array
          // itemsFromBackend = itemsFromBackend.AppendToArray({ id: uuid(), content: + element.CourseTitle + })
      // Resolve Response objects   
  
      // [body]?[value]?[45]?["title" eq "CS"]

  // Default Year, will change with drop-down select
  registrationClass = "First Year"

  var year = new Date().getFullYear();
  console.log(year);

  HTTPRequestURL = "https://api.michigantechcourses.com/courses?year=" + year + "&semester=" + semester;
  var HTTPRequest = new XMLHttpRequest();
  var HTTPResponse;

  HTTPRequest.open("GET", HTTPRequestURL);
  HTTPRequest.send

  if (HTTPRequest.responseText != null) {
    HTTPResponse = HTTPRequest.reponseText;
  }
  
}

function App() {
  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <div className = 'head' style={{ display: "flex", justifyContent: "right", height: "100%" }}>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >

        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              key={columnId}
            >
              <h2  style={{userSelect:"none", color: "#D8DAD4"}}>{column.name}</h2>
              <div style={{ margin: 80 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                  onClick={clickClass}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#1F395B",
                                      color: "#D8DAD4",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    {item.content}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
