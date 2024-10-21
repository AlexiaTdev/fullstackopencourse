const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}
const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  return (
    <>
      {(props.parts).map((part) => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
    </>
  ) 
}


const Total = (props) => {
  return (
    <p style={{fontWeight : 'bold'}}>total of {props.parts.reduce((acc, cur) => acc+cur.exercises, 0)} exercises</p>
  )
}

const Course = (props) => {
  return (
    <>
      <Header name={props.course.name}/>
      <Content parts={props.course.parts}/>
      <Total parts={props.course.parts} />
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      {courses.map((course) => <Course key={course.id} course={course} />)}
    </>
  )
}

export default App