<script setup>
defineProps({
  title: String,
  img: String,
})
</script>

<template>
  <div class="dropdown">
    <p>{{ title }}</p>
    <img v-if="img" :src="img" alt="iconArrow" />
    <!-- <input type="text" placeholder="kj" /> -->
  </div>
</template>

<style lang="scss" setup>
.dropdown {
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  border: 1px solid #d3d3de;
  padding: 16px 24px;
  font-weight: 400;
  font-size: 16px;
  color: #0e0e10;
  height: 56px;


  img {
    cursor: pointer;
  }
}
</style>
