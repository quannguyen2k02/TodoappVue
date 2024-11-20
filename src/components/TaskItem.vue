<template>
  <tr>
      <td class="text-center"><input 
        class="form-check-input" 
        type="checkbox" 
        :checked="task.isCompleted" 
        @change="$emit('toggle-complete', task.id)"
        id="flexCheckDefault"
      /></td>
      <td class="text-center">{{ task.title  }}</td>
      <td class="text-center">{{ task.isCompleted ? 'Done' : 'Doing'  }}</td>
      <td class="text-center"><button class="btn btn-danger" @click="$emit('remove-task',task.id)"><i class="bi bi-trash-fill"></i></button></td>
  </tr>
</template>

<script setup>
defineProps({
task: {
  type: Object,
  required: true,
}
});
</script>