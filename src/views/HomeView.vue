
<template>
  <div class="container">
    <h2 class="text-center mt-5">To do list</h2>
    <!-- Input -->
    <div class="d-flex">
      <input type="text" placeholder="Enter task" v-model="newTask"  required class="form-control"
        @keyup.enter="createTask(newTask)">
      <button type="button" class="btn btn-success" @click="createTask(newTask)">Add</button>
    </div>
    
        <TaskItem :task=tasks @handleFinishTask="handleFinishTask" @handleFinishTasks="handleFinishTasks" @handleDeleteTasks="handleDeleteTasks" @handleDeleteTask="handleDeleteTask" />

  </div>
</template>

<script setup>
  import TaskItem from "@components/TaskItem.vue"
  import {ref , onBeforeMount, onMounted} from 'vue'
  import * as todoService from '@/services/todoService'

onMounted(() => {
  fetchTasks();
})

const newTask = ref("");
  const tasks = ref([]);
  const error = ref("");
  //Create Task
const createTask = async(titleTask) =>{
  try {
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
//finishTasks
const handleFinishTasks = async (selectedIds) => {
  try {
    const response = await todoService.finishTasksAsync(selectedIds);
    tasks.value = response.data;
    fetchTasks();
  } catch (err) {
    error.value = "Failed to fetch tasks: " + err.message; // Lưu lỗi nếu xảy ra
    console.error(err);
  }
};

//deleteTasks
const handleDeleteTasks = async (selectedIds) => {

  try {
    const response = await todoService.deleteTasksAsync(selectedIds);
    tasks.value = response.data;
    fetchTasks();
  } catch (err) {
    error.value = "Failed to fetch tasks: " + err.message; // Lưu lỗi nếu xảy ra
    console.error(err);
  }
};
//DeleteTask
const handleDeleteTask = async (id) => {

  try {
    const response = await todoService.deleteTaskAsync(id);
    tasks.value = response.data;
    fetchTasks();
  } catch (err) {
    error.value = "Failed to fetch tasks: " + err.message; // Lưu lỗi nếu xảy ra
    console.error(err);
  }
};
//FinishTask
const handleFinishTask = async (id) => {

try {
  const response = await todoService.finishTaskAsync(id);
  tasks.value = response.data;
  fetchTasks();
} catch (err) {
  error.value = "Failed to fetch tasks: " + err.message; // Lưu lỗi nếu xảy ra
  console.error(err);
}
};
</script>
<style scoped>
  .container{
    width: 500px;
  }
</style>