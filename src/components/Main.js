import { useState, useEffect } from "react"

import Filter from './Filter'
import EmployeeModal from './EmployeeModal'
import states from '../utils/states.json'
import API from '../utils/API'
import Person from '../utils/Person'

import '../styles/Main.css'
import SortContext from "../utils/SortContext"
import SortButtons from "./SortButtons"

const Main = ({count}) => {
    const [employees, setEmployees] = useState([])
    const [displayed, setDisplayed] = useState([])
    const [selected, setSelected] = useState(null)
    const [sort, setSort] = useState([['last-name', true, ['name', 'last']], ['first-name', true, ['name', 'first']]])

    const [firstNameFilter, setFirstNameFilter] = useState([''])
    const [lastNameFilter, setLastNameFilter] = useState([''])
    const [cityFilter, setCityFilter] = useState([''])
    const [stateFilter, setStateFilter] = useState([''])
    const [phoneFilter, setPhoneFilter] = useState([''])
    const [emailFilter, setEmailFilter] = useState([''])

    useEffect(() => getEmployees(count), [])
    useEffect(() => {
        const getValue = (prime, path) => {
            for (const link of path) {
                prime = prime[link]
            }
            return prime
        }
        const check = (filter, emp, path) => {
            const isBlank = filter.length === 1 && filter[0] === ''
            const isMatch = filter
                .filter(ptrn => (ptrn !== '' && fuzzyMatch(getValue(emp, path), ptrn)))
                .length > 0
            const passed = isBlank || isMatch
            return !passed
        }
        const employeeList = employees.filter(emp => {
            if (check(firstNameFilter, emp, ['name', 'first'])) return false
            if (check(lastNameFilter, emp, ['name', 'last'])) return false
            if (check(cityFilter, emp, ['address', 'city'])) return false
            if (check(stateFilter, emp, ['address', 'state'])) return false
            if (check(phoneFilter, emp, ['phone', 'number'])) return false
            if (check(emailFilter, emp, ['email'])) return false
            return true
        })
        setDisplayed(employeeList)
    }, [employees, firstNameFilter, lastNameFilter, cityFilter, stateFilter, phoneFilter, emailFilter])

    function getEmployees(count) {
        console.log('Getting employees');
        console.log('Count:', count);
        API.getRandom(count).then(res => {
            const employeeList = []
            for (const data of res.data.results) {
                const person = new Person(data)
                employeeList.push(person)
            }
            setEmployees([...employeeList])
        })
    }

    const changeFirstName = event => changeFilter(event, setFirstNameFilter)
    const changeLastName = event => changeFilter(event, setLastNameFilter)
    const changeCity = event => changeFilter(event, setCityFilter)
    const changeState = event => changeFilter(event, setStateFilter)
    const changePhone = event => {
        event.target.value = event.target.value.replace(/[^\d ,]/, '')
        changeFilter(event, setPhoneFilter)
    }
    const changeEmail = event => changeFilter(event, setEmailFilter)
    function changeFilter(event, setFilter) {
        const values = event.target.value.trim().split(',').map(v => v.trim())
        setFilter(values)
    }

    const listFilter = emp => {
    }

    const listSort = (a, b) => {
        for (const [name, ascending, path] of sort) {
            let aVal = a
            let bVal = b

            for (const link of path) {
                aVal = aVal[link]
                bVal = bVal[link]
            }
            
            if (aVal !== bVal) {
                if (ascending) {
                    return aVal > bVal ? 1 : -1
                } else {
                    return aVal < bVal ? 1 : -1
                }
            }
        }
        return 0
    }

    const fuzzyMatch = (str, pattern) => {
        pattern = new RegExp(pattern, 'i')
        return pattern.test(str)
    }

    const displayEmployee = employeeId => {
        console.log({employeeId});
        if (employeeId)
            for (const employee of employees) {
                if (employee.id === employeeId) {
                    setSelected(employee)
                    return
                }
            }
        
        setSelected(null)
    }

    const hideEmployee = () => {
        setSelected(null)
    }

    return (
        <main>
            <table id='employee-table'>
                <tbody>
                <tr id='table-header'>
                    <th></th>
                    <SortContext.Provider value={{sort, setSort}}>
                    <th>First Name <SortButtons name='first-name' path={['name', 'first']}/></th>
                    <th>Last Name <SortButtons name='last-name' path={['name', 'last']}/></th>
                    <th>City <SortButtons name='city' path={['address', 'city']}/></th>
                    <th>State <SortButtons name='state' path={['address', 'state']}/></th>
                    <th>Phone <SortButtons name='phone' path={['phone', 'number']}/></th>
                    <th>Email <SortButtons name='email' path={['email']}/></th>
                    </SortContext.Provider>
                </tr>
                { 
                    displayed
                        .sort(listSort)
                        .map(e => (
                            <tr key={e.id} className='employee-list-item' onDoubleClick={() => displayEmployee(e.id)}>
                                <td><img src={e.thumbnail} alt="employee thumbnail"/></td>
                                <td>{e.name.first}</td>
                                <td>{e.name.last}</td>
                                <td>{e.address.city}</td>
                                <td>{e.address.state}</td>
                                <td>{e.phone.display}</td>
                                <td>{e.email}</td>
                            </tr>
                        ))
                }
                <tr id='filter-inputs'>
                    <td>Filter by:</td>
                    <td><Filter name='first-name' changeFunction={changeFirstName}/></td>
                    <td><Filter name='last-name' changeFunction={changeLastName}/></td>
                    <td><Filter name='city' changeFunction={changeCity}/></td>
                    <td><Filter name='state' changeFunction={changeState} list='state-options'/></td>
                    <td><Filter name='phone' changeFunction={changePhone}/></td>
                    <td><Filter name='email' changeFunction={changeEmail}/></td>
                </tr>
                </tbody>
            </table>

            <datalist id='state-options'>
                {Object.values(states).map(({abv}) => <option key={abv} value={abv}/>)}
            </datalist>
            
            {selected && <EmployeeModal employee={selected} close={hideEmployee}/>}
        </main>
    )
}

export default Main