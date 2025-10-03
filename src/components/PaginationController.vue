<script setup>
import DropDown from '../Widgets/DropDown.vue'

defineProps({
  page: { type: Number, required: true },
  limit: { type: Number, required: true },
  totalPages: { type: Number, required: true },
  totalCount: { type: Number, required: true },
})
const emit = defineEmits(['update:page', 'update:limit'])

// Функция для построения массива кнопок с номерами и "…", решила без библиотек обойтись
function getPages(current, total) {
  const pages = []
  if (total <= 7) {
    // если страниц мало — показываем все
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    if (current <= 3) {
      pages.push(1, 2, 3, 4, '...', total)
    } else if (current >= total - 2) {
      pages.push(1, '...', total - 3, total - 2, total - 1, total)
    } else {
      pages.push(1, '...', current - 1, current, current + 1, '...', total)
    }
  }
  return pages
}
</script>

<template>
  <div class="pagination-controls">
    <div class="buttons-input">
      <button class="arrow" :disabled="page <= 1" @click="emit('update:page', page - 1)">
        <img src="../assets/icons/leftArrow.svg" alt="leftArrow" />
      </button>

      <!-- список страниц -->
      <button
        v-for="(p, i) in getPages(page, totalPages)"
        :key="i"
        :disabled="p === '...'"
        :class="['pageButton', { active: p === page, dots: p === '...' }]"
        @click="p !== '...' && emit('update:page', p)"
      >
        {{ p }}
      </button>

      <button class="arrow" :disabled="page >= totalPages" @click="emit('update:page', page + 1)">
        <img src="../assets/icons/rightArrow.svg" alt="rightArrow" />
      </button>
    </div>

    <DropDown :model-value="limit" @update:modelValue="emit('update:limit', $event)" />
  </div>
</template>

<style lang="scss">
.pagination-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  font-size: 12px;
  color: #687588;

  label {
    display: flex;
    gap: 6px;
    justify-content: center;
    align-content: center;
  }

  .buttons-input {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;
    border: 0;

    .pageButton {
      border: 0;
      background-color: #f0f0f7;
      border-radius: 8px;
      padding: 8px 12px;
      cursor: pointer;
      color: #687588;

      &.active {
        background-color: rgb(203, 203, 232);
        font-weight: bold;
      }

      &.dots {
        background-color: #f0f0f7;
        border: none;
        cursor: default;
      }
    }
    .arrow {
      border: 1px solid #d3d3de;
      border-radius: 8px;
      padding: 6px 10px;
      width: 44px;
      height: 36px;
      background-color: #fff;
      img {
        width: 6px;
        height: 12px;
      }
    }
  }
}
</style>
