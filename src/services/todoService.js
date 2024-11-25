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
export const changeStatusTask = async(id) => {
    return await httpRequest.put(`${endpoint}/${id}`);
}
export const searchTasksByQuery = async(params) => {
    return await httpRequest.get(`${endpoint}/search`, { params });
};
export const getDoingTasks = async() => {
    return await httpRequest.get(`${endpoint}/doingtasks`);
}
export const getFinishedTasks = async() => {
    return await httpRequest.get(`${endpoint}/finishedtasks`);
}
export const updateTask = async(data) => {
    return await httpRequest.put(endpoint, data);
}