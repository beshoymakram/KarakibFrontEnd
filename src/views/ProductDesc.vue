<template>
  <div class="min-h-screen bg-[#BFD6BF] py-6 md:py-8 px-4">
    <div v-if="product" class="max-w-6xl mx-auto">
      <div class="px-4 sm:px-6 md:px-8 py-6 md:py-8 lg:py-10 bg-[#F6F7FB] rounded-lg shadow-sm">
        <!-- Product Section -->
        <div
          class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 mb-10 md:mb-12 lg:mb-16"
        >
          <!-- Image Gallery -->
          <div>
            <div
              class="bg-white rounded-2xl overflow-hidden mb-3 md:mb-4 shadow-sm max-w-full lg:max-w-[480px]"
            >
              <img
                :src="selectedImage"
                alt="Product"
                class="w-full h-64 sm:h-80 md:h-96 lg:h-[400px] object-contain"
              />
            </div>
            <div class="flex gap-2 md:gap-3">
              <button
                v-for="(image, index) in productImages"
                :key="index"
                @click="selectedImage = image"
                :class="[
                  'w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all',
                  selectedImage === image ? 'border-[#2C702C]' : 'border-gray-200',
                ]"
              >
                <img :src="image" alt="Thumbnail" class="w-full h-full object-cover" />
              </button>
            </div>
          </div>

          <!-- Product Info -->
          <div>
            <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-[#112B11] mb-2 md:mb-3">
              {{ product.name }}
            </h1>
            <div class="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
              <div class="flex items-center gap-2">
                <div class="flex">
                  <svg
                    v-for="i in 5"
                    :key="i"
                    class="w-4 h-4 sm:w-5 sm:h-5"
                    :class="i <= Math.floor(productRating) ? 'text-yellow-400' : 'text-gray-300'"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </div>
                <span class="text-sm sm:text-base text-gray-600 font-medium"
                  >{{ productRating }}/5</span
                >
              </div>
              <span class="text-gray-400">|</span>
              <span class="text-sm sm:text-base text-gray-600">{{ productSold }} Sold</span>
            </div>
            <div class="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C702C] mb-4 md:mb-6">
              {{ product.price }} {{ $t("common.currency") }}
            </div>
            <p class="text-sm sm:text-base text-gray-600 leading-relaxed mb-5 md:mb-6">
              {{ product.description }}
            </p>

            <!-- Color Selection -->
            <div v-if="productColors.length > 0" class="mb-4 md:mb-5">
              <h3 class="text-base sm:text-lg font-semibold text-[#112B11] mb-2 md:mb-3">
                Select Color
              </h3>
              <div class="flex gap-2 md:gap-3">
                <button
                  v-for="color in productColors"
                  :key="color.value"
                  @click="selectedColor = color.value"
                  :class="[
                    'w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all',
                    selectedColor === color.value
                      ? 'border-[#2C702C] ring-2 ring-[#2C702C] ring-offset-2'
                      : 'border-gray-300',
                  ]"
                  :style="{ backgroundColor: color.value }"
                  :title="color.name"
                ></button>
              </div>
            </div>

            <!-- Size Selection -->
            <div v-if="productSizes.length > 0" class="mb-6">
              <h3 class="text-base sm:text-lg font-semibold text-[#112B11] mb-2 md:mb-3">
                Select Size
              </h3>
              <div class="flex flex-wrap gap-2 md:gap-3">
                <button
                  v-for="size in productSizes"
                  :key="size"
                  @click="selectedSize = size"
                  :class="[
                    'px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-sm sm:text-base font-medium transition-all',
                    selectedSize === size
                      ? 'bg-[#2C702C] text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-[#2C702C]',
                  ]"
                >
                  {{ size }}
                </button>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-3 md:gap-4">
              <button
                @click="addToCart(product.id)"
                class="flex-1 bg-[#2C702C] text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-[#234d23] transition-all shadow-md"
              >
                Add to Cart
              </button>
              <button
                class="flex-1 bg-[#112B11] text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-[#0a1a0a] transition-all shadow-md"
              >
                Checkout Now
              </button>
            </div>
          </div>
        </div>

        <!-- Reviews Section -->
        <div class="px-2 sm:px-4 md:px-6 lg:px-8">
          <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-[#112B11] mb-5 md:mb-6 lg:mb-8">
            Customer Reviews
          </h2>

          <!-- Rating Overview -->
          <div
            class="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 lg:gap-8 mb-6 md:mb-8 lg:mb-10"
          >
            <!-- Average Rating Card -->
            <div class="bg-[#EAF2EA] rounded-2xl p-5 md:p-6 lg:p-8 text-center">
              <div class="text-4xl sm:text-5xl md:text-6xl font-bold text-[#2C702C] mb-2">
                {{ productRating }}
              </div>
              <div class="flex justify-center mb-2">
                <svg
                  v-for="i in 5"
                  :key="i"
                  class="w-6 h-6"
                  :class="i <= Math.floor(productRating) ? 'text-yellow-400' : 'text-gray-300'"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>
              <div class="text-sm sm:text-base text-gray-600">
                Based on {{ reviews.length }} reviews
              </div>
            </div>

            <!-- Rating Bars -->
            <div class="md:col-span-2 space-y-2 md:space-y-3">
              <div v-for="rating in [5, 4, 3, 2, 1]" :key="rating" class="flex items-center gap-4">
                <span class="text-xs sm:text-sm font-medium text-gray-700 w-6 sm:w-8"
                  >{{ rating }}★</span
                >
                <div class="flex-1 h-2 sm:h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-[#2C702C] transition-all"
                    :style="{ width: getRatingPercentage(rating) + '%' }"
                  ></div>
                </div>
                <span class="text-xs sm:text-sm text-gray-600 w-8 sm:w-12 text-right">{{
                  getRatingCount(rating)
                }}</span>
              </div>
            </div>
          </div>

          <!-- Review List -->
          <div class="space-y-4 md:space-y-6">
            <div
              v-for="review in displayedReviews"
              :key="review.id"
              class="bg-white rounded-xl p-4 md:p-6 shadow-sm"
            >
              <div class="flex items-start gap-3 md:gap-4">
                <img
                  :src="review.avatar"
                  :alt="review.name"
                  class="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                />
                <div class="flex-1 min-w-0">
                  <div
                    class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 mb-2"
                  >
                    <h4 class="text-sm sm:text-base font-semibold text-[#112B11]">
                      {{ review.name }}
                    </h4>
                    <span class="text-xs sm:text-sm text-gray-500">{{ review.date }}</span>
                  </div>
                  <div class="flex mb-2 md:mb-3">
                    <svg
                      v-for="i in 5"
                      :key="i"
                      class="w-3.5 h-3.5 sm:w-4 sm:h-4"
                      :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  </div>
                  <p
                    class="text-sm sm:text-base text-gray-600 leading-relaxed"
                    :class="expandedReviews[review.id] ? '' : 'line-clamp-2'"
                  >
                    {{ review.comment }}
                  </p>
                  <button
                    v-if="review.comment.length > 100"
                    @click="toggleReviewExpansion(review.id)"
                    class="text-[#2C702C] text-xs sm:text-sm font-medium mt-1.5 md:mt-2 hover:underline"
                  >
                    {{ expandedReviews[review.id] ? "See less" : "See more" }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- View More Button -->
          <div class="text-center mt-6 md:mt-8">
            <button
              v-if="reviews.length > 3"
              @click="toggleShowAllReviews"
              class="px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-[#2C702C] text-[#2C702C] rounded-lg text-sm sm:text-base font-semibold hover:bg-[#2C702C] hover:text-white transition-all"
            >
              {{ showAllReviews ? "Show Less Reviews" : "View More Reviews" }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="text-center text-sm sm:text-base text-[#2C702C] mt-16 md:mt-20">Loading product details...</p>
  </div>
</template>

<script>
import productsService from "@/services/productsService";
import { useCartStore } from "@/stores/cart";

export default {
  name: "ProductDetails",
  props: ["id"],
  data() {
    return {
      product: null,
      reviews: [
        {
          id: 1,
          name: "Sarah Mitchell",
          avatar: "https://i.pravatar.cc/150?img=1",
          rating: 5,
          comment:
            "Absolutely love this t-shirt! The fabric is incredibly soft and the fit is perfect. I've washed it several times and it still looks brand new. Definitely worth the price.",
          date: "2 days ago",
        },
        {
          id: 2,
          name: "James Chen",
          avatar: "https://i.pravatar.cc/150?img=13",
          rating: 5,
          comment:
            "Best quality t-shirt I've owned. The organic cotton feels amazing against the skin and the construction is top-notch. Fast shipping too!",
          date: "1 week ago",
        },
        {
          id: 3,
          name: "Emily Rodriguez",
          avatar: "https://i.pravatar.cc/150?img=5",
          rating: 4,
          comment:
            "Really comfortable and well-made. The only reason I'm not giving 5 stars is that I wish there were more color options. Otherwise, it's perfect!",
          date: "2 weeks ago",
        },
        {
          id: 4,
          name: "Michael Thompson",
          avatar: "https://i.pravatar.cc/150?img=12",
          rating: 5,
          comment:
            "Exceeded my expectations! The fit is true to size and the quality is outstanding. I'll definitely be ordering more in different colors.",
          date: "3 weeks ago",
        },
        {
          id: 5,
          name: "Michael Thompson",
          avatar: "https://i.pravatar.cc/150?img=12",
          rating: 5,
          comment:
            "Exceeded my expectations! The fit is true to size and the quality is outstanding. I'll definitely be ordering more in different colors.",
          date: "3 weeks ago",
        },
        {
          id: 6,
          name: "Michael Thompson",
          avatar: "https://i.pravatar.cc/150?img=12",
          rating: 5,
          comment:
            "Exceeded my expectations! The fit is true to size and the quality is outstanding. I'll definitely be ordering more in different colors.",
          date: "3 weeks ago",
        },
      ],
      selectedImage: "",
      selectedColor: "",
      selectedSize: "M",
      showAllReviews: false,
      expandedReviews: {},
    };
  },
  computed: {
    cartStore() {
      return useCartStore();
    },
    productImages() {
      // If API returns images array, use it; otherwise use image_url as single image
      if (this.product.images && this.product.images.length > 0) {
        return this.product.images;
      } else if (this.product.image_url) {
        return [this.product.image_url];
      }
      return [];
    },
    productColors() {
      // Use colors from API if available, otherwise use default colors
      if (this.product.colors && this.product.colors.length > 0) {
        return this.product.colors;
      }
      return [
        { name: "Forest Green", value: "#2C702C" },
        { name: "Navy Blue", value: "#1e3a8a" },
        { name: "Charcoal", value: "#374151" },
        { name: "White", value: "#ffffff" },
      ];
    },
    productSizes() {
      // Use sizes from API if available, otherwise use default sizes
      if (this.product.sizes && this.product.sizes.length > 0) {
        return this.product.sizes;
      }
      return ["XS", "S", "M", "L", "XL", "XXL"];
    },
    productRating() {
      return this.product.rating || 4.8;
    },
    productSold() {
      return this.product.sold || 0;
    },
    displayedReviews() {
      return this.showAllReviews ? this.reviews : this.reviews.slice(0, 3);
    },
  },
  mounted() {
    this.fetchProduct();
  },
  methods: {
    async fetchProduct() {
      try {
        const response = await productsService.getProduct(this.id);
        this.product = response.data.data || response.data;

        // Initialize selected values after product is loaded
        if (this.productImages.length > 0) {
          this.selectedImage = this.productImages[0];
        }
        if (this.productColors.length > 0) {
          this.selectedColor = this.productColors[0].value;
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        this.$toast?.error(error.response?.data?.message || "Failed to load product");
      }
    },
    async addToCart(productId) {
      const success = await this.cartStore.addToCart(productId, 1, "product");
      success
        ? this.$toast.success(this.$t("common.addedToCart"))
        : this.$toast.error(this.$t("common.failedToAddToCart"));
    },
    getRatingPercentage(rating) {
      const count = this.reviews.filter((r) => Math.floor(r.rating) === rating).length;
      return (count / this.reviews.length) * 100;
    },
    getRatingCount(rating) {
      return this.reviews.filter((r) => Math.floor(r.rating) === rating).length;
    },
    toggleShowAllReviews() {
      this.showAllReviews = !this.showAllReviews;
    },
    toggleReviewExpansion(reviewId) {
      this.expandedReviews = {
        ...this.expandedReviews,
        [reviewId]: !this.expandedReviews[reviewId],
      };
    },
  },
};
</script>
<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  line-clamp: 2;
  /* Standard property for future compatibility */
}
</style>
