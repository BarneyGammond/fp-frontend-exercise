
<template>
  <div id="donationConverter">
    <h1 class="text-3xl mb-10">Support us from the US</h1>
    <div class="flex justify-between items-center mb-4">
      <p>Amount (USD)</p>
      <input
        placeholder="Enter amount in USD"
        class="border-2 border-grey rounded w-3/5 p-1 px-3"
        type="number"
        v-model="donationAmount"
      >
    </div>
    <div class="flex justify-between items-center mb-5">
      <p>Estimate (GBP)</p>
      <p class="border-2 border-grey rounded w-3/5 p-1 px-3">£ {{ exchangedAmount }}</p>
    </div>
    <div class="flex justify-center">
      <button v-on:click="fetchExchange" class="bg-green p-2 px-6 rounded text-white">Calculate</button>
    </div>
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
