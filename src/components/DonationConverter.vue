<template>
  <div id="donationConverter" class="p-3 my-2">
    <h1
      class="text-3xl md:mb-10 mb-6 text-center md:text-start w-2/3 md:w-auto mx-auto md:mx-0 leading-10"
    >
      Support us from the US
    </h1>
    <div class="md:flex justify-between items-center mb-4">
      <p>Amount (USD)</p>
      <input
        placeholder="Enter amount in USD"
        class="border-2 border-gray-300 rounded md:w-3/5 w-full p-1 px-3"
        type="number"
        value="donationAmount"
        min="0"
        @input="inputChanged"
      />
    </div>
    <div class="md:flex justify-between items-center md:mb-5 mb-3">
      <p>Estimate (GBP)</p>
      <p
        :class="!exchangedAmount && 'text-gray-300'"
        class="bg-gray-100 border-2 border-gray-300 rounded md:w-3/5 p-1 px-3"
      >
        £ {{ exchangedAmount }}
      </p>
    </div>
    <div class="flex justify-center">
      <LoadingButton
        @clicked="fetchExchange"
        :label="exchangedAmount ? 'Recalculate' : 'Calculate'"
        :disabled="!Boolean(donationAmount > 0)"
        :loading="Boolean(loadingExchange)"
      />
    </div>
  </div>
</template>

<script>
import LoadingButton from "./LoadingButton.vue";
import { debounce } from "../lib/helpers";

export default {
  name: "donationConverter",
  emits: ['notify'],
  data() {
    return {
      donationAmount: "",
      exchangedAmount: "",
      loadingExchange: false,
      fetchController: null,
      debouncedFetch: debounce(this.fetchExchange, 500),
    };
  },
  methods: {
    inputChanged({ target }) {
      this.$emit('notify', null, "")
      this.donationAmount = target.value;
      this.debouncedFetch();
    },
    async fetchExchange() {
      // If input value is 0 or empty then just change exchange amount to ""
      if (!this.donationAmount) {
        this.exchangedAmount = "";
        return
      } else if (this.donationAmount < 0) {
        this.exchangedAmount = ""
        this.$emit('notify', 'error', 'Donation must be a positive amount')
        return
      }

      // Setup up controller to cancel fetch if necessary
      const controller = new AbortController();
      const { signal } = controller;

      // If previous fetch is still running, cancel it
      if (this.fetchController) {
        this.fetchController.abort();
      }

      // Then set new controller to be cancelled if necessary
      this.fetchController = controller;

      // Fetch exchange rates with correct loading state
      this.loadingExchange = true;
      const response = await fetch(
        "https://founderspledge.github.io/fp-interview-exercise-api/currency.json",
        { signal }
      );
      // TODO Contingency in case quotes.USDGBP is not available
      const { quotes } = await response.json();
      this.exchangedAmount = (this.donationAmount * quotes.USDGBP).toFixed(2);

      this.$emit('notify', 'success', 'Successfully exchanged donation')

      // Clean up fetchConroller and loading state
      this.fetchController = null;
      this.loadingExchange = false;
    },
  },
  components: {
    LoadingButton,
  },
};
</script>
