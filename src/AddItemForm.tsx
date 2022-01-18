import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {Add, AddBox, Delete} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div style={{textAlign: 'center'}}>
        <TextField
            variant={'outlined'}
            size={'small'}
            label={'Enter item title'}
            helperText={error && "Title is required"}
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            error={!!error}

        />
        <IconButton>
            <AddBox
                color={'primary'}
                onClick={addItem}/>
        </IconButton>


        {/*{error && <div className="error-message">{error}</div>}*/}
    </div>
}
