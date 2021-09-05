const Header = ({ name }) => (
  <h1>{name}</h1>
)

const Part = ({ part: { name, exercises } }) => (
  <p>
    {name} {exercises}
  </p>
)

const Content = ({ parts }) => (
  <>
    {parts.map((p) => <Part key={p.id} part={p} />)}
  </>
)

const Total = ({ parts }) => (
  <p>
    <b>total of {parts.reduce((a, p) => a + p.exercises, 0)} exercises</b>
  </p>
)

const Course = ({ course }) => (
  <>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
)

export default Course