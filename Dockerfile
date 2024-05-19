# use PHP 8.2
FROM php:8.2-fpm

# Install common php extension dependencies
RUN apt-get update && apt-get install -y \
    libfreetype-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    zlib1g-dev \
    libzip-dev \
    unzip \
    git \
    && apt-get install -y nodejs build-essential npm \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-install zip

# Set the working directory
COPY . /var/www/app
WORKDIR /var/www/app/backend

RUN chown -R www-data:www-data /var/www/app/backend \
    && chmod -R 775 /var/www/app/backend/storage

# install composer
COPY --from=composer:2.6.5 /usr/bin/composer /usr/local/bin/composer

# RUN cat composer.json
# copy composer.json to workdir & install dependencies
# COPY composer.json ./
RUN composer install

# Set the default command to run php-fpm
CMD ["php-fpm"]