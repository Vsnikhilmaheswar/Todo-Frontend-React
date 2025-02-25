import { commonApi } from "./commonApi"
import {serverUrl } from './serverUrl'

export const AddTaskApi =async(reqBody)=>{
return await commonApi('POST',`${serverUrl}/data`,reqBody)
}

export const GetTaskApi = async()=>{
    return await commonApi('GET',`${serverUrl}/data`)
}

export const DeleteTaskApi = async(id)=>{
 return  await commonApi('DELETE',`${serverUrl}/data/${id}`,{})
}
export const editTaskApi = async(id,reqBody)=>{
    return await commonApi('PUT',`${serverUrl}/data/${id}`,reqBody)
}