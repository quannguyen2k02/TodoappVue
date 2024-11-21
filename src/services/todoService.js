import * as httpRequest from '@/utils/httpRequest'
const endpoint = "task";

export const getAllAsync = async() => {
    return await httpRequest.get(endpoint);
}
export const addAsync = async(data) => {
    return await httpRequest.post(endpoint, data);
}
export const finishTasksAsync = async(ids) => {
    return await httpRequest.put(endpoint, ids);
}
export const deleteTasksAsync = async(ids) => {
    return await httpRequest.remove(endpoint, { data: ids });
}
export const deleteTaskAsync = async(id) => {
    return await httpRequest.remove(`${endpoint}/${id}`);
}
export const finishTaskAsync = async(id) => {
    return await httpRequest.put(`${endpoint}/${id}`);
}