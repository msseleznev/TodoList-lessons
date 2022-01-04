import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed"

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}


//C-R-U-D
function App() {


    //BLL:
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "MILK", isDone: true},
            {id: v1(), title: "WATER", isDone: true},
            {id: v1(), title: "BEER", isDone: false},
        ]
    })

    /*const todoListTitle: string = "What to learn"
    const [filter, setFilter] = useState<FilterValuesType>("all")
    /!*const [tasks, setTasks] = useState<Array<TaskType>>([
                       {id: v1(), title: "HTML", isDone: true},
                       {id: v1(), title: "CSS", isDone: true},
                       {id: v1(), title: "JS/TS", isDone: false},
                   ])*!/*/

    const removeTask = (tasksID: string, todoListID: string) => {
        const copyTasks = {...tasks}
        copyTasks[todoListID] = tasks[todoListID].filter(t => t.id !== tasksID)
        setTasks(copyTasks)
    }
    const addTask = (title: string, todoListID: string) => {
        const copyTasks = {...tasks}
        copyTasks[todoListID] = [{id: v1(), title: title, isDone: false}, ...tasks[todoListID]]
        setTasks(copyTasks)
    }
    const changeTaskStatus = (tasksID: string, isDone: boolean, todoListID: string) => {
        const copyTasks = {...tasks}
        copyTasks[todoListID] = tasks[todoListID].map(t => t.id === tasksID ? {...t, isDone: isDone} : t)
        setTasks(copyTasks)
    }

    const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: filter} : tl))
    }

    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        const copyTasks = {...tasks}
        delete copyTasks[todoListID]
        setTasks(copyTasks)
    }
    const getTasksForRender = (filter: FilterValuesType, tasks: Array<TaskType>): Array<TaskType> => {
        switch (filter) {
            case "completed":
                return tasks.filter(t => t.isDone)
            case "active":
                return tasks.filter(t => !t.isDone)
            default:
                return tasks
        }
    }


    const todoListsComps = todoLists.map(tl => {
        return (
            <TodoList
                key={tl.id}
                todoListID={tl.id}
                filter={tl.filter}
                title={tl.title}
                tasks={getTasksForRender(tl.filter, tasks[tl.id])}
                addTask={addTask}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
                changeTaskStatus={changeTaskStatus}
                removeTodoList = {removeTodoList}
            />
        )
    })


    //UI:
    return (
        <div className="App">
            {todoListsComps}
        </div>
    )
}

export default App;


