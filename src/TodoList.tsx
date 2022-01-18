import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title);
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    return <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: 'space-between',
        height: '100%'
    }}>
        <Typography
            variant={'h5'}
            align={'center'}
            style={{fontWeight: 'bold'}}
        >
            <EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton>
                <Delete onClick={removeTodolist}/>
            </IconButton>
        </Typography>
        <AddItemForm addItem={addTask}/>
        <List>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    }


                    return <ListItem
                        key={t.id}
                        divider
                        disableGutters
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                        className={t.isDone ? "is-done" : ""}>
                        <div>
                            <Checkbox
                                onChange={onChangeHandler}
                                checked={t.isDone}
                                style={{marginRight: '15px'}}/>
                            <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
                        </div>

                        <IconButton>
                            <Delete
                                fontSize={'small'}
                                onClick={onClickHandler}/>
                        </IconButton>

                    </ListItem>
                })
            }
        </List>
        <div>
            <ButtonGroup
                variant={'contained'}
                size={'small'}
                disableElevation
                fullWidth>
                <Button
                    color={props.filter === 'all' ? "secondary" : "primary"}
                    /*className={props.filter === 'all' ? "active-filter" : ""}*/
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    color={props.filter === 'active' ? "secondary" : "primary"}
                    /* className={props.filter === 'active' ? "active-filter" : ""}*/
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    color={props.filter === 'completed' ? "secondary" : "primary"}
                    /*className={props.filter === 'completed' ? "active-filter" : ""}*/
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </ButtonGroup>
        </div>
    </div>
}


