import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, List, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const toDoListsId1 = v1()
    const toDoListsId2 = v1()


    const [toDoLists, setToDoLists] = useState<TodoListType[]>([
        {id: toDoListsId1, title: "What to learn?", filter: "all"},
        {id: toDoListsId2, title: "What to drink?", filter: "all"}
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
        [toDoListsId1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: false},
        ],
        [toDoListsId2]: [
            {id: v1(), title: "WATER", isDone: true},
            {id: v1(), title: "BEER", isDone: true},
            {id: v1(), title: "VINE", isDone: false},
        ]
    })



    const addTodoList = (title: string) => {
        const newTodoListID = v1()
        setToDoLists([...toDoLists, {id: newTodoListID, title, filter: "all"}])
        setTasks({...tasks, [newTodoListID]: []})
    }
    const changeTodoListFilter = (filter: FilterValuesType, toDoListsId: string) => {
        setToDoLists(toDoLists.map(tl => tl.id === toDoListsId ? {...tl, filter} : tl))
    }
    const removeTask = (id: string, toDoListsId: string) => {
        tasks[toDoListsId] = tasks[toDoListsId].filter(t => t.id !== id)
        setTasks({...tasks})
    }
    const addTask = (title: string, toDoListsId: string) => {
        tasks[toDoListsId] = [...tasks[toDoListsId], {id: v1(), title, isDone: false}] // если свойство title и ключ одинаковые то можно писать один title
        setTasks({...tasks})
    }


    const changeTaskStatus = (id: string, isDone: boolean, toDoListsId: string) => {
        tasks[toDoListsId] = tasks[toDoListsId].map(t => t.id === id ? {...t, isDone: isDone} : t)
        setTasks({...tasks})
    }
    const changeTaskTitle = (id: string, title: string, toDoListsId: string) => {
        tasks[toDoListsId] = tasks[toDoListsId].map(t => t.id === id ? {...t, title} : t)
        setTasks({...tasks})
    }
    const removeTodoList = (toDoListsId: string) => {
        setToDoLists(toDoLists.filter(tl => tl.id !== toDoListsId))
        const tasksCopy = {...tasks}
        delete tasksCopy[toDoListsId]
        setTasks(tasksCopy)
    }
    const changeTodoListTitle = (title:string, toDoListsId:string) => {
        setToDoLists(toDoLists.map(tl => tl.id === toDoListsId ? {...tl, title} : tl))
    }



    const getTasksForRender = (filter: FilterValuesType, tasks: TaskType[]) => {
        switch (filter) {
            case "completed":
                return tasks.filter(t => t.isDone)
            case "active":
                return tasks.filter(t => !t.isDone)
            default:
                return tasks
        }
    }

    const todoListComponents = toDoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
            <Paper
            elevation={8}
            style={{padding: "15px"}}
        >
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
            removeTodoList={removeTodoList}
            changeTaskTitle={changeTaskTitle}
            changeTodoListTitle={changeTodoListTitle}
        />
            </Paper>
        </Grid>
            )
    })


    //UI:
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container justifyContent={"center"} style={{paddingLeft:"15px"}}>
                    <Grid item style={{padding:"15px"}}>
                    <AddItemForm addItem={addTodoList}/> </Grid>
                </Grid>
                <Grid container spacing={4} justifyContent={"center"}>
               {todoListComponents}
                </Grid>
            </Container>
        </div>
    )
}

export default App;


