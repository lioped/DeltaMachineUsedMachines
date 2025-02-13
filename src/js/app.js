// Import Bootstrap JS and CSS
import * as bootstrap from "bootstrap";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // ✅ Ensures Bootstrap JS is loaded
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Fix scroll reset issue when closing the offcanvas menu
document.addEventListener("hidden.bs.offcanvas", (event) => {
  if (event.target.id === "offcanvasNav") {
    const currentScrollPosition = window.scrollY;
    window.scrollTo(0, currentScrollPosition);
  }
});

// Render Breadcrumb Dynamically
function updateBreadcrumb() {
  const breadcrumbContainer = document.querySelector(".breadcrumb");
  const urlParams = new URLSearchParams(window.location.search);
  const categoryName = urlParams.get("category");
  const productName = urlParams.get("product");

  if (breadcrumbContainer) {
    breadcrumbContainer.innerHTML = `
      <a href="./index.html">Home</a>
      ${categoryName ? `<i class="bi bi-chevron-right mx-2"></i><a href="./category.html?category=${encodeURIComponent(categoryName)}">${categoryName}</a>` : ""}
      ${productName ? `<i class="bi bi-chevron-right mx-2"></i><span>${productName}</span>` : ""}
    `;

    // ✅ If product is from Inventory, make sure breadcrumb updates correctly
    if (categoryName === "Inventory") {
      breadcrumbContainer.innerHTML = `
        <a href="./index.html#inventory">Inventory</a>
        ${productName ? `<i class="bi bi-chevron-right mx-2"></i><span>${productName}</span>` : ""}
      `;
    }
  }
}

const productsByCategory = {
  "Grinding Machines": [
    {
      title: "Surface Grinder SG-150",
      description: "High-precision surface grinding machine for metalworking.",
      year: 2018,
      location: "USA",
      images: [new URL("../assest/istockphoto-638849624-2048x2048.jpg", import.meta.url)],
    },
  ],
  Lathes: [
    {
      title: "Precision Lathe X200",
      description: "High-precision lathe for industrial applications.",
      year: 2020,
      location: "Germany",
      images: [new URL("../assest/istockphoto-638849624-2048x2048.jpg", import.meta.url)],
    },
  ],
  "Vertical Turning Lathes": [
    {
      title: "VTL Pro 5000",
      description: "Vertical turning lathe designed for heavy-duty machining.",
      year: 2019,
      location: "Italy",
      images: [new URL("../assest/istockphoto-638849624-2048x2048.jpg", import.meta.url)],
    },
  ],
  "Retrofitted Machines (Lathes, Vertical Turning Lathes)": [
    {
      title: "Retrofit Lathe RX100",
      description: "Fully upgraded lathe with modern digital controls.",
      year: 2021,
      location: "France",
      images: [new URL("../assest/istockphoto-638849624-2048x2048.jpg", import.meta.url)],
    },
  ],
  "Milling and Boring Machines": [
    {
      title: "CNC Milling MB3000",
      description: "High-speed CNC milling and boring machine.",
      year: 2022,
      location: "Japan",
      images: [new URL("../assest/istockphoto-638849624-2048x2048.jpg", import.meta.url)],
    },
  ],
  "Gear Hobbing/Grinding Machines": [
    {
      title: "Hobbing Machine GHX-750",
      description: "High-precision gear hobbing and grinding system.",
      year: 2017,
      location: "Switzerland",
      images: [new URL("../assest/istockphoto-638849624-2048x2048.jpg", import.meta.url)],
    },
  ],
  "Floor Plates and Rotary Tables": [
    {
      title: "Rotary Table RT-200",
      description: "Heavy-duty rotary table for machining applications.",
      year: 2015,
      location: "Spain",
      images: [new URL("../assest/istockphoto-638849624-2048x2048.jpg", import.meta.url)],
    },
  ],
  "Other Machines": [
    {
      title: "Universal Machine UM-500",
      description: "Versatile universal machine for multiple applications.",
      year: 2020,
      location: "UK",
      images: [new URL("../assest/istockphoto-638849624-2048x2048.jpg", import.meta.url)],
    },
  ],
};

// Render Categories for Desktop and Mobile
function renderCategories() {
  const desktopMenuFirstColumn = document.querySelector(".desktop-categories .d-flex > div:first-child ul");
  const desktopMenuSecondColumn = document.querySelector(".desktop-categories .d-flex > div:last-child ul");
  const mobileMenu = document.querySelector(".mobile-categories ul");

  const categories = [
    { name: "Grinding Machines", link: "./category.html?category=Grinding Machines" },
    { name: "Lathes", link: "./category.html?category=Lathes" },
    { name: "Vertical Turning Lathes", link: "./category.html?category=Vertical Turning Lathes" },
    { name: "Retrofitted Machines (Lathes, Vertical Turning Lathes)", link: "./category.html?category=Retrofitted Machines (Lathes, Vertical Turning Lathes)" },
    { name: "Milling and Boring Machines", link: "./category.html?category=Milling and Boring Machines" },
    { name: "Gear Hobbing/Grinding Machines", link: "./category.html?category=Gear Hobbing/Grinding Machines" },
    { name: "Floor Plates and Rotary Tables", link: "./category.html?category=Floor Plates and Rotary Tables" },
    { name: "Other Machines", link: "./category.html?category=Other Machines" },
  ];

  // ✅ Filter out categories that have no products
  const filteredCategories = categories.filter((category) => {
    if (category.subcategories) {
      // ✅ If category has subcategories, keep it only if at least one subcategory has products
      category.subcategories = category.subcategories.filter((sub) => productsByCategory[sub.name]?.length > 0);
      return category.subcategories.length > 0;
    } else {
      // ✅ Otherwise, check if the category itself has products
      return productsByCategory[category.name]?.length > 0;
    }
  });

  // ✅ Generate category HTML
  const generateCategoryHTML = (categoryList) => {
    return categoryList
      .map((category) => {
        if (category.subcategories) {
          return `
            <li>
              <span class="fw-bold">${category.name}</span>
              <ul class="ms-3">
                ${category.subcategories.map((sub) => `<li><a href="${sub.link}" class="text-decoration-none fw-bold">${sub.name}</a></li>`).join("")}
              </ul>
            </li>`;
        }
        return `<li><a href="${category.link}" class="text-decoration-none fw-bold">${category.name}</a></li>`;
      })
      .join("");
  };

  // ✅ Update desktop and mobile menus
  if (desktopMenuFirstColumn && desktopMenuSecondColumn) {
    const half = Math.ceil(filteredCategories.length / 2);
    desktopMenuFirstColumn.innerHTML = generateCategoryHTML(filteredCategories.slice(0, half));
    desktopMenuSecondColumn.innerHTML = generateCategoryHTML(filteredCategories.slice(half));
  }

  if (mobileMenu) {
    mobileMenu.innerHTML = generateCategoryHTML(filteredCategories);
  }
}

function renderCategoryCards() {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryName = urlParams.get("category");

  if (!categoryName || !productsByCategory[categoryName]) {
    document.querySelector(".container").innerHTML = `
      <h2 class="text-center mt-5">No products found for this category.</h2>
    `;
    return;
  }

  const categoryProducts = productsByCategory[categoryName];
  const cardContainer = document.querySelector(".container"); // Target the correct container

  cardContainer.innerHTML = `
    <div class="row">
      ${categoryProducts
        .map(
          (product) => `
        <div class="col-lg-3 col-md-4 col-sm-6">
          <div class="card border-0 hover-card product-card" data-category="${categoryName}" data-product="${product.title}">
            <img src="${product.images[0]}" class="card-img-top" alt="${product.title}">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text">${product.description.substring(0, 100)}...</p>
              <div class="mt-auto d-flex justify-content-end">
                <i class="bi bi-arrow-right arrow-link"></i>
              </div>
            </div>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;

  // ✅ Add event listeners to all cards (make them clickable)
  document.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("click", function () {
      const category = this.getAttribute("data-category");
      const product = this.getAttribute("data-product");
      window.location.href = `product.html?category=${encodeURIComponent(category)}&product=${encodeURIComponent(product)}`;
    });
  });
}

function renderProductPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const productName = urlParams.get("product");
  const categoryName = urlParams.get("category");

  if (!categoryName || !productsByCategory[categoryName]) return;

  const product = productsByCategory[categoryName].find((item) => item.title === productName);

  if (!product) return;

  // ✅ Inject product details
  document.getElementById("machine-title").textContent = product.title;
  document.getElementById("machine-info").innerHTML = `Year: ${product.year} | Location: ${product.location}`;
  document.getElementById("machine-details").textContent = product.description;

  // ✅ Dynamically Render Carousel Images (Only if images exist)
  const carouselInner = document.querySelector(".carousel-inner");
  const thumbnailsContainer = document.querySelector(".image-thumbnails");

  if (product.images && product.images.length > 0) {
    carouselInner.innerHTML = product.images
      .map(
        (img, index) => `
        <div class="carousel-item ${index === 0 ? "active" : ""}">
          <img src="${img}" class="d-block w-100" alt="${product.title} Image ${index + 1}">
        </div>
      `
      )
      .join("");

    // ✅ Generate Thumbnails
    thumbnailsContainer.innerHTML = product.images
      .map(
        (img, index) => `
        <img src="${img}" class="img-thumbnail mx-2 thumbnail-img" data-index="${index}" alt="Thumbnail ${index + 1}">
      `
      )
      .join("");

    // ✅ Add Event Listener for Thumbnails
    document.querySelectorAll(".thumbnail-img").forEach((thumbnail) => {
      thumbnail.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        const carousel = new bootstrap.Carousel(document.getElementById("machineCarousel"));
        carousel.to(index);

        // ✅ Highlight the active thumbnail
        document.querySelectorAll(".thumbnail-img").forEach((img) => img.classList.remove("active"));
        this.classList.add("active");
      });
    });
  } else {
    // ✅ If no images exist, clear the elements
    carouselInner.innerHTML = "";
    thumbnailsContainer.innerHTML = "";
  }

  // ✅ Add event listener to "Contact Us" button
  const contactButton = document.getElementById("contact-button");
  if (contactButton) {
    contactButton.addEventListener("click", () => {
      window.location.href = `contact.html?product=${encodeURIComponent(product.title)}`;
    });
  }
}

function handleMobileMenu() {
  const mobileLinks = document.querySelectorAll(".mobile-link");
  const offcanvasMenu = document.querySelector("#offcanvasNav");

  mobileLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      // ✅ If the link is a section (e.g., #inventory, #about-us)
      if (href.startsWith("#")) {
        event.preventDefault();

        // ✅ Close the Offcanvas Menu Immediately
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasMenu);
        if (offcanvasInstance) {
          offcanvasInstance.hide(); // ✅ Force close the menu
        }

        // ✅ Scroll smoothly to the section
        const targetSection = document.querySelector(href);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  // ✅ Close Offcanvas When Clicking Outside of It
  document.addEventListener("click", (event) => {
    if (!offcanvasMenu.contains(event.target) && !event.target.closest(".navbar-toggler")) {
      const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasMenu);
      if (offcanvasInstance) {
        offcanvasInstance.hide();
      }
    }
  });
}

// Initialize Everything

document.addEventListener("DOMContentLoaded", () => {
  const topInfo = document.querySelector(".top-info");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      // Adjust the value as needed
      topInfo.classList.add("sticky"); // Adds the sticky class
    } else {
      topInfo.classList.remove("sticky"); // Removes the sticky class
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const contactButton = document.querySelector(".floating-contact-btn");

  gsap.registerPlugin(ScrollTrigger);

  // ✅ Ensure the button is ALWAYS fixed and visible
  gsap.set(contactButton, { opacity: 1, y: 0, pointerEvents: "all", position: "fixed", bottom: "20px" });
});

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productName = urlParams.get("product");

  if (productName) {
    document.getElementById("message").value = `I am interested in ${productName}. Please provide more details.`;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  let pageTitle = "Delta Machine"; // Default title (Company Name)

  if (window.location.pathname.includes("index.html")) {
    pageTitle = "Home | Delta Machine";
  } else if (window.location.pathname.includes("contact.html")) {
    pageTitle = "Contact Us | Delta Machine";
  } else if (window.location.pathname.includes("inventory.html")) {
    pageTitle = "Available Machines | Delta Machine";
  } else if (window.location.pathname.includes("category.html")) {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryName = urlParams.get("category");
    pageTitle = categoryName ? `${categoryName} | Delta Machine` : "Categories | Delta Machine";
  } else if (window.location.pathname.includes("product.html")) {
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get("product");
    pageTitle = productName ? `${productName} | Delta Machine` : "Product Details | Delta Machine";
  }

  document.title = pageTitle; // ✅ Set the dynamic title
});

document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  updateBreadcrumb();
  handleMobileMenu();

  if (window.location.pathname.includes("category.html")) {
    renderCategoryCards(); // Render product cards on the category page
  } else if (window.location.pathname.includes("product.html")) {
    renderProductPage(); // Render product details
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");
  const contactFormWrapper = document.querySelector(".contact-form-wrapper"); // ✅ Includes "Get in Touch" + Form
  const thankYouMessage = document.getElementById("thank-you-message");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault(); // ✅ Prevent form redirection

      const formData = new FormData(contactForm);

      fetch("https://formsubmit.co/ajax/eric.palade1@gmail.com", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            // ✅ Hide the contact form and "Get in Touch"
            if (contactFormWrapper) contactFormWrapper.style.display = "none";

            // ✅ Show thank you message
            if (thankYouMessage) thankYouMessage.style.display = "block";

            // ✅ Redirect to home after 30 seconds
            setTimeout(() => {
              window.location.href = "index.html";
            }, 5000);
          } else {
            alert("Something went wrong. Please try again.");
          }
        })
        .catch((error) => console.error("Error:", error));
    });
  }
});
