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

export default Course