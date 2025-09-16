/**
 * URL Handler for Extensionless URLs
 * 
 * This script enables extensionless URLs by automatically redirecting
 * requests without .html extension to the corresponding .html file
 */

(function() {
    'use strict';
    
    /**
     * Check if current URL needs .html extension and redirect if necessary
     */
    function handleExtensionlessURL() {
        const path = window.location.pathname;
        const search = window.location.search;
        const hash = window.location.hash;
        
        // Don't process if already has .html extension
        if (path.endsWith('.html')) {
            return;
        }
        
        // Don't process root paths or paths with file extensions
        if (path === '/' || path.includes('.')) {
            return;
        }
        
        // Common extensionless URLs to handle
        const extensionlessPages = [
            '/sorting-algorithms',
            '/src/sort/sorting-algorithms'
        ];
        
        // Check if this is a known extensionless URL
        const isKnownPage = extensionlessPages.some(page => 
            path === page || path.endsWith(page)
        );
        
        if (isKnownPage) {
            // Redirect to .html version
            const newURL = path + '.html' + search + hash;
            window.location.replace(newURL);
        }
    }
    
    /**
     * Create extensionless links in navigation
     */
    function createExtensionlessLinks() {
        // Update any links that should be extensionless
        const links = document.querySelectorAll('a[href]');
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            
            // Convert .html links to extensionless for better UX
            if (href && href.includes('.html') && !href.startsWith('http')) {
                const baseHref = href.replace('.html', '');
                const queryAndHash = href.includes('?') ? href.substring(href.indexOf('?')) : '';
                
                // Only update if it's a local link to a page we want extensionless
                if (baseHref.includes('sorting-algorithms')) {
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        // Use replace to avoid back button issues
                        window.location.href = href; // Still go to .html version
                    });
                }
            }
        });
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            handleExtensionlessURL();
            createExtensionlessLinks();
        });
    } else {
        handleExtensionlessURL();
        createExtensionlessLinks();
    }
    
})();