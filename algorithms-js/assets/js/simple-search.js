/**
 * Simple Search Class
 * Handles algorithm search functionality with category filter integration
 */

class SimpleSearch {
    constructor(inputElement) {
        this.input = inputElement;
        this.countBadge = document.getElementById('algorithms-count');
        this.algorithms = [];
        
        this.init();
    }
    
    init() {
        this.input.addEventListener('input', (e) => this.handleSearch(e.target.value));
        
        // Focus styles
        this.input.addEventListener('focus', () => {
            this.input.style.borderColor = '#007acc';
        });
        
        this.input.addEventListener('blur', () => {
            this.input.style.borderColor = '#ddd';
        });
        
        // Index algorithms after they're loaded
        setTimeout(() => this.indexAlgorithms(), 300);
    }
    
    indexAlgorithms() {
        const cards = document.querySelectorAll('.algorithm-card');
        this.algorithms = Array.from(cards).map(card => ({
            element: card,
            name: card.querySelector('h2')?.textContent || '',
            description: card.querySelector('p')?.textContent || '',
            category: card.dataset.category || ''
        }));
    }
    
    handleSearch(query) {
        if (!query.trim()) {
            this.showAllItems();
            // Re-apply category filters if any are active
            if (this.categoryFilter && this.categoryFilter.selectedCategories.size > 0) {
                this.categoryFilter.filterCards();
                this.categoryFilter.updateCountBadge();
            } else {
                this.updateCountBadge();
            }
            return;
        }

        const filteredItems = this.algorithms.filter(item => 
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
        );

        // Apply search filter first
        this.filterDisplay(filteredItems);
        
        // Then apply category filters on top of search results
        if (this.categoryFilter && this.categoryFilter.selectedCategories.size > 0) {
            this.categoryFilter.filterCards(filteredItems);
            this.categoryFilter.updateCountBadge();
        } else {
            this.updateCountBadge(filteredItems.length, 'Search results');
        }
    }
    
    filterDisplay(filteredItems) {
        this.algorithms.forEach(item => {
            const shouldShow = filteredItems.includes(item);
            item.element.style.display = shouldShow ? 'block' : 'none';
        });
    }
    
    showAllItems() {
        this.algorithms.forEach(item => {
            item.element.style.display = 'block';
        });
    }
    
    updateCountBadge(count = null, label = null) {
        if (!this.countBadge) return;
        
        if (count === null) {
            // Count all visible cards
            const visibleCards = document.querySelectorAll('.algorithm-card[style*="block"], .algorithm-card:not([style]), .algorithm-card:not([style*="none"])');
            count = visibleCards.length;
        }
        
        // Update the count span (second span in the badge)
        const countSpan = this.countBadge.querySelector('span:last-child');
        if (countSpan) {
            countSpan.textContent = count.toString();
        }
        this.countBadge.classList.add('visible');
    }
}

// Export for module environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SimpleSearch;
}

// ES6 export
export default SimpleSearch;
