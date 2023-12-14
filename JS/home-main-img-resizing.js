
// JavaScript to change the image source based on the media query max-width 1230px:
window.addEventListener('DOMContentLoaded', function () {
    var myImage = document.getElementById('main-image');

    // Check the width of the screen and change the image source accordingly
    function updateImageSource() {
      if (window.matchMedia('(max-width: 1300px)').matches) {
        myImage.src = 'assets/images/main-photo-mobile.jpg';
      } else {
        myImage.src = 'assets/images/main-photo-desktop.png';
      }
    }

    // Initial call to set the image source based on the default conditions
    updateImageSource();

    // Update the image source when the window is resized
    window.addEventListener('resize', updateImageSource);
  });