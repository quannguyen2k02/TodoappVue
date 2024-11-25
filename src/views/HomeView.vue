
<template>
  <div class="container">
    <h2 class="text-center mt-5">To do list</h2>
    <!-- Input -->
    <div class="d-flex">
      <input type="text" placeholder="Enter task" v-model="newTask" class="form-control"
        @keyup.enter="createTask(newTask)">
      <button type="button" class="btn btn-success" @click="createTask(newTask)">Add</button>
    </div>
    <div class="d-flex  my-2">
      <input type="text" placeholder="Search..." v-model="query" required class="form-control w-25"
        @input="searchTasksDebounce(query,selectedStatus)">
      <button type="button " class="btn btn-success w-10" @click="searchTasks(query)">Search</button>

      <select v-model="selectedStatus" @change="filterTasks" class="form-select w-25 ms-auto"
        aria-label="Default select example">
        <option value="all" selected>All tasks</option>
        <option value="doing">Doing</option>
        <option value="done">Done</option>
      </select>
    </div>

    <TaskItem :task=tasks @handleFinishTask="handleFinishTask" @handleDeleteTask="handleDeleteTask"
      @onCheckboxChange="handleFinishTask" @handleEditTask = "handleEditTask" />

  </div>


</template>

<script setup>
  import TaskItem from "@components/TaskItem.vue"
  import {ref , onMounted} from 'vue'
  import * as todoService from '@/services/todoService'
  import debounce from "lodash/debounce"

onMounted(() => {
  fetchTasks();
})

const newTask = ref("");
  const tasks = ref([]);
  const error = ref("");
  const query = ref("");
  const selectedStatus = ref("all");
  //Create Task
const createTask = async(titleTask) =>{

  try {
    if (!newTask.value.trim()) {
    alert("Task name is required!");
    return;
    }
    const taskData = { id: 0, title: titleTask}; 
    const response = await todoService.addAsync(taskData);
    tasks.value = response.data;
    newTask.value =""
    fetchTasks();
  } catch (err) {
    error.value = "Failed to fetch tasks: " + err.message; // Lưu lỗi nếu xảy ra
    console.error(err);
  }
}
//Fetch task
const fetchTasks = async () => {
  try {
    const response = await todoService.getAllAsync();
    tasks.value = response.data;
  } catch (err) {
    error.value = "Failed to fetch tasks: " + err.message; // Lưu lỗi nếu xảy ra
    console.error(err);
  }
};
//search task
  const searchTasks = async (query, status) => {
    try {
      // Tạo object params từ query và status
      const params = { status ,query};
      if (query) {
        params.query = query; // Chỉ thêm status nếu có giá trị
      }

      // Gọi API với object params
      const response = await todoService.searchTasksByQuery(params);
      tasks.value = response.data; // Lưu danh sách task từ phản hồi API
    } catch (err) {
      error.value = "Failed to fetch tasks: " + err.message; // Lưu thông báo lỗi
      console.error(err);
    }
  };
  //search task debounce
  const searchTasksDebounce = debounce((query,selectedStatus) => {
    searchTasks(query, selectedStatus);
  }, 1000)
//finishTasks
// const handleFinishTasks = async (selectedIds) => {
//   try {
//     const response = await todoService.finishTasksAsync(selectedIds);
//     tasks.value = response.data;
//     fetchTasks();
//   } catch (err) {
//     error.value = "Failed to fetch tasks: " + err.message; // Lưu lỗi nếu xảy ra
//     console.error(err);
//   }
// };

// //deleteTasks
// const handleDeleteTasks = async (selectedIds) => {

//   try {
//     const response = await todoService.deleteTasksAsync(selectedIds);
//     tasks.value = response.data;
//     fetchTasks();
//   } catch (err) {
//     error.value = "Failed to fetch tasks: " + err.message; // Lưu lỗi nếu xảy ra
//     console.error(err);
//   }
// };
//DeleteTask
const handleDeleteTask = async (id) => {

  try {
    const response = await todoService.deleteTaskAsync(id);
    searchTasks(query.value);
  } catch (err) {
    error.value = "Failed to fetch tasks: " + err.message; // Lưu lỗi nếu xảy ra
    console.error(err);
  }
};
//FinishTask
const handleFinishTask = async (id) => {

try {
  const response = await todoService.changeStatusTask(id);
    searchTasks(query.value,selectedStatus.value);
} catch (err) {
  error.value = "Failed to fetch tasks: " + err.message; // Lưu lỗi nếu xảy ra
  console.error(err);
}
};
//fetch doing tasks
const getDoingTasks = async()=>{
  try {
    const response = await todoService.getDoingTasks();
    tasks.value = response.data;
  } catch (err) {
    error.value = "Failed to fetch tasks: " + err.message; // Lưu lỗi nếu xảy ra
    console.error(err);
  }
}
//fetch finished tasks
const getFinishedTasks = async()=>{
  try {
    const response = await todoService.getFinishedTasks();
    tasks.value = response.data;
  } catch (err) {
    error.value = "Failed to fetch tasks: " + err.message; // Lưu lỗi nếu xảy ra
    console.error(err);
  }
}
const filterTasks = function(){
  if(selectedStatus.value =='all'){
    fetchTasks();
  }
  if(selectedStatus.value=='doing'){
    getDoingTasks();
  }
  if(selectedStatus.value == 'done'){
    getFinishedTasks();
  }
}
const handleEditTask = async(task)=>{
  try {
    const response = await todoService.updateTask(task);
  searchTasks(query.value,selectedStatus.value);
  } catch (err) {
    error.value = "Failed to fetch tasks: " + err.message; // Lưu lỗi nếu xảy ra
    console.error(err);
  }
}

</script>
<style scoped>
  .container{
    width: 500px;
  }
</style>