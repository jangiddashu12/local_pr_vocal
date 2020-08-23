
import {AsyncStorage} from 'react-native'

export default async function GetFetch(name, header=null, offset = null, limit =null){
    let uri = ''
    if(limit==null&&offset==null){
      uri="https://dev.jobma.com:8090/v5/employer/"+name
    }
    else{
      uri = "https://dev.jobma.com:8090/v5/employer/", name, "?offset="+offset+"&limit="+limit +""

    }
    let jsonD = [];
    let token = await AsyncStorage.getItem('token')
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'key': token
    };
   
    await fetch(uri, {
      method: 'GET',
      headers: headers
    })
    .then((response) => response.json())
    .then((responseJSON) => {
       jsonD = responseJSON;
    }).catch(err =>{
        console.log(err)
        jsonD = null;
    });
    return jsonD;
  }