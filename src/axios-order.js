import axios from 'axios';

const instance=axios.create({
    baseURL:'https://react-burger-1efd5.firebaseio.com/'
});

export default instance;