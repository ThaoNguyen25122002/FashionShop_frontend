<template>
  <div :style="BannerImg" className="text-white">
    <div className="container">
      <div data-aos="zoom-in" className="grid md:grid-cols-3 pb-44 pt-5">
        <!-- {/* company details */} -->
        <div className="py-8 px-4">
          <h1
            className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3"
          >
            <img :src="footerLogo" alt="" className="max-w-[50px]" />
            Shopsy
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum in beatae ea recusandae
            blanditiis veritatis.
          </p>
        </div>

        <!-- {/* Footer Links */} -->
        <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10">
          <div>
            <div className="py-8 px-4">
              <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                Important Links
              </h1>
              <ul className="flex flex-col gap-3">
                <li
                  className="cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200"
                >
                  <span>Home</span>
                </li>
                <li
                  className="cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200"
                >
                  <span>About</span>
                </li>
                <li
                  className="cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200"
                >
                  <span>Contact</span>
                </li>
                <li
                  className="cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200"
                >
                  <span>Blog</span>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div className="py-8 px-4">
              <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">Links</h1>
              <ul className="flex flex-col gap-3">
                <li
                  className="cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200"
                >
                  <span>Home</span>
                </li>
                <li
                  className="cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200"
                >
                  <span>About</span>
                </li>
                <li
                  className="cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200"
                >
                  <span>Contact</span>
                </li>
                <li
                  className="cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200"
                >
                  <span>Blog</span>
                </li>
              </ul>
            </div>
          </div>
          <!-- // social links -->

          <div>
            <div className="flex items-center gap-3 mt-6">
              <a href="#">
                <i class="text-3xl fa-brands fa-instagram"></i>
              </a>
              <a href="#">
                <i class="text-3xl fa-brands fa-facebook"></i>
              </a>
              <a href="#">
                <i class="text-3xl fa-brands fa-linkedin"></i>
              </a>
            </div>
            <div className="mt-6">
              <div className="flex items-center gap-3">
                <i class="fa-solid fa-location-arrow"></i>
                <p>Noida, Uttar Pradesh</p>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <i class="fa-solid fa-mobile-screen-button"></i>
                <p>+91 123456789</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import footerLogo from '../../../assets/logo.png'
import Banner from '../../../assets/website/footer-pattern.jpg'

const BannerImg = {
  backgroundImage: `url(${Banner})`,
  backgroundPosition: 'bottom',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  height: '100%',
  width: '100%'
}
</script>
