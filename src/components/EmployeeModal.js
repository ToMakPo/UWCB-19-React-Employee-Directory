import moment from 'moment'
import {useRef} from 'react'

const EmployeeModal = ({employee, close}) => {
    const modal = useRef()

    return (
        <div className='modal' ref={modal}>
            <span>
                <button className='hide-modal-button' onClick={close}>✖</button>
                <h1>{employee.name.display}</h1>
                <div id='employee-body'>
                    <div id='employee-info'>
                        <div>
                            <strong>Username: </strong>{employee.username}
                        </div>
                        <div>
                            <strong>Birthday: </strong>{moment(employee.dob).format('MMM D, YYYY')}&nbsp;&nbsp;
                            <strong>Age: </strong>{employee.age}
                        </div>
                        <div>
                            <strong>Gender: </strong>{employee.gender}
                        </div>
                        <div>
                            <strong>Time Zone: </strong>{employee.timezone.name}
                        </div>
                        <div>
                            <strong>Local Time: </strong>{moment().utc().add(employee.timezone.offset, 'h').format('h:mm A')}
                        </div>
                        <h2>Contact</h2>
                        <div>
                            <strong>Address: </strong>
                            <span id='address-display'>
                                {employee.address.display.split('\n').map((line, i) => <span key={i} >{line}</span>)}
                            </span>
                        </div>
                        <div>
                            <strong>Phone: </strong>
                            <a href={'tel:+' + employee.phone.number} rel="noreferrer" target='_blank'>{employee.phone.display}</a>
                        </div>
                        <div>
                            <strong>Email: </strong>
                            <a href={'mailto:' + employee.email} rel="noreferrer" target='_blank'>{employee.email}</a>
                        </div>
                    </div>
                    <img id='emaployee-photo' src={employee.photo} alt="employee"/>
                </div>
            </span>
        </div>
    )
}

export default EmployeeModal