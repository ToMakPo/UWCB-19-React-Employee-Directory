import states from './states.json'

const emailDomains = [
    'gmail.com',
    'outlook.com',
    'live.com',
    'yahoo.com',
    'techcafe.org'
]
const getDomain = () => emailDomains[Math.floor(Math.random() * emailDomains.length)]
const getEmail = exampleEmail => exampleEmail.replace('example.com', getDomain()) 

function Person(data) {
    let state = states[data.location.state]
    this.id = data.login.salt
    this.name = {
        title: data.name.title,
        first: data.name.first,
        last: data.name.last,
        display: `${data.name.title} ${data.name.first} ${data.name.last}`
    }
    this.email = getEmail(data.email)
    this.phone = {
        number: data.phone.replace(/\D/g, ''),
        display: data.phone
    }
    this.username = data.login.username
    this.gender = data.gender
    this.dob = data.dob.date.split('T')[0]
    this.age = data.dob.age
    this.address = {
        street: data.location.street.number + ' ' + data.location.street.name,
        city: data.location.city,
        state: state.abv,
        zipcode: data.location.postcode.toString().padStart('0', 5),
        display: `${data.location.street.number} ${data.location.street.name}\n${data.location.city}, ${state.abv} ${data.location.postcode.toString().padStart('0', 5)}`
    }
    this.timezone = {
        name: state.tz,
        offset: state.offset
    }
    this.photo = data.picture.large
    this.thumbnail = data.picture.thumbnail
}

export default Person