import "../components/restaurant-list.js";
import restaurant from "../../public/data/DATA.json";

const main = () => {
  const hamburgerButton = () => {
    const buttonMenuElement = document.querySelector("#menu");
    const drawerNavigationElement = document.querySelector(".nav__list");
    const restaurantCard = document.querySelector("restaurant-list");

    if (restaurantCard) {
      restaurantCard.restaurants = restaurant.restaurants;
    }

    if (buttonMenuElement) {
      buttonMenuElement.addEventListener("click", toggleDrawer);
    }

    document.addEventListener("click", closeDrawerOnClickOutside);
  };

  const toggleDrawer = (event) => {
    const drawerNavigationElement = document.querySelector(".nav__list");
    if (drawerNavigationElement) {
      drawerNavigationElement.classList.toggle("open");
    }
    event.stopPropagation();
    event.preventDefault();
  };

  const closeDrawerOnClickOutside = (event) => {
    const drawerNavigationElement = document.querySelector(".nav__list");
    const buttonMenuElement = document.querySelector("#menu");
    if (!event.target.closest("#menu") && drawerNavigationElement && drawerNavigationElement.classList.contains("open")) {
      drawerNavigationElement.classList.remove("open");
    }
  };
  const skipLink = document.getElementById("skip-link");
  const titleElement = document.getElementById("title");

  skipLink.addEventListener("focus", function () {
    titleElement.style.marginLeft = "70px";
  });

  skipLink.addEventListener("blur", function () {
    titleElement.style.marginLeft = "0";
  });
  return {
    hamburgerButton,
  };
};

export default main().hamburgerButton;
