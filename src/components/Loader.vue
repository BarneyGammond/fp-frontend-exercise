<template>
  <svg
    :width="height"
    class="animate-spin"
    :height="height"
    viewBox="0 0 38 38"
    xmlns="http://www.w3.org/2000/svg"
    stroke="white"
  >
    <g fill="none" fill-rule="evenodd">
      <g transform="translate(1 1)" stroke-width="2">
        <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
        <path d="M36 18c0-9.94-8.06-18-18-18"></path>
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: "loader",
  props: {
    height: {
      type: Number,
      default: 24,
    },
  },
};
</script>
