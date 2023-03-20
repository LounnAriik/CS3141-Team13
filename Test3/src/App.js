import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "uuid/v4";
import './App.css';
import Search from "./search";
import data from "./response_1678212061808.json"

// Array for buildCourseByTransfer
let transferArray = new Array();

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


var hardCodedRegistrationClass = "3";
var hardCodedSemester = "1";

const columnsFromBackend = {
  [0]: {
    name: "Avaliable Courses",
    items: referenceAvailableCourses(hardCodedRegistrationClass, hardCodedSemester)
  },
  [1]: {
    name: "Course Workspace",
    items: referenceWorkspaceCourses(hardCodedRegistrationClass, hardCodedSemester)
  },
  [2]: {
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

  if (registrationClass == "1" && semester == "1") {
      return firstYearFallCourses;
  }
  if (registrationClass == "1" && semester == "2") {
    return firstYearSpringCourses;
  }
  if (registrationClass == "2" && semester == "1") {
    return secondYearFallCourses;
  }
  if (registrationClass == "2" && semester == "2") {
    return secondYearSpringCourses;
  }
  if (registrationClass == "3" && semester == "1") {
    return thirdYearFallCourses;
  }
  if (registrationClass == "3" && semester == "2") {
    return thirdYearSpringCourses;
  }
  if (registrationClass == "4" && semester == "1") {
    return fourthYearFallCourses;
  }
  if (registrationClass == "4" && semester == "2") {
    return fourthYearSpringCourses;
  }  

}

function referenceWorkspaceCourses(registrationClass, semester){

  if (registrationClass == "1" && semester == "1") {
      return [];
  }
  if (registrationClass == "1" && semester == "2") {
    return [];
  }
  if (registrationClass == "2" && semester == "1") {
    return [];
  }
  if (registrationClass == "2" && semester == "2") {
    return [];
  }
  if (registrationClass == "3" && semester == "1") {
    return [];
  }
  if (registrationClass == "3" && semester == "2") {
    return [];
  }
  if (registrationClass == "4" && semester == "1") {
    return [];
  }
  if (registrationClass == "4" && semester == "2") {
    return [];
  }  

}


function referenceTakenCourses(registrationClass, semester){

  if (registrationClass == "1" && semester == "1") {
      return [];
  }
  if (registrationClass == "1" && semester == "2") {
    return firstYearFallCourses;
  }
  if (registrationClass == "2" && semester == "1") {
    return firstYearSpringCourses;
  }
  if (registrationClass == "2" && semester == "2") {
    return secondYearFallCourses;
  }
  if (registrationClass == "3" && semester == "1") {
    return secondYearSpringCourses;
  }
  if (registrationClass == "3" && semester == "2") {
    return thirdYearFallCourses;
  }
  if (registrationClass == "4" && semester == "1") {
    return thirdYearSpringCourses;
  }
  if (registrationClass == "4" && semester == "2") {
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
  // Opens popup windows to get user inputs
  let COLLEGE = prompt("Enter the name of the college transfering from:", "");
  let SUBJECT = prompt("Enter the subject of the course from the transfering college:", "");
  let CRSE = prompt("Enter the crse of the course from the transfering college:", "");
  // Loops through array looking for item matching user inputs
  for (var i = 0; i < transferArray.length; i++) {
    // Checks if array item matches user inputs
    if (transferArray[i].fromCollege == COLLEGE
    && transferArray[i].fromSubject == SUBJECT 
    && transferArray[i].fromCRSE == CRSE) {
      // Checks if chosen item is an actual class
      if (transferArray[i].title == ("Unassigned Transfer" || "No Course Equivalent")) {
        text = "No Course Equivalent or Unassigned Transfer";
        break;
      } else {
        columnsFromBackend[2].items.push({ id: uuid(), content:"" + transferArray[i].title + ""});
        text = "Course Added";
        break;
      }
    } else {
      text = "Invalid Input(s)";
    }
  }
  // Prints outcome text
  alert(text);
}

function getTransferArray() {
  var RequestURL = "https://api.michigantechcourses.com/transfer-courses?updatedSince=2020-01-01T11%3A45%3A01.733Z";
  var Request = new XMLHttpRequest();

  Request.onload = function() {
    transferArray = JSON.parse(Request.responseText);
  }

  Request.open("GET", RequestURL, true);
  Request.send();
}

function searchList() {
  return (
    <Scroll>
      <SearchList filteredClasses={data.filter} />
    </Scroll>
  );
}


function updateCourseColumns(){

  var semesterSelected = 1;
  var yearSelected = 1;

  if (document.getElementById("YearSelect").value != null) {
    yearSelected = document.getElementById("YearSelect").value;
  }

  if (document.getElementById("SemesterSelect").value != null) {
    semesterSelected = document.getElementById("SemesterSelect").value;
  }
  
  columnsFromBackend[0].items = referenceAvailableCourses(yearSelected, semesterSelected);
  columnsFromBackend[1].items = referenceWorkspaceCourses(yearSelected, semesterSelected);
  columnsFromBackend[2].items = referenceTakenCourses(yearSelected, semesterSelected);

  console.log(columnsFromBackend[0]);
  console.log(columnsFromBackend[1]);
  console.log(columnsFromBackend[2]);

  
}



function App() {
  const [query, setQuery] = useState("")
  const [columns, setColumns] = useState(columnsFromBackend);
  useEffect(() => {getTransferArray()},[]);

  return (
   <div>
    <div>
        
        <input placeholder="Enter class title" onChange={event => setQuery(event.target.value)} />
      { data.filter(classes => {
        if (classes.subject != 'CS'){
          return null;
        }
        if (query === ''){
          return null;
        }
       //if (classes.title.toLowerCase().includes(query.toLowerCase())) {
        //  return classes ;
        //}
        if (classes.crse.includes(query)) {
          return classes;  
      }
      
      }).map((classes, index) => (
        <div className="box" key={index}>
          <p>{classes.title}</p>
          <p>{classes.subject + " " + classes.crse}</p>
        </div>
      ))} 
  </div>

    <div className = 'head' style={{ display: "flex", justifyContent: "center", height: "100%"}}>
    
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
       <header>
        <div class='list'>
            
            <input placeholder="Enter class title" onChange={event => setQuery(event.target.value)} />
          { data.filter(classes => {
            if (query === ''){
              return null;
            }
            if (classes.title.toLowerCase().includes(query.toLowerCase())) {
              return classes ;
            }
            if (classes.crse.includes(query) && classes.subject.includes(query)) {
              return classes;  
          }
          
          }).map((classes, index) => (
            <div className="box" key={index}>
              <p>{classes.title}</p>
              <p>{classes.subject + " " + classes.crse}</p>
            </div>
          ))}
          
    </div>
        <a class = "transfer" onClick={() => {buildCourseByTransfer()}}>Transfer</a> 
        <a class = "yearselect" onClick={() => {updateCourseColumns()}}>Select Year</a>
            <div class="yearselect-content">
              <option value="">Year 1</option>
              <option value="">Year 2</option>
              <option value="">Year 3</option>
              <option value="">Year 4</option>
            </div>
        <a class = "semesterselect" onClick={() => {updateCourseColumns()}}>Select Semester</a>
        <div class="semesterselect-content">
              <option value="">Fall Semester</option>
              <option value="">Spring Semester</option>
              <option value="">Summer Semester</option>
            </div>
        <a class ="help" href="#">Help</a>
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
              <div style={{display:"flex", marginLeft: "50px", marginRight: "50px" }}>
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
    </div>
    
  );
  
}

export default App;
