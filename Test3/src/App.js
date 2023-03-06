import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "uuid/v4";
import './App.css';

const firstYearFallCourses = [
  { id: uuid(), content: "Intro to CS" },
  { id: uuid(), content: "Calculus" },
  { id: uuid(), content: "Composition" },
  { id: uuid(), content: "Intro to Chemistry" },
  { id: uuid(), content: "Technical Elective" }
];

const firstYearSpringCourses = [
  { id: uuid(), content: "Intro to Programming II" },
  { id: uuid(), content: "Calculus II" },
  { id: uuid(), content: "Global Issues" },
  { id: uuid(), content: "Discrete Structures" },
  { id: uuid(), content: "Co-Curricular" }
];

const secondYearFallCourses = [
  { id: uuid(), content: "Data Structures" },
  { id: uuid(), content: "HW/SW Interface Programming" },
  { id: uuid(), content: "Formal Models of Computation" },
  { id: uuid(), content: "Statistical Methods" },
  { id: uuid(), content: "HASS Elective" }
];

const secondYearSpringCourses = [
  { id: uuid(), content: "Intro to Database Systems" },
  { id: uuid(), content: "Team Software Project" },
  { id: uuid(), content: "Elective Math" },
  { id: uuid(), content: "HASS Elective" },
  { id: uuid(), content: "Co-Curricular" }
];

const thirdYearFallCourses = [
  { id: uuid(), content: "Concurrent Computing" },
  { id: uuid(), content: "Computer Organization" },
  { id: uuid(), content: "Ethical/Social Aspects of Computing" },
  { id: uuid(), content: "CS Elective" },
  { id: uuid(), content: "Co-Curricular" }
];

const thirdYearSpringCourses = [
  { id: uuid(), content: "Systems Programming" },
  { id: uuid(), content: "CS Elective" },
  { id: uuid(), content: "HASS Elective" },
  { id: uuid(), content: "Technical Elective" },
  { id: uuid(), content: "Co-Curricular" }
];

const fourthYearFallCourses = [
  { id: uuid(), content: "Intro to Algorithms" },
  { id: uuid(), content: "CS Elective" },
  { id: uuid(), content: "Technical Elective" },
  { id: uuid(), content: "Co-curricular" }
];

const fourthYearSpringCourses = [
  { id: uuid(), content: "Programming Languages" },
  { id: uuid(), content: "Technical Elective" },
  { id: uuid(), content: "CS Elective" },
  { id: uuid(), content: "Technical and Professional Communication" },
  { id: uuid(), content: "Technology and Society Elective" }
];


var hardCodedRegistrationClass = "Third Year";
var hardCodedSemester = "Spring";

const columnsFromBackend = {
  [0]: {
    name: "Avaliable Courses",
    items: referenceAvailableCourses(hardCodedRegistrationClass, hardCodedSemester)
  },
  [uuid()]: {
    name: "Course Workspace",
    items: referenceWorkspaceCourses(hardCodedRegistrationClass, hardCodedSemester)
  },
  [uuid()]: {
    name: "Taken Courses",
    items: referenceTakenCourses(hardCodedRegistrationClass, hardCodedSemester)
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

function clickClass(){
  var timestamp = new Date();
  console.log(timestamp);
}

function referenceAvailableCourses(registrationClass, semester){

  if (registrationClass == "First Year" && semester == "Fall") {
      return firstYearFallCourses;
  }
  if (registrationClass == "First Year" && semester == "Spring") {
    return firstYearSpringCourses;
  }
  if (registrationClass == "Second Year" && semester == "Fall") {
    return secondYearFallCourses;
  }
  if (registrationClass == "Second Year" && semester == "Spring") {
    return secondYearSpringCourses;
  }
  if (registrationClass == "Third Year" && semester == "Fall") {
    return thirdYearFallCourses;
  }
  if (registrationClass == "Third Year" && semester == "Spring") {
    return thirdYearSpringCourses;
  }
  if (registrationClass == "Fourth Year" && semester == "Fall") {
    return fourthYearFallCourses;
  }
  if (registrationClass == "Fourth Year" && semester == "Spring") {
    return fourthYearSpringCourses;
  }  

}

function referenceWorkspaceCourses(registrationClass, semester){

  if (registrationClass == "First Year" && semester == "Fall") {
      return [];
  }
  if (registrationClass == "First Year" && semester == "Spring") {
    return [];
  }
  if (registrationClass == "Second Year" && semester == "Fall") {
    return [];
  }
  if (registrationClass == "Second Year" && semester == "Spring") {
    return [];
  }
  if (registrationClass == "Third Year" && semester == "Fall") {
    return [];
  }
  if (registrationClass == "Third Year" && semester == "Spring") {
    return [];
  }
  if (registrationClass == "Fourth Year" && semester == "Fall") {
    return [];
  }
  if (registrationClass == "Fourth Year" && semester == "Spring") {
    return [];
  }  

}


function referenceTakenCourses(registrationClass, semester){

  if (registrationClass == "First Year" && semester == "Fall") {
      return [];
  }
  if (registrationClass == "First Year" && semester == "Spring") {
    return firstYearFallCourses;
  }
  if (registrationClass == "Second Year" && semester == "Fall") {
    return firstYearSpringCourses;
  }
  if (registrationClass == "Second Year" && semester == "Spring") {
    return secondYearFallCourses;
  }
  if (registrationClass == "Third Year" && semester == "Fall") {
    return secondYearSpringCourses;
  }
  if (registrationClass == "Third Year" && semester == "Spring") {
    return thirdYearFallCourses;
  }
  if (registrationClass == "Fourth Year" && semester == "Fall") {
    return thirdYearSpringCourses;
  }
  if (registrationClass == "Fourth Year" && semester == "Spring") {
    return fourthYearFallCourses;
  }  

}


// This function is intended to build the list of classes offered for a particular semester and year
function buildCourseByYearSelect(year, semester){

  HTTPRequestURL = "https://api.michigantechcourses.com/courses?year=" + year + "&semester=" + semester;
  
  // Build HTTP Request Body
  // Send Request
  // Set Response to a JSON array object
  // Parse JSON response
      // For each element in JSON array
          // itemsFromBackend = itemsFromBackend.AppendToArray({ id: uuid(), content: + element.CourseTitle + })
  
      // [body]?[value]?[45]?["title" eq "CS"]

  // Default Year and semester, will change with drop-down select
  registrationClass = "First Year"
  semester = "FALL"

  var year = new Date().getFullYear()
  console.log(year)

  HTTPRequestURL = "https://api.michigantechcourses.com/courses?year=" + year + "&semester=" + semester
  var HTTPRequest = new XMLHttpRequest()
  var HTTPResponse;

  HTTPRequest.open("GET", HTTPRequestURL)
  HTTPRequest.send

  if (HTTPRequest.responseText != null) {
    HTTPResponse = HTTPRequest.reponseText
    console.log(HTTPResponse)
  }
  
}

// This function is intended to build a class transfered from another school
function buildCourseByTransfer() {
  var text;
  var RequestURL = "https://api.michigantechcourses.com/transfer-courses?updatedSince=2020-01-01T11%3A45%3A01.733Z";
  var Request = new XMLHttpRequest();

  // Runs after api is loaded
  Request.onload = function() {
    // Opens popup windows to get user inputs
    let COLLEGE = prompt("Enter the name of the college transfering from:", "");
    let SUBJECT = prompt("Enter the subject of the course from the transfering college:", "");
    let CRSE = prompt("Enter the crse of the course from the transfering college:", "");
    // Converts api webpage to array
    var transferArray = JSON.parse(Request.responseText);
    // Loops through array looking for item matching user inputs
    for (var i = 0; i < transferArray.length; i++) {
      // Checks if array item matches user inputs
      if (transferArray[i].fromCollege == COLLEGE
      && transferArray[i].fromSubject == SUBJECT 
      && transferArray[i].fromCRSE == CRSE) {
        // Checks if chosen item is an actual class
        if (transferArray[i].title != ("Unassigned Transfer" && "No Course Equivalent")) {
          // Need to figure out how to create item and place into column
          // itemsFromBackend.push({ id: uuid(), content:"" + transferArray[i].title + ""});
          text = "Course Added";
          break;
        } else {
          text = "No Course Equivalent or Unassigned Transfer";
          break;
        }
      }
      // Code runs if no classes matching user inputs is found
      text = "Invalid Input(s)";
    }
    // Prints outcome text
    alert(text);
  }

  Request.open("GET", RequestURL, true);
  Request.send();
}


function App() {
  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <div className = 'head' style={{ display: "flex", justifyContent: "center", height: "100%"}}>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        
       <header>
        <a class = "transfer" onClick={() => {buildCourseByTransfer()}}>Transfer</a> 
        <nav>
          <ul class = "select">
            <li>
              <select>
                <option value="0">Select Year:</option>
                <option value="1">Year 1</option>
                <option value="2">Year 2</option>
                <option value="3">Year 3</option>
                <option value="4">Year 4</option>
              </select>
            </li>
            <li>
              <select>
                <option value="0">Select Semester:</option>
                <option value="1">Fall Semester</option>
                <option value="2">Spring Semester</option>
                <option value="3">Summer Semester</option>
              </select>
            </li>
          </ul>
        </nav>
        <a class ="about" href="#">About</a>
       </header>
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div class="courseList"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              key={columnId}
            >
              <h2  style={{userSelect:"none", color: "#D8DAD4"}}>{column.name}</h2>
              <div style={{display:"flex", margin: 80 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
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
                                      margin: "4px 2px 4px 2px",
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
