<template>
  <div class="checkout-page bg-secondary min-h-screen py-10">
    <div class="container mx-auto px-4 max-w-6xl">
      <h1 class="text-3xl font-bold text-primary mb-8">{{ $t('common.checkoutRequests') }}</h1>

      <div class="grid md:grid-cols-2 gap-6 bg-primary p-6 rounded-2xl shadow-lg">
        <!-- LEFT SIDE - ORDER DETAILS -->
        <div class="bg-secondary rounded-xl p-6 shadow">
          <h2 class="text-2xl font-semibold text-primary mb-6">
            {{ $t('common.requestDetails') }}
          </h2>

          <div v-if="cartStore.waste?.length > 0" class="space-y-4">
            <div v-for="item in cartStore.waste" :key="item.id" class="flex justify-between items-center border-t pb-3">
              <div class="flex items-center gap-4">
                <img :src="item.cartable.image_url" alt="Product" class="w-14 h-14 rounded-md object-cover" />
                <div>
                  <p class="font-semibold text-gray-800">
                    {{ item.cartable.name }}
                  </p>
                  <p class="text-sm text-gray-500">
                    {{ item.cartable.points_per_unit }} {{ $t('common.points') }} × {{ item.quantity }}
                  </p>
                </div>
              </div>
              <p class="text-primary font-semibold">
                {{ item.points }} {{ $t('common.points') }}
              </p>
            </div>

            <!-- Totals -->
            <div class="pt-4 border-t mt-4">
              <div class="flex justify-between mb-2">
                <span>{{ cartStore.waste?.length }} {{ $t('common.items') }}</span>
                <span>{{ cartStore.totalPoints }} {{ $t('common.points') }}</span>
              </div>
              <div class="flex justify-between text-xl font-bold text-primary">
                <span>{{ $t('common.totalPoints') }}</span>
                <span>{{ cartStore.totalPoints }} {{ $t('common.points') }}</span>
              </div>
            </div>
          </div>

          <div v-else class="text-center text-gray-500 mt-6">
            {{ $t('common.yourCartIsEmpty') }}
            <router-link to="/shop" class="text-primary underline">{{ $t('common.addWaste') }}</router-link>.
          </div>
        </div>

        <!-- RIGHT SIDE - CHECKOUT -->
        <div class="bg-secondary rounded-xl p-6 shadow flex flex-col justify-between">
          <div>
            <h2 class="text-2xl font-semibold text-primary mb-6">{{ $t('common.proceedToCheckout') }}</h2>

            <!-- Address Section -->
            <div class="mb-6">
              <div class="flex justify-between items-center mb-2">
                <h3 class="font-semibold text-primary">{{ $t('common.pickupAddress') }}</h3>
                <button @click="showAddressModal = true"
                  class="bg-[#2C702C] text-white px-4 py-1 rounded-md hover:bg-[#215921] cursor-pointer">
                  {{ $t('common.enterNewAddress') }}
                </button>
              </div>

              <div v-if="addresses.length > 0">
                <div v-for="address in addresses" :key="address.id" @click="selectedAddressId = address.id"
                  class="flex items-start gap-3 p-3 rounded-md text-sm my-2 cursor-pointer border transition-all duration-200"
                  :class="selectedAddressId === address.id
                    ? 'bg-[#E9F7E9] border-green-400 text-primary'
                    : 'bg-address text-primary border-transparent hover:border-gray-300'">
                  <!-- Radio circle -->
                  <input type="radio" name="pickupAddress" :value="address.id" v-model="selectedAddressId" required
                    class="accent-[#2C702C] h-4 w-4 cursor-pointer mt-1 text-[#2C702C] focus:ring-[#2C702C] border-gray-300" />

                  <!-- Address info -->
                  <div>
                    <span class="font-bold">Full Name:</span> {{ address.name }}<br />
                    <span class="font-bold">Phone:</span> {{ address.phone }}<br />
                    <span class="font-bold">Street Address:</span> {{ address.street_address }}<br />
                    <span class="font-bold">City:</span> {{ address.city }}
                  </div>
                </div>
              </div>

              <div v-else class="text-gray-400 text-sm">
                {{ $t('common.noAddressAddedYet') }}
              </div>
            </div>



            <!-- Payment Section -->
            <div class="mb-6">
              <h3 class="font-semibold text-primary mb-2">{{ $t('common.payoutMethod') }}</h3>
              <div class="flex gap-3">
                <button @click="payoutMethod = 'earn'" :class="[
                  'px-4 py-2 rounded-md border cursor-pointer',
                  payoutMethod === 'earn'
                    ? 'bg-[#2C702C] text-white border-[#2C702C]'
                    : 'border-gray-300 text-primary',
                ]">
                  {{ $t('common.earnPoints') }}
                </button>
                <button @click="payoutMethod = 'donate'" :class="[
                  'px-4 py-2 rounded-md border cursor-pointer',
                  payoutMethod === 'donate'
                    ? 'bg-[#2C702C] text-white border-[#2C702C]'
                    : 'border-gray-300 text-primary',
                ]">
                  {{ $t('common.donatePoints') }}
                </button>
              </div>
            </div>

            <!-- Notes -->
            <div class="mb-6">
              <h3 class="font-semibold text-primary mb-2">{{ $t('common.pickupNotes') }}</h3>
              <textarea v-model="pickupNotes" :placeholder="$t('common.addPickupNotes')"
                class="w-full border border-gray-300 rounded-md p-2 text-sm" rows="3"></textarea>
            </div>
          </div>

          <!-- Confirm Button -->
          <div class="mt-4">
            <button @click="placeOrder"
              class="w-full bg-[#2C702C] hover:bg-[#1a4d1a] text-white font-bold py-3 rounded-md transition-all">
              {{ $t('common.confirmOrder') }}
            </button>
            <router-link to="/cart" class="block mt-3 btn text-center text-[#2C702C] hover:underline text-sm">
              {{ $t('common.goBack') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Address Modal -->
    <div v-if="showAddressModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-[90%] max-w-md">
        <h3 class="text-xl font-semibold text-[#2C702C] mb-4">
          {{ $t('common.enterPickupAddress') }}
        </h3>

        <form @submit.prevent="confirmCreate" class="space-y-3">
          <input v-model="createForm.name" type="text" :placeholder="$t('common.fullName')" required
            class="w-full border border-gray-300 rounded-md px-3 py-2" />
          <input v-model="createForm.phone" type="text" :placeholder="$t('common.phoneNumber')" required
            class="w-full border border-gray-300 rounded-md px-3 py-2" />
          <input v-model="createForm.street_address" type="text" :placeholder="$t('common.streetAddress')" required
            class="w-full border border-gray-300 rounded-md px-3 py-2" />
          <input v-model="createForm.city" type="text" :placeholder="$t('common.city')" required
            class="w-full border border-gray-300 rounded-md px-3 py-2" />

          <div class="flex justify-end gap-3 pt-3">
            <button type="button" @click="showAddressModal = false" class="px-4 py-2 border border-gray-300 rounded-md">
              {{ $t('common.cancel') }}
            </button>
            <button type="submit" class="px-4 py-2 bg-[#2C702C] text-white rounded-md hover:bg-[#215921]">
              {{ $t('common.save') }}
            </button>
          </div>
        </form>
      </div>
    </div>
    <!-- ✅ Order Confirmation Modal -->
    <div v-if="showConfirmation" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl p-8 w-[90%] max-w-md text-center shadow-xl">
        <img src="/images/delivery.png" alt="Delivery Truck" class="w-48 mx-auto mb-4" />
        <p class="text-[#2C702C] text-lg font-semibold">
          {{ $t('common.thankYouForSupportingKarakib') }}
        </p>
        <button @click="closeConfirmation" class="mt-6 px-6 py-2 bg-[#2C702C] text-white rounded-md hover:bg-[#1a4d1a]">
          {{ $t('common.close') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import checkoutService from "@/services/checkoutService";
import profileService from "@/services/profileService";
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import soundPlayer from '@/utils/sounds';

export default {
  name: "CollectPage",
  data() {
    return {
      showAddressModal: false,
      showConfirmation: false,
      selectedAddressId: '',
      addresses: [],
      createForm: {
        id: null,
        name: '',
        phone: '',
        street_address: '',
        city: '',
      },
      payoutMethod: "",
      pickupNotes: "",
    };
  },
  computed: {
    cartStore() {
      return useCartStore();
    },
    authStore() {
      return useAuthStore();
    },
  },
  methods: {
    async fetchAddresses() {
      try {
        const user = await profileService.getAddresses();
        this.addresses = user.data.addresses || user.data;
      } catch (error) {
        this.$toast.error(error?.response?.data.message || 'Failed to fetch addresses.');
      }
    },

    async confirmCreate() {
      try {
        const response = await profileService.createAddress(this.createForm);
        this.$toast.success(response.data.message);
        this.showAddressModal = false;
        this.createForm.name = '';
        this.createForm.phone = '';
        this.createForm.street_address = '';
        this.createForm.city = '';
        this.fetchAddresses();
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },
    async placeOrder() {
      if (!this.selectedAddressId) {
        if (this.addresses.length < 1) {
          this.$toast.error(this.$t('common.addPickupAddressFirst'));
          return;
        }
        this.$toast.error(this.$t('common.pleaseSelectpickupAddress'));
        return;
      }

      if (!this.payoutMethod) {
        this.$toast.error(this.$t('common.pleaseSelectpayoutMethod'));
        return;
      }

      try {
        await checkoutService.collect({
          user_address_id: this.selectedAddressId,
          payout_method: this.payoutMethod,
          notes: this.pickupNotes,
        });

        this.showConfirmation = true;
        soundPlayer.play('success');
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },
    closeConfirmation() {
      this.showConfirmation = false;
      this.$router.push("/");
    },
  },
  async mounted() {
    await this.cartStore.fetchCart();
    if (this.cartStore.waste?.length === 0) {
      this.$router.push("/cart");
    }
    this.fetchAddresses();
  },
};
</script>

<style scoped>
.text-primary {
  color: #2c702c !important;
}

[data-theme="forest"] .text-primary {
  color: #16af3f !important;
}

.bg-primary {
  background-color: #F5F7F5 !important;
}

[data-theme="forest"] .bg-primary {
  background-color: rgb(66, 66, 66) !important;
}

.text-secondary {
  color: #2c702c !important;
}

[data-theme="forest"] .text-secondary {
  color: rgb(9, 228, 75) !important;
}

.text-section {
  color: black !important;
}

[data-theme="forest"] .text-section {
  color: white !important;
}

.bg-secondary {
  background-color: #ffff;
}

[data-theme="forest"] .bg-secondary {
  background-color: rgb(43, 43, 43) !important;
}

.bg-address {
  background-color: #f6f9f6
}

[data-theme="forest"] .bg-address {
  background-color: #545554;
}
</style>
