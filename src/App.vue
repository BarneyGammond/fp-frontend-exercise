<template>
  <div id="app">
      <div>
        <h3>Hello world</h3>
        <input
          type="number"
          v-model="donationAmount"
        >
        <p>{{ exchangedAmount }}</p>
        <button v-on:click="fetchExchange">Calculate</button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      donationAmount: "",
      exchangedAmount: "",
    }
  },
  methods: {
    async fetchExchange () {
      const response = await fetch('https://founderspledge.github.io/fp-interview-exercise-api/currency.json')
      const { quotes } = await response.json()
      // TODO Contingency in case quotes.USDGBP is not available
      this.exchangedAmount = (this.donationAmount * quotes.USDGBP).toFixed(2)
      console.log(quotes)
    }
  }
}
</script>

<style>

</style>