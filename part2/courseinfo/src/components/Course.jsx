import React from 'react'

const Header = ({ header }) => {
  return(
    <div> 
      <h2>{header}
      </h2>
      </div>
  )
}

const Part = ({ part }) => {
  return(
    <div>
        <li>{part.name} {part.exercises}</li>
    </div>
  )
}

const Content = ({ parts }) => {
  return (
  <div>
    {parts.map(part => <Part key={part.id} part={part} />)}
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
  const exerciseCount = (accumulator, currentValue) => accumulator + currentValue.exercises;
  
  return(
    <div>
    <Header header={course.name} />
    <Content parts={course.parts} />
    <Total total = {course.parts.reduce(exerciseCount, 0)} />
    </div>
  )
}

export default Course;