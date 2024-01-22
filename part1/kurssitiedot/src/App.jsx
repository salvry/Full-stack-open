import React from 'react'

const Header = ({ header }) => {
  return(
    <div> 
      <h2>{header}</h2>
      </div>
  )
}

const Part = ({ name, exercises }) => {
  return(
  <li>{name} {exercises}</li>
  )
}

const Content = ({ parts }) => {
  return (
  <div>
    <ul>
    <Part name={parts[0].name} exercises={parts[0].exercises}/>
    <Part name={parts[1].name} exercises={parts[1].exercises}/>
    <Part name={parts[2].name} exercises={parts[2].exercises}/>
    </ul>
    </div>
  )
}

const Total = ({ total })  => {
  return(
    <div>
      <h3>total of {total} exercises</h3>
    </div>
  )
}

const Course = ({ course }) => {
  return(
    <div>
    <Header header={course.name} />
    <Content parts={course.parts}/>
    <Total total={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}/>
    </div>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
 
  return (
  <div>
    <h1> Web development</h1>
    <Course course={course} />
    </div>
    )
  }
  export default App;