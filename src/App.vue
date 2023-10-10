<template>
  <div id="app" class="md:flex gap-12 justify-center items-center h-screen">
    <DonationConverter @notify="notify" />
    <AboutCard />
    <Transition>
      <NotificationCard
        v-if="Boolean(notificationMessage)"
        :message="notificationMessage"
        :type="notificationType"
      />
    </Transition>
  </div>
</template>

<script>
import DonationConverter from "./components/DonationConverter.vue";
import AboutCard from "./components/AboutCard.vue";
import NotificationCard from "./components/NotificationCard.vue";

export default {
  name: "app",
  data() {
    return {
      notificationMessage: "",
      notificationType: null,
      notifierContext: null,
    };
  },
  methods: {
    notify(type, message) {
      this.notificationMessage = message;
      this.notificationType = type;

      const notifierContext = {
        message,
        type,
      };
      this.notifierContext = notifierContext;

      setTimeout(() => {
        if (notifierContext === this.notifierContext) {
          this.notificationMessage = "";
          this.notificationType = null;
        }
      }, 3000);
    },
    clearNotifications() {
      this.notificationMessage = "";
      this.notificationType = null;
      this.notifierContext = null;
    },
  },
  components: { DonationConverter, AboutCard, NotificationCard },
};
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>
