// Import Bootstrap JS and CSS
import "bootstrap";

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
      <a href="./index.html">Inventory</a>
      <i class="bi bi-chevron-right mx-2"></i>
      ${categoryName ? `<a href="./category.html?category=${encodeURIComponent(categoryName)}">${categoryName}</a>` : ""}
      ${productName ? `<i class="bi bi-chevron-right mx-2"></i><span>${productName}</span>` : ""}
    `;
  }
}

const productsByCategory = {
  Lathes: [
    {
      title: "Lathe Model A",
      description: "High precision lathe suitable for industrial use.",
      year: 1986,
      location: "Romania",
      images: [new URL("../assest/istockphoto-638849624-2048x2048.jpg", import.meta.url)],
    },
    {
      title: "Lathe Model B",
      description: "Reliable lathe for heavy workloads.",
      year: 1990,
      location: "Germany",
      images: [new URL("../assest/istockphoto-638849624-2048x2048.jpg", import.meta.url)],
    },
    {
      title: "Lathe Model B",
      description: "Reliable lathe for heavy workloads.",
      year: 1990,
      location: "Germany",
      images: [new URL("../assest/istockphoto-638849624-2048x2048.jpg", import.meta.url)],
    },
    {
      title: "Lathe Model B",
      description: "Reliable lathe for heavy workloads.",
      year: 1990,
      location: "Germany",
      images: [new URL("../assest/istockphoto-638849624-2048x2048.jpg", import.meta.url)],
    },
    {
      title: "Lathe Model B",
      description: "Reliable lathe for heavy workloads.",
      year: 1990,
      location: "Germany",
      images: [new URL("../assest/istockphoto-638849624-2048x2048.jpg", import.meta.url)],
    },
    {
      title: "Lathe Model B",
      description: "Reliable lathe for heavy workloads.",
      year: 1990,
      location: "Germany",
      images: [new URL("../assest/istockphoto-638849624-2048x2048.jpg", import.meta.url)],
    },
    {
      title: "Lathe Model B",
      description: "Reliable lathe for heavy workloads.",
      year: 1990,
      location: "Germany",
      images: [new URL("../assest/istockphoto-638849624-2048x2048.jpg", import.meta.url)],
    },
    {
      title: "Lathe Model B",
      description: "Reliable lathe for heavy workloads.",
      year: 1990,
      location: "Germany",
      images: [new URL("../assest/istockphoto-638849624-2048x2048.jpg", import.meta.url)],
    },
    {
      title: "Lathe Model B",
      description: "Reliable lathe for heavy workloads.",
      year: 1990,
      location: "Germany",
      images: [new URL("../assest/istockphoto-638849624-2048x2048.jpg", import.meta.url)],
    },
  ],
  "Slideway Grinding Machines": [
    {
      title: "Slideway Grinder Model 1",
      description: "Precision slideway grinder for heavy-duty tasks.",
      year: 2000,
      location: "Germany",
      images: [new URL("../assest/istockphoto-638849624-2048x2048.jpg", import.meta.url)],
    },
    {
      title: "Slideway Grinder Model 2",
      description: "High-performance slideway grinder for industrial needs.",
      year: 2005,
      location: "USA",
      images: [new URL("../assest/istockphoto-638849624-2048x2048.jpg", import.meta.url)],
    },
  ],
  "Other Grinding Machines": [
    {
      title: "Cylindrical Grinder",
      description: "High accuracy cylindrical grinder for industrial tasks.",
      year: 2010,
      location: "Japan",
      images: [new URL("../assest/istockphoto-638849624-2048x2048.jpg", import.meta.url)],
    },
  ],
  "Rotary Tables": [
    {
      title: "Heavy-Duty Rotary Table",
      description: "Large-scale industrial rotary table.",
      year: 2015,
      location: "Italy",
      images: [new URL("../assest/istockphoto-638849624-2048x2048.jpg", import.meta.url)],
    },
  ],
  "Forging Hammers": [
    {
      title: "Forging Hammer Model F",
      description: "High-performance hammer for forging tasks.",
      year: 2010,
      location: "USA",
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
    { name: "Lathes", link: "./category.html?category=Lathes" },
    { name: "Hollow Spindle Oil Country Lathes", link: "./category.html?category=Hollow Spindle Oil Country Lathes" },
    { name: "Vertical Turning Lathes", link: "./category.html?category=Vertical Turning Lathes" },
    { name: "Horizontal Boring and Milling Machines", link: "./category.html?category=Horizontal Boring and Milling Machines" },
    { name: "Rotary Tables", link: "./category.html?category=Rotary Tables" },
    { name: "T-Slotted Floor Plates", link: "./category.html?category=T-Slotted Floor Plates" },
    { name: "Gear Hobbing Machines", link: "./category.html?category=Gear Hobbing Machines" },
    {
      name: "Grinding Machines",
      subcategories: [
        { name: "Slideway Grinding Machines", link: "./category.html?category=Slideway Grinding Machines" },
        { name: "Other Grinding Machines", link: "./category.html?category=Other Grinding Machines" },
      ],
    },
    { name: "Forging Hammers", link: "./category.html?category=Forging Hammers" },
    { name: "Universal Milling Machines", link: "./category.html?category=Universal Milling Machines" },
    { name: "Other Machines", link: "./category.html?category=Other Machines" },
  ];

  // **Fix: Render desktop categories correctly, including subcategories**
  if (desktopMenuFirstColumn && desktopMenuSecondColumn) {
    const firstColumnHTML = categories
      .slice(0, Math.ceil(categories.length / 2))
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

    const secondColumnHTML = categories
      .slice(Math.ceil(categories.length / 2))
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

    desktopMenuFirstColumn.innerHTML = firstColumnHTML;
    desktopMenuSecondColumn.innerHTML = secondColumnHTML;
  }

  // **Fix: Render mobile categories correctly, including subcategories**
  if (mobileMenu) {
    mobileMenu.innerHTML = categories
      .map((category) => {
        if (category.subcategories) {
          return `
            <li>
              <span class="fw-bold">${category.name}</span>
              <ul class="list-style ms-3">
                ${category.subcategories.map((sub) => `<li><a href="${sub.link}" class="text-decoration-none fw-bold">${sub.name}</a></li>`).join("")}
              </ul>
            </li>`;
        }
        return `<li><a href="${category.link}" class="text-decoration-none fw-bold">${category.name}</a></li>`;
      })
      .join("");
  }
}

function renderCategoryCards() {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryName = urlParams.get("category");
  const categoryContainer = document.querySelector(".breadcrumb-container + .container");

  if (!categoryName || !productsByCategory[categoryName]) {
    categoryContainer.innerHTML = `<h2 class="text-center mt-5">We don't have products here yet.</h2>`;
    return;
  }

  const products = productsByCategory[categoryName];

  if (products.length === 0) {
    categoryContainer.innerHTML = `<h2 class="text-center mt-5">We don't have products here yet.</h2>`;
    return;
  }

  const cardsHTML = products
    .map(
      (product) => `
      <div class="col-lg-3 col-md-4 col-sm-6">
        <div class="card product-card border-0 shadow-sm">
          <div class="card-img-container position-relative">
            <img src="${product.images[0]}" class="card-img-top img-fluid" alt="${product.title}" 
              onerror="this.onerror=null; this.src='../assest/default-placeholder.jpg';">
          </div>
          <div class="card-body">
            <h5 class="card-title fw-bold">${product.title}</h5>
            <p class="card-text">${product.description}</p>
            <div class="d-flex justify-content-end">
              <a href="./product.html?category=${encodeURIComponent(categoryName)}&product=${encodeURIComponent(product.title)}" class="arrow-link">
                <i class="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    `
    )
    .join("");

  categoryContainer.innerHTML = `
    <div class="row justify-content-center card-row">
      ${cardsHTML}
    </div>
  `;
}

function renderProductPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const productName = urlParams.get("product");
  const categoryName = urlParams.get("category");

  if (!categoryName || !productsByCategory[categoryName]) {
    document.querySelector(".container").innerHTML = `
      <h2 class="text-center mt-5">Product not found!</h2>
      <a href="./index.html" class="btn btn-primary mt-3">Go Back to Home</a>
    `;
    return;
  }

  const product = productsByCategory[categoryName].find((item) => item.title === productName);

  if (!product) {
    document.querySelector(".container").innerHTML = `
      <h2 class="text-center mt-5">Product not found!</h2>
      <a href="./index.html" class="btn btn-primary mt-3">Go Back to Home</a>
    `;
    return;
  }

  // Render product details
  document.getElementById("machine-title").textContent = product.title;
  document.getElementById("machine-info").innerHTML = `Year: ${product.year} | Location: ${product.location}`;
  document.getElementById("machine-details").textContent = product.description;

  // Render carousel images
  const carouselInner = document.querySelector(".carousel-inner");
  carouselInner.innerHTML = product.images
    .map(
      (img, index) => `
      <div class="carousel-item ${index === 0 ? "active" : ""}">
        <img src="${img}" class="d-block w-100" alt="${product.title} Image ${index + 1}">
      </div>`
    )
    .join("");
}

// Initialize Everything
document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  updateBreadcrumb();
  if (window.location.pathname.includes("category.html")) {
    renderCategoryCards(); // Render product cards on the category page
  } else if (window.location.pathname.includes("product.html")) {
    renderProductPage(); // Render product details
  }
});
