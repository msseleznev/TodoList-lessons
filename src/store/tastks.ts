export const addSalary = (salary: number, bonus: number) => salary + bonus;
export const fallSalary = (salary: number, minus: number) => salary - minus;
export const multSalary = (salary: number, coefficient: number) => salary * coefficient;
export const divSalary = (salary: number, coefficient: number) => salary * coefficient;

// 1. В параметрах у всех -  salary (state)
// 2. Тип действия в названия отражает суть (type of acton/ action type)
// 3. Дополнительные заначения каждого типа  действия

export type AddSalaryActionType = {
    type: 'ADD_SALARY'
    bonus: number
}
export type FallSalaryActionType = {
    type: 'FALL_SALARY'
    minus: number
}
export type MultSalaryActionType = {
    type: 'MULT_SALARY'
    coefficient: number
}
export type DivSalaryActionType = {
    type: 'DIV_SALARY'
    coefficient: number
}

type ActionType = AddSalaryActionType | FallSalaryActionType
    | MultSalaryActionType | DivSalaryActionType

export const salaryReducer = (salary: number, action: ActionType) => {
    switch (action.type) {
        case 'ADD_SALARY':
            return salary + action.bonus
        case 'FALL_SALARY':
            return salary - action.minus
        case 'MULT_SALARY':
        case 'DIV_SALARY':
            return salary * action.coefficient
        default:
            return salary
    }
}


