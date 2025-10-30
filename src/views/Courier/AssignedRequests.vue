<template>
  <div class="bg-white rounded-lg shadow-sm overflow-hidden" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="overflow-x-auto">
      <table class="w-full table-auto">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-start">#</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-start">{{
              $t('common.requestNumber') }}</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-start">{{
              $t('common.createdAt') }}</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-start">{{
              $t('common.pickupAddress') }}</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-start">{{
              $t('common.status') }}</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-start">{{
              $t('common.action') }}</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(req, idx) in requests" :key="req.id" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2C702C]">{{ idx + 1 }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2C702C]">{{ req.number }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2C702C]">{{ req.createdAt }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2C702C]">{{ req.address }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <span class="px-2 py-1 rounded-full text-xs font-medium capitalize text-warning bg-yellow-100">
                {{ $t('common.pending') }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2"
              :class="$i18n.locale === 'ar' ? 'text-left' : 'text-right'">
              <button @click="openScanner(req)"
                class="px-3 py-1 border border-green-300 rounded-md text-[#2C702C] hover:bg-green-50 transition-colors cursor-pointer">
                {{ $t('common.collect') }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Teleport to="body">
      <div v-if="scannerOpen"
        class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/30"
        @click="closeScanner">
        <div class="relative p-4 w-full max-w-md" @click.stop>
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" @click="closeScanner"
              class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
            <div class="p-4 md:p-5 text-center">
              <h3 class="text-xl font-semibold text-[#2C702C] mb-2">{{ $t('common.scanQrToCollect') }}</h3>
              <p class="text-gray-500 mb-4">{{ infoText }}</p>
              <div class="aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center mb-4">
                <video ref="videoEl" class="w-full h-full object-cover" autoplay playsinline></video>
              </div>
              <div class="flex justify-center gap-3">
                <button @click="closeScanner" type="button"
                  class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-[#2C702C]">
                  {{ $t('common.closeScanner') }}
                </button>
                <button @click="startCamera" type="button"
                  class="text-white bg-[#2C702C] hover:bg-[#1a4d1a] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  {{ $t('common.openCamera') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script>
export default {
  name: 'CourierAssignedRequests',
  data() {
    return {
      requests: [
        { id: 1, number: 'REQ-1001', createdAt: '2025-10-20 10:30', address: 'Cairo, Nasr City' },
        { id: 2, number: 'REQ-1002', createdAt: '2025-10-21 11:15', address: 'Giza, Dokki' },
        { id: 3, number: 'REQ-1003', createdAt: '2025-10-22 09:05', address: 'Cairo, Maadi' },
      ],
      scannerOpen: false,
      activeRequestId: null,
      stream: null,
      infoText: 'Point your camera at the QR code on the request receipt.'
    }
  },
  methods: {
    openScanner(req) {
      this.activeRequestId = req.id
      this.scannerOpen = true
      this.$nextTick(this.startCamera)
    },
    async startCamera() {
      try {
        if (this.stream) return
        const constraints = { video: { facingMode: 'environment' } }
        this.stream = await navigator.mediaDevices.getUserMedia(constraints)
        const video = this.$refs.videoEl
        if (video) {
          video.srcObject = this.stream
          await video.play()
        }
      } catch (e) {
        this.$toast?.error?.('Camera access was denied')
      }
    },
    async closeScanner() {
      if (this.stream) {
        this.stream.getTracks().forEach(t => t.stop())
        this.stream = null
      }
      this.scannerOpen = false
      this.activeRequestId = null
    },
  }
}
</script>

<style scoped></style>
