<template>
  <div class="checkout-page bg-[#F5F7F5] min-h-screen py-10">
    <div class="container mx-auto px-4 max-w-6xl">
      <h1 class="text-3xl font-bold text-[#2C702C] mb-8">Checkout Orders</h1>

      <div class="grid md:grid-cols-2 gap-6 bg-[#E9EBE9] p-6 rounded-2xl shadow-lg">
        <!-- LEFT SIDE - ORDER DETAILS -->
        <div class="bg-white rounded-xl p-6 shadow">
          <h2 class="text-2xl font-semibold text-[#2C702C] mb-6">
            Order Details
          </h2>

          <div v-if="cartStore.items.length > 0" class="space-y-4">
            <div v-for="item in cartStore.items" :key="item.id" class="flex justify-between items-center border-t pb-3">
              <div class="flex items-center gap-4">
                <img :src="item.product.image_url" alt="Product" class="w-14 h-14 rounded-md object-cover" />
                <div>
                  <p class="font-semibold text-gray-800">
                    {{ item.product.name }}
                  </p>
                  <p class="text-sm text-gray-500">Colour: White</p>
                  <p class="text-sm text-gray-500">
                    {{ item.product.price }} EGP × {{ item.quantity }}
                  </p>
                </div>
              </div>
              <p class="text-[#2C702C] font-semibold">
                {{ (item.product.price * item.quantity).toFixed(2) }} EGP
              </p>
            </div>

            <!-- Totals -->
            <div class="pt-4 border-t mt-4">
              <div class="flex justify-between mb-2">
                <span>{{ cartStore.items.length }} items</span>
                <span>{{ cartStore.total }} EGP</span>
              </div>
              <div class="flex justify-between mb-2">
                <span>Delivery fee</span>
                <span>20 EGP</span>
              </div>
              <div class="flex justify-between text-xl font-bold text-[#2C702C]">
                <span>Total amount</span>
                <span>{{ cartStore.total + 20 }} EGP</span>
              </div>
            </div>
          </div>

          <div v-else class="text-center text-gray-500 mt-6">
            Your cart is empty.
            <router-link to="/shop" class="text-[#2C702C] underline">Go shopping</router-link>.
          </div>
        </div>

        <!-- RIGHT SIDE - CHECKOUT -->
        <div class="bg-white rounded-xl p-6 shadow flex flex-col justify-between">
          <div>
            <h2 class="text-2xl font-semibold text-[#2C702C] mb-6">Checkout</h2>

            <!-- Address Section -->
            <div class="mb-6">
              <div class="flex justify-between items-center mb-2">
                <h3 class="font-semibold text-[#2C702C]">Delivery Address</h3>
                <button @click="showAddressModal = true"
                  class="bg-[#2C702C] text-white px-4 py-1 rounded-md hover:bg-[#215921] cursor-pointer">
                  Enter new address
                </button>
              </div>

              <div v-if="addresses.length > 0">
                <div v-for="address in addresses" :key="address.id" @click="selectedAddressId = address.id"
                  class="flex items-start gap-3 p-3 rounded-md text-sm my-2 cursor-pointer border transition-all duration-200"
                  :class="selectedAddressId === address.id
                    ? 'bg-[#E9F7E9] border-[#2C702C]'
                    : 'bg-gray-100 text-gray-700 border-transparent hover:border-gray-300'">
                  <!-- Radio circle -->
                  <input type="radio" name="deliveryAddress" :value="address.id" v-model="selectedAddressId" required
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
                No address added yet.
              </div>
            </div>



            <!-- Payment Section -->
            <div class="mb-6">
              <h3 class="font-semibold text-[#2C702C] mb-2">Payment Method</h3>
              <div class="flex gap-3">
                <button @click="paymentMethod = 'cash'" :class="[
                  'px-4 py-2 rounded-md border',
                  paymentMethod === 'cash'
                    ? 'bg-[#2C702C] text-white border-[#2C702C]'
                    : 'border-gray-300 text-gray-700',
                ]">
                  Cash on delivery
                </button>
                <button @click="paymentMethod = 'card'" :class="[
                  'px-4 py-2 rounded-md border',
                  paymentMethod === 'card'
                    ? 'bg-[#2C702C] text-white border-[#2C702C]'
                    : 'border-gray-300 text-gray-700',
                ]">
                  Card
                </button>
              </div>
            </div>

            <!-- Notes -->
            <div class="mb-6">
              <h3 class="font-semibold text-[#2C702C] mb-2">Delivery Notes</h3>
              <textarea v-model="deliveryNotes" placeholder="Add delivery notes"
                class="w-full border border-gray-300 rounded-md p-2 text-sm" rows="3"></textarea>
            </div>
          </div>

          <!-- Confirm Button -->
          <div class="mt-4">
            <button @click="placeOrder"
              class="w-full bg-[#2C702C] hover:bg-[#1a4d1a] text-white font-bold py-3 rounded-md transition-all">
              Confirm Order
            </button>
            <router-link to="/cart" class="block mt-3 btn text-center text-[#2C702C] hover:underline text-sm">
              ← go back
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Address Modal -->
    <div v-if="showAddressModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-[90%] max-w-md">
        <h3 class="text-xl font-semibold text-[#2C702C] mb-4">
          Enter Delivery Address
        </h3>

        <form @submit.prevent="confirmCreate" class="space-y-3">
          <input v-model="createForm.name" type="text" placeholder="Full Name" required
            class="w-full border border-gray-300 rounded-md px-3 py-2" />
          <input v-model="createForm.phone" type="text" placeholder="Phone Number" required
            class="w-full border border-gray-300 rounded-md px-3 py-2" />
          <input v-model="createForm.street_address" type="text" placeholder="Street Address" required
            class="w-full border border-gray-300 rounded-md px-3 py-2" />
          <input v-model="createForm.city" type="text" placeholder="City" required
            class="w-full border border-gray-300 rounded-md px-3 py-2" />

          <div class="flex justify-end gap-3 pt-3">
            <button type="button" @click="showAddressModal = false" class="px-4 py-2 border border-gray-300 rounded-md">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 bg-[#2C702C] text-white rounded-md hover:bg-[#215921]">
              Save
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
          Thank you for supporting Karakib 🌱 <br />
          Your order helps make the world cleaner.
        </p>
        <button @click="closeConfirmation" class="mt-6 px-6 py-2 bg-[#2C702C] text-white rounded-md hover:bg-[#1a4d1a]">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import profileService from "@/services/profileService";
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";

export default {
  name: "CheckoutPage",
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
      paymentMethod: "cash",
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
    placeOrder() {
      if (!this.selectedAddressId) {
        this.$toast.error("Please select delivery address.");
        return;
      }
      const order = {
        items: this.cartStore.items,
        total: this.cartStore.total + 20,
        shipping: this.shipping,
        payment: this.paymentMethod,
        notes: this.deliveryNotes,
      };
      console.log("Order placed:", order);
      this.$toast.success("Order placed successfully!");
      this.cartStore.clearCart();
      this.showConfirmation = true; 
    },
    closeConfirmation() {
      this.showConfirmation = false;
      this.$router.push("/");
    },
  },
  mounted() {
    this.cartStore.fetchCart();
    this.fetchAddresses();
  },
};
</script>

<style scoped></style>
