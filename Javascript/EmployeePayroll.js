//UC1

class EmployeePayrollData {

    //getter and setter method
    get id() {
        return this.id;
    }
    set id(id) {
        this.id = id;
    }

    get name() {
        return this.name;
    }
    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
        if( nameRegex.test(name)){
            this.name = name;
        }
        else throw 'Name is incorrect';
        
    }

    get profilePic() {
        return this.profilePic;
    }
    set profilePic(profilePic) {
        this.profilePic = profilePic;
    }

    get gender() {
        return this.gender;
    }

    set gender(gender) {
        this.gender = gender;
    }

    get department() {
        return this.department;
    }
    set department(department) {
        this.department = department;
    }

    get salary() {
        return this.salary;
    }

    set salary(salary){
        this.salary = salary;
    }
    
    get note() {
        return this.note;
    }
    set note(note) {
        this.note = note;
    }

    get startDate() {
        return this.startDate;
    }
    set startDate(startDate) {
        this.startDate = startDate;
    }

    //method
    toString() {
        const options = { year: 'numeric', month:'long', day:'numeric'};
        const empDate = !this.startDate ? "undefined" : this.startDate.toLocaleDateString("en-us", options);
    return "id=" + this.id + ", name='" + this.name + ", gender='" + this.gender + 
            ", profilePic='" + this.profilePic + ", department=" + this.department +
            ", salary=" + this.salary + ", startDate=" + empDate + ", note=" + this.note;
    }

    
  
}
//UC2
window.addEventListener('DOMContentLoaded', () => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function() {
        if(name.ariaValueMax.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
        
    });

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function() {
        output.textContent = salary.value;
    });
});

//UC3
const save = () => {
    try{
        let employeePayrollData = createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);
    }catch (e) {
        return;
    }
}

const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try{
        employeePayrollData.name = betInputValueById('#name');
    }catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]').pop();
    employeePayrollData.salary = getSelectedValues('#salary');
    employeePayrollData.note = getSelectedValues('#notes');
    let date = getInputValueById('#day') + " "+getInputValueById('#month')+" "+ getInputValueById('#year');
    employeePayrollData.date = Date.parse(date);
    alert(employeePayrollData.toString());
    return employeePayrollData;
    }

    const getSelectedValues = (propertyValue) => {
        let allItems = document.querySelectorAll(propertyValue);
        let selItems = [];
        allItems.forEach(item => {
            if(item.checked) selItems.push(item.value);
        });
        return selItems;
    }

    // const getInputValueById = (id) => {
    //     let value = document.querySelector(id).value;
    //     return value;
    // }

    // const getInputValueById = (id) => {
    //     let value = document.getElementById(id).value;
    //     return value;
    // }

    //UC4
function createAndUpdateStorage(employeePayrollData){
    let employeePayrollList = JSON.parse(localStorage.getItem('EmployeePayrollList'));
    if(employeePayrollList != undefined) {
        employeePayrollList.push(employeePayrollData);
    }else {
        employeePayrollList = [employeePayrollData]
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList))
}

//UC5
const resetForm = () => {
    setValue('#name', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary', '');
    setValue('#notes', '');
    setValue('#day', 1);
    setValue('#month', 'January');
    setValue('#year', '2020');
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}