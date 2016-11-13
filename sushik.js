var menuDisplayed = false;

  function toggleBurgerIcon(){
    document.getElementById("nav-icon1").classList.toggle('open');
  }

  function toggleMenu(){
    if(menuDisplayed)
      document.getElementById("menu").style.display = "none";
    else
      document.getElementById("menu").style.display = "block";

    toggleBurgerIcon();
    menuDisplayed = !menuDisplayed;
  }