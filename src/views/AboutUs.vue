<template>
  <div class="flex flex-col min-h-screen">
    <!-- Hero Section -->
    <section class="relative bg-[#E9EBF8] flex items-center justify-center text-center py-20 px-6 overflow-hidden mt-14"
      style="background-image: url('/images/abouthero.png'); background-size: cover; background-position: center;">
      <div class="absolute inset-0 bg-white/70"></div>

      <!-- Doodles in Hero Section -->
      <div class="absolute top-5 left-5 w-16 h-16 opacity-80">
        <svg width="64" height="89" viewBox="0 0 64 89" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M38.867 35.3236C45.6849 32.0732 52.5028 28.8228 59.3207 25.557C59.7153 26.5229 60.1236 27.4735 60.5183 28.4394C54.2175 36.4735 43.0312 35.4002 35.7778 44.0168C45.3311 50.3183 54.5985 56.4205 63.866 62.538C63.5258 63.2893 63.1719 64.0405 62.8317 64.7765C52.7614 62.9213 45.1133 54.7033 34.5803 49.0611C37.3292 62.63 39.7651 74.727 42.2147 86.824C41.6703 87.4066 41.1124 87.9893 40.5681 88.5565C38.9895 86.7934 36.431 85.2755 35.9956 83.2057C34.3897 75.6316 33.5188 67.8582 32.3076 60.1769C31.9266 57.7851 31.3414 55.4392 30.8515 53.0781C30.1711 52.9095 29.4907 52.7408 28.8102 52.5721C25.4489 62.446 22.0876 72.3352 18.6582 82.4544C14.6028 77.9007 16.2495 70.986 26.279 48.8924C17.2837 51.9742 9.09137 54.7953 0.885381 57.6164C0.640427 56.8651 0.409081 56.0985 0.177734 55.3473C8.86002 51.3302 17.5559 47.3132 27.8984 42.5296C20.6723 36.9488 14.6165 32.2571 8.56063 27.5809C8.90085 26.9369 9.24106 26.293 9.58127 25.649C15.3921 28.9914 21.203 32.3338 27.8848 36.1822C26.4015 23.9625 24.9998 12.4634 23.6117 0.949025C24.4555 0.780372 25.3128 0.611719 26.1565 0.427734C28.0618 11.0682 29.9533 21.7087 31.8586 32.3491C32.3212 32.6251 32.7703 32.8858 33.233 33.1617C37.2884 23.9012 41.3437 14.6406 45.4127 5.36467C46.1612 5.7633 46.9097 6.1466 47.6581 6.54524C44.324 15.6525 40.9899 24.7597 37.6558 33.867C37.5606 34.465 37.4653 35.0476 37.37 35.6302C37.8599 35.5229 38.3635 35.4155 38.867 35.3236Z"
            fill="#317C31" />
        </svg>
      </div>
      <div class="absolute bottom-10 right-8 w-20 h-20 opacity-70">
        <svg width="36" height="39" viewBox="0 0 36 39" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.5527 38.5507C7.5822 30.5169 3.39558 22.8178 0.100306 14.6622C-0.520934 13.1254 1.86949 8.57598 3.80073 7.46524C9.1353 4.37647 14.902 2.07891 20.6552 0.100886C22.0868 -0.386014 24.9364 0.968175 25.8277 2.47452C28.9204 7.70869 31.4189 13.3841 34.174 18.8769C36.2133 22.9395 35.7541 26.0283 31.7025 28.0824C25.2605 31.3385 18.8591 34.7468 11.5527 38.5507ZM13.5785 32.7232C19.4668 29.041 24.5853 25.8457 29.5957 22.7265C22.9511 5.45678 18.2918 3.96565 5.20528 14.434C7.79828 20.079 10.4183 25.8153 13.5785 32.7232Z"
            fill="#317C31" />
        </svg>
      </div>

      <div class="relative z-10 max-w-3xl mx-auto">
        <h1 class="text-5xl font-bold text-[#2C702C] mb-4 drop-shadow-lg">{{ $t('common.aboutUs') }}</h1>
        <p class="text-[#265C26] text-lg font-medium leading-relaxed">
          {{ $t('common.karakibIsEcoFriendlyPlatform') }}
        </p>
        <button
          class="mt-6 bg-[#2C702C] hover:bg-[#265C26] text-white font-semibold px-6 py-3 rounded-md text-lg transition"
          @click="openModal('Karakib simplifies recycling by connecting users to collection points, scheduling pickups, and rewarding eco-friendly actions through our green points system. Every step you take with Karakib brings us closer to a cleaner Egypt!')">
          {{ $t('common.learnMore') }}
        </button>
      </div>
    </section>

    <section class="flex-1 bg-[#BFD6BF] py-20 px-6 md:px-16 relative overflow-hidden">
      <!-- Background Doodles -->
      <div class="absolute top-5 right-5 w-32 h-12 opacity-40">
        <svg width="285" height="45" viewBox="0 0 285 45" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M181.39 1.69834C161.194 2.38679 141.01 3.54149 120.86 5.16244C102.574 5.51942 84.2852 5.87639 65.9997 6.23336C45.9352 6.62676 25.8707 7.01652 5.80955 7.40992C3.86857 7.44635 0.862866 9.0163 0.565271 11.3876C0.237917 14.003 3.17418 14.4401 4.82749 14.411C17.8654 14.156 30.9034 13.901 43.9413 13.646C38.5152 14.4073 33.0957 15.1978 27.6761 16.0246C25.798 16.3124 23.1758 17.2813 22.5773 19.5434C22.0417 21.5614 23.7148 22.9929 25.4905 23.0293C55.6004 23.5976 85.7137 24.1695 115.824 24.7377C122.232 24.8579 128.64 24.9818 135.048 25.102C125.829 26.213 116.624 27.4915 107.445 28.9376C93.051 31.2106 78.7169 33.9061 64.4456 36.9768C62.9047 37.3083 60.719 38.7945 60.4843 40.6995C60.2561 42.5208 62.078 43.712 63.5396 43.7265C97.7828 44.0544 132.026 44.3858 166.269 44.7137C175.924 44.8047 185.576 44.8994 195.232 44.9905C197.444 45.0124 200.281 44.3166 201.395 41.9235C202.391 39.7816 200.526 38.0004 198.624 37.9822C165.661 37.6653 132.697 37.3484 99.7337 37.0315C100.653 36.8785 101.569 36.7218 102.488 36.5725C114.944 34.5399 127.443 32.817 139.968 31.4073C165.033 28.5879 190.209 27.018 215.402 26.7084C216.516 26.6938 217.644 26.6865 218.768 26.6792C231.538 26.9196 244.305 27.1637 257.075 27.4041C259.284 27.4442 262.131 26.7156 263.239 24.337C264.257 22.1515 262.353 20.4795 260.468 20.3958C247.436 19.8202 234.392 19.5725 221.351 19.6563C204.279 19.3321 187.207 19.0116 170.135 18.6874C140.025 18.1191 109.911 17.5472 79.8015 16.979C77.3744 16.9316 74.944 16.8879 72.517 16.8406C88.2829 14.9938 104.075 13.4311 119.887 12.1599C152.851 11.5151 185.818 10.874 218.781 10.2293C238.846 9.83589 258.91 9.44613 278.971 9.05273C280.813 9.0163 283.518 7.62483 284.07 5.53399C284.613 3.49049 282.926 2.12088 281.157 2.04803C247.916 0.6857 214.635 0.565495 181.39 1.69834Z"
            fill="#317C31" />
        </svg>
      </div>
      <div class="absolute bottom-10 left-5 w-16 h-16 opacity-40">
        <svg width="36" height="39" viewBox="0 0 36 39" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.5527 38.5507C7.5822 30.5169 3.39558 22.8178 0.100306 14.6622C-0.520934 13.1254 1.86949 8.57598 3.80073 7.46524C9.1353 4.37647 14.902 2.07891 20.6552 0.100886C22.0868 -0.386014 24.9364 0.968175 25.8277 2.47452C28.9204 7.70869 31.4189 13.3841 34.174 18.8769C36.2133 22.9395 35.7541 26.0283 31.7025 28.0824C25.2605 31.3385 18.8591 34.7468 11.5527 38.5507ZM13.5785 32.7232C19.4668 29.041 24.5853 25.8457 29.5957 22.7265C22.9511 5.45678 18.2918 3.96565 5.20528 14.434C7.79828 20.079 10.4183 25.8153 13.5785 32.7232Z"
            fill="#317C31" />
        </svg>
      </div>

      <h2 class="text-3xl md:text-4xl text-[#2C702C] font-semibold text-center mb-14 relative z-10">
        {{ $t('common.workingTogetherForCleanerFuture') }}
      </h2>

      <div class="space-y-16 relative z-10">
        <!-- Section 1 -->
        <div class="flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto">
          <div class="md:w-1/2 text-left relative">
            <!-- Doodle for section 1 -->
            <div class="absolute -top-25 -left-15 w-12 h-19 opacity-70">
              <svg width="64" height="89" viewBox="0 0 64 89" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M38.867 35.3236C45.6849 32.0732 52.5028 28.8228 59.3207 25.557C59.7153 26.5229 60.1236 27.4735 60.5183 28.4394C54.2175 36.4735 43.0312 35.4002 35.7778 44.0168C45.3311 50.3183 54.5985 56.4205 63.866 62.538C63.5258 63.2893 63.1719 64.0405 62.8317 64.7765C52.7614 62.9213 45.1133 54.7033 34.5803 49.0611C37.3292 62.63 39.7651 74.727 42.2147 86.824C41.6703 87.4066 41.1124 87.9893 40.5681 88.5565C38.9895 86.7934 36.431 85.2755 35.9956 83.2057C34.3897 75.6316 33.5188 67.8582 32.3076 60.1769C31.9266 57.7851 31.3414 55.4392 30.8515 53.0781C30.1711 52.9095 29.4907 52.7408 28.8102 52.5721C25.4489 62.446 22.0876 72.3352 18.6582 82.4544C14.6028 77.9007 16.2495 70.986 26.279 48.8924C17.2837 51.9742 9.09137 54.7953 0.885381 57.6164C0.640427 56.8651 0.409081 56.0985 0.177734 55.3473C8.86002 51.3302 17.5559 47.3132 27.8984 42.5296C20.6723 36.9488 14.6165 32.2571 8.56063 27.5809C8.90085 26.9369 9.24106 26.293 9.58127 25.649C15.3921 28.9914 21.203 32.3338 27.8848 36.1822C26.4015 23.9625 24.9998 12.4634 23.6117 0.949025C24.4555 0.780372 25.3128 0.611719 26.1565 0.427734C28.0618 11.0682 29.9533 21.7087 31.8586 32.3491C32.3212 32.6251 32.7703 32.8858 33.233 33.1617C37.2884 23.9012 41.3437 14.6406 45.4127 5.36467C46.1612 5.7633 46.9097 6.1466 47.6581 6.54524C44.324 15.6525 40.9899 24.7597 37.6558 33.867C37.5606 34.465 37.4653 35.0476 37.37 35.6302C37.8599 35.5229 38.3635 35.4155 38.867 35.3236Z"
                  fill="#317C31" />
              </svg>
            </div>
            <h3 class="text-2xl font-semibold text-[#2C702C] mb-3">
              {{ $t('common.makingRecyclingEasyAndRewarding') }}
            </h3>
            <p class="text-[#163816] mb-5">
              {{ $t('common.karakibSimplifiesRecyclingProcess') }}
            </p>
            <button class="bg-[#2C702C] hover:bg-[#265C26] text-white font-semibold px-5 py-2 rounded-md text-sm"
              @click="openModal('We collaborate with communities, NGOs, and local businesses to create awareness and provide incentives for sustainable habits. Karakib empowers individuals to make a lasting impact together.')">
              {{ $t('common.learnMore') }}
            </button>
          </div>
          <div class="md:w-1/2 flex justify-center relative">
            <!-- Doodle for image 1 -->
            <div class="absolute -top-4 -right-4 w-10 h-10 opacity-80">
              <svg width="36" height="39" viewBox="0 0 36 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.5527 38.5507C7.5822 30.5169 3.39558 22.8178 0.100306 14.6622C-0.520934 13.1254 1.86949 8.57598 3.80073 7.46524C9.1353 4.37647 14.902 2.07891 20.6552 0.100886C22.0868 -0.386014 24.9364 0.968175 25.8277 2.47452C28.9204 7.70869 31.4189 13.3841 34.174 18.8769C36.2133 22.9395 35.7541 26.0283 31.7025 28.0824C25.2605 31.3385 18.8591 34.7468 11.5527 38.5507ZM13.5785 32.7232C19.4668 29.041 24.5853 25.8457 29.5957 22.7265C22.9511 5.45678 18.2918 3.96565 5.20528 14.434C7.79828 20.079 10.4183 25.8153 13.5785 32.7232Z"
                  fill="#317C31" />
              </svg>
            </div>
            <img src="/images/about1.png" alt="Making Recycling Easy"
              class="rounded-full w-[280px] h-[280px] object-cover bg-[#EAF2EA] p-4" />
          </div>
        </div>

        <!-- Section 2 -->
        <div class="flex flex-col md:flex-row-reverse items-center gap-10 max-w-6xl mx-auto">
          <div class="md:w-1/2 text-left relative">
            <!-- Doodle for section 2 -->
            <div class="absolute -top-6 -right-6 w-12 h-12 opacity-70">
              <svg width="64" height="89" viewBox="0 0 64 89" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M38.867 35.3236C45.6849 32.0732 52.5028 28.8228 59.3207 25.557C59.7153 26.5229 60.1236 27.4735 60.5183 28.4394C54.2175 36.4735 43.0312 35.4002 35.7778 44.0168C45.3311 50.3183 54.5985 56.4205 63.866 62.538C63.5258 63.2893 63.1719 64.0405 62.8317 64.7765C52.7614 62.9213 45.1133 54.7033 34.5803 49.0611C37.3292 62.63 39.7651 74.727 42.2147 86.824C41.6703 87.4066 41.1124 87.9893 40.5681 88.5565C38.9895 86.7934 36.431 85.2755 35.9956 83.2057C34.3897 75.6316 33.5188 67.8582 32.3076 60.1769C31.9266 57.7851 31.3414 55.4392 30.8515 53.0781C30.1711 52.9095 29.4907 52.7408 28.8102 52.5721C25.4489 62.446 22.0876 72.3352 18.6582 82.4544C14.6028 77.9007 16.2495 70.986 26.279 48.8924C17.2837 51.9742 9.09137 54.7953 0.885381 57.6164C0.640427 56.8651 0.409081 56.0985 0.177734 55.3473C8.86002 51.3302 17.5559 47.3132 27.8984 42.5296C20.6723 36.9488 14.6165 32.2571 8.56063 27.5809C8.90085 26.9369 9.24106 26.293 9.58127 25.649C15.3921 28.9914 21.203 32.3338 27.8848 36.1822C26.4015 23.9625 24.9998 12.4634 23.6117 0.949025C24.4555 0.780372 25.3128 0.611719 26.1565 0.427734C28.0618 11.0682 29.9533 21.7087 31.8586 32.3491C32.3212 32.6251 32.7703 32.8858 33.233 33.1617C37.2884 23.9012 41.3437 14.6406 45.4127 5.36467C46.1612 5.7633 46.9097 6.1466 47.6581 6.54524C44.324 15.6525 40.9899 24.7597 37.6558 33.867C37.5606 34.465 37.4653 35.0476 37.37 35.6302C37.8599 35.5229 38.3635 35.4155 38.867 35.3236Z"
                  fill="#317C31" />
              </svg>
            </div>
            <h3 class="text-2xl font-semibold text-[#2C702C] mb-3">
              {{ $t('common.supportingGreenerCommunity') }}
            </h3>
            <p class="text-[#163816] mb-5">
              {{ $t('common.ourGoalIsToBuildNetwork') }}
            </p>
            <button class="bg-[#2C702C] hover:bg-[#265C26] text-white font-semibold px-5 py-2 rounded-md text-sm"
              @click="openModal('Karakib collaborates with communities, NGOs, and local businesses to create awareness and provide incentives for sustainable habits. Karakib empowers individuals to make a lasting impact together.')">
              {{ $t('common.learnMore') }}
            </button>
          </div>
          <div class="md:w-1/2 flex justify-center relative">
            <!-- Doodle for image 2 -->
            <div class="absolute -bottom-4 -left-4 w-10 h-10 opacity-80">
              <svg width="36" height="39" viewBox="0 0 36 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.5527 38.5507C7.5822 30.5169 3.39558 22.8178 0.100306 14.6622C-0.520934 13.1254 1.86949 8.57598 3.80073 7.46524C9.1353 4.37647 14.902 2.07891 20.6552 0.100886C22.0868 -0.386014 24.9364 0.968175 25.8277 2.47452C28.9204 7.70869 31.4189 13.3841 34.174 18.8769C36.2133 22.9395 35.7541 26.0283 31.7025 28.0824C25.2605 31.3385 18.8591 34.7468 11.5527 38.5507ZM13.5785 32.7232C19.4668 29.041 24.5853 25.8457 29.5957 22.7265C22.9511 5.45678 18.2918 3.96565 5.20528 14.434C7.79828 20.079 10.4183 25.8153 13.5785 32.7232Z"
                  fill="#317C31" />
              </svg>
            </div>
            <img src="/images/about2.png" alt="Supporting a Greener Community"
              class="rounded-full w-[280px] h-[280px] object-cover bg-[#EAF2EA] p-4" />
          </div>
        </div>

        <!-- Section 3 -->
        <div class="flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto">
          <div class="md:w-1/2 text-left relative">
            <!-- Doodle for section 3 -->
            <div class="absolute -bottom-16 -right-6 w-12 h-12 opacity-70">
              <svg width="64" height="89" viewBox="0 0 64 89" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M38.867 35.3236C45.6849 32.0732 52.5028 28.8228 59.3207 25.557C59.7153 26.5229 60.1236 27.4735 60.5183 28.4394C54.2175 36.4735 43.0312 35.4002 35.7778 44.0168C45.3311 50.3183 54.5985 56.4205 63.866 62.538C63.5258 63.2893 63.1719 64.0405 62.8317 64.7765C52.7614 62.9213 45.1133 54.7033 34.5803 49.0611C37.3292 62.63 39.7651 74.727 42.2147 86.824C41.6703 87.4066 41.1124 87.9893 40.5681 88.5565C38.9895 86.7934 36.431 85.2755 35.9956 83.2057C34.3897 75.6316 33.5188 67.8582 32.3076 60.1769C31.9266 57.7851 31.3414 55.4392 30.8515 53.0781C30.1711 52.9095 29.4907 52.7408 28.8102 52.5721C25.4489 62.446 22.0876 72.3352 18.6582 82.4544C14.6028 77.9007 16.2495 70.986 26.279 48.8924C17.2837 51.9742 9.09137 54.7953 0.885381 57.6164C0.640427 56.8651 0.409081 56.0985 0.177734 55.3473C8.86002 51.3302 17.5559 47.3132 27.8984 42.5296C20.6723 36.9488 14.6165 32.2571 8.56063 27.5809C8.90085 26.9369 9.24106 26.293 9.58127 25.649C15.3921 28.9914 21.203 32.3338 27.8848 36.1822C26.4015 23.9625 24.9998 12.4634 23.6117 0.949025C24.4555 0.780372 25.3128 0.611719 26.1565 0.427734C28.0618 11.0682 29.9533 21.7087 31.8586 32.3491C32.3212 32.6251 32.7703 32.8858 33.233 33.1617C37.2884 23.9012 41.3437 14.6406 45.4127 5.36467C46.1612 5.7633 46.9097 6.1466 47.6581 6.54524C44.324 15.6525 40.9899 24.7597 37.6558 33.867C37.5606 34.465 37.4653 35.0476 37.37 35.6302C37.8599 35.5229 38.3635 35.4155 38.867 35.3236Z"
                  fill="#317C31" />
              </svg>
            </div>
            <h3 class="text-2xl font-semibold text-[#2C702C] mb-3">
              {{ $t('common.innovationWithPurpose') }}
            </h3>
            <p class="text-[#163816] mb-5">
              {{ $t('common.karakibCombinesTechnologyAndEnvironmentalCare') }}
            </p>
            <button class="bg-[#2C702C] hover:bg-[#265C26] text-white font-semibold px-5 py-2 rounded-md text-sm"
              @click="openModal('we use technology to streamline recycling processes, making it easier for users to participate and track their contributions. Our innovative solutions aim to foster a culture of sustainability and environmental responsibility.')">
              {{ $t('common.learnMore') }}
            </button>
          </div>
          <div class="md:w-1/2 flex justify-center relative">
            <!-- Doodle for image 3 -->
            <div class="absolute -top-4 -right-4 w-10 h-10 opacity-80">
              <svg width="36" height="39" viewBox="0 0 36 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.5527 38.5507C7.5822 30.5169 3.39558 22.8178 0.100306 14.6622C-0.520934 13.1254 1.86949 8.57598 3.80073 7.46524C9.1353 4.37647 14.902 2.07891 20.6552 0.100886C22.0868 -0.386014 24.9364 0.968175 25.8277 2.47452C28.9204 7.70869 31.4189 13.3841 34.174 18.8769C36.2133 22.9395 35.7541 26.0283 31.7025 28.0824C25.2605 31.3385 18.8591 34.7468 11.5527 38.5507ZM13.5785 32.7232C19.4668 29.041 24.5853 25.8457 29.5957 22.7265C22.9511 5.45678 18.2918 3.96565 5.20528 14.434C7.79828 20.079 10.4183 25.8153 13.5785 32.7232Z"
                  fill="#317C31" />
              </svg>
            </div>
            <img src="/images/about3.png" alt="Innovation with a Purpose"
              class="rounded-full w-[280px] h-[280px] object-cover bg-[#EAF2EA] p-4" />
          </div>
        </div>
      </div>
    </section>
    <section class="w-full mx-auto bg-[#BFD6BF] shadow p-8">
      <section class="max-w-6xl mx-auto my-8 bg-white rounded-2xl shadow p-8" id="Faq">
        <h2 class="text-2xl font-semibold mb-6">{{ $t('common.frequentlyAskedQuestions') }}</h2>

        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <button v-for="(faq, index) in faqs" :key="index" @click="toggleFaq(index)"
              class="w-full flex justify-between items-center bg-gray-100 px-4 py-3 rounded-lg text-left hover:bg-green-50 transition">
              <span class="font-medium">{{ faq.question }}</span>
              <svg :class="{ 'rotate-180': openFaq === index }" xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <div class="bg-green-50 border border-green-100 rounded-lg p-6 text-gray-700" v-if="openFaq !== null">
            <p>{{ faqs[openFaq].answer }}</p>
          </div>
        </div>
      </section>
      <section class="max-w-6xl mx-auto my-8 bg-white rounded-2xl shadow p-8" id="terms">
        <h2 class="text-2xl font-semibold mb-4">{{ $t('common.termsAndConditions') }}</h2>

        <p class="text-gray-600 mb-4 flex items-start">
          <span class="text-green-600 mr-2 text-xl"><font-awesome-icon :icon="['fas', 'triangle-exclamation']" /></span>
          {{ $t('common.pleaseReadCarefullyBeforeUsingKarakib') }}
        </p>

        <ul class="list-disc list-inside space-y-2 text-gray-700">
          <li>{{ $t('common.byUsingKarakibYouAgree') }}</li>
          <li>{{ $t('common.usersAreAlsoResponsible') }}</li>
          <li>{{ $t('common.karakibWillNotBeHeldResponsible') }}</li>
          <li>{{ $t('common.anyMisuseOfPlatform') }}</li>
          <li>{{ $t('common.weMayUpdateTheseTerms') }}</li>
        </ul>

        <div class="mt-6">
          <button class="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            {{ $t('common.readFullPolicy') }}
          </button>
        </div>
      </section>

      <section class="max-w-6xl mx-auto my-8 bg-white rounded-2xl shadow p-8" id="inquiry">
        <h2 class="text-2xl font-semibold mb-4">{{ $t('common.sendAnInquiry') }}</h2>
        <p class="text-gray-600 mb-6">{{ $t('common.weAreHappyToAnswerQuestions') }}</p>

        <form @submit.prevent="submitForm" class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block mb-1 font-medium">{{ $t('common.firstName') }}</label>
            <input v-model="form.firstName" type="text" :placeholder="$t('common.enterFirstName')"
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
          </div>

          <div>
            <label class="block mb-1 font-medium">{{ $t('common.lastName') }}</label>
            <input v-model="form.lastName" type="text" :placeholder="$t('common.enterLastName')"
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
          </div>

          <div>
            <label class="block mb-1 font-medium">{{ $t('common.email') }}</label>
            <input v-model="form.email" type="email" :placeholder="$t('common.enterEmail')"
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
          </div>

          <div>
            <label class="block mb-1 font-medium">{{ $t('common.subject') }}</label>
            <input v-model="form.subject" type="text" :placeholder="$t('common.enterSubject')"
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
          </div>

          <div class="md:col-span-2">
            <label class="block mb-1 font-medium">{{ $t('common.messageBox') }}</label>
            <textarea v-model="form.message" rows="4" :placeholder="$t('common.enterMessage')"
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"></textarea>
          </div>

          <div class="md:col-span-2 flex justify-center mt-4">
            <button type="submit" class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              {{ $t('common.sendMessage') }}
            </button>
          </div>
        </form>
      </section>

      <!-- Contact Us -->
      <section class="max-w-6xl mx-auto my-8 bg-white rounded-2xl shadow p-8" id="contact">
        <h2 class="text-2xl font-semibold mb-4">{{ $t('common.contactUs') }}</h2>
        <p class="text-gray-600 mb-6">{{ $t('common.weAreHereToHelpYou') }}</p>

        <div class="grid md:grid-cols-2 gap-6">
          <!-- Contact Info -->
          <div>
            <h3 class="font-semibold mb-2">{{ $t('common.waysToReachUs') }}</h3>
            <ul class="space-y-2 text-gray-700">
              <li>
                <font-awesome-icon :icon="['fas', 'location-dot']" /> {{ $t('common.address') }}
              </li>
              <li>
                <font-awesome-icon :icon="['fas', 'phone']" /> {{ $t('common.phoneNumber') }}
              </li>
              <li>
                <font-awesome-icon :icon="['fas', 'envelope']" />karakib@gmail.com
              </li>
            </ul>
          </div>

          <!-- Social Media -->
          <div>
            <h3 class="font-semibold mb-2">{{ $t('common.connectWithUsOnSocialMedia') }}</h3>
            <ul class="space-y-2 text-gray-700">
              <li><font-awesome-icon :icon="['fab', 'twitter']" /> @karakib</li>
              <li><font-awesome-icon :icon="['fab', 'facebook']" /> @Karakib</li>
              <li><font-awesome-icon :icon="['fab', 'instagram']" /> @Karakib</li>
            </ul>
          </div>
        </div>
      </section>
    </section>
    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
      @click.self="closeModal">
      <div class="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full text-center relative animate-fadeIn">
        <button @click="closeModal" class="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl">
          ✕
        </button>

        <h2 class="text-2xl font-semibold text-[#2C702C] mb-4">More About Us</h2>
        <p class="text-[#163816] leading-relaxed mb-6">{{ modalContent }}</p>

        <button @click="closeModal"
          class="bg-[#2C702C] hover:bg-[#265C26] text-white px-6 py-2 rounded-md font-medium transition">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutUs",

  data() {
    return {
      openFaq: null,
      faqs: [
        { question: this.$t('common.howDoesKarakibWork'), answer: this.$t('common.youCanRecycleBySubmittingWaste') },
        { question: this.$t('common.whatTypeOfWasteCanIRecycle'), answer: this.$t('common.weCurrentlyAcceptPlasticMetalsPaper') },
        { question: this.$t('common.howCanITrackMyEarnings'), answer: this.$t('common.youCanViewYourEarningsAndHistory') },
        { question: this.$t('common.howDoIRedeemMyPoints'), answer: this.$t('common.youCanRedeemYourCollectedPoints') }
      ],
      form: {
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      },
      showModal: false,
      modalContent: '',
    }
  },

  methods: {
    toggleFaq(index) {
      this.openFaq = this.openFaq === index ? null : index;
    },

    submitForm() {
      alert(`Thanks, ${this.form.firstName}! Your message has been sent.`);
      this.form = {
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      };
    },
    openModal(content) {
      this.modalContent = content
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
  }
};
</script>


<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}
</style>
