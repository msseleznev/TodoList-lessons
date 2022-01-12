import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


type AddItemFormPropsType = {
    addItem: (itemTitle: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>("")      // локальный стейт для набронного текста
    const [error, setError] = useState<boolean>(false) //локальный стейт для состояния ишибки
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter"){
            addItem()
        }
    }
    const errorMessage = error
        ? <div style={{color: "red"}}>Title is required!</div>
        : <div>Enter item title</div>
    return (
        <div>
            <input
                className={error ? "error" : ""}
                value={title}
                onChange={onChangeSetTitle}
                onKeyPress={onKeyPressAddItem}
            />
            <button onClick={addItem}>+</button>
            {errorMessage}
        </div>

    )
}