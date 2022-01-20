import {
    addSalary,
    AddSalaryActionType,
    divSalary, DivSalaryActionType,
    fallSalary,
    FallSalaryActionType,
    multSalary, MultSalaryActionType,
    salaryReducer
} from "./tastks";




test("addSalary", () => {
    // Тестовая функция содержит:
    // 1. Тестовые данные
    const salary: number = 700
    const bonus: number = 250
    // 2. Выполнение тестируемого кода
    const result = addSalary(salary, bonus)
    // 3. Проверка ожидаемого результата
    expect(result).toBe(950)
})
test("fallSalary", () => {
    const salary: number = 700
    const minus: number = 250
    const result = fallSalary(salary, minus)
    expect(result).toBe(450)
})
test("multSalary", () => {
    const salary: number = 700
    const coefficient: number = 1.2
    const result = multSalary(salary, coefficient)
    expect(result).toBe(840)
})

test('divSalary', () => {
    const salary: number = 700
    const coefficient: number = 0.8
    const result = divSalary(salary, coefficient)
    expect(result).toBe(560)
})

test("case 'ADD_SALARY' of salaryReducer", () => {
    const salary: number = 700
    const action: AddSalaryActionType = {
        type: "ADD_SALARY",
        bonus: 300
    }
    expect(salaryReducer(salary, action)).toBe(1000)
})

test("case 'FALL_SALARY' of salaryReducer", () => {
    const salary: number = 700
    const action: FallSalaryActionType = {
        type: "FALL_SALARY",
        minus: 300
    }
    expect(salaryReducer(salary, action)).toBe(400)
})

test("case 'MULT_SALARY' of salaryReducer", () => {
    const salary: number = 700
    const action: MultSalaryActionType = {
        type: "MULT_SALARY",
        coefficient: 1.2
    }
    expect(salaryReducer(salary, action)).toBe(840)
})

test("case 'DIV_SALARY' of salaryReducer", () => {
    const salary: number = 700
    const action: DivSalaryActionType = {
        type: "DIV_SALARY",
        coefficient: 0.8
    }
    expect(salaryReducer(salary, action)).toBe(560
    )
})

