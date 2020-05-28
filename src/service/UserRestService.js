import axios from 'axios';

const UserRestService = {
    

  userLogin: async function({userName, password}) {
    await axios.post('http://localhost:4100/login', { userName, password })
  }, 

  userSignin: async function({userName, password}) {
    await axios.post('http://localhost:4100/signin', {userName, password})
  }

};

export default UserRestService;