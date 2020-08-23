
import { AsyncStorage } from 'react-native';
export default async function PostFetch(name, payload, header=null , method=null){
    let url = name 

    let jsonD = [];
    let m = 'POST';
    if(method!==null){
      m = method;
    }
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'key': 'oOOC1MCtz4jTuSWk8mn6BuVC83PRIR1512477086'
    };
    if(header!==null){
      headers = header
    }

    await fetch(url, {
      method: m,
      headers: headers,
      body: JSON.stringify(payload)
    })
    .then((response) => response.json())
    .then((responseJSON) => {
      // console.log(payload)
      
       jsonD = responseJSON;
      //  console.log(jsonD)
    }).catch(err =>{

        jsonD = null;
    });
    return jsonD;
  }