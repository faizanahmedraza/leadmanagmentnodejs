require("dotenv").config({ path: "./.env.local" });

const app = {
    app_name: process.env.APP_NAME || 'Lead Management Tool',
    port: process.env.APP_PORT || 5000,
    roles: {
        admin: 1,
        manager: 2,
        sales: 3
    }
}

module.exports = app;