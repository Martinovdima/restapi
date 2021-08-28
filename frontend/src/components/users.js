import React from 'react'
import {Link} from 'react-router-dom'


const UserItem = ({user}) => {
    return (
        <tr>
            <td><Link to={`user/${user.id}`}>{user.id}</Link></td>
            <td>{user.username}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
        </tr>
    )
}
const UserList = ({users}) => {
    return (
        <table>
            <th>id</th>
            <th>username</th>
            <th>first name</th>
            <th>last name</th>
            <th>mail</th>
            {users.map((user) => <UserItem user={user}/>)}
        </table>
    )
}
export default UserList

     //{users.map((users) => (<Main key={users.id}>)},
     //{users &&(users.map((users) => <Main key={users.id}>))}