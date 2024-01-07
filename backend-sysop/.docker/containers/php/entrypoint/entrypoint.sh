#!/bin/bash

if php /var/www/artisan > /dev/null; then
    php /var/www/artisan cache:clear
    php /var/www/artisan config:cache
    php /var/www/artisan route:cache
    php /var/www/artisan view:cache
fi

chmod -R o+w /var/www/storage
chmod -R ug+rwx /var/www/storage /var/www/bootstrap/cache
chgrp -R www-data /var/www/storage /var/www/bootstrap/cache