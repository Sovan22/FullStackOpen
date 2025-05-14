const Header = (props) => {
    return (
      <h1>{props.course.name}</h1>
    )
}


const Content = (props) => {
    const {course} = props
    return (
      <>
        {course.parts.map(p => <Part key = {p.id} part = {p.name} exercises = {p.exercises}/>)}
      </>
    )
  }


const Total = ({course}) =>{
    const parts = course.parts
    const total = parts.reduce((a,c) => {return a + c.exercises}, 0 )
    return (
        <>
        <p><strong>total of {total} exercises</strong></p>
        </>
    )
}

const Part = (props) =>{
    return (
        <p>
            {props.part} {props.exercises}
        </p>
    )
}


const Course = ({course}) =>{
    return (
        <div>
            <Header course = {course}/>
            <Content course = {course}/>
            <Total course  = {course}/>
        </div>
    )
}

export default Course