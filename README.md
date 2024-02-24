## :hammer: Librerías usadas

- `laravel/pint`: PHP code style fixer
- `darkaonline/l5-swagger`: Documentación de la api
- `phpstan`: Análisi estatico
- `docker`: Uso de contenedores
- `vuetify`: Para las vistas
- `vue`: Para exportar a google sheets

## Comandos

```bash
# ejecutar phpstan
$ docker exec sysop-app composer phpstan 

# exportar comentarios
$ docker exec sysop-app artisan export:comments

# levantar contenedores
$ docker exec sysop-app up -d

# bajar contenedores
$ docker exec sysop-app down
```

## Requisitos

- `Docker`

## Instalación

- `Backend`

* Clonar repositorio
* Copiar .env.example como .env
* Modificar variables de entorno
* Entrar al directorio .docker y copiar .env.example como .env
* Modificar variables de entorno
* Configurar correo
* En directorio raiz ejecutar entrar al directorio .docker ejecutar => docker compose up -d
* instalar dependencias => docker exec sysop-app composer install
* Correr migraciones => docker exec sysop-app php artisan migrate --seed
* Generar Appplication key => docker exec sysop-app artisan key:generate
* Entrar al contenedor con docker exec -ti sysop-app bash

- `Frontend`

* Clonar repositorio
* Copiar .env.example como .env
* Modificar variables de entorno
* instalar dependencias => npm install
* correr frontend => npm run dev

## Notas
En esta prueba me decidí por el patrón repositorio para la reutilización de código en la parte del backend.
En el frontend he decidido usar algo de arquitectura hexagonal usando typescript y pinia para la gestión del store.
