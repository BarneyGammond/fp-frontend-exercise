
<template>
  <div id="donationConverter" class="p-3 my-2">
    <h1 class="text-3xl md:mb-10 mb-6 text-center md:text-start w-2/3 md:w-auto mx-auto md:mx-0 leading-10">Support us from the US</h1>
    <div class="md:flex justify-between items-center mb-4">
      <p>Amount (USD)</p>
      <input
        placeholder="Enter amount in USD"
        class="border-2 border-grey rounded md:w-3/5 w-full p-1 px-3"
        type="number"
        value="donationAmount"
        min="0"
        @input="inputChanged"
      >
    </div>
    <div class="md:flex justify-between items-center md:mb-5 mb-3 ">
      <p>Estimate (GBP)</p>
      <p class="border-2 border-grey rounded md:w-3/5 p-1 px-3">£ {{ exchangedAmount }}</p>
    </div>
    <div class="flex justify-center">
      <LoadingButton @clicked='fetchExchange' label="Calculate" :disabled="!Boolean(donationAmount)" :loading="Boolean(loadingExchange)" />
    </div>
  </div>
</template>

<script>
  import LoadingButton from './LoadingButton.vue'
  import { debounce } from '../lib/helpers'

  export default {
    name: 'donationConverter',
    data() {
      return {
        donationAmount: "",
        exchangedAmount: "",
        loadingExchange: false,
        fetchController: null,
        debouncedFetch: debounce(this.fetchExchange, 1000)
      }
    },
    methods: {
      inputChanged ({ target }) {
        this.donationAmount = target.value
        this.debouncedFetch()
      },
      async fetchExchange() {

        // Setup up controller to cancel fetch if necessary
        const controller = new AbortController()
        const { signal } = controller

        // If previous fetch is still running, cancel it
        if (this.fetchController) {
          this.fetchController.abort()
        }

        // Then set new controller to be cancelled if necessary
        this.fetchController = controller

        // Fetch exchange rates with correct loading state
        this.loadingExchange = true
        const response = await fetch('https://founderspledge.github.io/fp-interview-exercise-api/currency.json', { signal })
        // TODO Contingency in case quotes.USDGBP is not available
        const { quotes } = await response.json()
        this.exchangedAmount = (this.donationAmount * quotes.USDGBP).toFixed(2)

        // Clean up fetchConroller and loading state
        this.fetchController = null
        this.loadingExchange = false
      }
    },
    components: {
      LoadingButton
    }
  }
</script>
