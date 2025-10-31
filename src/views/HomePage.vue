<template>
  <!-- Hero Section -->
  <div
    class="hero min-h-[calc(100vh-1vh)] w-full md:w-full lg:w-full bg-cover bg-center bg-no-repeat bg-hero items-start mx-auto"
    style="background-image: url('/images/Homebg.png')"
  >
    <div class="hero-overlay bg-base-100/50 dark:bg-base-200/50"></div>
    <div class="hero-content text-center items-start justify-start pt-12 md:pt-16 lg:pt-20 px-4">
      <div class="max-w-3xl">
        <h1
          class="text-2xl mt-1 sm:text-3xl md:text-4xl lg:text-5xl text-primary font-bold drop-shadow-lg"
        >
          {{ $t("common.turnYourWasteIntoWorth") }}
        </h1>
        <p class="py-4 mt-2 md:py-6 text-sm sm:text-base md:text-lg font-medium text-hero">
          {{ $t("common.karakibMakesItEasyToCollectWaste") }}
        </p>
        <button
          @click="scrollToHowItWorks"
          class="btn rounded-md cursor-pointer bg-[#2C702C] px-4 md:px-6 py-2 md:py-3 text-base md:text-lg lg:text-xl font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C702C] hover:bg-[#265C26]"
          text-lg
        >
          {{ $t("common.getStarted") }}
        </button>
      </div>
    </div>
  </div>

  <!-- Steps Section -->

  <section class="px-16 py-12 bg-steps" ref="howItWorksSection">
    <p
      class="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-primary font-semibold drop-shadow-lg text-center mb-6 md:mb-8 lg:mb-10 pt-0"
    >
      {{ $t("common.howItWorks") }}
    </p>

    <div class="flex flex-wrap gap-6 md:gap-8 justify-center">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="card bg-base-100 shadow-sm w-40 sm:w-50 md:w-68  rounded-3xl cursor-pointer hover:shadow-md transition"
        @click="handleStepClick(step)"
      >
        <figure class="px-2 md:p-4">
          <img
            :src="step.image"
            :alt="step.title"
            class="object-cover rounded-3xl size-30 sm:size-44 md:size-70 mt-4 md:mt-0 md:h-60"
          />
        </figure>
        <div class="card-body text-center">
          <h2 class="font-semibold text-xs  text-primary -mt-5">{{ step.number }}</h2>
          <p class="card-title text-xs md:text-lg mx-auto">{{ step.title }}</p>
          <p class="text-[10px] sm:text-xs font-normal">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Waste Carousel Section -->
  <section class="px-4 md:px-12 py-12 relative bg-hero">
    <p
      class="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-primary font-semibold text-center drop-shadow-lg"
    >
      {{ $t("common.discoverWasteTypes") }}
    </p>
    <p
      class="text-sm sm:text-base md:text-lg lg:text-xl text-secondary text-center pt-5 pb-10 font-normal"
    >
      {{ $t("common.learnAboutDifferentKindsOfWaste") }}
    </p>
    <div class="text-center mt-4 mb-6 md:mb-10">
      <router-link to="/add-waste">
        <button
          class="btn rounded-lg cursor-pointer bg-[#2C702C] px-4 md:px-6 py-3 md:py-4 text-base md:text-lg lg:text-xl font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C702C] hover:bg-[#265C26] transition"
        >
          {{ $t("common.recycleNow") }}
        </button>
      </router-link>
    </div>

    <!-- Carousel Wrapper -->
    <div class="relative max-w-6xl mx-auto flex items-center justify-center px-4 sm:px-0">
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
      <div
        ref="carousel"
        class="carousel carousel-center bg-hero rounded-box space-x-4 sm:space-x-6 pt-6 sm:pt-8 md:pt-10 flex overflow-x-auto scroll-smooth"
      >
        <div
          v-for="(item, index) in wasteItems"
          :key="index"
          class="carousel-item flex flex-col items-center shrink-0"
        >
          <img
            :src="item.image_url"
            :alt="item.name"
            class="w-28 h-28 sm:w-38 sm:h-38 md:w-46 md:h-46 object-cover rounded-full bg-carousel"
          />
          <p class="mt-3 md:mt-4 text-lg sm:text-xl md:text-2xl font-semibold text-primary">
            {{ item.name }}
          </p>
        </div>
      </div>

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
  <!--  hero merch -->
  <div class="hero bg-merch min-h-[30vh] sm:min-h-[35vh] py-8 md:py-12">
    <div class="hero-content text-center">
      <div class="max-w-3xl">
        <p
          class="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-primary font-semibold text-center drop-shadow-lg"
        >
          {{ $t("common.ourExclusiveMerchandise") }}
      </p>
        <p class="py-4 md:py-6 text-sm sm:text-base md:text-lg text-[#163816]">
          {{ $t("common.showYourSupportWithPremiumCollection") }}
        </p>
        <router-link to="/shop">
          <button
            class="btn rounded-md cursor-pointer bg-[#2C702C] px-4 md:px-6 py-2 md:py-3 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C702C] hover:bg-[#265C26]"
          >
            {{ $t("common.shopNow") }}
          </button>
        </router-link>
      </div>
    </div>
  </div>

  <!-- merch -->
  <div
    class="grid grid-cols-2 bg-steps sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 justify-items-center py-8 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-12"
  >
    <div
      v-for="(product, index) in products"
      :key="index"
      class="card bg-base-200 w-full  max-w-xs shadow-sm hover:shadow-lg transition-transform duration-300"
    >
      <!-- ROUTER LINK - navigate to product description -->
      <router-link :to="{ name: 'product-desc', params: { id: product.id } }" class="block bg-base-200  rounded-t-xl">
        <figure>
          <img
            :src="product.image_url"
            :alt="product.name"
            class="w-full h-56 sm:h-62 md:h-74 bg-[#E0EBE0] object-contain rounded-t-xl"
          />
        </figure>

        <div class="px-3 pt-3 pb-2">
          <div class="flex justify-between flex-col  md:flex-row md:items-center w-full md:mb-1">
            <h2 class="text-primary font-semibold sm:text-base md:text-lg lg:text-xl">
              {{ product.name }}
            </h2>
            <p class="text-primary font-semibold text-sm sm:text-sm md:text-base  lg:text-lg">
              {{ product.price }} {{ $t("common.currency") }}
            </p>
          </div>

          <p class="hidden md:block text-gray-500 text-xs sm:text-sm">{{ product.description }}</p>
        </div>
      </router-link>

      <!-- ADD TO CART / QUANTITY CONTROLS -->
      <div class="flex items-center mt-2 justify-end px-3 pb-3">
        <!-- Show quantity controls if item is in cart -->
        <div v-if="getCartItem(product.id)" class="flex items-center gap-2">
          <button
            @click.stop="decrementCartItem(product.id)"
            class="w-5 h-5 sm:w-8 sm:h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-4 h-4 sm:w-5 sm:h-5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
            </svg>
          </button>

          <span class="w-4 sm:w-8 text-center font-bold text-[#2C702C]">
            {{ getCartItem(product.id).quantity }}
          </span>

          <button
            @click.stop="incrementCartItem(product.id)"
            class="w-5 h-5 sm:w-8 sm:h-8 flex items-center justify-center bg-[#2C702C] hover:bg-[#265C26] text-white rounded-full transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-4 h-4 sm:w-5 sm:h-5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>

          <div class="flex items-center gap-1 ml-2 text-green-600 text-xs font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
              class="w-3 h-3 sm:w-4 sm:h-4"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            <span class="text-[8px] sm:text-xs">{{ $t("common.inCart") }}</span>
          </div>
        </div>

        <!-- Show add to cart button if not in cart -->
        <button
          v-else-if="product.stock > 0"
          @click.stop="addToCart(product.id)"
          class="btn rounded-md bg-[#2C702C] text-white hover:bg-[#265C26] px-2 md:px-4  md:py-2 text-xs sm:text-sm font-semibold"
        >
          {{ $t("common.addToCart") }}
        </button>

        <!-- Out of stock button -->
        <button
          v-else
          class="btn rounded-md bg-gray-500 text-white cursor-not-allowed px-2 md:px-4  md:py-2 text-xs sm:text-sm font-semibold"
          disabled
        >
          {{ $t("common.outOfStock") }}
        </button>
      </div>
    </div>
  </div>

  <!-- make differance section -->
  <section class="bg-donate px-4 sm:px-8 md:px-12 lg:px-16 py-4 md:py-8 lg:py-12 relative">
    <p
      class="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-primary font-semibold text-center drop-shadow-lg"
    >
      {{ $t("common.makeADifference") }}
    </p>
    <p
      class="text-sm sm:text-base md:text-lg text-secondary text-center pt-4 md:pt-5 pb-8 md:pb-10 "
    >
      {{ $t("common.convertRecyclingPointsIntoDonations") }}
    </p>
    <div
      class="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 justify-center items-stretch gap-6 md:gap-8 px-4 sm:px-6 md:px-8"
    >
      <div
        v-for="(card, index) in infoCards"
        :key="index"
        class="border-2 border-[#BFD6BF] rounded-xl p-6 md:p-8 text-center bg-base-200 w-full md:w-8/10 xl:w-full mx-auto"
      >
        <img
          :src="card.image"
          :alt="card.title"
          class="mx-auto w-16 h-16 sm:w-20 sm:h-20 mb-4 bg-[#E9EBF8] rounded-full p-3"
        />
        <h3 class="text-primary font-semibold text-base sm:text-lg md:text-xl mb-2 md:mb-3">
          {{ card.title }}
        </h3>
        <p class="text-[#8E98A8] text-xs sm:text-sm md:text-base lg:text-lg mb-4">{{ card.description }}</p>
        <button
          @click="openDonationModal(card.name, card.title)"
          class="bg-[#2C702C] text-white px-4 md:px-6 py-2 md:py-3 text-sm md:text-base rounded-md hover:bg-[#1D4A1D] transition"
        >
          {{ $t("common.donate") }}
        </button>
      </div>
    </div>
  </section>

  <!-- Donation Modal -->
  <DonationModal
    :isOpen="isModalOpen"
    :fundName="selectedFund"
    :fundTitle="selectedFundTitle"
    @close="closeModal"
    @donate="handleDonation"
  />

  <div v-if="isRedirecting" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div class="bg-white rounded-2xl p-8 w-[90%] max-w-md text-center shadow-xl">
      <!-- <img src="/images/delivery.png" alt="Delivery Truck" class="w-48 mx-auto mb-4" /> -->
      <div class="text-[#2C702C] text-lg font-semibold">
        <div role="status" class="mx-auto text-center">
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#2C702C] mx-auto my-3"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
        <small>{{ $t("common.youAreBeingRedirectedToCompletePayment") }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import productsService from "@/services/productsService";
import wasteService from "@/services/wasteService";
import { useCartStore } from "@/stores/cart";
import DonationModal from "@/components/DonationModal.vue";
import donateService from "@/services/donateService";

export default {
  name: "homePage",
  components: {
    DonationModal,
  },
  data() {
    return {
      isRedirecting: false,
      wasteItems: [],
      infoCards: [
        {
          image: "/images/Graduation Cap.png",
          title: this.$t("common.educationFund"),
          name: "Education Fund",
          description: this.$t("common.supportUnderprivilegedChildrenEducation"),
          buttonText: this.$t("common.donate"),
        },
        {
          image: "/images/Tree Planting.png",
          title: this.$t("common.reforestation"),
          name: "Reforestation",
          description: this.$t("common.plantTreesAndRestoreNaturalHabitats"),
          buttonText: this.$t("common.donate"),
        },
        {
          image: "/images/Heart Health.png",
          title: this.$t("common.communityHealth"),
          name: "Community Health",
          description: this.$t("common.supportUnderprivilegedChildrenEducation"),
          buttonText: this.$t("common.donate"),
        },
      ],
      products: [],
      isModalOpen: false,
      selectedFund: "",
      selectedFundTitle: "",
      steps: [
        {
          number: this.$t("common.step1"),
          title: this.$t("common.createAccount"),
          description: this.$t("common.signUpToBecomeMember"),
          image: "/images/step-1.png",
          route: "/register",
        },
        {
          number: this.$t("common.step2"),
          title: this.$t("common.collectWaste"),
          description: this.$t("common.sortAndStoreRecyclables"),
          image: "/images/step-2.png",
          route: "/add-waste",
        },
        {
          number: this.$t("common.step3"),
          title: this.$t("common.requestPickup"),
          description: this.$t("common.scheduleCollectionThroughApp"),
          image: "/images/step-3.png",
          route: "/cart",
        },
        {
          number: this.$t("common.step4"),
          title: this.$t("common.earnRewards"),
          description: this.$t("common.getRewardedForYourEffort"),
          image: "/images/step-4.png",
          route: "/shop",
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

    getCartItem(productId) {
      return this.cartStore.products?.find((item) => item.cartable_id === productId);
    },

    async incrementCartItem(productId) {
      const cartItem = this.getCartItem(productId);
      if (cartItem) {
        await this.cartStore.updateQuantity(cartItem.id, cartItem.quantity + 1);
      }
    },

    async decrementCartItem(productId) {
      const cartItem = this.getCartItem(productId);
      if (cartItem) {
        if (cartItem.quantity > 1) {
          await this.cartStore.updateQuantity(cartItem.id, cartItem.quantity - 1);
        } else {
          await this.cartStore.removeItem(cartItem.id);
          this.$toast.success(this.$t("common.itemRemovedFromCart"));
        }
      }
    },

    async addToCart(productId) {
      const success = await this.cartStore.addToCart(productId, 1, "product");

      if (success) {
        this.$toast.success(this.$t("common.addedToCart"));
      } else {
        this.$toast.error(this.$t("common.failedToAddToCart"));
      }
    },
    scrollToHowItWorks() {
      const section = this.$refs.howItWorksSection;
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    },

    openDonationModal(fundName, fundTitle) {
      this.selectedFund = fundName;
      this.selectedFundTitle = fundTitle;
      this.isModalOpen = true;
    },

    closeModal() {
      this.isModalOpen = false;
    },

    async handleDonation(donationData) {
      if (!donationData.amount) {
        this.$toast.error(this.$t("common.pleaseEnterTheAmountYouWantToDonate"));
        return;
      }
      this.isRedirecting = true;
      try {
        const response = await donateService.donate({
          amount: donationData.amount,
          fund_name: donationData.fund_name,
        });

        if (response.data.url) {
          window.location.href = response.data.url;
        }
      } catch (error) {
        this.$toast.error(error);
        this.$toast.error(error.response.data.message);
      }
    },

    async placeDonation() {
      if (!this.donationAmount) {
        this.$toast.error(this.$t("common.pleaseEnterTheAmountYouWantToDonate"));
        return;
      }
      this.isRedirecting = true;
      try {
        const response = await donateService.checkout({
          amount: this.donationAmount,
          fund_name: this.fundName,
        });

        if (response.data.url) {
          window.location.href = response.data.url;
        }
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },

    handleStepClick(step) {
      if (step.route) {
        this.$router.push(step.route);
      }
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
    this.cartStore.fetchCart(); // Add this line
  },
};
</script>

<style scoped>
.text-primary {
  color: #2C702C !important;
}

[data-theme="forest"] .text-primary {
  color: #16af3f !important;
}

.bg-primary {
  background-color: rgb(235, 255, 235) !important;
}
[data-theme="forest"] .bg-primary {
  background-color: rgb(41, 41, 41)!important;
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
.text-hero {
  color: #2C702C !important;
}
[data-theme="forest"] .text-hero {
  color: #b4f7b5 !important;
}
.bg-merch {
  background-color: #BFD6BF !important;
}
[data-theme="forest"] .bg-merch {
  background-color: #5fc285 !important;
}
.bg-carousel {
  background-color: #EAF2EA !important;
}
[data-theme="forest"] .bg-carousel {
  background-color: #748c74 !important;
}
.bg-hero {
  background-color: #f5faf3 !important;
}
[data-theme="forest"] .bg-hero {
  background-color: #2d2d2d !important;
}

.bg-steps {
  background-color: #EAF2EA !important;
}
[data-theme="forest"] .bg-steps {
  background-color: #3a3a3a !important;
}
.bg-donate {
  background-color: #FFFFFF !important;
}
[data-theme="forest"] .bg-donate {
  background-color: #201e1e !important;
}
</style>
