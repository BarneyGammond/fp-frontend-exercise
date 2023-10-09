
<template>
  <div id="donationConverter" class="p-3 my-2">
    <h1 class="text-3xl mb-md-10 mb-6 text-center text-md-start w-2/3 w-md-auto m-auto m-md-0 leading-10">Support us from the US</h1>
    <div class="md:flex justify-between items-center mb-4">
      <p>Amount (USD)</p>
      <input
        placeholder="Enter amount in USD"
        class="border-2 border-grey rounded md:w-3/5 w-full p-1 px-3"
        type="number"
        v-model="donationAmount"
      >
    </div>
    <div class="md:flex justify-between items-center mb-md-5 mb-3 ">
      <p>Estimate (GBP)</p>
      <p class="border-2 border-grey rounded md:w-3/5 p-1 px-3">£ {{ exchangedAmount }}</p>
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
