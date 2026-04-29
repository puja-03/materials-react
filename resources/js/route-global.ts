import * as routes from './routes';

function resolveRoute(name: string, ...args: any[]) {
    const parts = name.split('.');
    let cur: any = routes as any;

    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];

        if (i === parts.length - 1) {
            const candidate = cur[part];

            if (typeof candidate === 'function') {
                return candidate(...args);
            }

            // If it's an object with `.url(...)` helper (wayfinder generated)
            if (candidate && typeof candidate.url === 'function') {
                return candidate.url(...args);
            }

            // If it's a nested object (e.g., products.index) fallthrough
            return candidate;
        }

        cur = cur[part];

        if (!cur) break;
    }

    throw new Error(`Route not found: ${name}`);
}

export function route(name: string, ...args: any[]) {
    return resolveRoute(name, ...args);
}

// Expose globally for legacy code that calls `route(...)`.
(window as any).route = route;

export default route;
