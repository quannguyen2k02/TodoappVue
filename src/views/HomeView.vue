
<template>
  <div class="container">
    <h2 class="text-center mt-5">To do list</h2>
    <!-- Input -->
    <div class="d-flex">
      <input type="text" placeholder="Enter task" v-model="newTask" required class="form-control" @keyup.enter="createTask" >
      <button type="button" class="btn btn-success" @click="createTask">Add</button>
    </div>
    <table class="table table-bordered mt-2">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col" class="text-center">Task</th>
          <th scope="col" class="text-center">Status</th>
          <th scope="col" class="text-center">#</th>

        </tr>
      </thead>
      <tbody>
        <TaskItem
        v-for="(task, index) in tasks"
        :key="index"
        :task="task"
        @remove-task="removeTask"
        @toggle-complete="toggleTaskComplete"
      />
      </tbody>
    </table>
    <a @click="deleteFinishedTask">Delete task completed</a>
  </div>
</template>

<script setup>
  import TaskItem from "../components/TaskItem.vue"
  import {ref , onBeforeMount} from 'vue'
  import axios from 'axios'
  const newTask = ref("");
  const tasks = ref([]);
const error = ref("");
//Fetch task
const fetchTasks = async () => {
  try {
    const response = await axios.get("https://localhost:7048/api/Todo");
    tasks.value = response.data;
  } catch (err) {
    error.value = "Failed to fetch tasks: " + err.message; // Lưu lỗi nếu xảy ra
    console.error(err);
  }
};
//create task
const createTask = async () => {
  try {
    const response = await axios.post("https://localhost:7048/api/Todo", 
    {
      id:0,
      title: newTask.value,
    });
    fetchTasks();
  } catch (err) {
    error.value = "Failed to create task: " + err.message;
    console.error(err);
  }
};
//finish task
const finishedTask = async (id) => {
  try {
    const response = await axios.post(`https://localhost:7048/api/Todo/FinishTodo?id=${id}`);
    fetchTasks();
  } catch (err) {
    error.value = "Failed to update task: " + err.message;
    console.error(err);
  }
};
//delete task
const removeTask = async(id)=> {
  await deleteTask(id);
  await fetchTasks();
}
const toggleTaskComplete = async(id)=> {
  await finishedTask(id);
  await fetchTasks();
}
//xoa
const deleteTask = async (id)=> {
  try {
    const response = await axios.delete(`https://localhost:7048/api/Todo/DeleteTodo?id=${id}`);
    console.log("Task deleted successfully:", response.data);
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

const deleteFinishedTask = async()=>{
  try {
    const response = await axios.delete(`https://localhost:7048/api/Todo/DeleteTodoFinished`);
    console.log("Task deleted successfully:", response.data);
    fetchTasks();
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}
onBeforeMount(()=>{
  fetchTasks();
})
</script>
<style scoped>
  .container{
    width: 500px;
  }
</style>