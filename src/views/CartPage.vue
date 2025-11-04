<template>
  <div class="cart-page bg-primary min-h-screen py-6 md:py-10 lg:py-12 px-2 sm:px-4 md:px-6 lg:px-8">
    <div class="container mx-auto px-3 sm:px-4 max-w-6xl">
      <h1 class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-primary mb-4 sm:mb-6">{{ $t('common.yourCart') }}
      </h1>

      <div class="bg-cart rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
        <div class="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
            class="w-5 h-5 sm:w-6 sm:h-6 text-primary shrink-0">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          <h2 class=" text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-primary truncate">{{ $t('common.shopProducts') }}</h2>
          <span
            class="ml-auto bg-primary text-section px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold shrink-0">
            {{ cartStore.products?.length }} {{ $t('common.items') }}
          </span>
        </div>

        <div v-if="cartStore.products?.length > 0" class="space-y-3 sm:space-y-4">
          <div v-for="item in cartStore.products" :key="item.id"
            class="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg hover:shadow-md border border-green-300 transition-all duration-200 overflow-hidden">
            <img :src="item.cartable?.image_url" :alt="item.cartable?.name"
              class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-lg bg-[#E0EBE0] shrink-0" />

            <div class="flex-1 min-w-0">
              <h3 class="font-bold text-sm sm:text-base md:text-lg text-primary truncate">{{ item.cartable?.name }}
              </h3>
              <p class="text-gray-600 text-xs sm:text-sm line-clamp-1">{{ item.cartable?.description }}</p>
              <p class='text-primary font-semibold text-xs sm:text-sm md:text-base mt-1'>{{ item.cartable?.price }} {{
                $t('common.currency') }}</p>
            </div>

            <div class="hidden sm:flex items-center gap-2 sm:gap-3 shrink-0 mr-3">
              <button @click="decrementQuantity(item.id, item.quantity)"
                class="w-5 h-5 sm:w-8 sm:h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                  stroke="currentColor" class="w-4 h-4 sm:w-5 sm:h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                </svg>
              </button>
              <span class="w-4 sm:w-8 text-center font-bold text-primary">{{ item.quantity }}</span>
              <button @click="incrementQuantity(item.id, item.quantity)"
                class="w-5 h-5 sm:w-8 sm:h-8 flex items-center justify-center bg-green-600 hover:bg-[#1a4d1a] text-white rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                  stroke="currentColor" class="w-4 h-4 sm:w-5 sm:h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>

            <div class="text-right shrink-0">
              <p class="font-bold text-base sm:text-lg md:text-xl text-primary mb-1 sm:mb-2">
                {{ (item.cartable?.price * item.quantity).toFixed(2) }} {{ $t('common.currency') }}
              </p>

            <div class=" sm:hidden flex items-center gap-2 sm:gap-3 shrink-0 ">
              <button @click="decrementQuantity(item.id, item.quantity)"
                class="w-5 h-5 sm:w-8 sm:h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                  stroke="currentColor" class="w-4 h-4 sm:w-5 sm:h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                </svg>
              </button>
              <span class="w-4 sm:w-8 text-center font-bold text-primary">{{ item.quantity }}</span>
              <button @click="incrementQuantity(item.id, item.quantity)"
                class="w-5 h-5 sm:w-8 sm:h-8 flex items-center justify-center bg-green-600 hover:bg-[#1a4d1a] text-white rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                  stroke="currentColor" class="w-4 h-4 sm:w-5 sm:h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>

              <button @click="removeItem(item.id)"
                class="text-red-600 hover:text-red-800 text-xs sm:text-sm font-semibold flex items-center gap-1 ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                  stroke="currentColor" class="w-3 h-3 sm:w-4 sm:h-4">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
                Remove
              </button>
            </div>
          </div>

          <div class="bg-primary rounded-lg p-4 sm:p-6 mt-4 sm:mt-6">
            <div class="flex justify-between items-center mb-3 sm:mb-4">
              <span class="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-primary">{{ $t('common.subtotal') }}</span>
              <span class='text-base sm:text-lg md:text-xl font-bold text-primary'>{{ cartStore.total }} {{ $t('common.currency')
                }}</span>
            </div>
            <button @click="checkoutProducts"
              class="w-full bg-[#2C702C] hover:bg-[#1a4d1a] text-white font-bold py-3 sm:py-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-5 h-5 sm:w-6 sm:h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
              </svg>
              {{ $t('common.proceedToCheckout') }}
            </button>
          </div>
        </div>

        <div v-else class="text-center py-8 sm:py-12">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-20 h-20 sm:w-24 sm:h-24 mx-auto text-gray-300 mb-3 sm:mb-4">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
          </svg>
          <p class="text-gray-500 text-base sm:text-lg mb-3 sm:mb-4">{{ $t('common.yourShoppingCartIsEmpty') }}</p>
          <router-link to="/shop"
            class="inline-block bg-[#2C702C] text-white px-5 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-[#1a4d1a] transition-colors text-sm sm:text-base">
            {{ $t('common.continueShopping') }}
          </router-link>
        </div>
      </div>

      <div class="bg-cart rounded-xl shadow-lg p-4 sm:p-6">
        <div class="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
            class="w-5 h-5 sm:w-6 sm:h-6 text-primary shrink-0">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
          </svg>
          <h2 class="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-primary truncate">{{ $t('common.wasteCollectionRequest') }}
          </h2>
          <span
            class="ml-auto bg-primary text-section px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold shrink-0">
            {{ cartStore.waste?.length }} {{ $t('common.items') }}
          </span>
        </div>

        <div v-if="cartStore.waste?.length > 0" class="space-y-3 sm:space-y-4">
          <div v-for="item in cartStore.waste" :key="item.id"
            class="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-green-300 hover:shadow-md transition-all duration-200 overflow-hidden">
            <img :src="item.cartable?.image_url" :alt="item.cartable?.name"
              class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-lg bg-[#E0EBE0] shrink-0" />

            <div class="flex-1 min-w-0">
              <h3 class="font-bold text-sm sm:text-base md:text-lg text-primary truncate">{{ item.cartable?.name }}
              </h3>
              <p class="text-gray-600 text-xs sm:text-sm">{{ item.cartable?.unit }}</p>
              <p class="text-primary font-bold text-xs sm:text-sm mt-1">
                {{ item.cartable?.points_per_unit }} {{ $t('common.points') }} {{ $t('common.per') }} {{
                  item.cartable?.unit }}
              </p>
            </div>

            <div class="flex items-center gap-2 sm:gap-3 shrink-0">
              <button @click="decrementQuantity(item.id, item.quantity)"
                class="w-5 h-5 sm:w-8 sm:h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                  stroke="currentColor" class="w-4 h-4 sm:w-5 sm:h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                </svg>
              </button>
              <span class="w-4 sm:w-8 text-center font-bold text-primary">{{ item.quantity }}</span>
              <button @click="incrementQuantity(item.id, item.quantity)"
                class="w-5 h-5 sm:w-8 sm:h-8 flex items-center justify-center bg-green-600 hover:bg-[#1a4d1a] text-white rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                  stroke="currentColor" class="w-4 h-4 sm:w-5 sm:h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>

            <div class="text-right shrink-0">
              <p class="text-xs sm:text-sm text-gray-500 mb-1">{{ $t('common.estimatedPoints') }}</p>
              <p class="font-bold text-lg sm:text-xl md:text-2xl text-green-600 mb-1 sm:mb-2">+{{ item.points }}</p>
              <button @click="removeItem(item.id)"
                class="text-red-600 hover:text-red-800 text-xs sm:text-sm font-semibold flex items-center gap-1 ml-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                  stroke="currentColor" class="w-3 h-3 sm:w-4 sm:h-4">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
                Remove
              </button>
            </div>
          </div>

          <div class="bg-primary rounded-lg p-4 sm:p-6 mt-4 sm:mt-6">
            <div class="flex justify-between items-center mb-3 sm:mb-4">
              <span class="text-lg sm:text-xl font-semibold text-primary">{{ $t('common.totalEstimatedPoints')
                }}</span>
              <span class="text-2xl sm:text-3xl font-bold text-green-600">+{{ cartStore.totalPoints }}</span>
            </div>
            <button @click="requestCollection"
              class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 sm:py-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-5 h-5 sm:w-6 sm:h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              {{ $t('common.requestCollection') }}
            </button>
          </div>
        </div>

        <div v-else class="text-center py-8 sm:py-12">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-20 h-20 sm:w-24 sm:h-24 mx-auto text-gray-300 mb-3 sm:mb-4">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
          </svg>
          <p class="text-gray-500 text-base sm:text-lg mb-3 sm:mb-4">{{ $t('common.noWasteCollectionRequestsYet') }}</p>
          <router-link to="/add-waste"
            class="inline-block bg-green-600 text-white px-5 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base">
            {{ $t('common.addWasteItems') }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '@/stores/cart';

export default {
  name: 'CartPage',

  data() {
    return {
      wasteItems: []
    };
  },

  computed: {
    cartStore() {
      return useCartStore();
    },
  },

  methods: {
    async incrementQuantity(itemId, currentQuantity) {
      await this.cartStore.updateQuantity(itemId, currentQuantity + 1);
    },

    async decrementQuantity(itemId, currentQuantity) {
      if (currentQuantity > 1) {
        await this.cartStore.updateQuantity(itemId, currentQuantity - 1);
      } else {
        await this.removeItem(itemId);
      }
    },

    async removeItem(itemId) {
      await this.cartStore.removeItem(itemId);
      this.$toast.success(this.$t('common.itemRemovedFromCart'));
    },

    checkoutProducts() {
      this.$router.push('/checkout');
    },

    requestCollection() {
      this.$router.push('/collect');
    }
  },

  mounted() {
    this.cartStore.fetchCart();

    const stored = localStorage.getItem('cart_waste_items');
    if (stored) {
      this.wasteItems = JSON.parse(stored);
    }
  }
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
  background-color: rgb(236, 240, 236) !important;
}
[data-theme="forest"] .bg-primary {
  background-color: rgb(61, 60, 60)!important;
}
.bg-cart {
  background-color: #ffffff !important;
}
[data-theme="forest"] .bg-cart {
  background-color: #242323 !important;
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
</style>
