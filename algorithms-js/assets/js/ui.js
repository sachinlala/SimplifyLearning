/**
 * Main UI JavaScript for SimplifyLearning Algorithm Demos
 * 
 * This file handles the main interactive features of the landing page,
 * including algorithm search and category filtering.
 */

// Import the separate modules
import SimpleSearch from './simple-search.js';
import CategoryFilter from './category-filter.js';

// Initialize UI components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {

    // Initialize search functionality
    const searchInput = document.getElementById('search-input');
    let searchInstance = null;
    if (searchInput) {
        searchInstance = new SimpleSearch(searchInput);
    }

    // Initialize category filtering with button container
    const categoryContainer = document.querySelector('.category-filters');
    let categoryFilter = null;
    if (categoryContainer) {
        categoryFilter = new CategoryFilter(categoryContainer, searchInstance);
        // Cross-reference so search can use category filtering
        if (searchInstance) {
            searchInstance.categoryFilter = categoryFilter;
            // Share algorithms array between instances
            setTimeout(() => {
                categoryFilter.algorithms = searchInstance.algorithms;
            }, 400);
        }
    }
    
    // Setup clear search functionality
    const clearSearchLink = document.getElementById('clear-search');
    if (clearSearchLink) {
        clearSearchLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (searchInstance) {
                searchInstance.input.value = '';
                searchInstance.showAllItems();
                
                // Re-apply category filters if any are active
                if (categoryFilter && categoryFilter.selectedCategories.size > 0) {
                    categoryFilter.filterCards();
                    categoryFilter.updateCountBadge();
                } else {
                    searchInstance.updateCountBadge();
                }
                
                // Hide the clear search link
                clearSearchLink.classList.remove('visible');
            }
        });
    }
    
    // Setup clear categories functionality
    const clearCategoriesLink = document.getElementById('clear-categories');
    if (clearCategoriesLink) {
        clearCategoriesLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (categoryFilter) {
                categoryFilter.reset();
            }
        });
    }
    
    // Update clear search visibility when search input changes
    if (searchInput && clearSearchLink) {
        searchInput.addEventListener('input', (e) => {
            if (e.target.value.trim()) {
                clearSearchLink.classList.add('visible');
            } else {
                clearSearchLink.classList.remove('visible');
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#" or invalid
            if (!href || href === '#' || href.length <= 1) {
                return;
            }
            
            e.preventDefault();
            try {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            } catch (error) {
                // Ignore invalid selectors
                console.warn('Invalid selector for smooth scrolling:', href);
            }
        });
    });

    // Add loading states to demo buttons
    document.querySelectorAll('.demo-link').forEach(button => {
        button.addEventListener('click', function () {
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.disabled = true;

            // Re-enable after a short delay
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 1000);
        });
    });

    // Fade-in animation for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    setTimeout(() => {
        document.querySelectorAll('.algorithm-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
        
        // Initialize count badge with total count
        const countBadge = document.getElementById('algorithms-count');
        if (countBadge) {
            const totalCards = document.querySelectorAll('.algorithm-card').length;
            // Update the count span (second span in the badge)
            const countSpan = countBadge.querySelector('span:last-child');
            if (countSpan) {
                countSpan.textContent = totalCards.toString();
            }
            countBadge.classList.add('visible');
        }
    }, 500);
});
