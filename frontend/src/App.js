import React from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import logo from './logo.svg';
import './App.css';
import UserList from './components/users.js'
import ProjectList from './components/projects.js'
import TodoList from './components/todo.js'
import UserTodoList from './components/UserTodo.js'
import ProjectTodoList from './components/ProjectTodo.js'
import LoginForm from './components/LoginForm.js'
import Menu from './components/menu.js'
import Footer from './components/footer.js'
import {HashRouter, BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom'
import ProjectForm from "./components/ProjectForm";
import TodoForm from "./components/TodoForm";


const NotFound404 = ({location}) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todo': [],
            'token': ''
        }

    }

    is_auth() {
        return !!this.state.token
    }

    get_token_from_storage() {
        const cookie = new Cookies()
        this.setState({'token': cookie.get('token')}, this.get_data)
    }

    get_headers() {
        let header = {
            'Content-Type': 'application/json',
            'Accept': 'application/json; version=2.0'
        }
        const cookie = new Cookies()
        header['Authorization'] = 'Token ' + cookie.get('token')

        return header;
    }


    get_data() {
        const headers = this.get_headers()

        axios.get('http://127.0.0.1:8000/api/users/', {headers})
            .then(response => {
                const users = response.data
                this.setState(
                    {
                        'users': response.data.results
                    }
                )
            }).catch(error => {this.setState({ 'users': [] })
                console.log(error)
            }
        )

        axios.get('http://127.0.0.1:8000/api/projects/', {headers})
            .then(response => {
                const projects = response.data
                this.setState(
                    {
                        'projects': response.data.results
                    }
                )
            }).catch(error => {this.setState({ 'projects': [] })
                console.log(error)
            }
            )

        axios.get('http://127.0.0.1:8000/api/todo/', {headers})
            .then(response => {
                const todo = response.data
                this.setState(
                    {
                        'todo': response.data.results
                    }
                )
            }).catch(error => {this.setState({ 'todo': [] })
                console.log(error)
            }
            )

    }

    get_token(login, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/',
            {
                "username": login,
                "password": password
            })
            .then(
                response => {
                    const cookie = new Cookies()
                    cookie.set('token', response.data.token)
                    this.setState({'token': response.data.token}, this.get_data)
                }
            ).catch(
            error => console.log(error)
        )
    }

    logout() {
        const cookie = new Cookies()
        cookie.set('token', '')
        this.setState({'token': ''}, this.get_data)
    }

    componentDidMount() {
        this.get_token_from_storage()
    }

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
            .then(response => {
                this.setState({projects: this.state.projects.filter((projects)=>projects.id !== id)})
//                this.get_data()
            }).catch(error => {console.log(error)})
    }

    deleteTodo(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todo/${id}`, {headers})
            .then(response => {
                this.setState({todo: this.state.todo.filter((todo)=>todo.id !== id)})
//                this.get_data()
            }).catch(error => {console.log(error)})
    }

    createProject(name, link, users) {
        if (!name || !link || users.length==0) {
            console.log("Empty params:", name, link, users);
            return;
        }
        const headers = this.get_headers()
        axios.post(`http://127.0.0.1:8000/api/projects/`, {'name': name, 'link': link, 'users': users}, {headers})
            .then(response => {
                this.get_data()
            }).catch(error => {console.log(error)})
    }

    createTodo(name, text, users, projects) {
        console.log(name, text, users, projects)
        const headers = this.get_headers()
        axios.post(`http://127.0.0.1:8000/api/todo/`, {"name": name, "text": text,"users": users, "projects": projects}, {headers})
            .then(response => {
                this.get_data()
            }).catch(error => {console.log(error)})
    }


    render() {
        return (
            <div>
                <HashRouter>
                    < Menu/>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/'>Users</Link>
                            </li>
                            <li>
                                <Link to='/projects'>Projects</Link>
                            </li>
                            <li>
                                <Link to='/projects/create'>Create project</Link>
                            </li>
                            <li>
                                <Link to='/todo'>todo_</Link>
                            </li>
                            <li>
                                <Link to='/todo/create'>Create todo_</Link>
                            </li>
                            <li>
                                {this.is_auth() ? <button onClick={() => this.logout()}>Logout</button> : <Link to='/login'>Login</Link> }
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path='/' component={() => < UserList users={this.state.users}/>}/>
                        <Route exact path='/projects' component={() => < ProjectList projects={this.state.projects} deleteProject={(id)=>this.deleteProject(id)} />}/>
                        <Route exact path='/todo' component={() => < TodoList todo={this.state.todo} deleteTodo={(id)=>this.deleteTodo(id)} />}/>
                        <Route exact path='/projects/create' component={() => < ProjectForm
                            users = {this.state.users}
                            createProject={(name, link, users) => this.createProject(name, link, users)}/>}/>
                        <Route exact path='/todo/create' component={() => < TodoForm
                            users = {this.state.users}
                            projects={this.state.projects}
                            createTodo={(name, text, users, projects) => this.createTodo(name, text, users, projects)}/>}/>
                        <Route exact path='/login' component={() => < LoginForm get_token={(login, password) => this.get_token(login, password)}/>}/>
                        <Route path="/user/:id"><UserTodoList items={this.state.todo}/></Route>
                        <Route path="/project/:id"><ProjectTodoList items={this.state.todo}/></Route>
                        <Redirect from='/users' to='/'/>
                        <Route component={NotFound404}/>
                    </Switch>
                    < Footer/>
                </HashRouter>
            </div>
        )
    }
}

export default App;


