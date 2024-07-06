
import axios from 'axios';
import { ILogin, IRegister } from '@/types';
const url = 'http://192.168.1.10:3002'
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