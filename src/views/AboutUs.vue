<template>
  <div class="flex flex-col min-h-screen">
    <!-- Hero Section -->
    <section
      class="relative bg-[#E9EBF8] flex items-center justify-center text-center py-20 px-6"
      style="background-image: url('/images/abouthero.png'); background-size: cover; background-position: center;"
    >
      <div class="absolute inset-0 bg-white/70"></div>
      <div class="relative z-10 max-w-3xl mx-auto">
        <h1 class="text-5xl font-bold text-[#2C702C] mb-4 drop-shadow-lg">About Us</h1>
        <p class="text-[#265C26] text-lg font-medium leading-relaxed">
          Karakib is an eco-friendly platform that rewards recycling and supports a sustainable future.
          Join our mission to keep Egypt clean and green.
        </p>
        <button
          class="mt-6 bg-[#2C702C] hover:bg-[#265C26] text-white font-semibold px-6 py-3 rounded-md text-lg transition"
        >
          Learn More
        </button>
      </div>
    </section>

    <section class="flex-1 bg-[#BFD6BF] py-20 px-6 md:px-16">
      <h2 class="text-3xl md:text-4xl text-[#2C702C] font-semibold text-center mb-14">
        Working Together for a Cleaner Future
      </h2>

      <div class="space-y-16">
        <div class="flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto">
          <div class="md:w-1/2 text-left">
            <h3 class="text-2xl font-semibold text-[#2C702C] mb-3">
              Making Recycling Easy and Rewarding
            </h3>
            <p class="text-[#163816] mb-5">
              Karakib simplifies the recycling process by allowing users to collect, schedule pickups, and
              earn points effortlessly. We believe sustainability should be accessible and rewarding for everyone.
            </p>
            <button
              class="bg-[#2C702C] hover:bg-[#265C26] text-white font-semibold px-5 py-2 rounded-md text-sm"
            >
              Learn More
            </button>
          </div>
          <div class="md:w-1/2 flex justify-center">
            <img
              src="/images/about1.png"
              alt="Making Recycling Easy"
              class="rounded-full w-[280px] h-[280px] object-cover bg-[#EAF2EA] p-4"
            />
          </div>
        </div>

        <div class="flex flex-col md:flex-row-reverse items-center gap-10 max-w-6xl mx-auto">
          <div class="md:w-1/2 text-left">
            <h3 class="text-2xl font-semibold text-[#2C702C] mb-3">
              Supporting a Greener Community
            </h3>
            <p class="text-[#163816] mb-5">
              Our goal is to build a network of individuals and organizations working together toward
              a greener, more sustainable Egypt. Recycling isn’t just a habit — it’s a lifestyle.
            </p>
            <button
              class="bg-[#2C702C] hover:bg-[#265C26] text-white font-semibold px-5 py-2 rounded-md text-sm"
            >
              Learn More
            </button>
          </div>
          <div class="md:w-1/2 flex justify-center">
            <img
              src="/images/about2.png"
              alt="Supporting a Greener Community"
              class="rounded-full w-[280px] h-[280px] object-cover bg-[#EAF2EA] p-4"
            />
          </div>
        </div>

        <div class="flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto">
          <div class="md:w-1/2 text-left">
            <h3 class="text-2xl font-semibold text-[#2C702C] mb-3">
              Innovation with a Purpose
            </h3>
            <p class="text-[#163816] mb-5">
              Karakib combines technology and environmental care to make recycling smarter.
              We continuously improve our platform to create a positive impact for both users and the planet.
            </p>
            <button
              class="bg-[#2C702C] hover:bg-[#265C26] text-white font-semibold px-5 py-2 rounded-md text-sm"
            >
              Learn More
            </button>
          </div>
          <div class="md:w-1/2 flex justify-center">
            <img
              src="/images/about3.png"
              alt="Innovation with a Purpose"
              class="rounded-full w-[280px] h-[280px] object-cover bg-[#EAF2EA] p-4"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "AboutUs",
};
</script>

<style scoped>

</style>
