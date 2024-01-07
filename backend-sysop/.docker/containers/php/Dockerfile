FROM php:8.2.8-fpm

ARG PHP_TIME_ZONE
RUN ln -snf /usr/share/zoneinfo/${PHP_TIME_ZONE} /etc/localtime && echo ${PHP_TIME_ZONE} > /etc/timezone
# Arguments defined in docker-compose.yml
ARG user
ARG uid

# Install system dependencies
RUN apt-get update && apt-get install -y \
  git \
  curl \
  libssl-dev \
  zlib1g-dev \
  libpng-dev \
  libjpeg-dev \
  libfreetype6-dev \
  libonig-dev \
  libxml2-dev \
  libicu-dev \
  zip \
  unzip \
  libzip-dev

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install zip mysqli soap pdo_mysql mbstring exif pcntl bcmath gd  && docker-php-ext-enable mysqli && docker-php-ext-configure intl \
  && docker-php-ext-install \
  intl \
  && docker-php-ext-enable intl


RUN docker-php-ext-configure gd \
  # --with-freetype-dir=/usr/include/ \
  # --with-jpeg-dir=/usr/include/ \
  --with-freetype \
  --with-jpeg=/usr/include/ \
  --with-freetype=/usr/include/

RUN docker-php-ext-install -j$(nproc) gd

COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/bin/

RUN install-php-extensions zip

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Create system user to run Composer and Artisan Commands
RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/.composer && \
  chown -R $user:$user /home/$user

# Set working directory
WORKDIR /var/www

USER $user