const path = require('path');

module.exports = ({ env }) => {
    const client = env('DATABASE_CLIENT', 'sqlite'); // This defaults to 'sqlite' if DATABASE_CLIENT is not set

    const connections = {
        postgres: {
        connection: {
            connectionString: env('DATABASE_URL'), // Use DATABASE_URL for the PostgreSQL connection string
                ssl: env.bool('DATABASE_SSL', false) && {
                key: env('DATABASE_SSL_KEY', undefined),
                cert: env('DATABASE_SSL_CERT', undefined),
                ca: env('DATABASE_SSL_CA', undefined),
                capath: env('DATABASE_SSL_CAPATH', undefined),
                cipher: env('DATABASE_SSL_CIPHER', undefined),
                rejectUnauthorized: env.bool(
                    'DATABASE_SSL_REJECT_UNAUTHORIZED',
                    true
                ),
            },
            schema: env('DATABASE_SCHEMA', 'public'), // Default schema for PostgreSQL
        },
            pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
        },
        // Other clients (mysql, mysql2, sqlite) are not needed if you're using PostgreSQL
    };

    return {
        connection: {
            client: 'postgres', // Ensure this is set to 'postgres'
            ...connections[client], // Apply the PostgreSQL configuration
            acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
        },
    };
};
