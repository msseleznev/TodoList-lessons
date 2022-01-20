import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {Add, AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem : (itemTitle:string)=> void
}

const AddItemForm = (props:AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem()
        }
    }
    const errorMessage = error
        ? <div style={{color: "red"}}>Title is required!</div>
        : <div>Enter task title</div>
    return (
        <div>
            <TextField
                variant={"outlined"}
                size={"small"}
                label={"Enter task title"}
                helperText={error && "Title required"}
                error={error}
                value={title}
                onChange={onChangeSetTitle}
                onKeyPress={onKeyPressAddTask}
            />
            <IconButton onClick={addItem} color={"primary"}>
                <AddBox/>
            </IconButton>
        </div>
    );
};

export default AddItemForm;