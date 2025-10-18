<template>
  <section class="bg-white px-16 py-16 relative">
    <p class="text-4xl text-[#2C702C] font-semibold text-center drop-shadow-2xl">
      Recycling Waste Types
    </p>
    <p class="text-2xl text-[#163816] pt-5 pb-10 font-semibold text-start">Select a Waste Type</p>

    <!-- Carousel Wrapper -->
    <div class="relative max-w-6xl mx-auto flex items-center justify-center">
      <!-- Left Arrow -->
      <button
        @click="scrollPrev"
        class="absolute left-[-50px] top-1/2 -translate-y-1/2 bg-[#EAF2EA] hover:bg-[#d6e7d6] text-[#2C702C] rounded-full p-2 shadow-md z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="size-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <!-- Carousel (Scrollable Container) -->
      <a
        ref="carousel"
        class="carousel carousel-center bg-white rounded-box space-x-6 p-10 flex overflow-x-auto scroll-smooth"
      >
        <div
          v-for="(item, index) in wasteItems"
          :key="index"
          @click="selectItem(item.value)"
          class="carousel-item flex flex-col items-center flex-shrink-0 cursor-pointer transition-all duration-300"
        >
          <img
            :src="item.src"
            :alt="item.name"
            class="w-[198px] h-[198px] object-cover rounded-full bg-[#EAF2EA] transition-transform duration-300 hover:scale-105"
            :class="{
              'outline  outline-[#2C702C] rounded-full': selectedValue === item.value,
            }"
          />
          <p class="mt-4 text-2xl font-semibold text-[#2C702C]">{{ item.name }}</p>
        </div>
      </a>

      <!-- Right Arrow -->
      <button
        @click="scrollNext"
        class="absolute right-[-50px] top-1/2 -translate-y-1/2 bg-[#EAF2EA] hover:bg-[#d6e7d6] text-[#2C702C] rounded-full p-2 shadow-md z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="size-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  </section>
  <!-- wast types points -->
  <section class="px-10 py-12 bg-white text-center">
    <div class="carousel w-full overflow-hidden relative">
      <div
        v-for="(page, pageIndex) in paginatedItems"
        :key="pageIndex"
        v-show="currentPage === pageIndex"
        class="carousel-item w-full flex flex-wrap justify-center gap-6 transition-all duration-500"
      >
        <div
          v-for="(item, index) in page"
          :key="index"
          class="w-64 bg-[#EAF2EA] p-6 rounded-lg shadow-md text-[#2C702C]"
        >
          <img :src="item.src" alt="item" class="w-full h-40 object-cover rounded-md mb-4" />
          <h3 class="text-xl font-semibold">{{ item.title }}</h3>
          <p class="mt-2 text-base">{{ item.description }}</p>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center gap-2 py-6 items-center">
      <button @click="prevPageGroup" :disabled="visibleStart === 1" class="btn btn-xs">Prev</button>

      <button
        v-for="page in visiblePages"
        :key="page"
        @click="goToPage(page - 1)"
        class="btn btn-xs"
        :class="{ 'btn-active bg-[#2C702C] text-white': currentPage + 1 === page }"
      >
        {{ page }}
      </button>

      <span v-if="hasMorePages" class="px-2 text-lg">...</span>

      <button
        v-if="hasMorePages"
        @click="nextPageGroup"
        class="btn btn-xs bg-[#EAF2EA] text-[#2C702C]"
      >
        Next
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: "wastePage",
  data() {
    return {
      selectedValue: "plastic",
      wasteItems: [
        { name: "Plastic", value: "plastic", src: "/images/waste/bottles.png" },
        { name: "Cartons", value: "cartons", src: "/images/waste/cartons.png" },
        { name: "Clothes", value: "clothes", src: "/images/waste/clothes.png" },
        { name: "Metals", value: "metals", src: "/images/waste/metals.png" },
        { name: "Woods", value: "woods", src: "/images/waste/woods.png" },
        { name: "Cooking Oil", value: "cooking-oil", src: "/images/waste/cooking-oil.png" },
        {
          name: "Home Appliances",
          value: "home-appliances",
          src: "/images/waste/home-appliances.png",
        },
      ],
      currentPage: 0,
      visibleStart: 1, // Start of visible page range
      items: [
        { title: "Item 1", description: "Eco-friendly product", src: "/images/waste/bottles.png" },
        { title: "Item 2", description: "Eco-friendly product", src: "/images/waste/cartons.png" },
        { title: "Item 3", description: "Eco-friendly product", src: "/images/waste/clothes.png" },
        { title: "Item 4", description: "Eco-friendly product", src: "/images/waste/metals.png" },
        { title: "Item 5", description: "Eco-friendly product", src: "/images/waste/woods.png" },
        {
          title: "Item 6",
          description: "Eco-friendly product",
          src: "/images/waste/cooking-oil.png",
        },
        {
          title: "Item 7",
          description: "Eco-friendly product",
          src: "/images/waste/home-appliances.png",
        },
        { title: "Item 8", description: "Eco-friendly product", src: "/images/waste/bottles.png" },
        { title: "Item 9", description: "Eco-friendly product", src: "/images/waste/cartons.png" },
        { title: "Item 10", description: "Eco-friendly product", src: "/images/waste/clothes.png" },
        { title: "Item 11", description: "Eco-friendly product", src: "/images/waste/metals.png" },
        { title: "Item 12", description: "Eco-friendly product", src: "/images/waste/woods.png" },
        {
          title: "Item 13",
          description: "Eco-friendly product",
          src: "/images/waste/cooking-oil.png",
        },
        {
          title: "Item 14",
          description: "Eco-friendly product",
          src: "/images/waste/home-appliances.png",
        },
        {
          title: "Item 15",
          description: "Eco-friendly product",
          src: "/images/waste/home-appliances.png",
        },
        {
          title: "Item 16",
          description: "Eco-friendly product",
          src: "/images/waste/home-appliances.png",
        },
        {
          title: "Item 17",
          description: "Eco-friendly product",
          src: "/images/waste/home-appliances.png",
        },
        {
          title: "Item 18",
          description: "Eco-friendly product",
          src: "/images/waste/home-appliances.png",
        },
        {
          title: "Item 19",
          description: "Eco-friendly product",
          src: "/images/waste/home-appliances.png",
        },
        {
          title: "Item 19",
          description: "Eco-friendly product",
          src: "/images/waste/home-appliances.png",
        },
        {
          title: "Item 19",
          description: "Eco-friendly product",
          src: "/images/waste/home-appliances.png",
        },
        {
          title: "Item 19",
          description: "Eco-friendly product",
          src: "/images/waste/home-appliances.png",
        },
        {
          title: "Item 19",
          description: "Eco-friendly product",
          src: "/images/waste/home-appliances.png",
        },
        {
          title: "Item 19",
          description: "Eco-friendly product",
          src: "/images/waste/home-appliances.png",
        },
        {
          title: "Item 19",
          description: "Eco-friendly product",
          src: "/images/waste/home-appliances.png",
        },
      ],
    };
  },
  computed: {
    paginatedItems() {
      const chunkSize = 6;
      const pages = [];
      for (let i = 0; i < this.items.length; i += chunkSize) {
        pages.push(this.items.slice(i, i + chunkSize));
      }
      return pages;
    },
    totalPages() {
      return this.paginatedItems.length;
    },
    visiblePages() {
      const end = Math.min(this.visibleStart + 3, this.totalPages);
      return Array.from({ length: end - this.visibleStart + 1 }, (_, i) => this.visibleStart + i);
    },
    hasMorePages() {
      return this.visibleStart + 3 < this.totalPages;
    },
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
    selectItem(value) {
      this.selectedValue = value;
      console.log("Selected waste type:", value);
    },

    goToPage(index) {
      if (index >= 0 && index < this.totalPages) {
        this.currentPage = index;
      }
    },
    nextPageGroup() {
      if (this.visibleStart + 4 <= this.totalPages) {
        this.visibleStart += 4;
      }
    },
    prevPageGroup() {
      this.visibleStart = Math.max(1, this.visibleStart - 4);
    },
  },
};
</script>

<style scoped>
.carousel::-webkit-scrollbar {
  display: none;
}
</style>
