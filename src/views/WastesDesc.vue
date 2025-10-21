<template>
  <div class="bg-[#F5F7F5] min-h-screen py-10">
    <div class="container mx-auto px-4 max-w-5xl">
      <div v-if="waste" class="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-10">
        <!-- Image -->
        <div class="flex-shrink-0 md:w-1/2">
          <img
            :src="waste.image_url"
            :alt="waste.name"
            class="w-full h-80 object-cover rounded-xl bg-[#EAF2EA]"
          />
        </div>

        <!-- Details -->
        <div class="flex-1 flex flex-col justify-between">
          <div>
            <h1 class="text-3xl font-bold text-[#2C702C] mb-2">{{ waste.name }}</h1>
            <p class="text-gray-600 mb-4">
              {{ waste.description || 'No description available.' }}
            </p>

            <p class="flex items-center gap-2 text-[#FFC400] font-semibold text-lg">
              <img src="/images/Coins.svg" class="w-6 h-6" />
              {{ waste.points_per_unit }} points per {{ waste.unit }}
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              @click="addAndEarn"
              class="bg-[#2C702C] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#215921]"
            >
              Add & Earn
            </button>

            <router-link
              to="/add-waste"
              class="border border-[#2C702C] text-[#2C702C] px-6 py-3 rounded-md font-semibold hover:bg-[#EAF2EA] text-center"
            >
              ← Back to Waste Types
            </router-link>
          </div>
        </div>
      </div>

      <div v-else class="text-center text-gray-500">Loading waste details...</div>
    </div>
  </div>
</template>

<script>
import wasteItemsService from '@/services/wasteItemsService';

export default {
  name: 'WasteDesc',
  data() {
    return {
      waste: null,
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    try {
      const response = await wasteItemsService.getItem(id);
      this.waste = response.data.data || response.data;
    } catch (error) {
      this.$toast.error(error.response?.data?.message || 'Failed to load waste details.');
    }
  },
  methods: {
    addAndEarn() {
      this.$toast.success(`You earned ${this.waste.points_per_unit} points for adding ${this.waste.name}!`);
      // You can later add logic to store this locally or call an API endpoint
    },
  },
};
</script>

<style scoped>
.container {
  font-family: 'Poppins', sans-serif;
}
</style>
