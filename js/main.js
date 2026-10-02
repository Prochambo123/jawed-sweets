const products = [
    {
        id: 1,
        name: 'Akhroti Sohan Halwa',
        price: 2399,
        originalPrice: 3299,
        badge: 'sale',
        badgeText: 'Save 27%',
        image: 'assets/products/sohan-halwa.jpg',
        type: 'halwa'
    },
    {
        id: 2,
        name: 'Pack of 4 Sohan Halwa',
        price: 2499,
        originalPrice: 3000,
        badge: 'sale',
        badgeText: 'Save 17%',
        image: 'assets/products/sohan-halwa.jpg',
        type: 'halwa'
    },
    {
        id: 3,
        name: 'Panjiri',
        price: 1999,
        originalPrice: null,
        badge: 'bestseller',
        badgeText: 'Bestseller',
        image: 'assets/products/panjiri.jpg',
        type: 'halwa'
    },
    {
        id: 4,
        name: 'Coconut Halwa',
        price: 2499,
        originalPrice: 3199,
        badge: 'sale',
        badgeText: 'Save 22%',
        image: 'assets/products/coconut-halwa.jpg',
        type: 'halwa'
    },
    {
        id: 5,
        name: 'Badam Khatai',
        price: 1499,
        originalPrice: 1600,
        badge: 'sale',
        badgeText: 'On Sale',
        image: 'assets/products/badam-khatai.jpg',
        type: 'mithai'
    },
    {
        id: 6,
        name: 'Special Sohan Halwa',
        price: 2699,
        originalPrice: null,
        badge: 'bestseller',
        badgeText: 'Bestseller',
        image: 'assets/products/sohan-halwa.jpg',
        type: 'halwa'
    },
    {
        id: 7,
        name: 'Kaju Katli',
        price: 2999,
        originalPrice: null,
        badge: null,
        badgeText: null,
        image: 'assets/products/kaju-katli.jpg',
        type: 'mithai'
    },
    {
        id: 8,
        name: 'Makhan Toffee',
        price: 2399,
        originalPrice: null,
        badge: null,
        badgeText: null,
        image: 'assets/products/makhan-toffee.jpg',
        type: 'mithai'
    }
];

const halwaProducts = [
    {
        id: 101,
        name: 'Classic Sohan Halwa',
        price: 1999,
        originalPrice: null,
        badge: null,
        badgeText: null,
        image: 'assets/products/sohan-halwa.jpg',
        type: 'halwa'
    },
    {
        id: 102,
        name: 'Delhi Halwa',
        price: 2399,
        originalPrice: null,
        badge: null,
        badgeText: null,
        image: 'assets/products/panjiri.jpg',
        type: 'halwa'
    },
    {
        id: 103,
        name: 'Pista Sohan Halwa',
        price: 2599,
        originalPrice: null,
        badge: 'new',
        badgeText: 'New',
        image: 'assets/products/coconut-halwa.jpg',
        type: 'halwa'
    }
];

let cart = [];

function formatPrice(price) {
    return 'Rs. ' + price.toLocaleString('en-PK');
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.productId = product.id;

    const badgeHtml = product.badge ? `<span class="product-badge ${product.badge}">${product.badgeText}</span>` : '';
    const originalPriceHtml = product.originalPrice ? `<span class="price-original">${formatPrice(product.originalPrice)}</span>` : '';
    const saveHtml = product.originalPrice ? `<span class="price-save">Save ${Math.round((1 - product.price / product.originalPrice) * 100)}%</span>` : '';

    card.innerHTML = `
        <div class="product-image">
            ${badgeHtml}
            <button class="product-wishlist" aria-label="Add to wishlist">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
            <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        <div class="product-info">
            <a href="#" class="product-name">${product.name}</a>
            <div class="product-price">
                <span class="price-current">${formatPrice(product.price)}</span>
                ${originalPriceHtml}
                ${saveHtml}
            </div>
            <div class="product-actions">
                <button class="btn-add-cart" onclick="addToCart('${product.name}', ${product.price}, '${product.image}')">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                    Add to Cart
                </button>
                <button class="btn-quick-view" aria-label="Quick view">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
            </div>
        </div>
    `;

    return card;
}

function renderProducts() {
    const shopGrid = document.getElementById('productsGrid');
    const halwaGrid = document.getElementById('halwaGrid');

    if (shopGrid) {
        shopGrid.innerHTML = '';
        products.forEach(product => {
            shopGrid.appendChild(createProductCard(product));
        });
    }

    if (halwaGrid) {
        halwaGrid.innerHTML = '';
        halwaProducts.forEach(product => {
            halwaGrid.appendChild(createProductCard(product));
        });
    }
}

function addToCart(name, price, image) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }
    updateCartUI();
    showToast(`${name} added to cart!`, 'success');
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartUI();
}

function updateQuantity(name, delta) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(name);
            return;
        }
    }
    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (cartCount) cartCount.textContent = totalItems;
    if (cartTotal) cartTotal.textContent = formatPrice(totalPrice);

    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-info">
                        <span class="cart-item-name">${item.name}</span>
                        <span class="cart-item-price">${formatPrice(item.price)}</span>
                        <div class="cart-item-qty">
                            <button class="qty-btn" onclick="updateQuantity('${item.name}', -1)">-</button>
                            <span>${item.quantity}</span>
                            <button class="qty-btn" onclick="updateQuantity('${item.name}', 1)">+</button>
                        </div>
                        <a href="#" class="cart-item-remove" onclick="removeFromCart('${item.name}'); return false;">Remove</a>
                    </div>
                </div>
            `).join('');
        }
    }
}

function checkout() {
    if (cart.length === 0) {
        showToast('Your cart is empty!', 'error');
        return;
    }
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    showToast(`Order placed! Total: ${formatPrice(total)}. We'll contact you soon!`, 'success');
    cart = [];
    updateCartUI();
    closeCart();
}

function openCart() {
    document.getElementById('cartSidebar').classList.add('open');
    document.getElementById('cartOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    document.getElementById('cartSidebar').classList.remove('open');
    document.getElementById('cartOverlay').classList.remove('open');
    document.body.style.overflow = '';
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function toggleFaq(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');

    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });

    if (!isActive) {
        faqItem.classList.add('active');
    }
}

function initHeader() {
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('open');
        });
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
        });
    }

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
        });
    });
}

function initCart() {
    const cartBtn = document.querySelector('.cart-btn');
    const cartClose = document.getElementById('cartClose');
    const cartOverlay = document.getElementById('cartOverlay');

    if (cartBtn) cartBtn.addEventListener('click', openCart);
    if (cartClose) cartClose.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Message sent! We\'ll get back to you soon.', 'success');
            form.reset();
        });
    }
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    initHeader();
    initMobileMenu();
    initCart();
    initContactForm();
    initSmoothScroll();
    initActiveNav();
    updateCartUI();
});
