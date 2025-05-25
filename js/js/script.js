// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        });
    });

    // Product filtering functionality
    if (document.querySelector('.products-page')) {
        const products = [
            {
                id: 1,
                name: 'iPhone 14 Pro',
                brand: 'apple',
                price: 320000,
                image: 'images/iphone14.jpg'
            },
            {
                id: 2,
                name: 'Samsung Galaxy S23 Ultra',
                brand: 'samsung',
                price: 280000,
                image: 'images/samsung-s23.jpg'
            },
            {
                id: 3,
                name: 'Oppo Reno 8 Pro',
                brand: 'oppo',
                price: 120000,
                image: 'images/oppo-reno8.jpg'
            },
            {
                id: 4,
                name: 'Vivo V27 Pro',
                brand: 'vivo',
                price: 150000,
                image: 'images/vivo-v27.jpg'
            },
            {
                id: 5,
                name: 'Huawei P50 Pro',
                brand: 'huawei',
                price: 180000,
                image: 'images/huawei-p50.jpg'
            },
            {
                id: 6,
                name: 'Xiaomi 13 Pro',
                brand: 'xiaomi',
                price: 160000,
                image: 'images/xiaomi-13.jpg'
            },
            {
                id: 7,
                name: 'iPhone 13',
                brand: 'apple',
                price: 220000,
                image: 'images/iphone13.jpg'
            },
            {
                id: 8,
                name: 'Samsung Galaxy Z Flip 4',
                brand: 'samsung',
                price: 250000,
                image: 'images/samsung-zflip.jpg'
            }
        ];

        const productsGrid = document.querySelector('.products-grid');
        const brandFilter = document.getElementById('brand-filter');
        const priceFilter = document.getElementById('price-filter');

        // Display all products initially
        displayProducts(products);

        // Filter products based on selection
        brandFilter.addEventListener('change', filterProducts);
        priceFilter.addEventListener('change', filterProducts);

        function filterProducts() {
            const selectedBrand = brandFilter.value;
            const selectedPrice = priceFilter.value;
            
            let filteredProducts = products;

            // Filter by brand
            if (selectedBrand !== 'all') {
                filteredProducts = filteredProducts.filter(product => product.brand === selectedBrand);
            }

            // Filter by price
            if (selectedPrice !== 'all') {
                const [min, max] = selectedPrice.split('-');
                if (max) {
                    filteredProducts = filteredProducts.filter(product => 
                        product.price >= parseInt(min) && product.price <= parseInt(max)
                    );
                } else {
                    filteredProducts = filteredProducts.filter(product => 
                        product.price >= parseInt(min)
                    );
                }
            }

            displayProducts(filteredProducts);
        }

        function displayProducts(productsToDisplay) {
            productsGrid.innerHTML = '';

            if (productsToDisplay.length === 0) {
                productsGrid.innerHTML = '<p class="no-products">No products match your selection.</p>';
                return;
            }

            productsToDisplay.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p class="price">PKR ${product.price.toLocaleString()}</p>
                    <a href="https://wa.me/923013227276?text=I'm%20interested%20in%20${encodeURIComponent(product.name)}" class="btn" target="_blank">Buy Now</a>
                `;
                productsGrid.appendChild(productCard);
            });
        }
    }

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For this example, we'll just show a success message
            alert(`Thank you, ${name}! Your message has been received. We'll contact you soon.`);
            
            // Reset the form
            contactForm.reset();
        });
    }

    // Highlight active navigation link based on current page
    const currentPage = location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        
        if (currentPage === linkPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Add to cart functionality (simplified)
function addToCart(productId, productName, productPrice) {
    // In a real implementation, this would add to localStorage or send to server
    alert(`${productName} has been added to your cart!`);
    
    // Here you would update the cart count in the header
    updateCartCount();
}

function updateCartCount() {
    // This would get the actual count from cart storage
    const cartCount = 0; // Replace with actual count
    const cartIcon = document.querySelector('.cart-count');
    if (cartIcon) {
        cartIcon.textContent = cartCount;
        cartIcon.style.display = cartCount > 0 ? 'flex' : 'none';
    }
}
