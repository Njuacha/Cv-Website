/**
 * This function scrolls smoothly to an element
*/
const heightOfNav = $('nav').outerHeight();

const scrollToElement = (target) => {
    // determine height from top + nav bar height
    let section = document.querySelector(target.hash);
    let height = section.offsetTop - heightOfNav;

    scrollTo({
        top      : height,
        behavior : 'smooth'
    });
};

/**
 * This method returns true when an element's visibility in viewport is above the the percentVisible arguement
*/
const isElementXPercentInViewport = (el, percentVisible) => {
  let
    rect = el.getBoundingClientRect(),
    windowHeight = (window.innerHeight || document.documentElement.clientHeight);

  return !(
    Math.floor(100 - (((rect.top >= 0 ? 0 : rect.top) / +-(rect.height / 1)) * 100)) < percentVisible ||
    Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) < percentVisible
  )
};


$(window).scroll(function() {
  $('nav').toggleClass('scrolled', $(this).scrollTop() > 200);
});

$('.nav-link').on('click', function(e) {
  event.preventDefault();
  $('.nav-item').removeClass('active');
  $(this).parent().addClass('active');
  scrollToElement(e.target);
});


/*
* This section adds class active to section when near top of viewport
*/
const sections = $('section');
let currentlyActiveSection;
window.addEventListener('scroll', function(){
  let count = 0;
  for (section of sections) {
    // check if section is above 50% visible in the view port
    if(isElementXPercentInViewport(section, 50)) {
      // if the section is not already active then set it as active
      if (currentlyActiveSection != section){
        // make the previous section and it's corresponding nav menu link inactive
        if (currentlyActiveSection != null){
          const id1 = currentlyActiveSection.id;
          $('nav .navbar-nav').find("li a[href='#"+ id1 + "']").parent().removeClass('active');
        } else {
          // currentlyActiveSection is null before any nav-item is selected and at that time it is the home nav-item that is selected
          $('nav .navbar-nav').find("li a[href='#home']").parent().removeClass('active');
        }

        const id2 = section.id;

        $('nav .navbar-nav').find("li a[href='#"+ id2 + "']").parent().addClass('active');
        currentlyActiveSection = section;
        const id = section.id;
        console.log('id:'+id);
      }
      break;
    }

  }
});
