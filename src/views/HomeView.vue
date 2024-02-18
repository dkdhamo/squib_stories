<script setup>
import { ref, onMounted } from 'vue'


// Parse the current URL to extract the brand name and ID
const url = new URL(window.location.href);
const pathSegments = url.pathname.split('/');

// Extract the brand name and ID (assuming they are the first and second segments)
const brandName = pathSegments[1];
const id = pathSegments[2];

console.log(brandName, id);

const videoUrls = ref([])



const fetchVideoUrls = async () => {
  try {


    // Make the API call to get video URLs
    const response = await fetch(`https://backen-squib.onrender.com/getstories/${brandName}/${id}`)
    if (response.ok) {
      const data = await response.json()
      videoUrls.value = data.productStoryUrls
      console.log(videoUrls._rawValue)
    } else {
      console.error('Failed to fetch video URLs')
    }
  } catch (error) {
    console.error('An error occurred:', error)
  }
}

onMounted(() => {
  fetchVideoUrls()
})
</script>


<template>
  <div>
    <!-- Conditionally render the amp-story if videoUrls has data -->
    <amp-story v-if="videoUrls.length > 0" standalone title="Stories in AMP - Hello World" publisher="AMP Project"
      publisher-logo-src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?q=10&h=200"
      poster-portrait-src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?q=10&h=200">
      <amp-story-page v-for="(url, index) in videoUrls" :key="index" :id="index">
        <amp-story-grid-layer template="fill">
          <amp-video autoplay loop width="720" height="960"
            poster="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?q=10&h=200"
            layout="responsive">
            <source :src="url" type="video/mp4">
          </amp-video>
        </amp-story-grid-layer>
        <!-- <amp-story-grid-layer template="thirds">
          <h2 animate-in="fly-in-bottom" grid-area="lower-third" animate-in-delay="0.4s">
            Best walk ever!
          </h2>
        </amp-story-grid-layer> -->
      </amp-story-page>
    </amp-story>


    <!-- Optionally, you can provide a message if videoUrls is empty -->
    <div v-else>
      No video data available.
    </div>
  </div>
</template>


