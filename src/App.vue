<template>
  <div id="app" class="flex gap-12 justify-center items-center h-screen">
    <DonationConverter />
    <AboutCard />
  </div>
</template>

<script>
import DonationConverter from './components/DonationConverter.vue'
import AboutCard from './components/AboutCard.vue'

export default {
    name: 'App',
    components: { DonationConverter, AboutCard }
}
</script>