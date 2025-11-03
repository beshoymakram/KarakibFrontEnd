<template>
<section
  class="relative w-full left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] hero min-h-[30vh] sm:min-h-[35vh] md:min-h-[40vh] flex items-center justify-center overflow-hidden"
>
  <img
    src="/images/wastebg.png"
    alt="Background"
    class="absolute inset-0 w-full h-full object-cover -z-10"
  />
  <div
  class="absolute inset-0"
  :style="{
    background:
      currentTheme === 'forest'
        ? 'linear-gradient(to bottom, rgba(17,17,17,0.7) 0%, rgba(17,17,17,0.6) 50%, rgba(17,17,17,0.5) 100%, rgba(17,17,17,0) 100%)'
        : 'linear-gradient(to bottom, rgba(233,235,248,0.7) 0%, rgba(233,235,248,0.6) 50%, rgba(233,235,248,0.5) 100%, rgba(233,235,248,0) 100%)',
  }"
  ></div>

  <!-- Text -->
  <h2
    class="relative text-xl sm:text-2xl md:text-3xl lg:text-4xl text-primary font-semibold drop-shadow-xl text-center"
  >
    {{ $t("common.recyclingWasteTypes") }}
  </h2>
</section>

  <section class="bg-primary px-4 sm:px-6 md:px-12 lg:px-16 py-6 md:py-10 lg:py-12 relative ">
    <p class="text-sm sm:text-lg md:text-xl text-primary py-4 md:py-5 font-semibold text-center md:text-start">
      {{ $t("common.selectAWasteType") }}
    </p>
    <!-- Carousel Wrapper -->
    <div class="relative max-w-6xl mx-auto flex items-center justify-start px-4 sm:px-0 -mb-10">
      <!-- Left Arrow -->
      <button @click="scrollPrev"
        class="hidden md:block absolute left-0 md:-left-10 xl:left-[-50px] top-1/2 -translate-y-1/2 bg-[#EAF2EA] hover:bg-[#d6e7d6] text-[#2C702C] rounded-full p-2 shadow-md z-10">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
          class="w-4 h-4 xl:w-5 xl:h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <!-- Carousel (Scrollable Container) -->
      <a ref="carousel"
        class="carousel carousel-center bg-primary rounded-box space-x-4 sm:space-x-6 p-6 sm:p-8 md:p-10 flex overflow-x-auto scroll-smooth">
        <div v-for="(type, index) in types" :key="index" @click="selectedType = type"
          class="carousel-item flex flex-col items-center shrink-0 cursor-pointer transition-all duration-300">
          <img :src="type.image_url" :alt="type.name"
            class="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 object-cover rounded-full bg-carousel transition-transform duration-300 hover:scale-105"
            :class="{
              'outline-3 outline-[#2C702C]': selectedType.id === type.id,
            }" />
          <p class="mt-3 md:mt-4 text-base sm:text-lg md:text-xl font-semibold text-[#2C702C]" :class="{
            'text-primary ': selectedType.id === type.id,
          }">
            {{ type.name }}
          </p>
        </div>
      </a>

      <!-- Right Arrow -->
      <button @click="scrollNext"
        class="hidden md:block absolute right-0 md:-right-10 xl:right-[-50px] top-1/2 -translate-y-1/2 bg-[#EAF2EA] hover:bg-[#d6e7d6] text-[#2C702C] rounded-full p-2 shadow-md z-10">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
          class="w-4 h-4 xl:w-5 xl:h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  </section>
  <!-- Waste Types Points Section -->
  <section class=" bg-secondary text-center ">
    <!-- <p class="text-xl pt-4 sm:text-2xl md:text-3xl font-medium pb-4 md:pb-6 text-secondary">
      {{ selectedType.name }}
    </p> -->
    <div
      class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 justify-items-center py-6 md:py-10 lg:py-12 px-4 sm:px-6 md:px-8 lg:px-12 overflow-auto scroll-smooth ">
      <div v-for="(item, index) in filteredItems" :key="index"
        class="card bg-primary w-full  max-w-xs shadow-sm hover:shadow-lg transition-transform duration-300">
        <figure>
          <img :src="item.image_url" :alt="item.name"
            class="w-full h-56 sm:h-62 md:h-74 bg-[#E0EBE0] object-contain  hover:opacity-90 transition rounded-t-xl" />
        </figure>

        <div class="px-3 pt-3 pb-3">
          <!-- Title -->
          <h2 class="text-primary font-semibold sm:text-base md:text-lg lg:text-xl mb-1 text-start">
            {{ item.name }}
          </h2>

          <!-- Points and EGP -->
          <p class="flex gap-1  text-[#FFC400] font-semibold text-xs sm:text-sm items-center">
            <img src="/images/Coins.svg" class="w-3 h-3 sm:w-4 sm:h-4" />
            {{ item.points_per_unit }} {{ $t("common.points") }}
          </p>

          <!-- Actions -->
          <div class="flex justify-between items-center mt-3">
            <p class="text-[#8E98A8] text-xs sm:text-sm font-semibold">
              {{ $t("common.per") }} {{ item.unit }}
            </p>
            <!-- Quantity Controls -->
            <div v-if="getCartItem(item.id)" class="flex items-center gap-2">
              <button @click.stop="decrementCartItem(item.id)"
                class="w-5 h-5 sm:w-8 sm:h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3"
                  stroke="currentColor" class="w-4 h-4 sm:w-5 sm:h-5 text-primary">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                </svg>
              </button>

              <span class="w-4 sm:w-8 text-center font-bold text-primary">
                {{ getCartItem(item.id).quantity }}
              </span>

              <button @click.stop="incrementCartItem(item.id)"
                class="w-5 h-5 sm:w-8 sm:h-8 flex items-center justify-center bg-[#2C702C] hover:bg-[#265C26] text-white rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                  stroke="currentColor" class="w-4 h-4 sm:w-5 sm:h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>

            <!-- Add Button -->
            <button v-else @click.stop="addWasteToCart(item)"
              class="btn rounded-md bg-[#2C702C] text-white hover:bg-[#265C26] px-2 md:px-4  md:py-2 text-xs sm:text-sm font-semibold">
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
      currentTheme: document.documentElement.getAttribute("data-theme") || "light",
      _themeObserver: null, // will hold the MutationObserver
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
        // Observe <html data-theme=""> attribute changes and update currentTheme reactively
    const setTheme = () => {
      this.currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    };

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "attributes" && m.attributeName === "data-theme") {
          setTheme();
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    // store observer so we can disconnect later
    this._themeObserver = observer;
  },
    beforeUnmount() {
    if (this._themeObserver) {
      this._themeObserver.disconnect();
      this._themeObserver = null;
    }
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
  background-color: rgb(50, 49, 49) !important;
}

.bg-secondary {
  background-color: rgb(240, 240, 240) !important;
}

[data-theme="forest"] .bg-secondary {
  background-color: rgb(34, 33, 33) !important;
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
