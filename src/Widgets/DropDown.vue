<script setup>
import { ref } from 'vue'

// Принимаем modelValue (чтобы компонент работал с v-model)
const props = defineProps({
  modelValue: {
    type: Number,
    default: 10,
  },
})
const emit = defineEmits(['update:modelValue'])

const open = ref(false)

function select(n) {
  emit('update:modelValue', n)
  open.value = false
}
</script>

<template>
  <div class="wrapper-dropdown">
    <p>Показывать</p>
    <div class="custom-select" @click="open = !open">
      <div class="selected">
        {{ props.modelValue }} <img src="../assets/icons/bottomArrow.svg" alt="bottomArrow" />
      </div>
      <div v-if="open" class="options">
        <div
          v-for="n in [10, 20, 30, 40, 50]"
          :key="n"
          :class="{ active: n === props.modelValue }"
          @click.stop="select(n)"
        >
          {{ n }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper-dropdown {
  display: flex;
  gap: 6px;
  line-height: 30px;

  .custom-select {
    position: relative;
    width: 100px;
    cursor: pointer;
  }

  .selected {
    display: flex;
    gap: 16px;
    border: 1px solid #d3d3de;
    border-radius: 8px;
    padding: 10px 16px;
    width: 73px;
    height: 36px;
    align-items: center;

    img {
      width: 14px;
      height: 9px;
    }
  }

  .options {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    border-radius: 12px;
    padding: 6px;
    width: 85px;
    height: 196px;
    box-shadow: 0 5px 40px 0 rgba(0, 0, 0, 0.1);
    background: #f1f4fd;
    border: 0;
    border-radius: 8px;
    z-index: 100;
    display: flex;
    flex-direction: column;
    gap: 1px;

    div {
      border-radius: 8px;
      padding-left:  16px;
      width: 73px;
      height: 36px;
      background: #e4e4ee;

      &.active {
        background: #d3d3de;
        font-weight: bold;
      }
    }
  }
}
</style>
