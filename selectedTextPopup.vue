<template>
  <div>
    <GlobalEvents @mouseup="handleMouseup"></GlobalEvents>
  </div>
</template>

<script>
import GlobalEvents from 'vue-global-events'

export default {
  methods: {
    handleMouseup() {
      console.log('mouseup!')
    }
  }
}
</script>

<style></style>
