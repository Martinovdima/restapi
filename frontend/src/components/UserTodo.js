import React from 'react'
import {useParams} from 'react-router-dom'


const TodoItem = ({item}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.text}</td>
            <td>{item.user}</td>
        </tr>
    )
}
const UserTodoList = ({items}) => {
    let { id } = useParams();
    let filtered_items = items.filter((item) => item.user.includes(parseInt(id)));
    return (
        <table>
            <tr>
                <th>id</th>
                <th>name</th>
                <th>text</th>
                <th>user</th>
            </tr>
            {filtered_items.map((item) => <TodoItem item={item}/>)}
        </table>
    )
}
export default UserTodoList

