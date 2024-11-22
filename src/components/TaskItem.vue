<template>
  <!-- Table rendering tasks -->
  <table class="table table-bordered mt-2">
    <thead>
      <tr>
        <th scope="col" class="text-center w-10">No.</th>
        <th scope="col" class="text-center w-15">#</th>
        <th scope="col" class="text-center w-35">Task</th>
        <th scope="col" class="text-center w-15">Status</th>
        <th scope="col" class="text-center w-25">#</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in task" :key="item.id">
        <!-- Hiển thị số thứ tự -->
        <td class="text-center">{{ index + 1 }}</td>
        <!-- Các cột khác -->
        <td class="text-center">
          <input 
            class="form-check-input" 
            :checked="item.isFinished" 
            type="checkbox" 
            id="flexCheckDefault" 
            :value="item.id" 
            @change="onCheckboxChange(item.id)" 
          />
        </td>
        <td class="text-center">{{ item.title }}</td>
        <td class="text-center" :class="{ 'text-success': item.isFinished, 'text-warning': !item.isFinished }">
          {{ item.isFinished ? 'Done' : 'Doing' }}
        </td>
        <td class="text-center d-flex justify-content-end">
          <button 
            v-show="checkFinish(item.isFinished)" 
            @click="handleFinishTask(item.id)"
            class="btn btn-success mx-2"
          >
            <i class="bi bi-check"></i>
          </button>
          <button 
            @click="openDeleteModal(item.id)" 
            class="btn btn-danger"
          >
            <i class="bi bi-trash-fill"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>

  <!-- Modal for Confirm Deletion -->
  <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteModalLabel">Confirm Deletion</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Are you sure you want to delete this task?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-danger" @click="confirmDelete">Delete</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import { defineEmits } from 'vue';
import { Modal } from 'bootstrap';
defineProps({
task: {
  type: Array
}
});
const emit = defineEmits();
const currentTaskId = ref(null);
let deleteModal = ref(null);

// Hàm mở modal xác nhận
const openDeleteModal = (id) => {
  currentTaskId.value = id;

  // Tạo modal từ DOM
  const modalElement = document.getElementById('deleteModal');
  deleteModal.value = new Modal(modalElement);
  
  deleteModal.value.show(); // Hiển thị modal
};

// Hàm xử lý xóa
const confirmDelete = () => {
  emit('handleDeleteTask', currentTaskId.value);
  deleteModal.value.hide(); // Đóng modal sau khi xóa
};

// Hàm kiểm tra trạng thái hoàn thành
const checkFinish = (status) => {
  return !status; // Hiển thị nút chỉ khi công việc chưa hoàn thành
};

// Hàm xử lý việc thay đổi checkbox
const onCheckboxChange = (id) => {
  emit('onCheckboxChange', id);
};

// Hàm xử lý hoàn thành task
const handleFinishTask = (id) => {
  emit('handleFinishTask', id);
};
</script>