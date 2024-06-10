export async function userGetData(url,m){
  return await fetch(url,{
    method:m
  }).then(response=>response.json())
}
export function userSetData(url,m,data){
  return fetch(url,{
    method:m,
    headers:{
      "Content-type":"application/json;charset=UTF-8",},
      body:JSON.stringify(data)
  }).then(response=>response.status);
}
