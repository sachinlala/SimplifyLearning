/**
 * Sidebar and Navigation Enhancement Script
 * Handles hamburger menu, sidebar navigation, and improved mobile experience
 */

class SidebarManager {
    constructor() {
        this.sidebar = document.getElementById('sidebar');
        this.sidebarOverlay = document.getElementById('sidebar-overlay');
        this.hamburgerBtn = document.getElementById('hamburger-menu');
        this.closeSidebarBtn = document.getElementById('close-sidebar');
        this.sidebarContent = document.querySelector('.sidebar-content');
        
        this.init();
    }
    
    init() {
        if (!this.sidebar || !this.hamburgerBtn) return;
        
        this.bindEvents();
        this.populateSidebar();
    }
    
    bindEvents() {
        // Hamburger menu click
        this.hamburgerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleSidebar();
        });
        
        // Close button click
        if (this.closeSidebarBtn) {
            this.closeSidebarBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeSidebar();
            });
        }
        
        // Overlay click to close
        if (this.sidebarOverlay) {
            this.sidebarOverlay.addEventListener('click', (e) => {
                if (e.target === this.sidebarOverlay) {
                    this.closeSidebar();
                }
            });
        }
        
        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen()) {
                this.closeSidebar();
            }
        });
    }
    
    toggleSidebar() {
        if (this.isOpen()) {
            this.closeSidebar();
        } else {
            this.openSidebar();
        }
    }
    
    openSidebar() {
        this.sidebarOverlay.classList.add('active');
        this.sidebar.classList.add('active');
        this.hamburgerBtn.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    closeSidebar() {
        this.sidebarOverlay.classList.remove('active');
        this.sidebar.classList.remove('active');
        this.hamburgerBtn.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    isOpen() {
        return this.sidebar.classList.contains('active');
    }
    
    populateSidebar() {
        if (!this.sidebarContent) return;
        
        // Get algorithms from the components.js if available
        const algorithms = this.getAlgorithms();
        
        // Clear existing content
        this.sidebarContent.innerHTML = '';
        
        // Group algorithms by category
        const groupedAlgorithms = this.groupByCategory(algorithms);
        
        // Create sidebar items
        Object.keys(groupedAlgorithms).forEach(category => {
            const categoryHeader = document.createElement('div');
            categoryHeader.className = 'sidebar-category-header';
            categoryHeader.style.cssText = `
                padding: 12px 20px 8px 20px;
                font-weight: 600;
                font-size: 0.9rem;
                color: #666;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                border-bottom: 1px solid #eee;
                background: #f8f9fa;
            `;
            categoryHeader.textContent = category;
            this.sidebarContent.appendChild(categoryHeader);
            
            groupedAlgorithms[category].forEach(algorithm => {
                const item = this.createSidebarItem(algorithm);
                this.sidebarContent.appendChild(item);
            });
        });
    }
    
    getAlgorithms() {
        // All algorithms - matches the ones in components.js plus summary pages
        return [
            // Special summary pages
            {
                name: 'Sorting Algorithms',
                description: 'Comprehensive overview of all sorting algorithms with complexity analysis',
                url: 'src/sort/sorting-algorithms-summary.html',
                category: 'summary',
                subcategory: 'overview',
                icon: '🔀'
            },
            // Individual algorithms
            {
                name: 'Count and Say',
                description: 'Generate sequences where each term describes the previous term',
                url: 'demo.html?algo=patterns/count-and-say',
                category: 'sequences',
                subcategory: 'sequences',
                icon: '🔢'
            },
            {
                name: 'Binary Search',
                description: 'Efficient search algorithm for sorted arrays with O(log n) complexity',
                url: 'demo.html?algo=search/binary-search',
                category: 'search',
                subcategory: 'arrays',
                icon: '🔍'
            },
            {
                name: 'Bubble Sort',
                description: 'Simple sorting algorithm that repeatedly compares adjacent elements',
                url: 'demo.html?algo=sort/bubble-sort',
                category: 'sort',
                subcategory: 'comparison',
                icon: '🫧'
            },
            {
                name: 'Selection Sort',
                description: 'In-place sorting algorithm that finds minimum elements one by one',
                url: 'demo.html?algo=sort/selection-sort',
                category: 'sort',
                subcategory: 'comparison',
                icon: '👆'
            },
            {
                name: 'Insertion Sort',
                description: 'Adaptive sorting algorithm that builds sorted array incrementally',
                url: 'demo.html?algo=sort/insertion-sort',
                category: 'sort',
                subcategory: 'comparison',
                icon: '⬅️'
            },
            {
                name: 'Quick Sort',
                description: 'Efficient divide-and-conquer algorithm with O(n log n) average performance',
                url: 'demo.html?algo=sort/quick-sort',
                category: 'sort',
                subcategory: 'divide-and-conquer',
                icon: '⚡'
            },
            {
                name: 'Merge Sort',
                description: 'Stable divide-and-conquer algorithm with guaranteed O(n log n) time complexity',
                url: 'demo.html?algo=sort/merge-sort',
                category: 'sort',
                subcategory: 'divide-and-conquer',
                icon: '🔗'
            },
            {
                name: 'Heap Sort',
                description: 'In-place sorting algorithm using binary heap with O(n log n) guaranteed performance',
                url: 'demo.html?algo=sort/heap-sort',
                category: 'sort',
                subcategory: 'heap-based',
                icon: '⛰️'
            }
        ];
    }
    
    groupByCategory(algorithms) {
        const grouped = {};
        algorithms.forEach(algorithm => {
            const category = algorithm.category.charAt(0).toUpperCase() + algorithm.category.slice(1);
            if (!grouped[category]) {
                grouped[category] = [];
            }
            grouped[category].push(algorithm);
        });
        return grouped;
    }
    
    createSidebarItem(algorithm) {
        const item = document.createElement('a');
        item.href = algorithm.url;
        item.className = 'sidebar-algorithm-item';
        
        const icon = algorithm.icon || '🔄';
        
        item.innerHTML = `
            <div class="algorithm-icon">${icon}</div>
            <div class="algorithm-info">
                <span class="algorithm-name">${algorithm.name}</span>
                <span class="algorithm-category">${algorithm.category}</span>
            </div>
        `;
        
        item.style.cssText = `
            display: flex;
            align-items: center;
            padding: 12px 20px;
            text-decoration: none;
            color: #333;
            border-bottom: 1px solid #f0f0f0;
            transition: all 0.2s ease;
            gap: 12px;
        `;
        
        // Style the icon and info sections
        const algorithmIcon = item.querySelector('.algorithm-icon');
        const algorithmInfo = item.querySelector('.algorithm-info');
        const algorithmName = item.querySelector('.algorithm-name');
        const algorithmCategory = item.querySelector('.algorithm-category');
        
        if (algorithmIcon) {
            algorithmIcon.style.cssText = `
                font-size: 18px;
                width: 24px;
                text-align: center;
            `;
        }
        
        if (algorithmInfo) {
            algorithmInfo.style.cssText = `
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 2px;
            `;
        }
        
        if (algorithmName) {
            algorithmName.style.cssText = `
                font-weight: 500;
                font-size: 0.9rem;
                color: #333;
            `;
        }
        
        if (algorithmCategory) {
            algorithmCategory.style.cssText = `
                font-size: 0.75rem;
                color: #666;
                text-transform: capitalize;
                background: #f0f0f0;
                padding: 2px 6px;
                border-radius: 8px;
                align-self: flex-start;
                font-weight: 400;
            `;
        }
        
        // Hover effects
        item.addEventListener('mouseenter', () => {
            item.style.backgroundColor = '#f8f9fa';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.backgroundColor = '';
        });
        
        // Close sidebar when item is clicked
        item.addEventListener('click', () => {
            this.closeSidebar();
        });
        
        return item;
    }
}

// Pagination Manager
class PaginationManager {
    constructor(itemsPerPage = 6) {
        this.itemsPerPage = itemsPerPage;
        this.currentPage = 1;
        this.totalItems = 0;
        this.filteredItems = [];
        this.allItems = [];
        
        this.init();
    }
    
    init() {
        this.createPaginationControls();
        this.bindEvents();
    }
    
    createPaginationControls() {
        const algorithmsSection = document.querySelector('.algorithms-section');
        if (!algorithmsSection) return;
        
        const paginationHTML = `
            <div class="pagination-controls" id="pagination-controls" style="display: none;">
                <button class="pagination-btn" id="prev-page" disabled>← Previous</button>
                <span class="pagination-info" id="pagination-info">Page 1 of 1</span>
                <button class="pagination-btn" id="next-page" disabled>Next →</button>
            </div>
        `;
        
        algorithmsSection.insertAdjacentHTML('beforeend', paginationHTML);
    }
    
    bindEvents() {
        const prevBtn = document.getElementById('prev-page');
        const nextBtn = document.getElementById('next-page');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousPage());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextPage());
        }
    }
    
    updateItems(items) {
        this.filteredItems = items;
        this.totalItems = items.length;
        this.currentPage = 1;
        this.render();
    }
    
    render() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const itemsToShow = this.filteredItems.slice(startIndex, endIndex);
        
        // Hide all items first
        const allCards = document.querySelectorAll('.algorithm-card');
        allCards.forEach(card => card.style.display = 'none');
        
        // Show current page items
        itemsToShow.forEach((item, index) => {
            const cardIndex = this.filteredItems.indexOf(item);
            if (allCards[cardIndex]) {
                allCards[cardIndex].style.display = 'block';
            }
        });
        
        this.updatePaginationControls();
        this.updateVisibility();
    }
    
    updatePaginationControls() {
        const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        const prevBtn = document.getElementById('prev-page');
        const nextBtn = document.getElementById('next-page');
        const paginationInfo = document.getElementById('pagination-info');
        
        if (prevBtn) {
            prevBtn.disabled = this.currentPage <= 1;
        }
        
        if (nextBtn) {
            nextBtn.disabled = this.currentPage >= totalPages;
        }
        
        if (paginationInfo) {
            paginationInfo.textContent = `Page ${this.currentPage} of ${totalPages}`;
        }
    }
    
    updateVisibility() {
        const paginationControls = document.getElementById('pagination-controls');
        const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        
        if (paginationControls) {
            paginationControls.style.display = totalPages > 1 ? 'flex' : 'none';
        }
    }
    
    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.render();
        }
    }
    
    nextPage() {
        const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        if (this.currentPage < totalPages) {
            this.currentPage++;
            this.render();
        }
    }
    
    getTotalPages() {
        return Math.ceil(this.totalItems / this.itemsPerPage);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize sidebar
    window.sidebarManager = new SidebarManager();
    
    // Initialize pagination
    window.paginationManager = new PaginationManager(6);
    
    // Wait for algorithm grid to be populated, then set up pagination
    setTimeout(() => {
        const algorithmCards = document.querySelectorAll('.algorithm-card');
        if (algorithmCards.length > 0) {
            const cardArray = Array.from(algorithmCards);
            window.paginationManager.updateItems(cardArray);
        }
    }, 500);
});

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.SidebarManager = SidebarManager;
    window.PaginationManager = PaginationManager;
}
