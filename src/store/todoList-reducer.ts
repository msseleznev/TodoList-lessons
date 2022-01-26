import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";


type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}
type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
}

type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}


export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT
export const todoListReducer = (todoList: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoList.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const newTodoListID = v1()
            return [...todoList, {id: newTodoListID, title: action.title, filter: "all"}]
        case "CHANGE-TODOLIST-TITLE":
            return todoList.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return todoList.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return todoList;
    }

}
export const RemoveTodoListAC = (id: string): RemoveTodoListAT => {
    return {type: 'REMOVE-TODOLIST', id}
}
export const AddTodoListAC = (title: string): AddTodoListAT => {
    return {type: 'ADD-TODOLIST', title}
}
export const ChangeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleAT => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title}
}
export const ChangeTodoListFilterAC = (id: string, filter: FilterValuesType): ChangeTodoListFilterAT => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter}
}
