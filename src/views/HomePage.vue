<template>
  <!-- Hero Section -->
  <div
    class="hero min-h-[calc(100vh-2vh)] w-[85vw] bg-cover bg-center bg-no-repeat items-start mx-auto"
    style="background-image: url('/images/homebg.jpg')"
  >
    <div class="hero-overlay bg-white/30"></div>
    <div class="hero-content text-center items-start justify-start pt-14">
      <div class="max-w-3xl">
        <h1 class="text-4xl text-[#2C702C] font-bold drop-shadow-lg">Turn Your Waste Into Worth</h1>
        <p class="py-6 text-md font-medium text-[#439a43]">
          Karakib makes it easy to collect waste, earn points, and turn your actions into real
          rewards — because sustainability should pay off.
        </p>
        <button
          @click="scrollToHowItWorks"
          class="btn rounded-md cursor-pointer bg-[#2C702C] px-3 py-2 font-semibold text-xl text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C702C] hover:bg-[#265C26]"
          text-lg
        >
          Get Started
        </button>
      </div>
    </div>
  </div>

  <!-- Steps Section -->

  <section class="px-16 py-14 bg-base-200" ref="howItWorksSection">
    <p class="text-4xl text-[#2C702C] font-semibold text-center pb-14">How it works</p>

    <div class="flex flex-wrap gap-4 justify-around">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="card bg-base-100 shadow-sm w-2xs rounded-3xl"
      >
        <figure class="p-5">
          <img :src="step.image" :alt="step.title" class="object-cover rounded-4xl size-60" />
        </figure>
        <div class="card-body text-center">
          <h2 class="font-semibold text-[#317C31] -mt-5">{{ step.number }}</h2>
          <p class="card-title mx-auto">{{ step.title }}</p>
          <p>{{ step.description }}</p>
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
            :src="item.image_url"
            :alt="item.name"
            class="w-[192px] h-[192px] object-cover rounded-full bg-[#EAF2EA]"
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
  <!--  hero merch -->
  <div class="hero bg-[#BFD6BF] min-h-[35vh]">
    <div class="hero-content text-center">
      <div class="max-w-3xl">
        <h1 class="text-4xl text-[#2C702C] font-medium drop-shadow-lg">
          Our Exclusive Merchandise
        </h1>
        <p class="py-6 text-[#163816]">
          Show your support with our premium collection of branded merchandise
        </p>
        <router-link to="/shop">
          <button
            class="btn rounded-md cursor-pointer bg-[#2C702C] px-3 py-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C702C] hover:bg-[#265C26]"
          >
            Shop Now
          </button>
        </router-link>
      </div>
    </div>
  </div>

  <!-- merch -->
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center justify-center py-14 px-3 lg:px-6"
  >
    <div
      v-for="(product, index) in products"
      :key="index"
      class="card bg-base-100 w-84 md:w-88 lg:w-76 shadow-sm hover:shadow-lg transition-transform duration-300"
    >
      <!-- ROUTER LINK - navigate to product description -->
      <router-link :to="{ name: 'product-desc', params: { id: product.id } }" class="block">
        <figure>
          <img
            :src="product.image_url"
            :alt="product.name"
            class="w-full size-75 bg-[#E0EBE0] object-fill rounded-t-xl"
          />
        </figure>

        <div class="px-4 pt-2 pb-2">
          <div class="flex justify-between items-center w-full">
            <h2 class="text-[#2C702C] font-semibold text-xl">
              {{ product.name }}
            </h2>
            <p class="text-[#2C702C] font-semibold text-lg">{{ product.price }} EGP</p>
          </div>

          <p class="text-gray-600 text-sm">{{ product.description }}</p>
        </div>
      </router-link>

      <!-- ADD TO CART - stays clickable without navigation -->
      <div class="flex items-center mt-1 justify-end px-4 pb-2">
        <button
          @click.stop="addToCart(product.id)"
          class="btn rounded-md bg-[#2C702C] text-white hover:bg-[#265C26] px-4 py-2 text-sm font-semibold"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>

  <!-- make differance section -->
  <section class="bg-[#E9EBF8] px-16 py-16 relative">
    <p class="text-4xl text-[#2C702C] font-semibold text-center">Make a Difference</p>
    <p class="text-2xl text-[#163816] text-center pt-5 pb-10 font-normal">
      Convert your recycling points into donations for charitable organizations
    </p>
    <div class="flex flex-col lg:flex-row justify-center items-stretch gap-8 p-8">
      <div
        v-for="(card, index) in infoCards"
        :key="index"
        class="border-2 border-[#BFD6BF] rounded-xl p-6 text-center flex-1 bg-white"
      >
        <img
          :src="card.image"
          :alt="card.title"
          class="mx-auto w-20 h-20 mb-4 bg-[#E9EBF8] full rounded-full p-3"
        />
        <h3 class="text-[#163816] font-semibold text-xl mb-2">{{ card.title }}</h3>
        <p class="text-[#8E98A8] mb-4">{{ card.description }}</p>
        <button
          @click="openDonationModal(card.title)"
          class="bg-[#2C702C] text-white px-4 py-2 rounded-md hover:bg-[#1D4A1D] transition"
        >
          {{ card.buttonText }}
        </button>
      </div>
    </div>
  </section>

  <!-- Donation Modal -->
  <DonationModal
    :isOpen="isModalOpen"
    :fundName="selectedFund"
    @close="closeModal"
    @donate="handleDonation"
  />
</template>

<script>
import productsService from "@/services/productsService";
import wasteService from "@/services/wasteService";
import { useCartStore } from "@/stores/cart";
import DonationModal from "@/components/DonationModal.vue";

export default {
  name: "homePage",
  components: {
    DonationModal,
  },
  data() {
    return {
      wasteItems: [],
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
      ],
      infoCards: [
        {
          image: "/images/Graduation Cap.png",
          title: "Education Fund",
          description: "Support underprivileged children's education",
          buttonText: "Donate",
        },
        {
          image: "/images/Tree Planting.png",
          title: "Reforestation",
          description: "Plant trees and restore natural habitats",
          buttonText: "Donate",
        },
        {
          image: "/images/Heart Health.png",
          title: "Community Health",
          description: "Support underprivileged children's education",
          buttonText: "Donate",
        },
      ],
      products: [],
      isModalOpen: false,
      selectedFund: "",
      steps: [
        {
          number: "Step 1",
          title: "Create Account",
          description: "Sign up to become a member of our recycling community.",
          image: "/images/step-1.png",
        },
        {
          number: "Step 2",
          title: "Collect Waste",
          description: "Sort and store your recyclables to prepare them for pickup.",
          image: "/images/step-2.png",
        },
        {
          number: "Step 3",
          title: "Request Pickup",
          description: "Schedule a collection through the app for convenient service.",
          image: "/images/step-3.png",
        },
        {
          number: "Step 4",
          title: "Earn Rewards",
          description: "Get rewarded for your effort with points and exclusive benefits.",
          image: "/images/step-4.png",
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

    async fetchWasteItems() {
      try {
        const response = await wasteService.getTypes();
        this.wasteItems = response.data.data || response.data;
      } catch (error) {
        console.error("Error fetching waste items:", error);
      }
    },

    async fetchProducts() {
      try {
        const response = await productsService.getProducts();
        this.products = response.data.data || response.data;
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },

    async addToCart(productId) {
      const success = await this.cartStore.addToCart(productId, 1);

      if (success) {
        this.$toast.success("Added to cart!");
      } else {
        this.$toast.error("Failed to add to cart");
      }
    },
    scrollToHowItWorks() {
      const section = this.$refs.howItWorksSection;
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    },

    openDonationModal(fundName) {
      this.selectedFund = fundName;
      this.isModalOpen = true;
    },

    closeModal() {
      this.isModalOpen = false;
    },

    handleDonation(donationData) {
      console.log("Donation received:", donationData);
      // Here you can add logic to:
      // 1. Send donation to your backend API
      // 2. Show success message
      // 3. Update user's points, etc.
      this.$toast.success(
        `Thank you for donating ${donationData.amount} EGP to ${donationData.fund}!`
      );
    },
  },
  computed: {
    cartStore() {
      return useCartStore();
    },
  },
  mounted() {
    this.fetchWasteItems();
    this.fetchProducts();
  },
};
</script>

<style scoped></style>
