import axios from 'axios';

const HOST = 'http://localhost:9090/'

export async function crud(obj){
  try {
    const result = await axios[obj.method](HOST+obj.path,obj.data)
    return result.data  
  } catch (error) {
    console.log(error)
  }
  
  // return axios[obj.method](HOST+obj.path,obj.data)
  //   .then(result => result.data)
  //   .catch(err => {
  //     console.log(err)
  //   })
}