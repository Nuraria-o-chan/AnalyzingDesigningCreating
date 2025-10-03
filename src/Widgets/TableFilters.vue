<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: { type: String, default: 'Фильтр' },
  options: { type: Array, default: () => [] }, 
  modelValue: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue'])
const open = ref(false)

function selectOption(opt) {
  emit('update:modelValue', opt.value)
  open.value = false
}
</script>

<template>
  <div class="filter">
    <!-- выбранное значение -->
    <div class="filter-selected" @click="open = !open">
      {{ options.find((o) => o.value === modelValue)?.label || title }}
      <img src="../assets/icons/bottomArrow.svg" alt="arrow" />
    </div>

    <!-- выпадающий список -->
    <div v-if="open" class="filter-options">
      <div
        v-for="opt in options"
        :key="opt.value"
        class="filter-option"
        :class="{ active: opt.value === modelValue }"
        @click="selectOption(opt)"
      >
        {{ opt.label }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filter {
  position: relative;
  width: 280px;
  font-size: 14px;
}

.filter-selected {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border: 1px solid #d3d3de;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  color: #1a1a1a;
  img {
    width: 24px;
  }
}

.arrow {
  font-size: 12px;
  color: #555;
}

.filter-options {
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  border-radius: 12px;
  background: #f7f7fb;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 100;
  padding: 4px 0;
}

.filter-option {
  padding: 10px 16px;
  margin: 2px 4px;
  border-radius: 12px;
  cursor: pointer;
}

.filter-option:hover {
  background: #e4e4ef;
}

.filter-option.active {
  background: #d0d0e5;
  font-weight: bold;
}
</style>
