import React from 'react'
import {Link} from 'react-router-dom'



const TodoItem = ({todo, deleteTodo}) => {
    return (
        <tr>
            <td>{todo.id}</td>
            <td>{todo.project}</td>
            <td>{todo.name}</td>
            <td>{todo.text}</td>
            <td>{todo.user}</td>
            <td><button onClick={() => deleteTodo(todo.id)} type='button'>Delete</button></td>
        </tr>
    )
}
const TodoList = ({todo, deleteTodo}) => {
    return (
        <table>
            <th>id</th>
            <th>project</th>
            <th>name</th>
            <th>text</th>
            <th>user</th>
            <th></th>
            {todo.map((todo) => <TodoItem todo={todo} deleteTodo={deleteTodo}/>)}
        </table>
    )
}
export default TodoList