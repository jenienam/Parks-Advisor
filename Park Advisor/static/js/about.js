// Animation for header text
let textWrapperHeader = document.querySelector(".wildlife-header");
textWrapperHeader.innerHTML = textWrapperHeader.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.wildlife-header .letter',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 2250,
    delay: (el, i) => 150 * (i+1)
  }).add({
    targets: '.wildlife-header',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

// Animation for header tagline
let textWrapperTagline = document.querySelector(".wildlife-tagline");
textWrapperTagline.innerHTML = textWrapperTagline.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.wildlife-tagline .letter',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 2250,
    delay: (el, i) => 150 * (i+1)
  }).add({
    targets: '.wildlife-tagline',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });