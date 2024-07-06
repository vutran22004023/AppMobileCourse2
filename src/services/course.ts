
import axios,{ AxiosResponse } from 'axios';
const url = 'http://192.168.1.10:3002'
const GetAllCourses = async() => {
    try{
        const response: AxiosResponse = await axios.get(`${url}/api/course/all-courses`);
        return response.data;
    }catch {
        throw new Error('Error get all courses');
    }
}

const GetDetailCourses = async(slug: any) => {
    try{
        const response: AxiosResponse = await axios.get(`${url}/api/course/detail-courses/${slug}`);
        return response.data;
    }catch {
        throw new Error('Error login detail course');
    }
  }

export  {
    GetAllCourses,
    GetDetailCourses
}