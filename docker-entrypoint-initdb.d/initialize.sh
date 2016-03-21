#!/bin/bash
set -e

gosu postgres psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE USER hireorbit;
    CREATE DATABASE hireorbit;
    GRANT ALL PRIVILEGES ON DATABASE hireorbit TO hireorbit;
EOSQL
