<template>
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
        <td class="text-center">{{ index + 1 }}</td>
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
        <!-- Kiểm tra trạng thái chỉnh sửa -->
        <td class="text-center">
          <div v-if="editingTaskId === item.id">
            <input 
              v-model="editingTitle" 
              class="form-control" 
              type="text" 
              placeholder="Edit task title" 
            />
          </div>
          <div v-else>
            {{ item.title }}
          </div>
        </td>
        <td class="text-center" :class="{ 'text-success': item.isFinished, 'text-warning': !item.isFinished }">
          {{ item.isFinished ? 'Done' : 'Doing' }}
        </td>
        <td class="text-center d-flex justify-content-end">
          <button 
            v-if="editingTaskId === item.id"
            @click="saveEdit(item.id)" 
            class="btn btn-success mx-2"
          >
            Save
          </button>
          <button 
            v-else
            @click="startEdit(item)" 
            class="btn btn-warning mx-2"
          >
            <i class="bi bi-pencil"></i>
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
const editingTaskId = ref(null); // ID của task đang chỉnh sửa
const editingTitle = ref(''); // Tiêu đề mới đang chỉnh sửa

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

// Hàm bắt đầu chỉnh sửa
const startEdit = (item) => {
  editingTaskId.value = item.id;
  editingTitle.value = item.title; // Gán giá trị hiện tại để chỉnh sửa
};

// Hàm lưu thay đổi
const saveEdit = (id) => {
  emit('handleEditTask', { id, title: editingTitle.value }); // Gửi dữ liệu về thành phần cha
  editingTaskId.value = null; // Kết thúc chế độ chỉnh sửa
  editingTitle.value = ''; // Reset giá trị chỉnh sửa
};

// Hàm xử lý checkbox
const onCheckboxChange = (id) => {
  emit('onCheckboxChange', id);
};
</script>