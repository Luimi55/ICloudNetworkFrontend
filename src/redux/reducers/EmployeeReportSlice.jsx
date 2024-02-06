import { createSlice,current } from '@reduxjs/toolkit'

const initialState = {
    employeeReportList:[]
}

export const EmployeeReportSlice = createSlice({
    name: 'EmployeeReport',
    initialState,
    reducers:{  
        addEmployeeReport: (state, action) =>{
            var newEmployeeReport = JSON.parse(JSON.stringify(action.payload));
            const employeeReportList = state.employeeReportList;
            const lastEmployeeReport = employeeReportList[employeeReportList.length-1];
            
            var newId = lastEmployeeReport?
                lastEmployeeReport.id+1:
                1;
            newEmployeeReport.id = newId
            newEmployeeReport.date = new Date().toLocaleDateString()

            state.employeeReportList = [...employeeReportList, newEmployeeReport]
            //console.log(state.employeeReportList)

        },
    }
})

export const {
    addEmployeeReport,
} = EmployeeReportSlice.actions

export default EmployeeReportSlice.reducer