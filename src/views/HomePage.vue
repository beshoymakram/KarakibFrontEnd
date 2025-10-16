<template>
  <main>
  <!-- hero section  -->
  <div
    class="hero min-h-[calc(100vh-80px)] w-[85vw] bg-cover bg-center bg-no-repeat items-start mx-auto"
    style="background-image: url('/images/delivery-service-truck-isolated.png')"
  >
    <div class="hero-overlay bg-white/30"></div>
    <div class="hero-content text-center items-start justify-start pt-14">
      <div class="max-w-3xl">
        <h1 class="text-4xl text-[#2C702C] font-bold drop-shadow-lg">
          Turn Your Waste Into Worth
        </h1>
        <p class="py-6 text-md font-medium text-[#439a43]">
          Karakib makes it easy to collect waste, earn points, and turn your actions into real
          rewards — because sustainability should pay off.
        </p>
        <button
          class="btn rounded-md cursor-pointer bg-[#2C702C] px-3 py-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C702C] hover:bg-[#265C26]"
        >
          Get Started
        </button>
      </div>
    </div>
  </div>

  <!-- Steps Section -->
  <section class="px-16 py-12 bg-base-200">
    <div class="flex flex-wrap justify-between gap-8">
      <!-- Step 1 -->
      <div class="card bg-base-100 shadow-sm w-[290px] rounded-[50px]">
        <figure class="p-4">
          <img
            src="/images/step-1.png"
            alt="step-1"
            class="w-[290px] h-[271px] object-cover rounded-[50px]"
          />
        </figure>
        <div class="card-body text-center">
          <h2 class="font-semibold text-[#317C31]">Step 1</h2>
          <p class="card-title">Create Account</p>
          <p>Sign up to become a member of our recycling community.</p>
        </div>
      </div>

      <!-- Step 2 -->
      <div class="card bg-base-100 shadow-sm w-[290px] rounded-[50px]">
        <figure class="p-4">
          <img
            src="/images/step-2.png"
            alt="step-2"
            class="w-[290px] h-[271px] object-cover rounded-[50px]"
          />
        </figure>
        <div class="card-body text-center">
          <h2 class="font-semibold text-[#317C31]">Step 2</h2>
          <p class="card-title">Collect Waste</p>
          <p>Sort and store your recyclables to prepare them for pickup.</p>
        </div>
      </div>

      <!-- Step 3 -->
      <div class="card bg-base-100 shadow-sm w-[290px] rounded-[50px]">
        <figure class="p-4">
          <img
            src="/images/step-3.png"
            alt="step-3"
            class="w-[290px] h-[271px] object-cover rounded-[50px]"
          />
        </figure>
        <div class="card-body text-center">
          <h2 class="font-semibold text-[#317C31]">Step 3</h2>
          <p class="card-title">Request Pickup</p>
          <p>Schedule a collection through the app for convenient service.</p>
        </div>
      </div>

      <!-- Step 4 -->
      <div class="card bg-base-100 shadow-sm w-[290px] rounded-[50px]">
        <figure class="p-4">
          <img
            src="/images/step-4.png"
            alt="step-4"
            class="w-[290px] h-[271px] object-cover rounded-[50px]"
          />
        </figure>
        <div class="card-body text-center">
          <h2 class="font-semibold text-[#317C31]">Step 4</h2>
          <p class="card-title">Earn Rewards</p>
          <p>Get rewarded for your effort with points and exclusive benefits.</p>
        </div>
      </div>
    </div>
  </section>
  </main>
</template>

<script>
export default {
  name: "homePage",
};
</script>

<style scoped></style>
