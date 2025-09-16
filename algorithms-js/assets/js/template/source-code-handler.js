/**
 * Source Code Handler - GitHub Links Generation
 * 
 * Handles source code section generation with multi-language support.
 * Separated from the main template class for better maintainability.
 * 
 * @see https://github.com/sachinlala/SimplifyLearning
 */

class SourceCodeHandler {
    /**
     * Generate source code section with language links
     */
    static generateSourceCodeSection(config) {
        // Use sourceCode paths if available, otherwise generate proper paths
        // Prefer *-core.js files for JavaScript source code links
        const sourceCode = config.sourceCode || {
            javascript: PathGenerator.generateGithubPath(config), // This now prefers *-core.js files
            java: PathGenerator.generateJavaPath(config),
            python: "",
            go: ""
        };
        
        // Language configurations with proper icons and more subtle colors
        const languages = [
            {
                name: 'JavaScript',
                icon: `<svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M0 0h256v256H0V0zm81.706 213.381c0 12.814-7.526 20.907-18.618 20.907-9.968 0-15.717-5.158-18.618-11.378l10.088-6.094c1.943 3.445 3.708 6.37 7.978 6.37 4.088 0 6.693-1.608 6.693-7.882v-42.669h12.477v61.646zm50.6 20.907c-11.565 0-19.056-5.503-22.732-12.814l10.088-5.837c2.644 4.315 6.092 7.526 12.12 7.526 5.085 0 8.345-2.532 8.345-6.04 0-4.2-3.348-5.68-8.978-8.134l-3.081-1.322c-8.887-3.784-14.787-8.535-14.787-18.573 0-9.24 7.04-16.28 18.056-16.28 7.844 0 13.471 2.733 17.522 9.887l-9.598 6.158c-2.111-3.784-4.385-5.269-7.924-5.269-3.606 0-5.895 2.287-5.895 5.269 0 3.686 2.289 5.178 7.587 7.465l3.081 1.322c10.473 4.496 16.373 9.106 16.373 19.454 0 11.146-8.75 17.177-20.478 17.177z"/></svg>`,
                url: sourceCode.javascript,
                background: '#fff3cd',
                color: '#856404',
                border: '#ffeaa7',
                enabled: true
            },
            {
                name: 'Java',
                icon: '☕',
                url: sourceCode.java,
                background: '#ffecd1', 
                color: '#d68910',
                border: '#f8c471',
                enabled: !!sourceCode.java
            },
            {
                name: 'Python',
                icon: `<svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z" fill="#306998"/><path d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.131 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z" fill="#FFD43B"/></svg>`,
                url: sourceCode.python,
                background: '#e8f4fd',
                color: '#2874a6',
                border: '#aed6f1',
                enabled: !!sourceCode.python
            },
            {
                name: 'Go',
                icon: `<svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M40.669 80.763v2.348c0 .653.461 1.192 1.073 1.307l35.24 6.652c.537.102 1.097-.216 1.239-.704l2.687-9.296c.142-.488-.197-1.018-.748-1.172l-35.249-9.835c-.551-.154-1.188.178-1.405.815l-2.837 9.885zm24.076 34.482h-.001c-11.292 0-20.451-8.801-20.451-19.656 0-10.855 9.159-19.656 20.451-19.656 11.293 0 20.451 8.801 20.451 19.656 0 10.855-9.158 19.656-20.45 19.656z" fill="#00ADD8"/><path d="M108.579 80.763v2.348c0 .653.461 1.192 1.073 1.307l35.24 6.652c.537.102 1.097-.216 1.239-.704l2.687-9.296c.142-.488-.197-1.018-.748-1.172l-35.249-9.835c-.551-.154-1.188.178-1.405.815l-2.837 9.885zm24.076 34.482h-.001c-11.292 0-20.451-8.801-20.451-19.656 0-10.855 9.159-19.656 20.451-19.656 11.293 0 20.451 8.801 20.451 19.656 0 10.855-9.158 19.656-20.45 19.656z" fill="#00ADD8"/></svg>`,
                url: sourceCode.go,
                background: '#e1f5fe',
                color: '#0288d1', 
                border: '#81d4fa',
                enabled: !!sourceCode.go
            }
        ];
        
        const languageLinks = languages.map(lang => {
            if (lang.enabled) {
                return `<a href="${lang.url}"
                           target="_blank" 
                           style="display: inline-flex; align-items: center; gap: 6px; padding: 8px 12px; background: ${lang.background}; color: ${lang.color}; text-decoration: none; border-radius: 6px; font-weight: 500; font-size: 0.85em; transition: all 0.3s ease; border: 1px solid ${lang.border || lang.background}; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                           ${lang.icon} ${lang.name}
                        </a>`;
            } else {
                return `<span style="display: inline-flex; align-items: center; gap: 6px; padding: 8px 12px; background: #f8f9fa; color: #6c757d; border-radius: 6px; font-weight: 500; font-size: 0.85em; cursor: not-allowed; opacity: 0.7; border: 1px solid #e9ecef; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                           ${lang.icon} <span style="text-decoration: line-through;">${lang.name}</span> <small>(Coming Soon)</small>
                        </span>`;
            }
        }).join('\n                    ');
        
        return `
            <!-- Source Code Links -->
            <div class="source-code-section" style="background: #fff; padding: 12px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); font-size: 0.85em;">
                <h4 style="margin: 0 0 8px 0; font-size: 1.1em;">Source Code</h4>
                <p style="margin: 0 0 10px 0; font-size: 0.9em;">View the complete implementation in multiple languages:</p>
                <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px;">
                    ${languageLinks}
                </div>
                <div style="margin-top: 8px; font-size: 0.75em; color: #666;">
                    <em>Note: Additional language implementations are in development.</em>
                </div>
            </div>`;
    }

    /**
     * Get language configuration with icons and styling
     */
    static getLanguageConfig() {
        return {
            javascript: {
                name: 'JavaScript',
                icon: `<svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M0 0h256v256H0V0zm81.706 213.381c0 12.814-7.526 20.907-18.618 20.907-9.968 0-15.717-5.158-18.618-11.378l10.088-6.094c1.943 3.445 3.708 6.37 7.978 6.37 4.088 0 6.693-1.608 6.693-7.882v-42.669h12.477v61.646zm50.6 20.907c-11.565 0-19.056-5.503-22.732-12.814l10.088-5.837c2.644 4.315 6.092 7.526 12.12 7.526 5.085 0 8.345-2.532 8.345-6.04 0-4.2-3.348-5.68-8.978-8.134l-3.081-1.322c-8.887-3.784-14.787-8.535-14.787-18.573 0-9.24 7.04-16.28 18.056-16.28 7.844 0 13.471 2.733 17.522 9.887l-9.598 6.158c-2.111-3.784-4.385-5.269-7.924-5.269-3.606 0-5.895 2.287-5.895 5.269 0 3.686 2.289 5.178 7.587 7.465l3.081 1.322c10.473 4.496 16.373 9.106 16.373 19.454 0 11.146-8.75 17.177-20.478 17.177z"/></svg>`,
                colors: { background: '#fff3cd', color: '#856404', border: '#ffeaa7' }
            },
            java: {
                name: 'Java',
                icon: '☕',
                colors: { background: '#ffecd1', color: '#d68910', border: '#f8c471' }
            },
            python: {
                name: 'Python',
                icon: `<svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z" fill="#306998"/><path d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.131 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z" fill="#FFD43B"/></svg>`,
                colors: { background: '#e8f4fd', color: '#2874a6', border: '#aed6f1' }
            },
            go: {
                name: 'Go',
                icon: `<svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M40.669 80.763v2.348c0 .653.461 1.192 1.073 1.307l35.24 6.652c.537.102 1.097-.216 1.239-.704l2.687-9.296c.142-.488-.197-1.018-.748-1.172l-35.249-9.835c-.551-.154-1.188.178-1.405.815l-2.837 9.885zm24.076 34.482h-.001c-11.292 0-20.451-8.801-20.451-19.656 0-10.855 9.159-19.656 20.451-19.656 11.293 0 20.451 8.801 20.451 19.656 0 10.855-9.158 19.656-20.45 19.656z" fill="#00ADD8"/><path d="M108.579 80.763v2.348c0 .653.461 1.192 1.073 1.307l35.24 6.652c.537.102 1.097-.216 1.239-.704l2.687-9.296c.142-.488-.197-1.018-.748-1.172l-35.249-9.835c-.551-.154-1.188.178-1.405.815l-2.837 9.885zm24.076 34.482h-.001c-11.292 0-20.451-8.801-20.451-19.656 0-10.855 9.159-19.656 20.451-19.656 11.293 0 20.451 8.801 20.451 19.656 0 10.855-9.158 19.656-20.45 19.656z" fill="#00ADD8"/></svg>`,
                colors: { background: '#e1f5fe', color: '#0288d1', border: '#81d4fa' }
            }
        };
    }
}

// Export for both environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SourceCodeHandler;
} else if (typeof window !== 'undefined') {
    window.SourceCodeHandler = SourceCodeHandler;
}