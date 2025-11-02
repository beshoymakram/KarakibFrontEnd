<template>
  <div class="flex flex-col min-h-screen bg-base-100 transition-colors duration-300">
    <!-- Hero Section -->
    <section
      class="relative flex flex-col items-center justify-center text-center  p-12  md:py-20 px-4 sm:px-6 md:px-10 overflow-hidden mt-0 bg-base-100"
      style="background-image: url('/images/abouthero.jpg'); background-size: cover; background-position: center;"
    >
      <div class="absolute inset-0 bg-base-100/80 dark:bg-base-300/50"></div>

      <!-- Doodles in Hero Section -->
      <div
        class="absolute top-4 left-4 sm:top-6 sm:left-6 w-12 h-12 sm:w-16 sm:h-16 opacity-80"
      >
        <svg
          class="w-full h-full"
          viewBox="0 0 64 89"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M38.867 35.3236C45.6849 32.0732 52.5028 28.8228 59.3207 25.557..."
            fill="#317C31"
          />
        </svg>
      </div>

      <div
        class="absolute bottom-6 right-4 sm:bottom-10 sm:right-8 w-14 h-14 sm:w-20 sm:h-20 opacity-70"
      >
        <svg
          class="w-full h-full"
          viewBox="0 0 36 39"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.5527 38.5507C7.5822 30.5169 3.39558 22.8178 0.100306 14.6622..."
            fill="#317C31"
          />
        </svg>
      </div>

      <!-- Content -->
      <div class="relative z-10 max-w-3xl mx-auto px-2 sm:px-0">
        <h1
          class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-3 sm:mb-4 drop-shadow-lg"
        >
          {{ $t("common.aboutUs") }}
        </h1>
        <p
          class=" text-sm sm:text-base md:text-lg  font-normal leading-relaxed px-2 text-secondary"
        >
          {{ $t("common.karakibIsEcoFriendlyPlatform") }}
        </p>
<button
  class="mt-6 bg-[#2C702C] hover:bg-[#265C26] text-white font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-md text-sm sm:text-base transition cursor-pointer"
  @click="openModal($t('common.moreAboutUs'), $t('common.aboutUsDescription'))"
>
  {{ $t('common.learnMore') }}
</button>

      </div>
    </section>

    <section
      class="flex-1 bg-dark px-6 md:px-12 lg:px-16 py-6 md:py-12 lg:py-16 relative overflow-hidden"
    >
      <!-- Background Doodles -->
      <div class="absolute top-5 right-5 w-32 h-12 opacity-35">
        <svg
          width="285"
          height="45"
          viewBox="0 0 285 45"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M181.39 1.69834C161.194 2.38679 141.01 3.54149 120.86 5.16244C102.574 5.51942 84.2852 5.87639 65.9997 6.23336C45.9352 6.62676 25.8707 7.01652 5.80955 7.40992C3.86857 7.44635 0.862866 9.0163 0.565271 11.3876C0.237917 14.003 3.17418 14.4401 4.82749 14.411C17.8654 14.156 30.9034 13.901 43.9413 13.646C38.5152 14.4073 33.0957 15.1978 27.6761 16.0246C25.798 16.3124 23.1758 17.2813 22.5773 19.5434C22.0417 21.5614 23.7148 22.9929 25.4905 23.0293C55.6004 23.5976 85.7137 24.1695 115.824 24.7377C122.232 24.8579 128.64 24.9818 135.048 25.102C125.829 26.213 116.624 27.4915 107.445 28.9376C93.051 31.2106 78.7169 33.9061 64.4456 36.9768C62.9047 37.3083 60.719 38.7945 60.4843 40.6995C60.2561 42.5208 62.078 43.712 63.5396 43.7265C97.7828 44.0544 132.026 44.3858 166.269 44.7137C175.924 44.8047 185.576 44.8994 195.232 44.9905C197.444 45.0124 200.281 44.3166 201.395 41.9235C202.391 39.7816 200.526 38.0004 198.624 37.9822C165.661 37.6653 132.697 37.3484 99.7337 37.0315C100.653 36.8785 101.569 36.7218 102.488 36.5725C114.944 34.5399 127.443 32.817 139.968 31.4073C165.033 28.5879 190.209 27.018 215.402 26.7084C216.516 26.6938 217.644 26.6865 218.768 26.6792C231.538 26.9196 244.305 27.1637 257.075 27.4041C259.284 27.4442 262.131 26.7156 263.239 24.337C264.257 22.1515 262.353 20.4795 260.468 20.3958C247.436 19.8202 234.392 19.5725 221.351 19.6563C204.279 19.3321 187.207 19.0116 170.135 18.6874C140.025 18.1191 109.911 17.5472 79.8015 16.979C77.3744 16.9316 74.944 16.8879 72.517 16.8406C88.2829 14.9938 104.075 13.4311 119.887 12.1599C152.851 11.5151 185.818 10.874 218.781 10.2293C238.846 9.83589 258.91 9.44613 278.971 9.05273C280.813 9.0163 283.518 7.62483 284.07 5.53399C284.613 3.49049 282.926 2.12088 281.157 2.04803C247.916 0.6857 214.635 0.565495 181.39 1.69834Z"
            fill="#317C31"
          />
        </svg>
      </div>
      <div class="absolute bottom-10 left-5 w-16 h-16 opacity-35">
        <svg
          width="36"
          height="39"
          viewBox="0 0 36 39"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.5527 38.5507C7.5822 30.5169 3.39558 22.8178 0.100306 14.6622C-0.520934 13.1254 1.86949 8.57598 3.80073 7.46524C9.1353 4.37647 14.902 2.07891 20.6552 0.100886C22.0868 -0.386014 24.9364 0.968175 25.8277 2.47452C28.9204 7.70869 31.4189 13.3841 34.174 18.8769C36.2133 22.9395 35.7541 26.0283 31.7025 28.0824C25.2605 31.3385 18.8591 34.7468 11.5527 38.5507ZM13.5785 32.7232C19.4668 29.041 24.5853 25.8457 29.5957 22.7265C22.9511 5.45678 18.2918 3.96565 5.20528 14.434C7.79828 20.079 10.4183 25.8153 13.5785 32.7232Z"
            fill="#317C31"
          />
        </svg>
      </div>

      <h2
        class=" text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-center mb-14 relative z-10 text-primary"
      >
        {{ $t("common.workingTogetherForCleanerFuture") }}
      </h2>

      <div class="space-y-16 relative z-10">
        <!-- Section 1 -->
        <div
          class="flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left"
        >
          <div class="md:w-1/2 w-full relative">
            <!-- Doodle for section 1 -->
            <div
              class="absolute -top-25 -left-6 w-10 h-10 opacity-50 hidden sm:block"
            >
              <svg
                width="64"
                height="89"
                viewBox="0 0 64 89"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M38.867 35.3236C45.6849 32.0732 52.5028 28.8228 59.3207 25.557C59.7153 26.5229 60.1236 27.4735 60.5183 28.4394C54.2175 36.4735 43.0312 35.4002 35.7778 44.0168C45.3311 50.3183 54.5985 56.4205 63.866 62.538C63.5258 63.2893 63.1719 64.0405 62.8317 64.7765C52.7614 62.9213 45.1133 54.7033 34.5803 49.0611C37.3292 62.63 39.7651 74.727 42.2147 86.824C41.6703 87.4066 41.1124 87.9893 40.5681 88.5565C38.9895 86.7934 36.431 85.2755 35.9956 83.2057C34.3897 75.6316 33.5188 67.8582 32.3076 60.1769C31.9266 57.7851 31.3414 55.4392 30.8515 53.0781C30.1711 52.9095 29.4907 52.7408 28.8102 52.5721C25.4489 62.446 22.0876 72.3352 18.6582 82.4544C14.6028 77.9007 16.2495 70.986 26.279 48.8924C17.2837 51.9742 9.09137 54.7953 0.885381 57.6164C0.640427 56.8651 0.409081 56.0985 0.177734 55.3473C8.86002 51.3302 17.5559 47.3132 27.8984 42.5296C20.6723 36.9488 14.6165 32.2571 8.56063 27.5809C8.90085 26.9369 9.24106 26.293 9.58127 25.649C15.3921 28.9914 21.203 32.3338 27.8848 36.1822C26.4015 23.9625 24.9998 12.4634 23.6117 0.949025C24.4555 0.780372 25.3128 0.611719 26.1565 0.427734C28.0618 11.0682 29.9533 21.7087 31.8586 32.3491C32.3212 32.6251 32.7703 32.8858 33.233 33.1617C37.2884 23.9012 41.3437 14.6406 45.4127 5.36467C46.1612 5.7633 46.9097 6.1466 47.6581 6.54524C44.324 15.6525 40.9899 24.7597 37.6558 33.867C37.5606 34.465 37.4653 35.0476 37.37 35.6302C37.8599 35.5229 38.3635 35.4155 38.867 35.3236Z"
                  fill="#317C31"
                />
              </svg>
            </div>

            <h3 class="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-3 leading-snug text-primary">
              {{ $t("common.makingRecyclingEasyAndRewarding") }}
            </h3>
            <p class="mb-5 text-sm sm:text-base md:text-lg lg:text-lg leading-relaxed text-secondary font-light">
              {{ $t("common.karakibSimplifiesRecyclingProcess") }}
            </p>
            <button
  class="text-xs sm:text-sm md:text-base  bg-[#2C702C] hover:bg-[#265C26] text-white   px-5 py-2 rounded-md  cursor-pointer font-semibold"
  @click="openModal($t('common.makingRecyclingEasyAndRewarding'), $t('common.recyclingPopup'))"
>
  {{ $t("common.learnMore") }}
</button>
          </div>

          <div
            class="md:w-1/2 w-full flex justify-center relative mt-8 md:mt-0"
          >
            <!-- Doodle for image 1 -->
            <div
              class="absolute -top-3 -right-3 w-8 h-8 opacity-60 hidden sm:block"
            >
              <svg
                width="36"
                height="39"
                viewBox="0 0 36 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5527 38.5507C7.5822 30.5169 3.39558 22.8178 0.100306 14.6622C-0.520934 13.1254 1.86949 8.57598 3.80073 7.46524C9.1353 4.37647 14.902 2.07891 20.6552 0.100886C22.0868 -0.386014 24.9364 0.968175 25.8277 2.47452C28.9204 7.70869 31.4189 13.3841 34.174 18.8769C36.2133 22.9395 35.7541 26.0283 31.7025 28.0824C25.2605 31.3385 18.8591 34.7468 11.5527 38.5507ZM13.5785 32.7232C19.4668 29.041 24.5853 25.8457 29.5957 22.7265C22.9511 5.45678 18.2918 3.96565 5.20528 14.434C7.79828 20.079 10.4183 25.8153 13.5785 32.7232Z"
                  fill="#317C31"
                />
              </svg>
            </div>

            <img
              src="/images/about1.png"
              alt="Making Recycling Easy"
              class="rounded-full w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 object-cover p-4 bg-base-100"
            />
          </div>
        </div>

        <!-- Section 2 -->
        <div
          class="flex flex-col md:flex-row-reverse items-center gap-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left"
        >
          <div class="md:w-1/2 w-full relative">
            <!-- Doodle for section 2 -->
            <div
              class="absolute -top-4 -right-4 w-10 h-10 opacity-50 hidden sm:block"
            >
              <svg
                width="64"
                height="89"
                viewBox="0 0 64 89"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M38.867 35.3236C45.6849 32.0732 52.5028 28.8228 59.3207 25.557C59.7153 26.5229 60.1236 27.4735 60.5183 28.4394C54.2175 36.4735 43.0312 35.4002 35.7778 44.0168C45.3311 50.3183 54.5985 56.4205 63.866 62.538C63.5258 63.2893 63.1719 64.0405 62.8317 64.7765C52.7614 62.9213 45.1133 54.7033 34.5803 49.0611C37.3292 62.63 39.7651 74.727 42.2147 86.824C41.6703 87.4066 41.1124 87.9893 40.5681 88.5565C38.9895 86.7934 36.431 85.2755 35.9956 83.2057C34.3897 75.6316 33.5188 67.8582 32.3076 60.1769C31.9266 57.7851 31.3414 55.4392 30.8515 53.0781C30.1711 52.9095 29.4907 52.7408 28.8102 52.5721C25.4489 62.446 22.0876 72.3352 18.6582 82.4544C14.6028 77.9007 16.2495 70.986 26.279 48.8924C17.2837 51.9742 9.09137 54.7953 0.885381 57.6164C0.640427 56.8651 0.409081 56.0985 0.177734 55.3473C8.86002 51.3302 17.5559 47.3132 27.8984 42.5296C20.6723 36.9488 14.6165 32.2571 8.56063 27.5809C8.90085 26.9369 9.24106 26.293 9.58127 25.649C15.3921 28.9914 21.203 32.3338 27.8848 36.1822C26.4015 23.9625 24.9998 12.4634 23.6117 0.949025C24.4555 0.780372 25.3128 0.611719 26.1565 0.427734C28.0618 11.0682 29.9533 21.7087 31.8586 32.3491C32.3212 32.6251 32.7703 32.8858 33.233 33.1617C37.2884 23.9012 41.3437 14.6406 45.4127 5.36467C46.1612 5.7633 46.9097 6.1466 47.6581 6.54524C44.324 15.6525 40.9899 24.7597 37.6558 33.867C37.5606 34.465 37.4653 35.0476 37.37 35.6302C37.8599 35.5229 38.3635 35.4155 38.867 35.3236Z"
                  fill="#317C31"
                />
              </svg>
            </div>

            <h3 class="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-3 leading-snug text-primary">
              {{ $t("common.supportingGreenerCommunity") }}
            </h3>
            <p class="mb-5 text-sm sm:text-base md:text-lg lg:text-lg leading-relaxed text-secondary font-light">
              {{ $t("common.ourGoalIsToBuildNetwork") }}
            </p>
            <button
            class="text-xs sm:text-sm md:text-base  bg-[#2C702C] hover:bg-[#265C26] text-white font-semibold px-5 py-2 rounded-md cursor-pointer"
            @click="openModal($t('common.supportingGreenerCommunity'), $t('common.supportingGreenerCommunityDescription'))"
            >
            {{ $t('common.learnMore') }}
            </button>

          </div>

          <div
            class="md:w-1/2 w-full flex justify-center relative mt-8 md:mt-0"
          >
            <!-- Doodle for image 2 -->
            <div
              class="absolute -bottom-3 -left-3 w-8 h-8 opacity-60 hidden sm:block"
            >
              <svg
                width="36"
                height="39"
                viewBox="0 0 36 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5527 38.5507C7.5822 30.5169 3.39558 22.8178 0.100306 14.6622C-0.520934 13.1254 1.86949 8.57598 3.80073 7.46524C9.1353 4.37647 14.902 2.07891 20.6552 0.100886C22.0868 -0.386014 24.9364 0.968175 25.8277 2.47452C28.9204 7.70869 31.4189 13.3841 34.174 18.8769C36.2133 22.9395 35.7541 26.0283 31.7025 28.0824C25.2605 31.3385 18.8591 34.7468 11.5527 38.5507ZM13.5785 32.7232C19.4668 29.041 24.5853 25.8457 29.5957 22.7265C22.9511 5.45678 18.2918 3.96565 5.20528 14.434C7.79828 20.079 10.4183 25.8153 13.5785 32.7232Z"
                  fill="#317C31"
                />
              </svg>
            </div>

            <img
              src="/images/about2.png"
              alt="Supporting a Greener Community"
              class="rounded-full w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 object-cover p-4 bg-base-100"
            />
          </div>
        </div>

        <!-- Section 3 -->
        <div
          class="flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left"
        >
          <div class="md:w-1/2 relative">
            <!-- Doodle for section 3 -->
            <div
              class="absolute -bottom-10 right-0 w-10 h-10 md:w-12 md:h-12 opacity-50"
            >
              <svg
                width="64"
                height="89"
                viewBox="0 0 64 89"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M38.867 35.3236C45.6849 32.0732 52.5028 28.8228 59.3207 25.557C59.7153 26.5229 60.1236 27.4735 60.5183 28.4394C54.2175 36.4735 43.0312 35.4002 35.7778 44.0168C45.3311 50.3183 54.5985 56.4205 63.866 62.538C63.5258 63.2893 63.1719 64.0405 62.8317 64.7765C52.7614 62.9213 45.1133 54.7033 34.5803 49.0611C37.3292 62.63 39.7651 74.727 42.2147 86.824C41.6703 87.4066 41.1124 87.9893 40.5681 88.5565C38.9895 86.7934 36.431 85.2755 35.9956 83.2057C34.3897 75.6316 33.5188 67.8582 32.3076 60.1769C31.9266 57.7851 31.3414 55.4392 30.8515 53.0781C30.1711 52.9095 29.4907 52.7408 28.8102 52.5721C25.4489 62.446 22.0876 72.3352 18.6582 82.4544C14.6028 77.9007 16.2495 70.986 26.279 48.8924C17.2837 51.9742 9.09137 54.7953 0.885381 57.6164C0.640427 56.8651 0.409081 56.0985 0.177734 55.3473C8.86002 51.3302 17.5559 47.3132 27.8984 42.5296C20.6723 36.9488 14.6165 32.2571 8.56063 27.5809C8.90085 26.9369 9.24106 26.293 9.58127 25.649C15.3921 28.9914 21.203 32.3338 27.8848 36.1822C26.4015 23.9625 24.9998 12.4634 23.6117 0.949025C24.4555 0.780372 25.3128 0.611719 26.1565 0.427734C28.0618 11.0682 29.9533 21.7087 31.8586 32.3491C32.3212 32.6251 32.7703 32.8858 33.233 33.1617C37.2884 23.9012 41.3437 14.6406 45.4127 5.36467C46.1612 5.7633 46.9097 6.1466 47.6581 6.54524C44.324 15.6525 40.9899 24.7597 37.6558 33.867C37.5606 34.465 37.4653 35.0476 37.37 35.6302C37.8599 35.5229 38.3635 35.4155 38.867 35.3236Z"
                  fill="#317C31"
                />
              </svg>
            </div>

            <h3 class="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-3 text-primary">
              {{ $t("common.innovationWithPurpose") }}
            </h3>
            <p class=" mb-5 text-sm sm:text-base md:text-lg lg:text-lg leading-relaxed text-secondary font-light">
              {{ $t("common.karakibCombinesTechnologyAndEnvironmentalCare") }}
            </p>
            <button
            class= "text-xs sm:text-sm md:text-base  bg-[#2C702C] hover:bg-[#265C26] text-white font-semibold px-5 py-2 rounded-md  cursor-pointer"
            @click="openModal($t('common.innovationWithPurpose'), $t('common.innovationWithPurposeDescription'))"
            >
            {{ $t('common.learnMore') }}
          </button>

          </div>

          <div class="md:w-1/2 flex justify-center mt-8 md:mt-0 relative">
            <!-- Doodle for image 3 -->
            <div
              class="absolute -top-3 -right-3 w-8 h-8 md:w-10 md:h-10 opacity-60"
            >
              <svg
                width="36"
                height="39"
                viewBox="0 0 36 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5527 38.5507C7.5822 30.5169 3.39558 22.8178 0.100306 14.6622C-0.520934 13.1254 1.86949 8.57598 3.80073 7.46524C9.1353 4.37647 14.902 2.07891 20.6552 0.100886C22.0868 -0.386014 24.9364 0.968175 25.8277 2.47452C28.9204 7.70869 31.4189 13.3841 34.174 18.8769C36.2133 22.9395 35.7541 26.0283 31.7025 28.0824C25.2605 31.3385 18.8591 34.7468 11.5527 38.5507ZM13.5785 32.7232C19.4668 29.041 24.5853 25.8457 29.5957 22.7265C22.9511 5.45678 18.2918 3.96565 5.20528 14.434C7.79828 20.079 10.4183 25.8153 13.5785 32.7232Z"
                  fill="#317C31"
                />
              </svg>
            </div>

            <img
              src="/images/about3.png"
              alt="Innovation with a Purpose"
              class="rounded-full w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 object-cover p-4 bg-base-100"
            />
          </div>
        </div>
      </div>
    </section>
    <section class="w-full mx-auto bg-dark shadow p-4 sm:p-6 md:p-8">
      <!-- FAQs -->
      <section
        class="max-w-6xl mx-auto my-6 sm:my-8 bg-primary rounded-2xl shadow p-4 sm:p-6 md:p-8 text-section"
        id="Faq"
      >
        <h2
          class="text-xl sm:text-2xl md:3xl font-semibold mb-4 sm:mb-6 text-center sm:text-left"
        >
          {{ $t("common.frequentlyAskedQuestions") }}
        </h2>

        <div class="grid grid-cols-1  gap-0">
          <div class="space-y-3 sm:space-y-4">
            <button
              v-for="(faq, index) in faqs"
              :key="index"
              @click="toggleFaq(index)"
              class="w-full flex justify-between items-center bg-faq bg-dark px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-left text-section hover:bg-green-50 transition">
              <span class="font-normal text-xs sm:text-sm md:text-base">{{ faq.question }}</span>
              <svg
                :class="{ 'rotate-180': openFaq === index }"
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3 md:h-4 md:w-4 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          <div
            class="bg-green-50 border border-green-100 rounded-lg p-4 sm:p-6 text-gray-700"
            v-if="openFaq !== null"
          >
            <p class="text-xs sm:text-sm md:text-base font-light">{{ faqs[openFaq].answer }}</p>
          </div>
        </div>
      </section>

<!-- Terms and Conditions -->
<section
  class="max-w-6xl mx-auto my-6 sm:my-8 bg-primary rounded-2xl shadow p-4 sm:p-6 md:p-8 text-section"
  id="terms"
>
  <h2
    class="text-xl sm:text-2xl md:3xl font-semibold mb-3 sm:mb-4 text-center sm:text-left text-section"
  >
    {{ $t("common.termsAndConditions") }}
  </h2>

  <p
    class="text-gray-600 mb-3 sm:mb-4 flex items-start text-sm sm:text-base md:text-lg text-section"
  >
    <span class="text-green-600 mr-2 text-lg sm:text-xl">
      <font-awesome-icon :icon="['fas', 'triangle-exclamation']" />
    </span>
    {{ $t("common.pleaseReadCarefullyBeforeUsingKarakib") }}
  </p>

  <ul
    class="list-disc list-inside space-y-1 sm:space-y-2 text-gray-700 text-xs sm:text-sm md:text-base text-section"
  >
    <li>{{ $t("common.byUsingKarakibYouAgree") }}</li>
    <li>{{ $t("common.usersAreAlsoResponsible") }}</li>
    <li>{{ $t("common.karakibWillNotBeHeldResponsible") }}</li>
    <li>{{ $t("common.anyMisuseOfPlatform") }}</li>
    <li>{{ $t("common.weMayUpdateTheseTerms") }}</li>
  </ul>

  <div class="mt-5 sm:mt-6 flex justify-center sm:justify-start">
    <button
      class="px-4 sm:px-5 py-2 bg-green-600 text-white  font-semibold rounded-lg hover:bg-green-700 transition text-xs sm:text-sm md:text-base "
      @click="openTermsModal"
    >
      {{ $t("common.readFullPolicy") }}
    </button>
  </div>
</section>


      <!-- Inquiry Form -->
      <section
        class="max-w-6xl mx-auto my-6 sm:my-8 rounded-2xl shadow p-4 sm:p-6 md:p-8 bg-primary text-section"
        id="inquiry"
      >
        <h2
          class="text-xl sm:text-2xl md:3xl font-semibold mb-3 sm:mb-4 text-center sm:text-left text-section"
        >
          {{ $t("common.sendAnInquiry") }}
        </h2>
        <p
          class="text-gray-600 mb-5 sm:mb-6 text-sm sm:text-base md:text-lg text-center sm:text-left text-section"
        >
          {{ $t("common.weAreHappyToAnswerQuestions") }}
        </p>

        <form
          @submit.prevent="submitForm"
          class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4"
        >
<div>
  <label class="block mb-1 font-medium text-sm md:text-base lg:text-lg">{{
    $t("common.firstName")
  }}</label>
  <input
    v-model="form.firstName"
    type="text"
    :placeholder="$t('common.enterFirstName')"
    class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm md:text-base lg:text-lg"
    :class="{ 'border-red-500': formErrors.firstName }"
  />
  <p v-if="formErrors.firstName" class="text-red-500 text-xs  md:text-sm mt-1">
    {{ formErrors.firstName }}
  </p>
</div>

<div>
  <label class="block mb-1 font-medium text-sm md:text-base lg:text-lg">{{
    $t("common.lastName")
  }}</label>
  <input
    v-model="form.lastName"
    type="text"
    :placeholder="$t('common.enterLastName')"
    class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm md:text-base lg:text-lg"
    :class="{ 'border-red-500': formErrors.lastName }"
  />
  <p v-if="formErrors.lastName" class="text-red-500 text-xs  md:text-sm mt-1">
    {{ formErrors.lastName }}
  </p>
</div>

<div>
  <label class="block mb-1 font-medium text-sm md:text-base lg:text-lg">{{
    $t("common.email")
  }}</label>
  <input
    v-model="form.email"
    type="email"
    :placeholder="$t('common.enterEmail')"
    class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm md:text-base lg:text-lg"
    :class="{ 'border-red-500': formErrors.email }"
  />
  <p v-if="formErrors.email" class="text-red-500 text-xs md:text-sm mt-1">
    {{ formErrors.email }}
  </p>
</div>

<div>
  <label class="block mb-1 font-medium text-sm md:text-base lg:text-lg">{{
    $t("common.subject")
  }}</label>
  <input
    v-model="form.subject"
    type="text"
    :placeholder="$t('common.enterSubject')"
    class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm md:text-base lg:text-lg"
    :class="{ 'border-red-500': formErrors.subject }"
  />
  <p v-if="formErrors.subject" class="text-red-500 text-xs  md:text-sm mt-1">
    {{ formErrors.subject }}
  </p>
</div>

<div class="md:col-span-2">
  <label class="block mb-1 font-medium text-sm md:text-base lg:text-lg">{{
    $t("common.message")
  }}</label>
  <textarea
    v-model="form.message"
    rows="4"
    :placeholder="$t('common.enterMessage')"
    class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm md:text-base lg:text-lg"
    :class="{ 'border-red-500': formErrors.message }"
  ></textarea>
  <p v-if="formErrors.message" class="text-red-500 text-xs  md:text-sm mt-1">
    {{ formErrors.message }}
  </p>
</div>

          <div class="md:col-span-2 flex justify-center mt-3 sm:mt-4">
            <button
              type="submit"
              class="px-5 sm:px-6 py-2 font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-xs sm:text-sm md:text-base "
            >
              {{ $t("common.sendMessage") }}
            </button>
          </div>
        </form>
      </section>

      <!-- Contact Us -->
      <section
        class="max-w-6xl mx-auto my-6 sm:my-8 rounded-2xl shadow p-4 sm:p-6 md:p-8 bg-primary text-section"
        id="contact"
      >
        <h2
          class="text-xl sm:text-2xl md:3xl font-semibold mb-3 sm:mb-4 text-center sm:text-left text-section"
        >
          {{ $t("common.contactUs") }}
        </h2>
        <p
          class="text-gray-600 mb-5 sm:mb-6 text-sm sm:text-base md:text-lg text-center sm:text-left text-section"
        >
          {{ $t("common.weAreHereToHelpYou") }}
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <!-- Contact Info -->
          <div>
            <h3
              class="font-semibold mb-2 text-base sm:text-lg text-center sm:text-left"
            >
              {{ $t("common.waysToReachUs") }}
            </h3>
            <ul
              class="space-y-1 sm:space-y-2 text-gray-700 text-sm sm:text-base text-center sm:text-left text-section"
            >
              <li>
                <font-awesome-icon :icon="['fas', 'location-dot']" />
                {{ $t("common.address") }}
              </li>
              <li>
                <font-awesome-icon :icon="['fas', 'phone']" />
                {{ $t("common.phoneNumber") }}
                <span v-if="contactPhone"> - {{ formattedContactPhone }}</span>
              </li>
              <li>
                <font-awesome-icon :icon="['fas', 'envelope']" />
                karakib@gmail.com
              </li>
            </ul>
          </div>

          <!-- Social Media -->
          <div>
            <h3
              class="font-semibold mb-2 text-base sm:text-lg text-center sm:text-left"
            >
              {{ $t("common.connectWithUsOnSocialMedia") }}
            </h3>
            <ul
              class="space-y-1 sm:space-y-2 text-gray-700 text-sm sm:text-base text-center sm:text-left text-section"
            >
              <li><font-awesome-icon :icon="['fab', 'twitter']" /> @karakib</li>
              <li>
                <font-awesome-icon :icon="['fab', 'facebook']" /> @Karakib
              </li>
              <li>
                <font-awesome-icon :icon="['fab', 'instagram']" /> @Karakib
              </li>
            </ul>
          </div>
        </div>
      </section>
    </section>

<!-- Modal -->
<div
  v-if="showModal"
  class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
  @click.self="closeModal"
>
  <div
    class="bg-white rounded-2xl shadow-lg p-8 w-full relative animate-fadeIn max-h-[90vh] overflow-y-auto"
    :class="[isTermsModal ? 'max-w-6xl' : 'max-w-lg']"
    :dir="isRTL ? 'rtl' : 'ltr'"
  >
    <button
      @click="closeModal"
      class="absolute top-3 text-gray-500 hover:text-gray-800 text-xl"
      :class="isRTL ? 'left-3' : 'right-3'"
    >
      ✕
    </button>

    <h2
      class="text-2xl font-semibold text-[#2C702C] mb-4"
      :class="isTermsModal ? (isRTL ? 'text-right' : 'text-left') : 'text-center'"
    >
      {{ modalTitle }}
    </h2>

    <!-- Terms Modal Content -->
    <div v-if="isTermsModal">
      <p class="text-gray-600 mb-4 flex items-start text-sm sm:text-base">
        <span class="text-green-600 text-lg sm:text-xl" :class="isRTL ? 'ml-2' : 'mr-2'">
          <font-awesome-icon :icon="['fas', 'triangle-exclamation']" />
        </span>
        {{ $t("common.pleaseReadCarefullyBeforeUsingKarakib") }}
      </p>

      <ul class="space-y-2 text-gray-700 text-sm sm:text-base" :class="isRTL ? 'list-disc list-inside' : 'list-disc list-inside'">
        <li>{{ $t("common.byUsingKarakibYouAgree") }}</li>
        <li>{{ $t("common.usersAreAlsoResponsible") }}</li>
        <li>{{ $t("common.karakibWillNotBeHeldResponsible") }}</li>
        <li>{{ $t("common.anyMisuseOfPlatform") }}</li>
        <li>{{ $t("common.weMayUpdateTheseTerms") }}</li>
        <li>{{ $t("common.usersMustProvideAccurateInformation") }}</li>
        <li>{{ $t("common.karakibReservesRightToModify") }}</li>
        <li>{{ $t("common.allTransactionsThroughPlatform") }}</li>
        <li>{{ $t("common.usersAreProhibitedFromSharing") }}</li>
        <li>{{ $t("common.privacyPolicyGovernsCollection") }}</li>
      </ul>
    </div>

    <!-- Regular Modal Content -->
    <p v-else class="text-[#163816] leading-relaxed mb-6" :class="isRTL ? 'text-right' : 'text-center'">
      {{ modalContent }}
    </p>

<div class="flex justify-center">
  <button
    @click="closeModal"
    class="bg-[#2C702C] hover:bg-[#265C26] text-white px-6 py-2 rounded-md font-medium transition mt-6"
  >
    {{ $t("common.close") }}
  </button>
</div>

  </div>
</div>
<!-- Success Modal -->
<div
  v-if="showSuccessModal"
  class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
  @click.self="closeSuccessModal"
>
  <div class="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center relative animate-fadeIn">
    <button
      @click="closeSuccessModal"
      class="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
    >
      ✕
    </button>

    <!-- Success Icon -->
    <div class="mb-4 flex justify-center">
      <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
        <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
    </div>

    <h2 class="text-2xl font-semibold text-[#2C702C] mb-3">
      {{ $t("common.messageSentSuccessfully") }}
    </h2>

    <p class="text-gray-600 mb-6">
      {{ $t("common.thankYouForContacting") }}
    </p>

    <button
      @click="closeSuccessModal"
      class="bg-[#2C702C] hover:bg-[#265C26] text-white px-8 py-3 rounded-lg font-medium transition"
    >
      {{ $t("common.close") }}
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
        {
          question: this.$t("common.howDoesKarakibWork"),
          answer: this.$t("common.youCanRecycleBySubmittingWaste"),
        },
        {
          question: this.$t("common.whatTypeOfWasteCanIRecycle"),
          answer: this.$t("common.weCurrentlyAcceptPlasticMetalsPaper"),
        },
        {
          question: this.$t("common.howCanITrackMyEarnings"),
          answer: this.$t("common.youCanViewYourEarningsAndHistory"),
        },
        {
          question: this.$t("common.howDoIRedeemMyPoints"),
          answer: this.$t("common.youCanRedeemYourCollectedPoints"),
        },
      ],
      form: {
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      },
      formErrors: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
      showModal: false,
      modalContent: "",
      modalTitle: "",
      isTermsModal: false,
      showSuccessModal: false,
    };
  },

  computed: {
    contactPhone() {
      // translation key that holds the raw phone number (no label)
      return this.$t("common.contactPhone") || "";
    },
    formattedContactPhone() {
      const phone = String(this.contactPhone || "");
      if (!phone) return "";
      // detect Arabic locale (vue-i18n v8/v9 compatibility)
      const locale =
        (this.$i18n &&
          (this.$i18n.locale ||
            (this.$i18n.global &&
              this.$i18n.global.locale &&
              this.$i18n.global.locale.value))) ||
        "";
      if (String(locale).toLowerCase().startsWith("ar")) {
        return this.toArabicDigits(phone);
      }
      return phone;
    },
  },

  methods: {
    toggleFaq(index) {
      this.openFaq = this.openFaq === index ? null : index;
    },

submitForm() {

  this.formErrors = {
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  };

  let isValid = true;

  // Validate First Name
  if (!this.form.firstName.trim()) {
    this.formErrors.firstName = this.$t("common.firstNameRequired");
    isValid = false;
  } else if (!/^[a-zA-Z\u0600-\u06FF\s]+$/.test(this.form.firstName)) {
    this.formErrors.firstName = this.$t("common.firstNameLettersOnly");
    isValid = false;
  }

  // Validate Last Name
  if (!this.form.lastName.trim()) {
    this.formErrors.lastName = this.$t("common.lastNameRequired");
    isValid = false;
  } else if (!/^[a-zA-Z\u0600-\u06FF\s]+$/.test(this.form.lastName)) {
    this.formErrors.lastName = this.$t("common.lastNameLettersOnly");
    isValid = false;
  }

  // Validate Email
  if (!this.form.email.trim()) {
    this.formErrors.email = this.$t("common.emailRequired");
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
    this.formErrors.email = this.$t("common.emailInvalid");
    isValid = false;
  }

  // Validate Subject
  if (!this.form.subject.trim()) {
    this.formErrors.subject = this.$t("common.subjectRequired");
    isValid = false;
  } else if (this.form.subject.trim().length < 3) {
    this.formErrors.subject = this.$t("common.subjectMinLength");
    isValid = false;
  }

  // Validate Message
  if (!this.form.message.trim()) {
    this.formErrors.message = this.$t("common.messageRequired");
    isValid = false;
  } else if (this.form.message.trim().length < 10) {
    this.formErrors.message = this.$t("common.messageMinLength");
    isValid = false;
  }

  if (isValid) {
    this.showSuccessModal = true;
    this.form = {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    };
  }
},
    openModal(title, content) {
      this.modalTitle = title;
      this.modalContent = content;
      this.isTermsModal = false;
      this.showModal = true;
    },
    openTermsModal() {
    this.modalTitle = this.$t("common.termsAndConditions");
    this.isTermsModal = true;
    this.showModal = true;
  },
    closeModal() {
      this.showModal = false;
      this.isTermsModal = false;
    },
    closeSuccessModal() {
  this.showSuccessModal = false;
},
    toArabicDigits(str) {
      const map = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
      return String(str).replace(/\d/g, (d) => map[Number(d)]);
    },
  },
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
.text-primary {
  color: #2c702c !important;
}

[data-theme="forest"] .text-primary {
  color: #16af3f !important;
}

.bg-primary {
  background-color: #ffffff !important;
}
[data-theme="forest"] .bg-primary {
  background-color: rgb(52, 68, 52)!important;
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
.bg-dark {
  background-color: #BFD6BF !important;
}
[data-theme="forest"] .bg-dark {
  background-color: #252625 !important;
}
.bg-faq {
  background-color: #f1f1f1
}
[data-theme="forest"] .bg-faq {
  background-color: #2c702c !important;
}
</style>
