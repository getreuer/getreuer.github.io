var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  document.getElementById("navbar").style.top = 
      (prevScrollpos > currentScrollPos ? "0" : "-75px");
  prevScrollpos = currentScrollPos;
}
