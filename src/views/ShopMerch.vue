<template>
  <!-- head shop section -->
  <div class="relative px-8 pb-6">
    <!-- Gradient overlay at the TOP only -->
    <!-- Custom layered gradient overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-[#E9EBF8]/[0.9] via-[#E9EBF8]/[0.8] to-transparent"
      style="
        background: linear-gradient(
          to bottom,
          rgba(233, 235, 248, 0.8) 0%,
          rgba(233, 235, 248, 0.75) 50%,
          rgba(233, 235, 248, 0.7) 95%,
          rgba(233, 235, 248, 0) 100%
        );
      "
    ></div>

    <!-- Background image -->
    <img
      src="/images/Shop Page Background.png"
      alt="Background"
      class="absolute inset-0 w-3xl h-lg object-cover -z-10 mx-auto"
    />

    <!-- content -->
    <div
      class="relative flex flex-col lg:flex-row items-center justify-between text-center lg:text-left gap-8 px-10 py-16 pb-20 z-10"
    >
      <!-- Logo -->
      <img
        src="/logos/K.png"
        alt="Karakib Logo"
        class="w-48 lg:w-60 drop-shadow-lg flex-shrink-0"
      />

      <!-- Text -->
      <div class="text-[#2C702C] max-w-2xl flex-grow lg:max-w-6xl">
        <p class="text-xl lg:text-2xl font-bold leading-relaxed">
          Support Karakib’s mission by buying eco-friendly merchandise. <br />
          Every purchase funds our recycling and community projects.
        </p>
      </div>
    </div>

    <!-- links -->
    <div class="px-16 relative z-20 flex flex-wrap gap-4">
      <a
        class="rounded-md cursor-pointer bg-white text-[#112B11] px-4 py-3 font-semibold text-xl shadow-sm hover:bg-white"
      >
        View all
      </a>
      <a
        class="rounded-md cursor-pointer text-[#112B11] px-4 py-3 font-semibold text-xl shadow-sm bg-white/60 hover:bg-white"
      >
        T-Shirts
      </a>
      <a
        class="rounded-md cursor-pointer text-[#112B11] px-4 py-3 font-semibold text-xl shadow-sm bg-white/60 hover:bg-white"
      >
        Mugs
      </a>
      <a
        class="rounded-md cursor-pointer text-[#112B11] px-4 py-3 font-semibold text-xl shadow-sm bg-white/60 hover:bg-white"
      >
        Tote Bags
      </a>
    </div>
  </div>
  <!-- all merch sec -->
  <p>merch cards</p>
</template>

<script>
export default {};
</script>

<style scoped></style>
