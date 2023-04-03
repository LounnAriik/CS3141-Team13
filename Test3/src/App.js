import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "uuid/v4";
import './App.css';
import Search from "./search";
import data from "./response_1678212061808.json";
import './XMLCourses.xml';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

// Array for buildCourseByTransfer
let transferArray = new Array();

// These hard-coded arrays of courses are what we assume a student to have taken, and they will populate in the taken courses column.
const firstYearFallCourses= [
  { id: uuid(), content: "Intro to Programming I" },
  { id: uuid(), content: "Calculus with Technology I" },
  { id: uuid(), content: "Explorations in Computing" }
]

const firstYearSpringCourses = [
  { id: uuid(), content: "Intro to Programming I" },
  { id: uuid(), content: "Calculus with Technology I" },
  { id: uuid(), content: "Explorations in Computing" }
];

const secondYearFallCourses = [
  { id: uuid(), content: "Intro to Programming I" },
  { id: uuid(), content: "Calculus with Technology I" },
  { id: uuid(), content: "Explorations in Computing" },
  { id: uuid(), content: "Intro to Programming II" },
  { id: uuid(), content: "Calculus with Technology II" }

];

const secondYearSpringCourses = [
  { id: uuid(), content: "Intro to Programming I" },
  { id: uuid(), content: "Calculus with Technology I" },
  { id: uuid(), content: "Explorations in Computing" },
  { id: uuid(), content: "Intro to Programming II" },
  { id: uuid(), content: "Calculus with Technology II" },
  { id: uuid(), content: "Data Structures" },
  { id: uuid(), content: "Discrete Structures" },
  { id: uuid(), content: "Statistical Methods" }

];

const thirdYearFallCourses = [
  { id: uuid(), content: "Intro to Programming I" },
  { id: uuid(), content: "Calculus with Technology I" },
  { id: uuid(), content: "Explorations in Computing" },
  { id: uuid(), content: "Intro to Programming II" },
  { id: uuid(), content: "Calculus with Technology II" },
  { id: uuid(), content: "Data Structures" },
  { id: uuid(), content: "Discrete Structures" },
  { id: uuid(), content: "Statistical Methods" },
  { id: uuid(), content: "Programming at HW/SW Interface" },
  { id: uuid(), content: "Intro to Database Systems" },
  { id: uuid(), content: "Introduction to Linear Algebra" }

];

const thirdYearSpringCourses = [
  { id: uuid(), content: "Intro to Programming I" },
  { id: uuid(), content: "Calculus with Technology I" },
  { id: uuid(), content: "Explorations in Computing" },
  { id: uuid(), content: "Intro to Programming II" },
  { id: uuid(), content: "Calculus with Technology II" },
  { id: uuid(), content: "Data Structures" },
  { id: uuid(), content: "Discrete Structures" },
  { id: uuid(), content: "Statistical Methods" },
  { id: uuid(), content: "Programming at HW/SW Interface" },
  { id: uuid(), content: "Intro to Database Systems" },
  { id: uuid(), content: "Introduction to Linear Algebra" },
  { id: uuid(), content: "Systems Programming" },
  { id: uuid(), content: "Computer Organization" }

];

const fourthYearFallCourses = [
  { id: uuid(), content: "Intro to Programming I" },
  { id: uuid(), content: "Calculus with Technology I" },
  { id: uuid(), content: "Explorations in Computing" },
  { id: uuid(), content: "Intro to Programming II" },
  { id: uuid(), content: "Calculus with Technology II" },
  { id: uuid(), content: "Data Structures" },
  { id: uuid(), content: "Discrete Structures" },
  { id: uuid(), content: "Statistical Methods" },
  { id: uuid(), content: "Programming at HW/SW Interface" },
  { id: uuid(), content: "Intro to Database Systems" },
  { id: uuid(), content: "Introduction to Linear Algebra" },
  { id: uuid(), content: "Systems Programming" },
  { id: uuid(), content: "Computer Organization" },
  { id: uuid(), content: "Team Software Project" },
  { id: uuid(), content: "Formal Models of Computation" }

];

const fourthYearSpringCourses = [
  { id: uuid(), content: "Intro to Programming I" },
  { id: uuid(), content: "Calculus with Technology I" },
  { id: uuid(), content: "Explorations in Computing" },
  { id: uuid(), content: "Intro to Programming II" },
  { id: uuid(), content: "Calculus with Technology II" },
  { id: uuid(), content: "Data Structures" },
  { id: uuid(), content: "Discrete Structures" },
  { id: uuid(), content: "Statistical Methods" },
  { id: uuid(), content: "Programming at HW/SW Interface" },
  { id: uuid(), content: "Intro to Database Systems" },
  { id: uuid(), content: "Introduction to Linear Algebra" },
  { id: uuid(), content: "Systems Programming" },
  { id: uuid(), content: "Computer Organization" },
  { id: uuid(), content: "Team Software Project" },
  { id: uuid(), content: "Formal Models of Computation" },
  { id: uuid(), content: "Concurrent Computing" },
  { id: uuid(), content: "Introduction to Algorithms" }
  
];


var hardCodedRegistrationClass = "1";
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

function clickClass(content){
  var newArray = data.filter(function (el) {
    return el.title == content;
  });
  if (newArray.length == 0) {
    alert("There is no course by the name " + content);
  } else {
    var desc, min, max;
    var pre = "None";
    desc = newArray[0].description;
    min = newArray[0].minCredits;
    max = newArray[0].maxCredits;
    if (newArray[0].prereqs != null) {
      pre = newArray[0].prereqs;
    }
    alert("Description: " + desc);
    alert("Prereq(s): " + pre + "\n\nCredits(min): " + min + "\n\nCredits(max): " + max);
    calculateCredits();
  }
}

function calculateCredits() {
  var low = 0;
  var high = 0;
  for (var i = 0; i < columnsFromBackend[2].items.length; i++) {
    var newArray = data.filter(function (el) {
      return el.title == columnsFromBackend[2].items[i].content;
    });
    low += newArray[0].minCredits;
    high += newArray[0].maxCredits;
  }
  console.log(low);
  console.log(high);
}

function referenceAvailableCourses(registrationClass, semester){

  if (registrationClass == "1" && semester == "1") {
      return firstYearFallCourses;
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


var yearSelected = 1;
var semesterSelected = 1;
// Function to update the arrays of courses that make up the columns
function updateCourseColumns(clicked){

  var firstChar = clicked.charAt(0);
  console.log (firstChar);

  if (firstChar == 'y'){
    if (document.getElementById(clicked).value != null) {
      yearSelected = document.getElementById(clicked).value;
      console.log("print test: " + yearSelected);
    }
  }

  if (firstChar == 's'){
    if (document.getElementById(clicked).value != null) {
      semesterSelected = document.getElementById(clicked).value;
      console.log("print test: " + semesterSelected);
    }
  }

  var tempAvailableCourses = new Array;

  // Update the other course columns regularly
  columnsFromBackend[1].items = referenceWorkspaceCourses(yearSelected, semesterSelected);
  columnsFromBackend[2].items = referenceTakenCourses(yearSelected, semesterSelected);

  for (var i = 0; i < columnsFromBackend[0].items.length; i++){
    tempAvailableCourses[i] = columnsFromBackend[0].items[i];
  }
  columnsFromBackend[0].items = referenceAvailableCourses(yearSelected, semesterSelected);

  // Update the available course columns, but consider courses that are already in the available courses view.
  for (var i = 0; i < tempAvailableCourses.length; i++){

    // Consider the case that the available courses are in the taken courses. They should not be added if this is the case.
    for (var j in columnsFromBackend[2].items){
      
      for (var k in columnsFromBackend[0].items){

        // Condition to verify that the course being pushed to the available course column doesn't already exist in
        // That column and that it does not exist in the taken column.
        if (tempAvailableCourses[i] != j && tempAvailableCourses[i] != k){
          columnsFromBackend[0].items.push(tempAvailableCourses[i]);
        }
      }
    }
  }

}

function buildCourseBySearch(title) {
  columnsFromBackend[0].items.push({ id: uuid(), content:"" + title + ""});
}

function App() {
  const [query, setQuery] = useState("")
  const [columns, setColumns] = useState(columnsFromBackend);
  useEffect(() => {getTransferArray()},[]);
/*
  let component 
  switch(window.location.pathname){
    case"/":
      component = App 
      break
    case"/help":
      component = help 
    case"/about":
      component = about 
  }
*/
  return (

   <div>
    <div>
        <input placeholder="Enter CS class title or number" onChange={event => setQuery(event.target.value)} />
      { data.filter(classes => {
      if (query === ''){
        return null;
      }
      if (classes.subject != 'CS'){
        return null;
      }
      switch (semesterSelected == 1)
      {
        case true:
          if (classes.subject === 'CS' && classes.semester == 'FALL'){
            if (classes.title.toLowerCase().includes(query.toLowerCase()) || classes.crse.toString().includes(query.toString())) {
              return classes.title;
              }
          } else {
            return null;
          }

        case false:
          if (classes.subject === 'CS' && classes.semester == 'SPRING'){
            if (classes.title.toLowerCase().includes(query.toLowerCase()) || classes.crse.toString().includes(query.toString())) {
              return classes.title;
              }
          } else {
            return null;
          }
      }
      
      }).map((classes, index) => (
        <div className="box" key={index} onClick={() => {buildCourseBySearch(classes.title)}}>
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
        <a class = "transfer" onClick={() => {buildCourseByTransfer()}}>Transfer</a> 
        <li class = "yearselect">
            <a href="javascript:void(0)" class="ysbtn">Select Year</a>
            <div class="yearselect-content">
              <option id="y1" value="1" onClick={() => {updateCourseColumns("y1")}}>Year 1</option>
              <option id="y2" value="2" onClick={() => {updateCourseColumns("y2")}}>Year 2</option>
              <option id="y3" value="3" onClick={() => {updateCourseColumns("y3")}}>Year 3</option>
              <option id="y4" value="4" onClick={() => {updateCourseColumns("y4")}}>Year 4</option>
            </div>
        </li>
            
        <li class = "semesterselect"> 
            <a href="javascript:void(0)" class="ssbtn"> Select Semester</a>
            <div class="semesterselect-content">
              <option id="s1" value="1" onClick={() => {updateCourseColumns("s1")}}>Fall Semester</option>
              <option id="s2" value="2" onClick={() => {updateCourseColumns("s2")}}>Spring Semester</option>
            </div>
        </li>
        
        <a href="help.html" className="link">Help</a>
        <a href="about.html" className="link">About</a>
        
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

                        scrolling = "yes"
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
                                  onClick={() => {clickClass(item.content)}}
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
