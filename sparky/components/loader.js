/**
 * Simple component loader for static HTML files
 * Loads header and footer components based on data attributes
 */
(function () {
    function loadComponent(element, path) {
        if (!element || !path) return;

        fetch(path)
            .then(response => {
                if (!response.ok) {
                    console.warn(`Failed to load component: ${path}`);
                    return;
                }
                return response.text();
            })
            .then(html => {
                if (html) {
                    element.innerHTML = html;
                }
            })
            .catch(err => {
                console.warn(`Error loading component ${path}:`, err);
            });
    }

    // Load header components
    document.querySelectorAll('[data-header]').forEach(element => {
        const headerType = element.getAttribute('data-header');
        const basePath = element.getAttribute('data-base-path') || '../components/';
        const path = basePath + (headerType === 'sparky' ? 'header-sparky.html' : 'header-main.html');
        loadComponent(element, path);
    });

    // Load footer components
    document.querySelectorAll('[data-footer]').forEach(element => {
        const basePath = element.getAttribute('data-base-path') || '../components/';
        const path = basePath + 'footer.html';
        loadComponent(element, path);
    });
})();
