import Cookies from 'universal-cookie';



const cookies = new Cookies();

let userDetails = cookies.get('__sessions');

const data = {
    host: 'http://localhost:5000/',
    token: userDetails !== undefined ? userDetails.token : null,
    id: userDetails !== undefined ? userDetails.id : null
}


export default data 