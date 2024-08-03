import axios,{AxiosResponse} from 'axios';
import { url } from './url';

export const GetDetailUser = async (id:any,token: any) => {
    try {
      const response: AxiosResponse = await axios.get(
        `${url}/api/user/get-detail-user/${id}`,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch {
      throw new Error('Error get users');
    }
};