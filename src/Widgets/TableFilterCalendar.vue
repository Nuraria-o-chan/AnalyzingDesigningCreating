<template>
  <div class="dropdown">
    <p>data</p>
    <img src="@/assets/icons/calendar-time.svg" alt="calendar" />
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
