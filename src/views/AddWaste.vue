<template>
  <section class="bg-white px-16 py-14 relative">
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
            class="w-[192px] h-[192px] object-cover rounded-full bg-[#EAF2EA] transition-transform duration-300 hover:scale-105"
            :class="{
              'outline-2  outline-[#2C702C] rounded-full': selectedValue === item.value,
            }"
          />
          <p
            class="mt-4 text-xl font-semibold text-[#2C702C]"
            :class="{
              'text-[#112B11]': selectedValue === item.value,
            }"
          >
            {{ item.name }}
          </p>
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
  <section class="px-10 bg-white text-center pb-8">
    <p class="text-4xl font-medium font-stretch-extra-expanded pb-8 text-[#112B11]">
      {{ selectedLabel }}
    </p>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center py-14 px-3 lg:px-6 overflow-auto scroll-smooth rounded-2xl"
    >
      <div
        v-for="(item, index) in displayedItems"
        :key="index"
        class="card bg-base-100 w-84 sm:w-72 md:w-80 shadow-sm hover:shadow-lg transition-transform duration-300"
      >
        <figure>
          <img :src="item.image" :alt="item.name" class="w-full size-75 bg-[#E0EBE0] object-fill" />
        </figure>

        <div class="px-4 pt-2 pb-2">
          <!-- Title -->
          <h2 class="text-[#2C702C] font-semibold text-xl mb-1 text-start">
            {{ item.name }}
          </h2>

          <!-- Points and EGP -->
          <p class="flex gap-1 mb-1 text-[#FFC400] font-semibold text-sm">
            <img src="/images/Coins.svg" class="size-5" />

            {{ item.points }} points = EGP {{ item.egp }}
          </p>

          <!-- Actions -->

          <div class="flex justify-between items-center mt-2">
            <p class="text-[#8E98A8] text-sm font-semibold">per {{ item.unit }}</p>
            <button
              class="btn rounded-md bg-[#2C702C] text-white hover:bg-[#265C26] px-4 py-2 text-sm font-semibold"
            >
              Add & Earn
            </button>
          </div>
        </div>
      </div>
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
          name: "E-waste",
          value: "e-waste",
          src: "/images/waste/e-waste.png",
        },
        {
          name: "Home Appliances",
          value: "home-appliances",
          src: "/images/waste/home-appliances.png",
        },
      ],

      plasticItems: [
        {
          name: "Plastic Bottles",
          image: "/images/plastic-waste/bottles.png",
          points: 123,
          egp: 30,
          unit: "kilogram",
        },
        {
          name: "Plastic Chair",
          image: "/images/plastic-waste/chair.png",
          points: 90,
          egp: 25,
          unit: "piece",
        },
        {
          name: "Plastic Barrel",
          image: "/images/plastic-waste/barrel.png",
          points: 150,
          egp: 40,
          unit: "Piece",
        },
        {
          name: "Solid Plastic",
          image: "/images/plastic-waste/solid plastic.png",
          points: 123,
          egp: 30,
          unit: "kilogram",
        },
        {
          name: "Plastic Coleman tank",
          image: "/images/plastic-waste/coleman tank.png",
          points: 150,
          egp: 40,
          unit: "liter",
        },
        {
          name: "Plastic Toys",
          image: "/images/plastic-waste/toys.png",
          points: 123,
          egp: 30,
          unit: "kilogram",
        },
      ],
      cartonsItems: [
        {
          name: "Cardboard Box",
          image: "/images/carton-waste/cardboard-box.jpg",
          points: 20,
          egp: 5,
          unit: "piece",
        },
        {
          name: "Paper Carton",
          image: "/images/carton-waste/paper-carton.jpg",
          points: 15,
          egp: 4,
          unit: "piece",
        },
        {
          name: "Papers",
          image: "/images/carton-waste/thin-paper.jpg",
          points: 200,
          egp: 50,
          unit: "piece",
        },
      ],

      clothesItems: [
        {
          name: "Old T-Shirt",
          image: "/images/clothes-waste/old-t-shirt.jpg",
          points: 10,
          egp: 3,
          unit: "piece",
        },
        {
          name: "Jacket",
          image: "/images/clothes-waste/jacket.jpg",
          points: 30,
          egp: 8,
          unit: "piece",
        },
      ],

      metalItems: [
        {
          name: "Aluminum Cans",
          image: "/images/metal-waste/alu-cans.png",
          points: 200,
          egp: 50,
          unit: "kilogram",
        },
        {
          name: "Copper Wire",
          image: "/images/metal-waste/copper-plastic-cable.jpg",
          points: 400,
          egp: 100,
          unit: "kilogram",
        },
      ],

      woodsItems: [
        {
          name: "Wooden peices",
          image: "/images/wood-waste/wood-pieces.jpg",
          points: 300,
          egp: 75,
          unit: "Kilogram",
        },
      ],

      cookingOilItems: [
        {
          name: "Used Cooking Oil (1L)",
          image: "/images/cooking-oil-waste/old-cooking-oil.jpg",
          points: 50,
          egp: 12,
          unit: "liter",
        },
      ],
      eWasteItems: [
        {
          name: "Keyboard",
          image: "/images/e-waste-waste/keyboard.jpg",
          points: 50,
          egp: 12,
          unit: "piece",
        },
      ],
      homeAppliancesItems: [
        {
          name: "Toaster",
          image: "/images/appliance-waste/toaster.jpg",
          points: 300,
          egp: 75,
          unit: "piece",
        },
        {
          name: "Fan",
          image: "/images/appliance-waste/fan.jpg",
          points: 340,
          egp: 85,
          unit: "piece",
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
  computed: {
    displayedItems() {
      switch (this.selectedValue) {
        case "plastic":
          return this.plasticItems;
        case "cartons":
          return this.cartonsItems;
        case "clothes":
          return this.clothesItems;
        case "metals":
          return this.metalItems;
        case "woods":
          return this.woodsItems;
        case "cooking-oil":
          return this.cookingOilItems;
        case "home-appliances":
          return this.homeAppliancesItems;
        case "e-waste":
          return this.eWasteItems;
        default:
          return this.plasticItems;
      }
    },
    selectedLabel() {
      // human friendly title for the lower section
      const found = this.wasteItems.find((w) => w.value === this.selectedValue);
      return found ? found.name : "Items";
    },
  },
};
</script>

<style scoped>
.carousel::-webkit-scrollbar {
  display: none;
}
</style>
