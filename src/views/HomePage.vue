<template>
  <!-- hero section  -->
  <div
    class="hero min-h-[calc(100vh-80px)] w-[95vw] bg-cover bg-center bg-no-repeat items-start mx-auto"
    style="background-image: url('/public/images/delivery-service-truck-isolated.png')"
  >
    <div class="hero-overlay bg-white/30"></div>
    <div class="hero-content text-center items-start justify-start pt-14">
      <div class="max-w-3xl">
        <h1 class="text-4xl text-[#2C702C] font-medium drop-shadow-lg">
          Turn Your Waste Into Worth
        </h1>
        <p class="py-6 text-md font-medium text-[#BFD6BF]">
          Karakib makes it easy to collect waste, earn points, and turn your actions into real
          rewards — because sustainability should pay off.
        </p>
        <button
          class="btn rounded-md cursor-pointer bg-[#2C702C] px-3 py-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C702C] hover:bg-[#265C26]"
        >
          Get Started
        </button>
      </div>
    </div>
  </div>

  <!-- Steps Section -->

  <section class="px-16 py-14 bg-base-200">
    <p class="text-4xl text-[#2C702C] font-semibold text-center pb-14">How it works</p>
    <div class="flex flex-wrap gap-4 justify-around">
      <!-- Step 1 -->
      <div class="card bg-base-100 shadow-sm w-[280px] rounded-[50px]">
        <figure class="p-4">
          <img
            src="/public/images/step-1.png"
            alt="step-1"
            class="w-[280px] h-[261px] object-cover rounded-[50px]"
          />
        </figure>
        <div class="card-body text-center">
          <h2 class="font-semibold text-[#317C31]">Step 1</h2>
          <p class="card-title mx-auto">Create Account</p>
          <p>Sign up to become a member of our recycling community.</p>
        </div>
      </div>

      <!-- Step 2 -->
      <div class="card bg-base-100 shadow-sm w-[280px] rounded-[50px]">
        <figure class="p-4">
          <img
            src="/public/images/step-2.png"
            alt="step-2"
            class="w-[280px] h-[261px] object-cover rounded-[50px]"
          />
        </figure>
        <div class="card-body text-center">
          <h2 class="font-semibold text-[#317C31]">Step 2</h2>
          <p class="card-title mx-auto">Collect Waste</p>
          <p>Sort and store your recyclables to prepare them for pickup.</p>
        </div>
      </div>

      <!-- Step 3 -->
      <div class="card bg-base-100 shadow-sm w-[280px] rounded-[50px]">
        <figure class="p-4">
          <img
            src="/public/images/step-3.png"
            alt="step-3"
            class="w-[280px] h-[261px] object-cover rounded-[50px]"
          />
        </figure>
        <div class="card-body text-center">
          <h2 class="font-semibold text-[#317C31]">Step 3</h2>
          <p class="card-title mx-auto">Request Pickup</p>
          <p>Schedule a collection through the app for convenient service.</p>
        </div>
      </div>

      <!-- Step 4 -->
      <div class="card bg-base-100 shadow-sm w-[280px] rounded-[50px]">
        <figure class="p-4">
          <img
            src="/public/images/step-4.png"
            alt="step-4"
            class="w-[280px] h-[261px] object-cover rounded-[50px]"
          />
        </figure>
        <div class="card-body text-center">
          <h2 class="font-semibold text-[#317C31]">Step 4</h2>
          <p class="card-title mx-auto">Earn Rewards</p>
          <p>Get rewarded for your effort with points and exclusive benefits.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Waste Carousel Section -->
  <section class="bg-white px-16 py-16 relative">
    <p class="text-4xl text-[#2C702C] font-semibold text-center">Discover Waste Types</p>
    <p class="text-3xl text-[#163816] text-center pt-5 pb-10 font-normal">
      Learn about the different kinds of waste you can recycle
    </p>

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
      <div
        ref="carousel"
        class="carousel carousel-center bg-white rounded-box space-x-6 p-10 flex overflow-x-auto scroll-smooth"
      >
        <div
          v-for="(item, index) in wasteItems"
          :key="index"
          class="carousel-item flex flex-col items-center flex-shrink-0"
        >
          <img
            :src="item.src"
            :alt="item.name"
            class="w-[268px] h-[268px] object-cover rounded-full bg-[#EAF2EA]"
          />
          <p class="mt-4 text-2xl font-semibold text-[#2C702C]">{{ item.name }}</p>
        </div>
      </div>

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
  name: "homePage",
  data() {
    return {
      wasteItems: [
        { name: "Plastic", src: "/public/images/waste/bottles.png" },
        { name: "Cartons", src: "/public/images/waste/cartons.png" },
        { name: "Clothes", src: "/public/images/waste/clothes.png" },
        { name: "Metals", src: "/public/images/waste/metals.png" },
        { name: "Woods", src: "/public/images/waste/woods.png" },
        { name: "Cooking Oil", src: "/public/images/waste/cooking-oil.png" },
        { name: "Home Appliances", src: "/public/images/waste/home-appliances.png" },
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
  },
};
</script>

<style scoped></style>
