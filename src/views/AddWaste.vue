<template>
  <!-- Recycling Waste Types Section -->
  <section class="bg-primary px-4 sm:px-6 md:px-12 lg:px-16 py-6 md:py-10 lg:py-12 relative">
    <p
      class="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-primary font-semibold text-center drop-shadow-2xl mb-6 md:mb-8"
    >
      {{ $t("common.recyclingWasteTypes") }}
    </p>
    <p
      class="text-sm sm:text-lg md:text-xl text-primary pt-4 md:pt-5 pb-6 md:pb-8 font-semibold text-center md:text-start"
    >
      {{ $t("common.selectAWasteType") }}
    </p>
    <!-- Carousel Wrapper -->
    <div class="relative max-w-6xl mx-auto flex items-center justify-start px-4 sm:px-0">
      <!-- Left Arrow -->
      <button
        @click="scrollPrev"
        class="hidden sm:block absolute left-0 sm:left-[-50px] top-1/2 -translate-y-1/2 bg-[#EAF2EA] hover:bg-[#d6e7d6] text-[#2C702C] rounded-full p-2 shadow-md z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-5 h-5 sm:w-6 sm:h-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <!-- Carousel (Scrollable Container) -->
      <a
        ref="carousel"
        class="carousel carousel-center bg-primary rounded-box space-x-4 sm:space-x-6 p-6 sm:p-8 md:p-10 flex overflow-x-auto scroll-smooth"
      >
        <div
          v-for="(type, index) in types"
          :key="index"
          @click="selectedType = type"
          class="carousel-item flex flex-col items-center flex-shrink-0 cursor-pointer transition-all duration-300"
        >
          <img
            :src="type.image_url"
            :alt="type.name"
            class="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 object-cover rounded-full bg-carousel transition-transform duration-300 hover:scale-105"
            :class="{
              'outline-3 outline-[#2C702C]': selectedType.id === type.id,
            }"
          />
          <p
            class="mt-3 md:mt-4 text-base sm:text-lg md:text-xl font-semibold text-[#2C702C]"
            :class="{
              'text-primary ': selectedType.id === type.id,
            }"
          >
            {{ type.name }}
          </p>
        </div>
      </a>

      <!-- Right Arrow -->
      <button
        @click="scrollNext"
        class="hidden sm:block absolute right-0 sm:right-[-50px] top-1/2 -translate-y-1/2 bg-[#EAF2EA] hover:bg-[#d6e7d6] text-[#2C702C] rounded-full p-2 shadow-md z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-5 h-5 sm:w-6 sm:h-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  </section>
  <!-- Waste Types Points Section -->
  <section class="px-4 sm:px-6 md:px-10 lg:px-12 bg-secondary text-center pb-12 md:pb-16 lg:pb-20">
    <p class="text-xl pt-7 sm:text-2xl md:text-3xl font-medium pb-4 md:pb-6 text-secondary">
      {{ selectedType.name }}
    </p>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 justify-items-center py-8 md:py-12 lg:py-14 px-3 sm:px-4 lg:px-6 overflow-auto scroll-smooth rounded-2xl"
    >
      <div
        v-for="(item, index) in filteredItems"
        :key="index"
        class="card bg-base-100 w-full max-w-xs shadow-sm hover:shadow-lg transition-transform duration-300 rounded-xl"
      >
        <figure>
          <router-link :to="`/waste/${item.id}`">
            <img
              :src="item.image_url"
              :alt="item.name"
              class="w-full h-64 sm:h-72 md:h-80 bg-[#E0EBE0] object-fill hover:opacity-90 transition rounded-t-xl"
            />
          </router-link>
        </figure>

        <div class="px-4 pt-3 pb-3">
          <!-- Title -->
          <h2 class="text-primary font-semibold text-base sm:text-lg md:text-xl mb-2 text-start">
            {{ item.name }}
          </h2>

          <!-- Points and EGP -->
          <p class="flex gap-1 mb-2 text-[#FFC400] font-semibold text-xs sm:text-sm items-center">
            <img src="/images/Coins.svg" class="w-4 h-4 sm:w-5 sm:h-5" />
            {{ item.points_per_unit }} {{ $t("common.points") }}
          </p>

          <!-- Actions -->
          <div class="flex justify-between items-center mt-3">
            <p class="text-[#8E98A8] text-xs sm:text-sm font-semibold">
              {{ $t("common.per") }} {{ item.unit }}
            </p>
<!-- Quantity Controls -->
<div v-if="getCartItem(item.id)" class="flex items-center gap-2">
  <button
    @click.stop="decrementCartItem(item.id)"
    class="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-4 h-4 text-green-500">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
    </svg>
  </button>

  <span class="w-10 text-center font-bold text-[#2C702C]">
    {{ getCartItem(item.id).quantity }}
  </span>

  <button
    @click.stop="incrementCartItem(item.id)"
    class="w-8 h-8 flex items-center justify-center bg-[#2C702C] hover:bg-[#265C26] text-white rounded-full transition-colors"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  </button>
</div>

<!-- Add Button -->
<button
  v-else
  @click.stop="addWasteToCart(item)"
  class="btn rounded-md bg-[#2C702C] text-white hover:bg-[#265C26] px-3 md:px-4 py-2 text-xs sm:text-sm font-semibold transition-colors duration-300"
>
  {{ $t("common.addAndEarn") }}
</button>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import wasteItemsService from "@/services/wasteItemsService";
import wasteTypesService from "@/services/wasteTypesService";
import { useCartStore } from "@/stores/cart";

export default {
  name: "wastePage",
  data() {
    return {
      selectedValue: "plastic",
      selectedType: "",
      types: [],
      items: [],
      cartStore: useCartStore(),
    };
  },

  methods: {
    scrollNext() {
      const carousel = this.$refs.carousel;
      if (carousel) {
        carousel.scrollBy({ left: 300, behavior: "smooth" });
      }
    },
    scrollPrev() {
      const carousel = this.$refs.carousel;
      if (carousel) {
        carousel.scrollBy({ left: -300, behavior: "smooth" });
      }
    },
    async fetchTypes() {
      try {
        const response = await wasteTypesService.getTypes();
        this.types = response.data.data || response.data;
        this.selectedType = this.types[0] || "";
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },

    async fetchItems() {
      try {
        const response = await wasteItemsService.getItems();
        this.items = response.data.data || response.data;
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },
    async addWasteToCart(item) {
      try {
        const added = await this.cartStore.addToCart(item.id, 1, "waste");
        if (added) {
          this.$toast.success(`${item.name} ` + this.$t("common.addedToYourCart"));
        }
      } catch {
        //removes (error) no need for maryam
        this.$toast.error(this.$t("common.failedToAddWasteItem"));
      }
    },
    getCartItem(wasteId) {
  return this.cartStore.waste?.find((item) => item.cartable_id === wasteId);
},

async incrementCartItem(wasteId) {
  const cartItem = this.getCartItem(wasteId);
  if (cartItem) {
    await this.cartStore.updateQuantity(cartItem.id, cartItem.quantity + 1);
  }
},

async decrementCartItem(wasteId) {
  const cartItem = this.getCartItem(wasteId);
  if (cartItem) {
    if (cartItem.quantity > 1) {
      await this.cartStore.updateQuantity(cartItem.id, cartItem.quantity - 1);
    } else {
      await this.cartStore.removeItem(cartItem.id);
      this.$toast.success(this.$t("common.itemRemovedFromCart"));
    }
  }
},
  },
  computed: {
    filteredItems() {
      let filtered = this.items;

      if (this.selectedType) {
        filtered = filtered.filter((item) => item.waste_type_id == this.selectedType.id);
      }

      return filtered;
    },
  },
  mounted() {
    this.fetchTypes();
    this.fetchItems();
  },
};
</script>

<style scoped>
.carousel::-webkit-scrollbar {
  display: none;
}
.text-primary {
  color: #2c702c !important;
}

[data-theme="forest"] .text-primary {
  color: #16af3f !important;
}

.bg-primary {
  background-color: rgb(244, 244, 244) !important;
}
[data-theme="forest"] .bg-primary {
  background-color: rgb(50, 49, 49)!important;
}
.bg-secondary {
  background-color: rgb(240, 240, 240) !important;
}
[data-theme="forest"] .bg-secondary {
  background-color: rgb(34, 33, 33)!important;
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
.bg-carousel {
  background-color: #EAF2EA !important;
}
[data-theme="forest"] .bg-carousel {
  background-color: #637763 !important;
}
</style>
