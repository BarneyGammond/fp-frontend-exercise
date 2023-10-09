
<template>
  <div id="donationConverter">
    <h1>Support us from the US</h1>
    <div>
      <p>Amount (USD)</p>
      <input
        class="border-2 border-grey rounded"
        type="number"
        v-model="donationAmount"
      >
    </div>
    <div>
      <p>Estimate (GBP)</p>
      <p class="border-2 border-grey rounded">{{ exchangedAmount }}</p>
    </div>
      <button v-on:click="fetchExchange" class="bg-green p-2">Calculate</button>
  </div>
</template>

<script>
  export default {
    name: 'Donation Converter',
    data: () => ({
      donationAmount: "",
      exchangedAmount: "",
    }),
    methods: {
    async fetchExchange() {
      const response = await fetch('https://founderspledge.github.io/fp-interview-exercise-api/currency.json');
      const { quotes } = await response.json();
      // TODO Contingency in case quotes.USDGBP is not available
      this.exchangedAmount = (this.donationAmount * quotes.USDGBP).toFixed(2);
    }
  },
  }
</script>
