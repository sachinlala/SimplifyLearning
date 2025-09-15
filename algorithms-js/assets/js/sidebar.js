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
        
        // Clear search when sidebar is closed
        if (this.searchInput) {
            this.searchInput.value = '';
            if (this.allAlgorithms) {
                this.displayAlgorithms(this.allAlgorithms);
            }
        }
    }
    
    isOpen() {
        return this.sidebar.classList.contains('active');
    }
    
    populateSidebar() {
        if (!this.sidebarContent) return;
        
        // Get algorithms from the components.js if available
        this.allAlgorithms = this.getAlgorithms();
        
        // Clear existing content
        this.sidebarContent.innerHTML = '';
        
        // Create search input
        this.createSearchInput();
        
        // Create algorithm items container
        this.algorithmsContainer = document.createElement('div');
        this.algorithmsContainer.className = 'sidebar-algorithms-container';
        this.sidebarContent.appendChild(this.algorithmsContainer);
        
        // Display all algorithms initially
        this.displayAlgorithms(this.allAlgorithms);
    }
    
    createSearchInput() {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'sidebar-search-container';
        searchContainer.style.cssText = `
            padding: 15px 20px 10px 20px;
            border-bottom: 1px solid var(--border-color, #eee);
            background: var(--surface, #fff);
        `;
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search...';
        searchInput.className = 'sidebar-search-input';
        searchInput.style.cssText = `
            width: 100%;
            padding: 8px 12px;
            border: 1px solid var(--border-color, #ddd);
            border-radius: 6px;
            font-size: 0.9rem;
            background: var(--surface, #fff);
            color: var(--text-body, #333);
            outline: none;
            transition: border-color 0.3s ease;
            box-sizing: border-box;
        `;
        
        // Search functionality
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            this.filterAlgorithms(query);
        });
        
        // Focus styling
        searchInput.addEventListener('focus', () => {
            searchInput.style.borderColor = 'var(--accent, #007acc)';
        });
        
        searchInput.addEventListener('blur', () => {
            searchInput.style.borderColor = 'var(--border-color, #ddd)';
        });
        
        searchContainer.appendChild(searchInput);
        this.sidebarContent.appendChild(searchContainer);
        
        // Store reference for clearing
        this.searchInput = searchInput;
    }
    
    displayAlgorithms(algorithms) {
        if (!this.algorithmsContainer) return;
        
        // Clear container
        this.algorithmsContainer.innerHTML = '';
        
        if (algorithms.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'sidebar-no-results';
            noResults.style.cssText = `
                padding: 20px;
                text-align: center;
                color: var(--text-muted, #666);
                font-style: italic;
            `;
            noResults.textContent = 'No algorithms found';
            this.algorithmsContainer.appendChild(noResults);
            return;
        }
        
        // Create items without category headers
        algorithms.forEach(algorithm => {
            const item = this.createSidebarItem(algorithm);
            this.algorithmsContainer.appendChild(item);
        });
    }
    
    filterAlgorithms(query) {
        if (!query) {
            this.displayAlgorithms(this.allAlgorithms);
            return;
        }
        
        const filtered = this.allAlgorithms.filter(algorithm => {
            return algorithm.name.toLowerCase().includes(query) ||
                   algorithm.description.toLowerCase().includes(query) ||
                   algorithm.category.toLowerCase().includes(query);
        });
        
        this.displayAlgorithms(filtered);
    }
    
    getAlgorithms() {
        // Organized algorithm groups for better navigation
        return [
            // Sorting Algorithms Group
            {
                name: 'Sorting Algorithms',
                description: 'Comprehensive overview of all sorting algorithms with complexity analysis',
                url: 'sorting-algorithms.html',
                category: 'Sorting Algorithms',
                subcategory: 'overview',
                icon: '🔢',
                isGroupHeader: true
            },
            {
                name: 'Bubble Sort',
                description: 'Simple sorting algorithm that repeatedly compares adjacent elements',
                url: 'demo.html?algo=sort/bubble-sort',
                category: 'Sorting Algorithms',
                subcategory: 'comparison',
                icon: '🫧',
                isSubItem: true
            },
            {
                name: 'Selection Sort',
                description: 'In-place sorting algorithm that finds minimum elements one by one',
                url: 'demo.html?algo=sort/selection-sort',
                category: 'Sorting Algorithms',
                subcategory: 'comparison',
                icon: '👆',
                isSubItem: true
            },
            {
                name: 'Insertion Sort',
                description: 'Adaptive sorting algorithm that builds sorted array incrementally',
                url: 'demo.html?algo=sort/insertion-sort',
                category: 'Sorting Algorithms',
                subcategory: 'comparison',
                icon: '⬅️',
                isSubItem: true
            },
            {
                name: 'Quick Sort',
                description: 'Efficient divide-and-conquer algorithm with O(n log n) average performance',
                url: 'demo.html?algo=sort/quick-sort',
                category: 'Sorting Algorithms',
                subcategory: 'divide-and-conquer',
                icon: '⚡',
                isSubItem: true
            },
            {
                name: 'Merge Sort',
                description: 'Stable divide-and-conquer algorithm with guaranteed O(n log n) time complexity',
                url: 'demo.html?algo=sort/merge-sort',
                category: 'Sorting Algorithms',
                subcategory: 'divide-and-conquer',
                icon: '🔗',
                isSubItem: true
            },
            {
                name: 'Heap Sort',
                description: 'In-place sorting algorithm using binary heap with O(n log n) guaranteed performance',
                url: 'demo.html?algo=sort/heap-sort',
                category: 'Sorting Algorithms',
                subcategory: 'heap-based',
                icon: '⛰️',
                isSubItem: true
            },
            // Search Algorithms Group
            {
                name: 'Search Algorithms',
                description: 'Efficient algorithms for finding elements in data structures',
                url: '#search-algorithms-summary', // Placeholder for future search algorithms page
                category: 'Search Algorithms',
                subcategory: 'overview',
                icon: '🔍',
                isGroupHeader: true,
                isPlaceholder: true
            },
            {
                name: 'Binary Search',
                description: 'Efficient search algorithm for sorted arrays with O(log n) complexity',
                url: 'demo.html?algo=search/binary-search',
                category: 'Search Algorithms',
                subcategory: 'arrays',
                icon: '🔎',
                isSubItem: true
            },
            // Numbers & Mathematics Group
            {
                name: 'Numbers & Mathematics',
                description: 'Mathematical algorithms and number sequences',
                url: '#numbers-mathematics-summary', // Placeholder for future math algorithms page
                category: 'Numbers & Mathematics',
                subcategory: 'overview',
                icon: '🧮',
                isGroupHeader: true,
                isPlaceholder: true
            },
            {
                name: 'Count and Say',
                description: 'Generate sequences where each term describes the previous term',
                url: 'demo.html?algo=patterns/count-and-say',
                category: 'Numbers & Mathematics',
                subcategory: 'sequences',
                icon: '🔄',
                isSubItem: true
            }
        ];
    }
    
    createSidebarItem(algorithm) {
        const item = document.createElement('a');
        item.href = algorithm.url;
        
        // Different styling for group headers vs sub-items
        if (algorithm.isGroupHeader) {
            item.className = 'sidebar-group-header';
        } else if (algorithm.isSubItem) {
            item.className = 'sidebar-sub-item';
        } else {
            item.className = 'sidebar-algorithm-item';
        }
        
        const icon = algorithm.icon || '🔄';
        
        // Handle placeholder links (for future pages)
        if (algorithm.isPlaceholder) {
            item.href = '#';
            item.addEventListener('click', (e) => {
                e.preventDefault();
                // Don't close sidebar for placeholder items
            });
        }
        
        item.innerHTML = `
            <div class="algorithm-icon">${icon}</div>
            <div class="algorithm-info">
                <span class="algorithm-name">${algorithm.name}</span>
            </div>
        `;
        
        // Base styling
        let paddingLeft = '20px';
        let fontSize = '0.9rem';
        let fontWeight = '500';
        let backgroundColor = 'transparent';
        
        if (algorithm.isGroupHeader) {
            paddingLeft = '20px';
            fontSize = '0.95rem';
            fontWeight = '600';
            backgroundColor = algorithm.isPlaceholder ? 'rgba(0, 0, 0, 0.02)' : 'transparent';
        } else if (algorithm.isSubItem) {
            paddingLeft = '40px'; // Indent sub-items
            fontSize = '0.85rem';
            fontWeight = '400';
        }
        
        item.style.cssText = `
            display: flex;
            align-items: center;
            padding: 12px ${paddingLeft} 12px 20px;
            text-decoration: none;
            color: var(--text-body, #333);
            border-bottom: 1px solid var(--border-color, #f0f0f0);
            transition: all 0.2s ease;
            gap: 12px;
            background: ${backgroundColor};
        `;
        
        // Style the icon and info sections
        const algorithmIcon = item.querySelector('.algorithm-icon');
        const algorithmInfo = item.querySelector('.algorithm-info');
        const algorithmName = item.querySelector('.algorithm-name');
        
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
                font-weight: ${fontWeight};
                font-size: ${fontSize};
                color: var(--text-body, #333);
            `;
        }
        
        // Hover effects with better accessibility
        item.addEventListener('mouseenter', () => {
            if (algorithm.isPlaceholder) {
                // No hover effect for placeholder items
                return;
            }
            
            const isDarkMode = document.body.classList.contains('dark-mode');
            if (isDarkMode) {
                item.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            } else {
                item.style.backgroundColor = '#e3f2fd'; // Light blue consistent with site
            }
        });
        
        item.addEventListener('mouseleave', () => {
            if (algorithm.isPlaceholder) {
                item.style.backgroundColor = 'rgba(0, 0, 0, 0.02)';
            } else {
                item.style.backgroundColor = backgroundColor;
            }
        });
        
        // Close sidebar when functional item is clicked
        item.addEventListener('click', () => {
            if (!algorithm.isPlaceholder) {
                this.closeSidebar();
            }
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
