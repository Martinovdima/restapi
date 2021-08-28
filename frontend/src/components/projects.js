import React from 'react'
import {Link} from 'react-router-dom'


const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td><Link to={`project/${project.id}`}>{project.id}</Link></td>
            <td>{project.name}</td>
            <td>{project.link}</td>
            <td>{project.users}</td>
            <td>
                <button onClick={() => deleteProject(project.id)} type='button'>Delete</button>
            </td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject}) => {
    return (
        <table>
            <th>id</th>
            <th>name</th>
            <th>link</th>
            <th>users</th>
            <th></th>
            {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
        </table>
    )
}
export default ProjectList