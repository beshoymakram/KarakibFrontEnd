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
          v-for="(type, index) in types"
          :key="index"
          @click="selectedType = type"
          class="carousel-item flex flex-col items-center flex-shrink-0 cursor-pointer transition-all duration-300"
        >
          <img
            :src="type.image_url"
            :alt="type.name"
            class="w-[192px] h-[192px] object-cover rounded-full bg-[#EAF2EA] transition-transform duration-300 hover:scale-105"
            :class="{
              'outline-2  outline-[#2C702C] rounded-full': selectedType.id === type.id,
            }"
          />
          <p
            class="mt-4 text-xl font-semibold text-[#2C702C]"
            :class="{
              'text-[#112B11]': selectedType.id === type.id,
            }"
          >
            {{ type.name }}
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
      {{ selectedType.name }}
    </p>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center py-14 px-3 lg:px-6 overflow-auto scroll-smooth rounded-2xl"
    >
      <div
        v-for="(item, index) in filteredItems"
        :key="index"
        class="card bg-base-100 w-84 sm:w-72 md:w-80 shadow-sm hover:shadow-lg transition-transform duration-300"
      >
        <figure>
          <router-link :to="`/waste/${item.id}`">
            <img
              :src="item.image_url"
              :alt="item.name"
              class="w-full size-75 bg-[#E0EBE0] object-fill hover:opacity-90 transition"
            />
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

            {{ item.points_per_unit }} points
          </p>

          <!-- Actions -->

          <div class="flex justify-between items-center mt-2">
            <p class="text-[#8E98A8] text-sm font-semibold">per {{ item.unit }}</p>
            <button
              @click="addWasteToCart(item)"
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
import { useCartStore } from "@/stores/cart";

export default {
  name: "wastePage",
  data() {
    return {
      selectedType: "",
      // Static waste types data
      types: [
        {
          id: 1,
          name: "Plastic",
          value: "plastic",
          image_url: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=400"
        },
        {
          id: 2,
          name: "Paper",
          value: "paper",
          image_url: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400"
        },
        {
          id: 3,
          name: "Glass",
          value: "glass",
          image_url: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400"
        },
        {
          id: 4,
          name: "Metal",
          value: "metal",
          image_url: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400"
        },
        {
          id: 5,
          name: "Electronic",
          value: "electronic",
          image_url: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400"
        }
      ],
      // Static waste items data (using waste_1, waste_2, etc. as IDs to avoid conflicts with products)
      items: [
        // Plastic items
        {
          id: "waste_1",
          name: "Plastic Bottles",
          waste_type_id: 1,
          points_per_unit: 10,
          unit: "kg",
          image_url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400"
        },
        {
          id: "waste_2",
          name: "Plastic Bags",
          waste_type_id: 1,
          points_per_unit: 5,
          unit: "kg",
          image_url: "https://images.unsplash.com/photo-1563461660947-507ef49e9c47?w=400"
        },
        {
          id: "waste_3",
          name: "Plastic Containers",
          waste_type_id: 1,
          points_per_unit: 8,
          unit: "kg",
          image_url: "https://images.unsplash.com/photo-1625806786037-2af608423424?w=400"
        },
        // Paper items
        {
          id: "waste_4",
          name: "Newspapers",
          waste_type_id: 2,
          points_per_unit: 15,
          unit: "kg",
          image_url: "https://images.unsplash.com/photo-1586339949216-35c2747cc36d?w=400"
        },
        {
          id: "waste_5",
          name: "Cardboard Boxes",
          waste_type_id: 2,
          points_per_unit: 12,
          unit: "kg",
          image_url: "https://images.unsplash.com/photo-1558452584-218d2902fa58?w=400"
        },
        {
          id: "waste_6",
          name: "Office Paper",
          waste_type_id: 2,
          points_per_unit: 18,
          unit: "kg",
          image_url: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400"
        },
        // Glass items
        {
          id: "waste_7",
          name: "Glass Bottles",
          waste_type_id: 3,
          points_per_unit: 20,
          unit: "kg",
          image_url: "https://images.unsplash.com/photo-1591209557403-77be0f4f320e?w=400"
        },
        {
          id: "waste_8",
          name: "Glass Jars",
          waste_type_id: 3,
          points_per_unit: 22,
          unit: "kg",
          image_url: "https://images.unsplash.com/photo-1513074735649-8f59d1b3d7e0?w=400"
        },
        // Metal items
        {
          id: "waste_9",
          name: "Aluminum Cans",
          waste_type_id: 4,
          points_per_unit: 25,
          unit: "kg",
          image_url: "https://images.unsplash.com/photo-1610802547994-c6c90e7e19c7?w=400"
        },
        {
          id: "waste_10",
          name: "Steel Cans",
          waste_type_id: 4,
          points_per_unit: 20,
          unit: "kg",
          image_url: "https://images.unsplash.com/photo-1598985272962-da5fb60b9bdb?w=400"
        },
        // Electronic items
        {
          id: "waste_11",
          name: "Old Phones",
          waste_type_id: 5,
          points_per_unit: 50,
          unit: "unit",
          image_url: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400"
        },
        {
          id: "waste_12",
          name: "Batteries",
          waste_type_id: 5,
          points_per_unit: 30,
          unit: "kg",
          image_url: "https://images.unsplash.com/photo-1609091839311-d7f996e99ef2?w=400"
        }
      ],
      wasteCart: [] // Local cart for waste items only
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
    loadWasteCart() {
      try {
        const stored = localStorage.getItem('cart_waste_items');
        if (stored) {
          this.wasteCart = JSON.parse(stored);
        }
      } catch (error) {
        console.error('Error loading waste cart:', error);
      }
    },
    saveWasteCart() {
      try {
        localStorage.setItem('cart_waste_items', JSON.stringify(this.wasteCart));
        // Trigger a storage event so cart page can listen and update
        window.dispatchEvent(new Event('waste-cart-updated'));
      } catch (error) {
        console.error('Error saving waste cart:', error);
      }
    },
    addWasteToCart(item) {
      try {
        const existingIndex = this.wasteCart.findIndex(cartItem => cartItem.id === item.id);

        if (existingIndex !== -1) {
          // Item exists, increase quantity (which increases weight and points)
          this.wasteCart[existingIndex].quantity += 1;
          this.wasteCart[existingIndex].weight = this.wasteCart[existingIndex].quantity;
          this.wasteCart[existingIndex].estimated_points =
            this.wasteCart[existingIndex].points_per_unit * this.wasteCart[existingIndex].quantity;
        } else {
          // Add new item in the format expected by cart page
          this.wasteCart.push({
            id: item.id,
            waste_type: item.name,
            description: `${item.name} - ${item.unit}`,
            weight: 1, // Initial quantity/weight
            estimated_points: item.points_per_unit,
            points_per_unit: item.points_per_unit,
            unit: item.unit,
            image_url: item.image_url,
            quantity: 1,
            type: 'waste'
          });
        }

        this.saveWasteCart();
        this.$toast.success(`${item.name} added to your cart!`);
      } catch (error) {
        console.error('Error adding to cart:', error);
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
    // Set default selected type to first type
    this.selectedType = this.types[0] || "";
    // Load waste cart from localStorage
    this.loadWasteCart();
  },
};
</script>

<style scoped>
.carousel::-webkit-scrollbar {
  display: none;
}
</style>
