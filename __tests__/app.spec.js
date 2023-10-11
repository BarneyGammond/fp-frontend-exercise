import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import DonationConverter from "./../src/components/DonationConverter";
import LoadingButton from "./../src/components/LoadingButton";
import Loader from "./../src/components/Loader";
import NotificationCard from "./../src/components/NotificationCard";
import App from "./../src/App";

describe("Mounted Donation Converter", () => {
  const wrapper = mount(DonationConverter);

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ quotes: { USDGBP: 0.7194 } }),
    })
  );

  it("input sets donation amount", async () => {
    const numberInput = wrapper.find('input[type="number"]');
    await numberInput.setValue("50");
    expect(wrapper.vm.$data.donationAmount).toBe("50");
  });

  it("donation amount is converted correctly", async () => {
    const button = wrapper.findComponent(LoadingButton);
    wrapper.setData({ donationAmount: "50" });
    await button.vm.$emit("clicked");
    await nextTick();
    expect(wrapper.vm.$data.exchangedAmount).toBe("35.97");
  });

  it("button shows loader when fetching exchange", async () => {
    const button = wrapper.findComponent(LoadingButton)
    wrapper.setData({ donationAmount: "50" })
    wrapper.vm.fetchExchange()
    await nextTick()
    expect(button.findComponent(Loader).isVisible()).toBe(true);
  });
});

describe("Mounted App", () => {
  const wrapper = mount(App);
  const donationWrapper = wrapper.findComponent(DonationConverter);

  it("Show notification after notify emit", async () => {
    await donationWrapper.vm.$emit("notify", "success", "hello world");
    const notificationWrapper = wrapper.findComponent(NotificationCard);
    expect(notificationWrapper.isVisible()).toBe(true);
  });
});
