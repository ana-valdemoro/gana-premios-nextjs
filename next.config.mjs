/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
    
        const warning = [
            ...(config.ignoreWarnings || []),
            { module: /typeorm/ },
            { module: /handlebars/ },
            { module: /app-root-path/, message: /the request of a dependency is an expression/ },
        ];
        config.ignoreWarnings = warning;
    
        return config;
    }


};


export default nextConfig;
