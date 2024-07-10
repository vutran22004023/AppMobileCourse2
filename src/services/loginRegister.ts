
import axios from 'axios';
import { ILogin, IRegister } from '@/types';
import { url } from './url';
const LoginService = async(data : ILogin)=> {
    try {
        const res = await axios.post(`${url}/api/login-in`, data)
        return res?.data
    }catch (e) {
        console.log(e);
    }
}

const RegisterService = async(data: IRegister) => {
    try {
        const res= await axios.post(`${url}/api/register`, data)
        return res?.data
    }catch (err) {
        console.log(err);
    }
}

export  {
    LoginService,
    RegisterService
}