<template>
  <div class="checkout-page bg-primary min-h-screen py-10">
    <div class="container mx-auto px-4 max-w-6xl">
      <h1 class="text-3xl font-bold text-primary mb-8">{{ $t('common.checkoutOrders') }}</h1>

      <div class="grid md:grid-cols-2 gap-6 bg-secondary p-6 rounded-2xl shadow-lg">
        <!-- LEFT SIDE - ORDER DETAILS -->
        <div class="bg-primary rounded-xl p-6 shadow">
          <h2 class="text-2xl font-semibold text-primary mb-6">
            {{ $t('common.orderDetails') }}
          </h2>

          <div v-if="cartStore.products?.length > 0" class="space-y-4">
            <div
              v-for="item in cartStore.products"
              :key="item.id"
              class="flex justify-between items-center border-t pb-3"
            >
              <div class="flex items-center gap-4">
                <img
                  :src="item.cartable.image_url"
                  alt="Product"
                  class="w-14 h-14 rounded-md object-cover"
                />
                <div>
                  <p class="font-semibold text-primary">
                    {{ item.cartable.name }}
                  </p>
                  <p class="text-sm text-section">{{ $t('common.colourWhite') }}</p>
                  <p class="text-sm text-section">
                    {{ item.cartable.price }} {{ $t('common.currency') }} × {{ item.quantity }}
                  </p>
                </div>
              </div>
              <p class="text-primary font-semibold">
                {{ (item.cartable.price * item.quantity).toFixed(2) }} {{ $t('common.currency') }}
              </p>
            </div>

            <!-- Totals -->
            <div class="pt-4 border-t mt-4">
              <div class="flex justify-between mb-2">
                <span>{{ cartStore.products?.length }} {{ $t('common.items') }}</span>
                <span>{{ cartStore.total }} {{ $t('common.currency') }}</span>
              </div>
              <div class="flex justify-between mb-2">
                <span>{{ $t('common.deliveryFee') }}</span>
                <span>20 {{ $t('common.currency') }}</span>
              </div>
              <div class="flex justify-between text-xl font-bold text-primary">
                <span>{{ $t('common.totalAmount') }}</span>
                <span>{{ cartStore.total + 20 }} {{ $t('common.currency') }}</span>
              </div>
            </div>
          </div>

          <div v-else class="text-center text-section mt-6">
            {{ $t('common.yourCartIsEmpty') }}
            <router-link to="/shop" class="text-primary underline">{{ $t('common.goShopping') }}</router-link>.
          </div>
        </div>

        <!-- RIGHT SIDE - CHECKOUT -->
        <div class="bg-primary rounded-xl p-6 shadow flex flex-col justify-between">
          <div>
            <h2 class="text-2xl font-semibold text-primary mb-6">{{ $t('common.proceedToCheckout') }}</h2>

            <!-- Address Section -->
            <div class="mb-6">
              <div class="flex justify-between items-center mb-2">
                <h3 class="font-semibold text-primary">{{ $t('common.deliveryAddress') }}</h3>
                <button
                  @click="showAddressModal = true"
                  class="bg-green-700 text-white px-4 py-1 rounded-md hover:bg-[#216b21] cursor-pointer"
                >
                  {{ $t('common.enterNewAddress') }}
                </button>
              </div>

              <div v-if="addresses.length > 0">
                <div
                  v-for="address in addresses"
                  :key="address.id"
                  class="flex justify-between items-start gap-3 p-3 rounded-md text-sm my-2 border transition-all duration-200"
                  :class="selectedAddressId === address.id
                    ? 'bg-[#E9F7E9] border-[#E9F7E9]'
                    : 'bg-address text-section border-gray-300 hover:border-gray-300'"
                >
                  <div class="flex items-start gap-3 w-full cursor-pointer" @click="selectedAddressId = address.id">
                    <input
                      type="radio"
                      name="deliveryAddress"
                      :value="address.id"
                      v-model="selectedAddressId"
                      required
                      class="accent-[#16af3f] h-4 w-4 cursor-pointer mt-1 text-primary focus:ring-[#16af3f] border-gray-300"
                    />
                    <div class="text-primary">
                      <span class="font-bold">Full Name:</span> {{ address.name }}<br />
                      <span class="font-bold">Phone:</span> {{ address.phone }}<br />
                      <span class="font-bold">Street Address:</span> {{ address.street_address }}<br />
                      <span class="font-bold">City:</span> {{ address.city }}
                    </div>
                  </div>

                  <!-- 🗑️ Delete Button -->
                  <button
                    @click.stop="openDeleteModal(address.id)"
                    class=" font-bold text-md px-1"
                    title="Delete this address"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div v-else class="text-primary text-sm">
                {{ $t('common.noAddressAddedYet') }}
              </div>
            </div>

            <!-- Payment Section -->
            <div class="mb-6">
              <h3 class="font-semibold text-primary mb-2">{{ $t('common.paymentMethod') }}</h3>
              <div class="flex gap-3">
                <button
                  @click="paymentMethod = 'cash'"
                  :class="[
                    'px-4 py-2 rounded-md border cursor-pointer',
                    paymentMethod === 'cash'
                      ? 'bg-[#2C702C] text-white border-[#2C702C]'
                      : 'border-gray-300 text-primary',
                  ]"
                >
                  {{ $t('common.cashOnDelivery') }}
                </button>
                <button
                  @click="paymentMethod = 'card'"
                  :class="[
                    'px-4 py-2 rounded-md border cursor-pointer',
                    paymentMethod === 'card'
                      ? 'bg-[#2C702C] text-white border-[#2C702C]'
                      : 'border-gray-300 text-primary',
                  ]"
                >
                  {{ $t('common.card') }}
                </button>
              </div>
            </div>

            <!-- Notes -->
            <div class="mb-6">
              <h3 class="font-semibold text-primary mb-2">{{ $t('common.deliveryNotes') }}</h3>
              <textarea
                v-model="deliveryNotes"
                :placeholder="$t('common.addDeliveryNotes')"
                class="w-full border border-gray-300 rounded-md p-2 text-sm"
                rows="3"
              ></textarea>
            </div>
          </div>

          <!-- Confirm Button -->
          <div class="mt-4">
            <button
              @click="placeOrder"
              class="w-full bg-[#2C702C] hover:bg-[#1a4d1a] text-white font-bold py-3 rounded-md transition-all"
            >
              {{ $t('common.confirmOrder') }}
            </button>
            <router-link
              to="/cart"
              class="block mt-3 btn text-center text-[#2C702C] hover:underline text-sm"
            >
              {{ $t('common.goBack') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- 🏠 Address Modal -->
    <div v-if="showAddressModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-[90%] max-w-md">
        <h3 class="text-xl font-semibold text-[#2C702C] mb-4">
          {{ $t('common.enterDeliveryAddress') }}
        </h3>

        <form @submit.prevent="confirmCreate" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-[#2C702C] mb-1">
              {{ $t('common.fullName') }}
            </label>
            <input
              v-model="createForm.name"
              type="text"
              required
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C702C]"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-[#2C702C] mb-1">
              {{ $t('common.phoneNumber') }}
            </label>
            <input
              v-model="createForm.phone"
              type="text"
              required
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C702C]"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-[#2C702C] mb-1">
              {{ $t('common.streetAddress') }}
            </label>
            <input
              v-model="createForm.street_address"
              type="text"
              required
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C702C]"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-[#2C702C] mb-1">
              {{ $t('common.city') }}
            </label>
            <input
              v-model="createForm.city"
              type="text"
              required
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C702C]"
            />
          </div>

          <div class="flex justify-end gap-3 pt-4">
            <button
              type="button"
              @click="showAddressModal = false"
              class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
            >
              {{ $t('common.cancel') }}
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-[#2C702C] text-white rounded-md hover:bg-[#215921]"
            >
              {{ $t('common.save') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 🗑️ Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 w-[90%] max-w-sm text-center shadow-lg">
        <p class="text-lg font-semibold text-[#2C702C] mb-4">
          {{ $t('are You Sure To Delete this  Delivery Address') }}
        </p>
        <div class="flex justify-center gap-4">
          <button
            @click="cancelDelete"
            class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            {{ $t('cancel') }}
          </button>
          <button
            @click="confirmDelete"
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            {{ $t('common.delete') }}
          </button>
        </div>
      </div>
    </div>

    <!-- ✅ Order Confirmation Modal -->
    <div
      v-if="showConfirmation"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-2xl p-8 w-[90%] max-w-md text-center shadow-xl">
        <img src="/images/delivery.png" alt="Delivery Truck" class="w-48 mx-auto mb-4" />
        <p class="text-[#2C702C] text-lg font-semibold">
          {{ $t('thank You For Supporting Karakib') }}
        </p>
        <button
          @click="closeConfirmation"
          class="mt-6 px-6 py-2 bg-[#2C702C] text-white rounded-md hover:bg-[#1a4d1a]"
        >
          {{ $t('close') }}
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
  name: "CheckoutPage",
  data() {
    return {
      showAddressModal: false,
      showDeleteModal: false,
      showConfirmation: false,
      addressToDelete: null,
      selectedAddressId: '',
      addresses: [],
      createForm: {
        name: '',
        phone: '',
        street_address: '',
        city: '',
      },
      paymentMethod: "",
      deliveryNotes: "",
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
    openDeleteModal(id) {
      this.addressToDelete = id;
      this.showDeleteModal = true;
    },
    cancelDelete() {
      this.showDeleteModal = false;
      this.addressToDelete = null;
    },
    async confirmDelete() {
      try {
        await profileService.deleteAddress(this.addressToDelete);
        this.$toast.success(this.$t('address Deleted Successfully'));
        this.showDeleteModal = false;
        this.fetchAddresses();
      } catch (error) {
        this.$toast.error(error?.response?.data?.message || 'Failed to delete address');
      }
    },
    async confirmCreate() {
      try {
        const response = await profileService.createAddress(this.createForm);
        this.$toast.success(response.data.message);
        this.showAddressModal = false;
        this.createForm = { name: '', phone: '', street_address: '', city: '' };
        this.fetchAddresses();
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },
    async placeOrder() {
      if (!this.selectedAddressId) {
        if (this.addresses.length < 1) {
          this.$toast.error(this.$t('add Delivery Address First'));
          return;
        }
        this.$toast.error(this.$t('please Select Delivery Address'));
        return;
      }
      if (!this.paymentMethod) {
        this.$toast.error(this.$t('please Select Payment Method'));
        return;
      }
      try {
        const response = await checkoutService.checkout({
          user_address_id: this.selectedAddressId,
          payment_method: this.paymentMethod,
          notes: this.deliveryNotes,
        });
        if (response.data.url) window.location.href = response.data.url;
        if (this.paymentMethod === 'cash') {
          this.showConfirmation = true;
          soundPlayer.play('success');
        }
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
    if (this.cartStore.products?.length === 0) this.$router.push("/cart");
    this.fetchAddresses();
  },
};
</script>

<style scoped>
.text-primary {
  color: #2c702c !important;
}
.bg-primary {
  background-color: #F5F7F5 !important;
}
.bg-secondary {
  background-color: #fff;
}
.bg-address {
  background-color: #f6f9f6;
}
</style>


