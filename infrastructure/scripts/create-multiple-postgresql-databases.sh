#!/bin/bash

set -e
set -u

function create_user_and_database() {
	local database=$1
	echo "  Creating user and database '$database'"
	psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE $database;
    GRANT ALL PRIVILEGES ON DATABASE $database TO admin;
	EOSQL
}

echo "Multiple database creation"

regs=$(echo $POSTGRES_MULTIPLE_DATABASES | tr "," "\n")

for reg in $regs
do
	create_user_and_database $reg
done

echo "Multiple databases created"
