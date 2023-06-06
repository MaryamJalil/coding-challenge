"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configuration = void 0;
const config_1 = require("@nestjs/config");
exports.configuration = (0, config_1.registerAs)('app', () => {
    if (process.env.NODE_ENV === 'production') {
        return {
            dbHost: process.env.DATABASE_HOST,
            dbPort: process.env.DATABASE_PORT,
            dbUsername: process.env.DATABASE_USER,
            dbPassword: process.env.DATABASE_PASSWORD,
            dbName: process.env.DATABASE_NAME,
            graphqlPlaygroundEnabled: process.env.GRAPHQL_PLAYGROUND_ENABLED,
        };
    }
    else {
        return {
            dbHost: process.env.DATABASE_HOST,
            dbPort: process.env.DATABASE_PORT,
            dbUsername: process.env.DATABASE_USER,
            dbPassword: process.env.DATABASE_PASSWORD,
            dbName: process.env.DATABASE_NAME,
            graphqlPlaygroundEnabled: process.env.GRAPHQL_PLAYGROUND_ENABLED,
        };
    }
});
//# sourceMappingURL=configuration.js.map