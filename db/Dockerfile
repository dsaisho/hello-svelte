FROM mysql:5

ENV MYSQL_ROOT_PASSWORD password
ENV MYSQL_DATABASE facts_db
ENV MYSQL_USER user
ENV MYSQL_PASSWORD password

# any .sql or .sh file added to the image’s /docker-entrypoint-initdb.d folder will be executed when setting up the DB.
ADD setup.sql /docker-entrypoint-initdb.d