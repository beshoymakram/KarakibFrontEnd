<template>
  <!-- head shop section -->
  <div class="relative px-8 pb-6">
    <!-- Gradient overlay at the TOP only -->
    <!-- Custom layered gradient overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-[#E9EBF8]/[0.9] via-[#E9EBF8]/[0.8] to-transparent"
      style="
        background: linear-gradient(
          to bottom,
          rgba(233, 235, 248, 0.8) 0%,
          rgba(233, 235, 248, 0.75) 50%,
          rgba(233, 235, 248, 0.7) 95%,
          rgba(233, 235, 248, 0) 100%
        );
      "
    ></div>

    <!-- Background image -->
    <img
      src="/images/Shop Page Background.png"
      alt="Background"
      class="absolute inset-0 w-2xl h-sm object-cover -z-10 mx-auto"
    />

    <!-- content -->
    <div
      class="relative flex flex-col lg:flex-row items-center justify-between text-center lg:text-left gap-8 px-10 py-16 pb-24 z-10"
    >
      <!-- Logo -->
      <img
        src="/logos/K.png"
        alt="Karakib Logo"
        class="w-48 lg:w-60 drop-shadow-lg flex-shrink-0"
      />

      <!-- Text -->
      <div class="text-[#2C702C] max-w-2xl flex-grow lg:max-w-6xl">
        <p class="text-xl lg:text-2xl font-bold leading-relaxed">
          Support Karakib’s mission by buying eco-friendly merchandise. <br />
          Every purchase funds our recycling and community projects.
        </p>
      </div>
    </div>

    <!-- links -->
  </div>
  <div class="px-16 relative z-20 flex flex-wrap gap-4 -mt-8">
    <a
      class="rounded-md cursor-pointer bg-white text-[#112B11] px-4 py-3 font-semibold text-xl shadow-sm hover:bg-white"
    >
      View all
    </a>
    <a
      class="rounded-md cursor-pointer text-[#112B11] px-4 py-3 font-semibold text-xl shadow-sm hover:bg-white"
    >
      T-Shirts
    </a>
    <a
      class="rounded-md cursor-pointer text-[#112B11] px-4 py-3 font-semibold text-xl shadow-sm hover:bg-white"
    >
      Mugs
    </a>
    <a
      class="rounded-md cursor-pointer text-[#112B11] px-4 py-3 font-semibold text-xl shadow-sm hover:bg-white"
    >
      Tote Bags
    </a>
  </div>
  <!-- all merch sec -->

  <div
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center py-14 px-3 lg:px-6"
  >
    <div
      v-for="(item, index) in merchItems"
      :key="index"
      class="card bg-base-100 w-84 sm:w-72 md:w-80 shadow-sm hover:shadow-lg transition-transform duration-300"
    >
      <figure>
        <img :src="item.image" :alt="item.name" class="w-full size-75 bg-[#E0EBE0] object-fill" />
      </figure>

      <div class="px-4 pt-2 pb-2">
        <!-- Title + Price -->
        <div class="flex justify-between items-center w-full">
          <h2 class="text-[#2C702C] font-semibold text-xl">{{ item.name }}</h2>
          <p class="text-[#2C702C] font-semibold text-lg">${{ item.price }}</p>
        </div>

        <!-- Description -->
        <p class="text-gray-600 text-sm">{{ item.description }}</p>

        <!-- Actions -->
        <div class="flex items-center mt-1 justify-end">
          <button
            class="btn rounded-md bg-[#2C702C] text-white hover:bg-[#265C26] px-4 py-2 text-sm font-semibold"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "shopPage",
  data() {
    return {
      merchItems: [
        {
          name: "Karakib T-Shirt",
          price: 25,
          description: "Lightweight and breathable cotton t-shirt.",
          image: "/images/merch/T shirt K.png",
        },
        {
          name: "Classic Tee",
          price: 22,
          description: "Lightweight and breathable cotton t-shirt.",
          image: "/images/merch/T shirt K2.png",
        },
        {
          name: "Eco Tote Bag",
          price: 18,
          description: "Durable and reusable eco-friendly tote bag.",
          image: "/images/merch/Tote Bag.png",
        },
        {
          name: "Canvas Tote",
          price: 20,
          description: "Stylish canvas tote bag for everyday use.",
          image: "/images/merch/Tote Bag1.png",
        },
        {
          name: "Karakib Mug",
          price: 15,
          description: "Ceramic mug featuring the Karakib logo.",
          image: "/images/merch/Tote Bag.png",
        },
        {
          name: "Eco Mug",
          price: 16,
          description: "Eco-friendly bamboo mug for daily use.",
          image: "/images/merch/Tote Bag.png",
        },
        {
          name: "Eco Mug",
          price: 16,
          description: "Eco-friendly bamboo mug for daily use.",
          image: "/images/merch/Tote Bag.png",
        },
        {
          name: "Eco Mug",
          price: 16,
          description: "Eco-friendly bamboo mug for daily use.",
          image: "/images/merch/Tote Bag.png",
        },
        {
          name: "Eco Mug",
          price: 16,
          description: "Eco-friendly bamboo mug for daily use.",
          image: "/images/merch/Tote Bag.png",
        },
      ],
    };
  },
};
</script>

<style scoped></style>
