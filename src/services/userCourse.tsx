import axios, { AxiosResponse } from 'axios';
import { url } from './url';

const StartCourse = async(data: any) => {
    try{
        const response: AxiosResponse = await axios.post(`${url}/api/user-course/start-course`, data);
        return response.data;
    }catch {
        throw new Error('Error get all courses');
    }
}

const UpdateUserCourse = async(data: any) => {
    try{
        const response: AxiosResponse = await axios.post(`${url}/api/user-course/update-progress`, data);
        return response.data;
    }catch {
        throw new Error('Error get all courses');
    }
}
 
export default {
    StartCourse,
    UpdateUserCourse
}