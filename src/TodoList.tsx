import React, {useState, KeyboardEvent, ChangeEvent, MouseEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditSpan from "./editSpan";
import {Button, ButtonGroup, IconButton, ListItem, Typography} from "@material-ui/core";
import {Clear, Delete, HighlightOff} from "@material-ui/icons";

type TodoListPropsType = {
    todoListID: string
    title: string
    addTask: (title: string, toDoListsId: string) => void
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (id: string, toDoListsId: string) => void
    changeTodoListFilter: (filter: FilterValuesType, toDoListsId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, toDoListsId: string) => void
    removeTodoList: (toDoListsId: string) => void
    changeTaskTitle: (id: string, title: string, toDoListsId: string) => void
    changeTodoListTitle: (toDoListsId: string, title: string) => void
}

const TodoList = (props: TodoListPropsType) => {
    const itemFontStyles = {fontStyle: "bald"}
    const tasksList = props.tasks.map((t: TaskType) => {
        const removeTask = () => props.removeTask(t.id, props.todoListID)
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
        const changeTaskTitle = (newTitle: string) => props.changeTaskTitle(t.id, newTitle, props.todoListID)
        return (
            <ListItem
                key={t.id}
                disableGutters
                divider
                style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                <div style={itemFontStyles}>
                    <input
                        type="checkbox"
                        checked={t.isDone}
                        onChange={changeStatus}
                        style={{marginRight: "15px"}}
                    />

                    {t.isDone
                        ? <span className={"is-done"}>{t.title}</span>
                        : <EditSpan title={t.title} changeTitle={changeTaskTitle}/>
                    }
                </div>
                <IconButton
                    onClick={removeTask}
                    color={"primary"}
                    size={"small"}
                >
                    <HighlightOff/>
                </IconButton>
            </ListItem>
        )
    })
    const onClickSetAllFilter = () => props.changeTodoListFilter("all", props.todoListID)
    const onClickSetActiveFilter = () => props.changeTodoListFilter("active", props.todoListID)
    const onClickSetCompletedFilter = () => props.changeTodoListFilter("completed", props.todoListID)
    const removeTodoList = () => {
        props.removeTodoList(props.todoListID)
    }
    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(newTitle, props.todoListID)
    }
    let allBtnClasses = ""
    if (props.filter === "all") {
        allBtnClasses = "active-filter"
    }

    const getBtnClass = (filter: FilterValuesType) => {
        return props.filter === filter ? "active-filter" : ""
    }

    const addTask = (newTaskTitle: string) => {
        props.addTask(newTaskTitle, props.todoListID)
    }
    return (
        <div>
            <Typography
                variant={"h5"}
                align={"center"}
                style={{fontWeight: "bold"}}
            >
                <EditSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList} size={"small"} color={"secondary"}>
                    <Clear/>
                </IconButton>
            </Typography>
            <div>
                <AddItemForm addItem={addTask}/>
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <ButtonGroup
                    variant={"contained"}
                    disableElevation
                    size={"small"}
                    fullWidth
                >
                    <Button
                        color={props.filter === "all" ? "secondary" : "primary"}
                        // className={getBtnClass("all")}
                        onClick={onClickSetAllFilter}
                    >All
                    </Button>
                    <Button
                        color={props.filter === "active" ? "secondary" : "primary"}
                        // className={getBtnClass("active")}
                        onClick={onClickSetActiveFilter}
                    >Active
                    </Button>
                    <Button
                        color={props.filter === "completed" ? "secondary" : "primary"}
                        // className={getBtnClass("completed")}
                        onClick={onClickSetCompletedFilter}
                    >Completed
                    </Button></ButtonGroup>
            </div>
        </div>
    )
}

export default TodoList;