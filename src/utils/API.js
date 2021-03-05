import axios from 'axios'

const API = {
    getRandom: results => {
        const url = `https://randomuser.me/api/?nat=US${results && ('&results=' + results)}`
        return axios.get(url)
    }
}

export default API