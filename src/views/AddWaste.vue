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
            class="w-[268px] h-[268px] object-cover rounded-full bg-[#EAF2EA] transition-transform duration-300 hover:scale-105"
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
</template>

<script>
export default {
  name: "wastePage",
  data() {
    return {
      selectedValue: null,
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
    selectItem(value) {
      this.selectedValue = value;
      console.log("Selected waste type:", value);
    },
  },
};
</script>

<style scoped>
.carousel::-webkit-scrollbar {
  display: none;
}
</style>
