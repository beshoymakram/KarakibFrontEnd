<template>
  <section class="bg-white px-16 py-14 relative">
    <p class="text-4xl text-[#2C702C] font-semibold text-center drop-shadow-2xl">
      {{ $t('common.recyclingWasteTypes') }}
    </p>
    <p class="text-2xl text-[#163816] pt-5 pb-10 font-semibold text-start">{{ $t('common.selectAWasteType') }}</p>

    <!-- Carousel Wrapper -->
    <div class="relative max-w-6xl mx-auto flex items-center justify-center">
      <!-- Left Arrow -->
      <button @click="scrollPrev"
        class="absolute left-[-50px] top-1/2 -translate-y-1/2 bg-[#EAF2EA] hover:bg-[#d6e7d6] text-[#2C702C] rounded-full p-2 shadow-md z-10">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
          class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <!-- Carousel (Scrollable Container) -->
      <a ref="carousel"
        class="carousel carousel-center bg-white rounded-box space-x-6 p-10 flex overflow-x-auto scroll-smooth">
        <div v-for="(type, index) in types" :key="index" @click="selectedType = type"
          class="carousel-item flex flex-col items-center flex-shrink-0 cursor-pointer transition-all duration-300">
          <img :src="type.image_url" :alt="type.name"
            class="w-[192px] h-[192px] object-cover rounded-full bg-[#EAF2EA] transition-transform duration-300 hover:scale-105"
            :class="{
              'outline-2  outline-[#2C702C] rounded-full': selectedValue === type.value,
            }" />
          <p class="mt-4 text-xl font-semibold text-[#2C702C]" :class="{
            'text-[#112B11]': selectedValue === type.value,
          }">
            {{ type.name }}
          </p>
        </div>
      </a>

      <!-- Right Arrow -->
      <button @click="scrollNext"
        class="absolute right-[-50px] top-1/2 -translate-y-1/2 bg-[#EAF2EA] hover:bg-[#d6e7d6] text-[#2C702C] rounded-full p-2 shadow-md z-10">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
          class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  </section>
  <!-- wast types points -->
  <section class="px-10 bg-white text-center pb-8">
    <p class="text-4xl font-medium font-stretch-extra-expanded pb-8 text-[#112B11]">
      {{ selectedType.name }}
    </p>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center py-14 px-3 lg:px-6 overflow-auto scroll-smooth rounded-2xl">
      <div v-for="(item, index) in filteredItems" :key="index"
        class="card bg-base-100 w-84 sm:w-72 md:w-80 shadow-sm hover:shadow-lg transition-transform duration-300">
        <figure>
          <router-link :to="`/waste/${item.id}`">
            <img :src="item.image_url" :alt="item.name"
              class="w-full size-75 bg-[#E0EBE0] object-fill hover:opacity-90 transition" />
          </router-link>
        </figure>

        <div class="px-4 pt-2 pb-2">
          <!-- Title -->
          <h2 class="text-[#2C702C] font-semibold text-xl mb-1 text-start">
            {{ item.name }}
          </h2>

          <!-- Points and EGP -->
          <p class="flex gap-1 mb-1 text-[#FFC400] font-semibold text-sm">
            <img src="/images/Coins.svg" class="size-5" />

            {{ item.points_per_unit }} {{ $t('common.points') }}
          </p>

          <!-- Actions -->

          <div class="flex justify-between items-center mt-2">
            <p class="text-[#8E98A8] text-sm font-semibold">{{ $t('common.per') }} {{ item.unit }}</p>
            <button @click="addWasteToCart(item)"
              class="btn rounded-md bg-[#2C702C] text-white hover:bg-[#265C26] px-4 py-2 text-sm font-semibold">
              {{ $t('common.addAndEarn') }}
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
        const added = await this.cartStore.addToCart(item.id, 1, 'waste');
        if (added) {
          this.$toast.success(`${item.name} added to your cart!`);
        }
      } catch {
        //removes (error) no need for maryam
        this.$toast.error("Failed to add waste item.");
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
</style>
