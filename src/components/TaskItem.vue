<template>
  <button :disabled="listIds.length === 0" class="btn btn-success mt-2"
      @click="$emit('handleFinishTasks', listIds)">Finish</button>
    <button :disabled="listIds.length === 0" class="btn btn-danger mx-2 mt-2"
      @click="$emit('handleDeleteTasks',listIds)">Delete</button>
  <table class="table table-bordered mt-2">

  
  <thead>
        <tr>
          <th scope="col" class="text-center w-25">#</th>
          <th scope="col" class="text-center w-25">Task</th>
          <th scope="col" class="text-center w-25">Status</th>
          <th scope="col" class="text-center w-25">#</th>

        </tr>
      </thead>
  <tbody>
    <tr v-for="item in task" :key="task.id">
      <td class="text-center"><input class="form-check-input" type="checkbox" id="flexCheckDefault" v-model="listIds"
          :value="item.id" @click="change" /></td>
      <td class="text-center">{{ item.title }}</td>
      <td class="text-center">{{ item.isFinished ? 'Done' : 'Doing' }}</td>
      <td class="text-center d-flex justify-content-end ">

        <button v-show="checkFinish(item.isFinished)" @click="$emit('handleFinishTask',item.id)"
          class="btn btn-success mx-2"><i class="bi bi-check "></i></button>

        <button @click="$emit('handleDeleteTask',item.id)" class="btn btn-danger "><i
            class="bi bi-trash-fill"></i></button>
      </td>
    </tr>
    
  </tbody>
</table>
  
</template>

<script setup>
defineProps({
task: {
  type: Array
}
});
  import {ref} from 'vue'
  const listIds = ref([])
const checkFinish = function(status){
  if(status)
    return false;
  return true;
}
</script>