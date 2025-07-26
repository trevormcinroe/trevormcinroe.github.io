// header.js - Reusable header component

class CivitasHeader {
    constructor() {
        this.pages = {
            'civitas': 'home',
            'civitas_why': 'environment',
            'research.html': 'research',
            'civitas_documentation': 'docs',
            'contact.html': 'contact'
        };
    }

    // Get the current page from URL or filename
    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'civitas.html'; // Default to home
        return this.pages[filename] || 'home';
    }

    // Generate header HTML
    generateHTML() {
        const currentPage = this.getCurrentPage();

        return `
            <header>
                <a href="civitas" class="logo">Civitas</a>
                <nav>
                    <a href="civitas_why" class="${currentPage === 'environment' ? 'active' : ''}">Environment</a>
                    <a href="research.html" class="${currentPage === 'research' ? 'active' : ''}">Research</a>
                    <a href="civitas_documentation" class="${currentPage === 'docs' ? 'active' : ''}">Documentation</a>
                    <a href="contact.html" class="${currentPage === 'contact' ? 'active' : ''}">Contact</a>
                </nav>
            </header>
        `;
    }

    // Insert header into page
    render(containerId = 'header-container') {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = this.generateHTML();
        } else {
            console.error(`Header container with ID "${containerId}" not found`);
        }
    }

    // Alternative method: replace placeholder
    replacePlaceholder(placeholder = '{{HEADER}}') {
        document.addEventListener('DOMContentLoaded', () => {
            const html = document.documentElement.outerHTML;
            if (html.includes(placeholder)) {
                document.documentElement.outerHTML = html.replace(placeholder, this.generateHTML());
            }
        });
    }
}

// Initialize and expose globally
const civitasHeader = new CivitasHeader();

// Auto-render if header-container exists
document.addEventListener('DOMContentLoaded', () => {
    civitasHeader.render();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CivitasHeader;
}
