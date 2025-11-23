<template>
  <div class="checkout-page bg-primary min-h-screen  py-6 sm:py-8 md:py-10 lg:py-12">
    <div class="container mx-auto px-4 max-w-6xl">
      <h1 class="text-3xl font-bold text-primary pt-4 sm:pt-8 md:pt-10 lg:pt-12 mb-8">{{ $t('common.checkoutOrders') }}</h1>

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
                  @click="openAddressModal"
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

                  <!-- 🗑️ Delete Button — uses modal -->
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
              class="block border-0 mt-3 btn pt-1.5 text-center text-[#2C702C] hover:bg-gray-950 text-lg"
            >
              {{ $t('common.goBack') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- 🏠 Address Modal (simple light style + dark override) -->
    <div v-if="showAddressModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        :class="[
          'rounded-lg p-6 w-[90%] max-w-md',
          isDark ? 'bg-[#1c1c1c] border border-gray-700 shadow-lg' : 'bg-white'
        ]"
      >
        <h3 :class="['text-xl font-semibold mb-4', isDark ? 'text-green-500' : 'text-[#2C702C]']">
          {{ $t('common.enterDeliveryAddress') }}
        </h3>

        <form @submit.prevent="confirmCreate" class="space-y-4">
          <div>
            <label :class="['block text-sm font-medium mb-1', isDark ? 'text-green-500' : 'text-[#2C702C]']">
              {{ $t('common.fullName') }}
            </label>
            <input
              v-model="createForm.name"
              type="text"
              required
              placeholder="Full Name"
              :class="[
                'w-full rounded-md px-3 py-2 focus:outline-none',
                isDark ? 'bg-[#0f0f0f] border border-gray-700 text-gray-200 focus:ring-2 focus:ring-green-600' : 'border border-gray-300'
              ]"
            />
          </div>

          <div>
            <label :class="['block text-sm font-medium mb-1', isDark ? 'text-green-500' : 'text-[#2C702C]']">
              {{ $t('common.phoneNumber') }}
            </label>
            <input
              v-model="createForm.phone"
              type="text"
              required
              placeholder="Phone number"
              :class="[
                'w-full rounded-md px-3 py-2 focus:outline-none',
                isDark ? 'bg-[#0f0f0f] border border-gray-700 text-gray-200 focus:ring-2 focus:ring-green-600' : 'border border-gray-300'
              ]"
            />
          </div>

          <div>
            <label :class="['block text-sm font-medium mb-1', isDark ? 'text-green-500' : 'text-[#2C702C]']">
              {{ $t('common.streetAddress') }}
            </label>
            <input
              v-model="createForm.street_address"
              type="text"
              required
              placeholder="Street address"
              :class="[
                'w-full rounded-md px-3 py-2 focus:outline-none',
                isDark ? 'bg-[#0f0f0f] border border-gray-700 text-gray-200 focus:ring-2 focus:ring-green-600' : 'border border-gray-300'
              ]"
            />
          </div>

          <div>
            <label :class="['block text-sm font-medium mb-1', isDark ? 'text-green-500' : 'text-[#2C702C]']">
              {{ $t('common.city') }}
            </label>
            <input
              v-model="createForm.city"
              type="text"
              required
              placeholder="City"
              :class="[
                'w-full rounded-md px-3 py-2 focus:outline-none',
                isDark ? 'bg-[#0f0f0f] border border-gray-700 text-gray-200 focus:ring-2 focus:ring-green-600' : 'border border-gray-300'
              ]"
            />
          </div>

          <div class="flex justify-end gap-3 pt-4">
            <button
              type="button"
              @click="closeAddressModal"
              :class="['px-4 py-2 rounded-md', isDark ? 'border border-gray-700 hover:bg-[#2a2a2a] text-gray-300' : 'border border-gray-300 hover:bg-gray-100']"
            >
              {{ $t('common.cancel') }}
            </button>
            <button
              type="submit"
              :class="['px-4 py-2 rounded-md text-white', isDark ? 'bg-green-700 hover:bg-green-800' : 'bg-[#2C702C] hover:bg-[#215921]']"
            >
              {{ $t('common.save') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal (simple style like your second file) -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div :class="['rounded-lg p-6 w-[90%] max-w-sm text-center shadow-lg', isDark ? 'bg-[#1c1c1c] border border-gray-700' : 'bg-white']">
        <h3 :class="['text-xl font-bold mb-3', isDark ? 'text-green-500' : 'text-[#2C702C]']">
          {{ $t('common.deleteAddressTitle') || $t('are You Sure To Delete this  Delivery Address') }}
        </h3>
        <p :class="['mb-6', isDark ? 'text-gray-300' : 'text-gray-700']">
          {{ $t('common.deleteAddressConfirm') }}
        </p>
        <div class="flex justify-center gap-4">
          <button
            @click="cancelDelete"
            :class="['px-4 py-2 rounded-md', isDark ? 'border border-gray-600 text-gray-300 hover:bg-[#2a2a2a]' : 'border border-gray-300 hover:bg-gray-100']"
          >
            {{ $t('common.cancel') }}
          </button>
          <button
            @click="confirmDeleteAddress"
            :class="['px-4 py-2 rounded-md text-white', isDark ? 'bg-red-600 hover:bg-red-700' : 'bg-red-600 hover:bg-red-700']"
          >
            {{ $t('common.delete') }}
          </button>
        </div>
      </div>
    </div>

    <!-- ✅ Order Confirmation Modal -->
    <div v-if="showConfirmation" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div :class="['rounded-2xl p-8 w-[90%] max-w-md text-center shadow-xl', isDark ? 'bg-[#1c1c1c] border border-gray-700' : 'bg-white']">
        <img src="/images/delivery.png" alt="Delivery Truck" class="w-48 mx-auto mb-4" />
        <p :class="['text-lg font-semibold', isDark ? 'text-green-500' : 'text-[#2C702C]']">
          {{ $t('common.thankYouForSupportingKarakib') }}
        </p>
        <button
          @click="closeConfirmation"
          :class="['mt-6 px-6 py-2 rounded-md text-white', isDark ? 'bg-green-700 hover:bg-green-800' : 'bg-[#2C702C] hover:bg-[#1a4d1a]']"
        >
          {{ $t('common.close') }}
        </button>
      </div>
    </div>

    <!-- Redirecting Modal -->
    <div v-if="isRedirecting" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div :class="['rounded-2xl p-8 w-[90%] max-w-md text-center shadow-xl', isDark ? 'bg-[#1c1c1c] border border-gray-700' : 'bg-white']">
        <div :class="isDark ? 'text-green-500 text-lg font-semibold' : 'text-[#2C702C] text-lg font-semibold'">
          <div role="status" class="mx-auto text-center">
            <svg aria-hidden="true"
              class="w-8 h-8 text-gray-200 animate-spin fill-current mx-auto my-3"
              viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor" />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill" />
            </svg>
          </div>
          <small :class="isDark ? 'text-gray-300' : ''">{{ $t('common.youAreBeingRedirectedToCompletePayment') }}</small>
        </div>
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
      isRedirecting: false,
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
      deleteId: null,
      isDark: false, // tracks current theme for conditional classes
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

    openAddressModal() {
      this.showAddressModal = true;
    },
    closeAddressModal() {
      this.showAddressModal = false;
      // keep form values or reset depending on desired UX:
      this.createForm = { name: '', phone: '', street_address: '', city: '' };
    },

    async confirmCreate() {
      try {
        const response = await profileService.createAddress(this.createForm);
        this.$toast.success(response.data.message);
        this.showAddressModal = false;
        this.createForm = { name: '', phone: '', street_address: '', city: '' };
        this.fetchAddresses();
      } catch (error) {
        this.$toast.error(error.response?.data?.message || 'Failed to create address.');
      }
    },

    openDeleteModal(id) {
      this.deleteId = id;
      this.showDeleteModal = true;
    },
    cancelDelete() {
      this.deleteId = null;
      this.showDeleteModal = false;
    },
    async confirmDeleteAddress() {
      try {
        await profileService.deleteAddress(this.deleteId);
        this.$toast.success(this.$t('Address Deleted Successfully'));
        this.showDeleteModal = false;
        this.deleteId = null;
        this.fetchAddresses();
      } catch (error) {
        this.$toast.error(error?.response?.data?.message || 'Failed to delete address');
      }
    },

    async placeOrder() {
      if (!this.selectedAddressId) {
        if (this.addresses.length < 1) {
          this.$toast.error(this.$t('Add Delivery Address First'));
          return;
        }
        this.$toast.error(this.$t('Please Select Delivery Address'));
        return;
      }

      if (!this.paymentMethod) {
        this.$toast.error(this.$t('Please Select PaymentMethod'));
        return;
      }

      if (this.paymentMethod === 'card') {
        this.isRedirecting = true;
      }

      try {
        const response = await checkoutService.checkout({
          user_address_id: this.selectedAddressId,
          payment_method: this.paymentMethod,
          notes: this.deliveryNotes,
        });

        if (response.data.url) {
          window.location.href = response.data.url;
        }

        if (this.paymentMethod === 'cash') {
          this.showConfirmation = true;
          soundPlayer.play('success');
        }
      } catch (error) {
        this.$toast.error(error.response?.data?.message || 'Checkout failed.');
      } finally {
        this.isRedirecting = false;
      }
    },

    closeConfirmation() {
      this.showConfirmation = false;
      this.$router.push("/");
    },

    // Theme helper - uses prefers-color-scheme and listens for changes.
applySystemTheme() {
  // ✅ If a theme is already set (from layout or user toggle), respect it.
  const currentTheme = document.documentElement.getAttribute('data-theme');
  if (currentTheme) {
    this.isDark = currentTheme === 'forest';
    return;
  }

  // ✅ Otherwise, use system preference
  const m = window.matchMedia('(prefers-color-scheme: dark)');
  const update = () => {
    if (m.matches) {
      document.documentElement.setAttribute('data-theme', 'forest');
      this.isDark = true;
    } else {
      document.documentElement.removeAttribute('data-theme');
      this.isDark = false;
    }
  };
  update();

  // ✅ Watch for system theme changes
  if (m.addEventListener) {
    m.addEventListener('change', update);
  } else if (m.addListener) {
    m.addListener(update); // older browsers
  }
},

  },
  async mounted() {
    await this.cartStore.fetchCart();
    if (this.cartStore.products?.length === 0) {
      this.$router.push("/cart");
    }
    this.fetchAddresses();
    this.applySystemTheme();
  },
};
</script>

<style scoped>
/* LIGHT MODE (default) colors — match your original first file */
.text-primary {
  color: #2c702c !important;
}

.bg-primary {
  background-color: #F5F7F5 !important;
}

.bg-secondary {
  background-color: #ffffff;
}

.bg-address {
  background-color: #f6f9f6;
}

.text-section {
  color: black !important;
}

/* DARK MODE overrides when DaisyUI data-theme="forest" is set on <html> */
[data-theme="forest"] .text-primary {
  color: #16af3f !important;
}

[data-theme="forest"] .bg-primary {
  background-color: rgb(66, 66, 66) !important;
}

[data-theme="forest"] .bg-secondary {
  background-color: rgb(43, 43, 43) !important;
}

[data-theme="forest"] .bg-address {
  background-color: #545554;
}

[data-theme="forest"] .text-section {
  color: white !important;
}

/* small UI niceties */
.rounded-xl { border-radius: 12px; }
.rounded-2xl { border-radius: 16px; }

/* ensure modals overlay look consistent */
.fixed.inset-0 { z-index: 50; }

/* spinner fill for light/dark handled inline by classes, keep fallback */
</style>

