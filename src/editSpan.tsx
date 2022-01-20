import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {TextField} from "@material-ui/core";

type EditSpanPropsType = {
    title: string
    changeTitle: (title:string) => void
}

const EditSpan = (props: EditSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditModeOnKey = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
          offEditMode()
      }
    }
    const offEditMode = () => {
        props.changeTitle(title)
        setEditMode(false)
    }
    return (
        editMode
            ? <TextField
                value={title}
                autoFocus={true}
                onBlur={offEditMode}
                onChange={onChangeSetTitle}
                onKeyPress={offEditModeOnKey}/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
};

export default EditSpan;