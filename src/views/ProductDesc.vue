<template>
  <div class="min-h-screen bg-[#BFD6BF] py-8 px-6">
    <div class="max-w-7xl mx-auto">
      <div class="p-14 bg-[#F6F7FB] rounded-lg shadow-sm">
        <!-- Product Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <!-- Image Gallery -->
          <div>
            <div class="bg-white rounded-2xl overflow-hidden mb-4 shadow-sm">
              <img :src="selectedImage" alt="Product" class="w-full h-[500px] object-cover" />
            </div>
            <div class="flex gap-3">
              <button
                v-for="(image, index) in product.images"
                :key="index"
                @click="selectedImage = image"
                :class="[
                  'w-24 h-24 rounded-lg overflow-hidden border-2 transition-all',
                  selectedImage === image ? 'border-[#2C702C]' : 'border-gray-200',
                ]"
              >
                <img :src="image" alt="Thumbnail" class="w-full h-full object-cover" />
              </button>
            </div>
          </div>

          <!-- Product Info -->
          <div>
            <h1 class="text-4xl font-bold text-[#112B11] mb-3">{{ product.name }}</h1>
            <div class="flex items-center gap-4 mb-4">
              <div class="flex items-center gap-2">
                <div class="flex">
                  <svg
                    v-for="i in 5"
                    :key="i"
                    class="w-5 h-5"
                    :class="i <= Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </div>
                <span class="text-gray-600 font-medium">{{ product.rating }}/5</span>
              </div>
              <span class="text-gray-400">|</span>
              <span class="text-gray-600">{{ product.sold }} Sold</span>
            </div>
            <div class="text-4xl font-bold text-[#2C702C] mb-6">${{ product.price }}</div>
            <p class="text-gray-600 leading-relaxed mb-8">{{ product.description }}</p>

            <!-- Color Selection -->
            <div class="mb-6">
              <h3 class="text-lg font-semibold text-[#112B11] mb-3">Select Color</h3>
              <div class="flex gap-3">
                <button
                  v-for="color in product.colors"
                  :key="color.value"
                  @click="selectedColor = color.value"
                  :class="[
                    'w-10 h-10 rounded-full border-2 transition-all',
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
            <div class="mb-8">
              <h3 class="text-lg font-semibold text-[#112B11] mb-3">Select Size</h3>
              <div class="flex gap-3">
                <button
                  v-for="size in product.sizes"
                  :key="size"
                  @click="selectedSize = size"
                  :class="[
                    'px-6 py-3 rounded-lg font-medium transition-all',
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
            <div class="flex gap-4">
              <button
                class="flex-1 bg-[#2C702C] text-white py-4 rounded-lg font-semibold hover:bg-[#234d23] transition-all shadow-md"
              >
                Add to Cart
              </button>
              <button
                class="flex-1 bg-[#112B11] py-4 rounded-lg font-semibold hover:bg-[#0a1a0a] transition-all shadow-md text-red-500"
              >
                Checkout Now
              </button>
            </div>
          </div>
        </div>

        <!-- Reviews Section -->
        <div>
          <h2 class="text-3xl font-bold text-[#112B11] mb-8">Customer Reviews</h2>

          <!-- Rating Overview -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <!-- Average Rating Card -->
            <div class="bg-[#EAF2EA] rounded-2xl p-8 text-center">
              <div class="text-6xl font-bold text-[#2C702C] mb-2">{{ product.rating }}</div>
              <div class="flex justify-center mb-2">
                <svg
                  v-for="i in 5"
                  :key="i"
                  class="w-6 h-6"
                  :class="i <= Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>
              <div class="text-gray-600">Based on {{ reviews.length }} reviews</div>
            </div>

            <!-- Rating Bars -->
            <div class="md:col-span-2 space-y-3">
              <div v-for="rating in [5, 4, 3, 2, 1]" :key="rating" class="flex items-center gap-4">
                <span class="text-sm font-medium text-gray-700 w-8">{{ rating }}★</span>
                <div class="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-[#2C702C] transition-all"
                    :style="{ width: getRatingPercentage(rating) + '%' }"
                  ></div>
                </div>
                <span class="text-sm text-gray-600 w-12 text-right">{{
                  getRatingCount(rating)
                }}</span>
              </div>
            </div>
          </div>

          <!-- Review List -->
          <div class="space-y-6">
            <div
              v-for="review in reviews"
              :key="review.id"
              class="bg-white rounded-xl p-6 shadow-sm"
            >
              <div class="flex items-start gap-4">
                <img
                  :src="review.avatar"
                  :alt="review.name"
                  class="w-12 h-12 rounded-full object-cover"
                />
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-2">
                    <h4 class="font-semibold text-[#112B11]">{{ review.name }}</h4>
                    <span class="text-sm text-gray-500">{{ review.date }}</span>
                  </div>
                  <div class="flex mb-3">
                    <svg
                      v-for="i in 5"
                      :key="i"
                      class="w-4 h-4"
                      :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  </div>
                  <p class="text-gray-600 leading-relaxed">{{ review.comment }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- View More Button -->
          <div class="text-center mt-8">
            <button
              class="px-8 py-3 border-2 border-[#2C702C] text-[#2C702C] rounded-lg font-semibold hover:bg-[#2C702C] hover:text-white transition-all"
            >
              View More Reviews
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductDetails",
  data() {
    return {
      product: {
        name: "Premium Organic Cotton T-Shirt",
        price: 49.99,
        rating: 4.8,
        sold: 1247,
        description:
          "Experience ultimate comfort with our premium organic cotton t-shirt. Crafted from 100% certified organic cotton, this versatile piece features a modern fit and superior breathability. Perfect for everyday wear, it combines sustainability with style.",
        images: [
          "/images/wh-tshirt/full.png",
          "/images/wh-tshirt/shoulder.png",
          "/images/wh-tshirt/front.png",
          "/images/wh-tshirt/back.png",
        ],
        colors: [
          { name: "Forest Green", value: "#2C702C" },
          { name: "Navy Blue", value: "#1e3a8a" },
          { name: "Charcoal", value: "#374151" },
          { name: "White", value: "#ffffff" },
        ],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      },
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
      ],
      selectedImage: "",
      selectedColor: "",
      selectedSize: "M",
    };
  },
  mounted() {
    this.selectedImage = this.product.images[0];
    this.selectedColor = this.product.colors[0].value;
  },
  methods: {
    getRatingPercentage(rating) {
      const count = this.reviews.filter((r) => Math.floor(r.rating) === rating).length;
      return (count / this.reviews.length) * 100;
    },
    getRatingCount(rating) {
      return this.reviews.filter((r) => Math.floor(r.rating) === rating).length;
    },
  },
};
</script>
