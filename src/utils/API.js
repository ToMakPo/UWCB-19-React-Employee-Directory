import axios from 'axios'

function Person(data) {
    this.name = data.gender
    this.email = data.email
    this.phone = data.phone
    this.username = data.login.username
    this.gender = data.gender
    this.dob = data.dob.date.split('T')[0]
    this.age = data.dob.age
    this.address = {
        street: data.location.street.number + ' ' + data.location.street.name,
        city: data.location.city,
        state: data.location.state,
        zipcode: data.location.postcode.toString.padLeft('0', 5)
    }
    this.timezone = data.location.timezone.offset
    this.photo = data.picture.large
    this.thumbnail = data.picture.thumbnail
}
Person.address.prototype.display = () => {
    const {street, city, state, zipcode} = this.address
    return `${street}\n${city}, ${state} ${zipcode}`
}

const API = {
    getList: async count => {
        count = count || 15

        const list = []
        
        for (let i = 0; i < count; i++) {
            const {results} = await axios.get('https://randomuser.me/api/nat=US')
            const person = new Person(results)
            console.log(person);
            list.push(person)
        }
        
        return list
    }
}

export default API