<template>
    <div id="tab-bar">
      <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "TabBar"
    }
</script>

<style scoped>
  #tab-bar{
    position: fixed;
    display: flex;
    background-color: #f6f6f6;
    left: 0;
    right: 0;
    bottom: 0;
  }

</style>
