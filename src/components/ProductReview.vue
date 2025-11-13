<template>
  <div class="px-2 sm:px-4 md:px-6 lg:px-8 mb-8 mt-4 sm:mt-6 md:mt-8  ">
    <!-- Review Form (only if eligible) -->
    <div v-if="isAuthenticated && canReview && !hasReviewed"
      class="bg-green-50 border border-green-200 rounded-xl shadow-sm p-6 mb-6">
      <h3 class="text-xl font-semibold text-[#2C702C] mb-4">
        {{ $t('common.writeReview') }}
      </h3>

      <!-- Rating Stars -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ $t('common.rating') }} <span class="text-red-500">*</span>
        </label>
        <div class="flex gap-2">
          <button v-for="star in 5" :key="star" @click="rating = star" type="button"
            class="text-4xl transition-colors focus:outline-none">
            <span :class="star <= rating ? 'text-yellow-400' : 'text-gray-300'">★</span>
          </button>
        </div>
        <p class="text-xs text-gray-500 mt-1">{{ $t('common.clickToRate') }}</p>
      </div>

      <!-- Comment -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ $t('common.comment') }} <span class="text-gray-400">({{ $t('common.optional') }})</span>
        </label>
        <textarea v-model="comment" rows="4" :placeholder="$t('common.shareYourExperience')"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C702C] focus:border-transparent resize-none"></textarea>
      </div>

      <button @click="submitReview" :disabled="rating === 0 || submitting"
        class="bg-[#2C702C] text-white px-6 py-3 rounded-lg hover:bg-[#1a4d1a] transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#2C702C]">
        {{ submitting ? $t('common.submitting') + '...' : $t('common.submitReview') }}
      </button>
    </div>

    <!-- Already Reviewed Message -->
    <div v-else-if="isAuthenticated && hasReviewed && existingReview"
      class="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
      <div class="flex items-start justify-between mb-3">
        <div>
          <h3 class="text-lg font-semibold text-[#2C702C] mb-2">
            {{ $t('common.yourReview') }}
          </h3>
          <div class="flex gap-1 mb-2">
            <span v-for="star in 5" :key="star" class="text-2xl"
              :class="star <= existingReview.rating ? 'text-yellow-400' : 'text-gray-300'">★</span>
          </div>
          <p class="text-gray-700">{{ existingReview.comment || $t('common.noComment') }}</p>
          <p class="text-xs text-gray-500 mt-2">
            {{ $t('common.reviewedOn') }} {{ formatDate(existingReview.created_at) }}
          </p>
        </div>
        <button @click="showDeleteModal = true"
          class="text-red-600 hover:text-red-800 text-sm font-medium flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
            class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
          {{ $t('common.delete') }}
        </button>
      </div>
    </div>

    <!-- Not Eligible Message -->
    <div v-else-if="isAuthenticated && !canReview && !hasReviewed"
      class="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
      <div class="flex items-start gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
          class="w-6 h-6 text-yellow-600 shrink-0">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
        <div>
          <h3 class="text-lg font-semibold text-yellow-800 mb-1">
            {{ $t('common.purchaseRequiredToReview') }}
          </h3>
          <p class="text-sm text-gray-700">
            {{ $t('common.youMustPurchaseThisProductBeforeReviewing') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Login Required Message -->
    <div v-else-if="!isAuthenticated" class="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
      <div class="flex items-start gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
          class="w-6 h-6 text-gray-600 shrink-0">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
        <div>
          <h3 class="text-lg font-semibold text-gray-800 mb-1">
            {{ $t('common.loginToReview') }}
          </h3>
          <p class="text-sm text-gray-600 mb-3">
            {{ $t('common.pleaseLoginToWriteReview') }}
          </p>
          <router-link to="/login"
            class="inline-block bg-[#2C702C] text-white px-4 py-2 rounded-lg hover:bg-[#1a4d1a] transition text-sm font-semibold">
            {{ $t('common.login') }}
          </router-link>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <Teleport to="body">
      <div v-if="showDeleteModal"
        class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/30"
        @click="showDeleteModal = false">
        <div class="relative p-4 w-full max-w-md" @click.stop>
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" @click="showDeleteModal = false"
              class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
            <div class="p-4 md:p-5 text-center">
              <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {{ $t('common.confirmDeleteReview') }}
              </h3>
              <button @click="confirmDelete" type="button"
                class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                {{ $t("common.YesSure") }}
              </button>
              <button @click="showDeleteModal = false" type="button"
                class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                {{ $t('common.No, Cancel') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script>
import reviewsService from '@/services/reviewsService';
import { useAuthStore } from '@/stores/auth';

export default {
  name: 'ProductReview',
  props: {
    productId: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      canReview: false,
      hasReviewed: false,
      existingReview: null,
      orderId: null,
      rating: 0,
      comment: '',
      submitting: false,
      showDeleteModal: false
    };
  },

  computed: {
    auth() {
      return useAuthStore();
    },
    isAuthenticated() {
      return this.auth.isAuthenticated;
    }
  },

  async mounted() {
    if (this.isAuthenticated) {
      await this.checkEligibility();
    }
  },

  methods: {
    async checkEligibility() {
      try {
        const response = await reviewsService.canReview(this.productId);
        this.canReview = response.data.can_review;
        this.hasReviewed = response.data.has_reviewed;
        this.existingReview = response.data.existing_review;
        this.orderId = response.data.order_id;
      } catch (error) {
        console.log('Error checking eligibility:', error);
      }
    },

    async submitReview() {
      if (this.rating === 0) {
        this.$toast.error(this.$t('common.pleaseSelectRating'));
        return;
      }

      this.submitting = true;

      try {
        await reviewsService.submitReview({
          product_id: this.productId,
          order_id: this.orderId,
          rating: this.rating,
          comment: this.comment
        });

        this.$toast.success(this.$t('common.reviewSubmittedSuccessfully'));

        // Reset form
        this.rating = 0;
        this.comment = '';

        // Refresh eligibility and emit event to parent to refresh reviews
        await this.checkEligibility();
        this.$emit('review-submitted');

        // Reload page to show updated reviews
        window.location.reload();
      } catch (error) {
        this.$toast.error(error.response?.data?.message || this.$t('common.failedToSubmitReview'));
      } finally {
        this.submitting = false;
      }
    },

    async confirmDelete() {
      try {
        await reviewsService.deleteReview(this.existingReview.id);
        this.$toast.success(this.$t('common.reviewDeletedSuccessfully'));

        this.showDeleteModal = false;

        // Refresh eligibility and reload
        await this.checkEligibility();
        this.$emit('review-deleted');
        window.location.reload();
      } catch (error) {
        this.$toast.error(this.$t('common.failedToDeleteReview'));
        this.showDeleteModal = false;
      }
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString();
    }
  }
};
</script>
