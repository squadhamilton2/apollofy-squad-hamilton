import { User } from "../interfaces/user";


export const getDataDBJSON = async () => { 

    const response = await fetch("http://localhost:3000/user");
    const data:Promise<User[]> = await response.json();      
  
    console.log(data)
    return data;
  };
  
  