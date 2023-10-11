<template>
  <div class=" fixed top-0 right-0 p-2 px-4 rounded shadow-lg m-3 text-white" :class="wrapperClasses">
    {{ message }}
  </div>
</template>

<script>
  export default {
    name: 'notificationCard',
    computed: {
      wrapperClasses() {
        switch (this.type) {
          case 'success':
            return 'bg-green'
          case 'error':
            return 'bg-error'
          default:
            return ''
        }
      }
    },
    props: {
      type: {
        validator(value) {
          return ['success', 'error'].includes(value)
        }
      },
      message: String
    }
  }
</script>