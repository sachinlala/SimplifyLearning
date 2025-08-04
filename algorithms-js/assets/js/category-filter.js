/**
 * Category Filter Class
 * Handles multi-select category filtering with search integration
 */

class CategoryFilter {
    constructor(containerElement, searchInstance) {
        this.container = containerElement;
        this.searchInstance = searchInstance;
        this.buttons = [];
        this.selectedCategories = new Set();
        this.algorithms = [];
        this.init();
    }
    
    init() {
        // Find all category buttons
        this.buttons = Array.from(this.container.querySelectorAll('.category-tag'));
        
        // Add click listeners
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleCategoryToggle(button.dataset.category, button);
            });
        });
    }
    
    handleCategoryToggle(category, clickedButton) {
        // Toggle selection
        if (this.selectedCategories.has(category)) {
            this.selectedCategories.delete(category);
            clickedButton.classList.remove('selected');
        } else {
            this.selectedCategories.add(category);
            clickedButton.classList.add('selected');
        }
        
        // Apply filtering based on current search state
        const searchValue = this.searchInstance ? this.searchInstance.input.value.trim() : '';
        if (searchValue) {
            // There's an active search, filter from search results
            const searchResults = this.algorithms.filter(item => 
                item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.description.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.category.toLowerCase().includes(searchValue.toLowerCase())
            );
            this.filterCards(searchResults);
        } else {
            // No search, filter from all algorithms
            this.filterCards();
        }
        
        this.updateCountBadge();
        this.updateClearCategoriesVisibility();
    }
    
    filterCards(filteredItems = null) {
        const cards = document.querySelectorAll('.algorithm-card');
        const activeFilteredItems = filteredItems || this.algorithms;

        cards.forEach(card => {
            // Check if card is in the search results (if any)
            const cardData = activeFilteredItems.find(item => item.element === card);
            
            if (!cardData) {
                card.style.display = 'none';
                return;
            }

            if (this.selectedCategories.size === 0) {
                // No categories selected, show search results or all
                card.style.display = 'block';
            } else {
                // Check if card matches any selected category
                const cardCategories = this.getCardCategories(card);
                const hasCategoryMatch = Array.from(this.selectedCategories).some(selectedCat => 
                    cardCategories.includes(selectedCat)
                );
                card.style.display = hasCategoryMatch ? 'block' : 'none';
            }
        });
    }
    
    getCardCategories(card) {
        // Handle both single category and array of categories
        const categoryData = card.dataset.category;
        if (!categoryData) return [];
        
        // Try to parse as JSON array first, fallback to single string
        try {
            const parsed = JSON.parse(categoryData);
            return Array.isArray(parsed) ? parsed : [categoryData];
        } catch {
            return [categoryData];
        }
    }
    
    updateCountBadge() {
        const countBadge = document.getElementById('algorithms-count');
        if (!countBadge) return;
        
        const visibleCards = document.querySelectorAll('.algorithm-card[style*="block"], .algorithm-card:not([style]), .algorithm-card:not([style*="none"])');
        const count = visibleCards.length;
        
        // Update the count span (second span in the badge) - keep it simple
        const countSpan = countBadge.querySelector('span:last-child');
        if (countSpan) {
            countSpan.textContent = count.toString();
        }
        countBadge.classList.add('visible');
    }
    
    reset() {
        // Clear all selections
        this.selectedCategories.clear();
        this.buttons.forEach(button => {
            button.classList.remove('selected');
        });
        
        // Re-apply search filter if there's an active search
        const searchValue = this.searchInstance ? this.searchInstance.input.value.trim() : '';
        if (searchValue) {
            this.searchInstance.handleSearch(searchValue);
        } else {
            // Show all cards
            this.filterCards();
            this.updateCountBadge();
        }
        
        this.updateClearCategoriesVisibility();
    }
    
    updateClearCategoriesVisibility() {
        const clearCategoriesLink = document.getElementById('clear-categories');
        if (!clearCategoriesLink) return;
        
        if (this.selectedCategories.size > 0) {
            clearCategoriesLink.classList.add('visible');
        } else {
            clearCategoriesLink.classList.remove('visible');
        }
    }
}

// Export for module environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CategoryFilter;
}
