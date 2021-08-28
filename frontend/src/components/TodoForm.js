import React from 'react'


class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'name': '',
            'text': '',
            'users': [],
            'projects': []
        }
    }
        handleChange(event) {
            this.setState({
                    [event.target.name]: event.target.value
                })
        }

        handleUserChange(event) {
            if (!event.target.selectedOptions) {
                this.setState({
                    'users': []
                })
                return;
            }

            let users = []
            for(let i=0; i < event.target.selectedOptions.length; i++) {
                users.push(event.target.selectedOptions.item(i).value)
            }
            this.setState({
                'users': users
            })
        }

        handleProjectChange(event) {
            if (!event.target.selectedOptions) {
                this.setState({
                    'projects': []
                })
                return;
            }

            let projects = []
            for(let i=0; i < event.target.selectedOptions.length; i++) {
                projects.push(event.target.selectedOptions.item(i).value)
            }
            this.setState({
                'projects': projects
            })
        }

        handleSubmit(event) {
            this.props.createTodo(this.state.name, this.state.text, this.state.users, this.state.projects)
            event.preventDefault()
        }
        render()
        {
            return (
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <input type="text" name="name" placeholder="name" value={this.state.name} onChange={(event) => this.handleChange(event)}/>
                    <input type="text" name="text" placeholder="text" value={this.state.text} onChange={(event) => this.handleChange(event)}/>
                    <select multiple name="users" onChange={(event) => this.handleUserChange(event)} >
                        {this.props.users.map((user) => <option value={user.id}> {user.username} </option>)}
                    </select>
                    <select multiple name="projects" onChange={(event) => this.handleProjectChange(event)} >
                        {this.props.projects.map((project) => <option value={project.id}> {project.name} </option>)}
                    </select>
                    <input type="submit" value="Create"/>
                </form>
            );
        }
    }


export default TodoForm