# Examen Pulpo

El siguiente proyecto sirve de examen para la postulación a desarrollador en Pulpo. No es un proyecto con fines de producción.

## Tech Stack

#### Backend

![NestJS](https://img.shields.io/badge/backend-NestJS-brightgreen)

![TypeORM](https://img.shields.io/badge/orm-TypeORM-orange)

![PostgreSQL](https://img.shields.io/badge/db-PostgreSQL-blue)

#### Frontend

![Angular](https://img.shields.io/badge/frontend-Angular-red)

![Tailwind](https://img.shields.io/badge/css-TailwindCSS-cyan)

## Proceso de instalación

Navega al directorio del backend:

```bash
cd backend
```

Crea un archivo `.env` basado en el archivo `.env.template`:

```bash
cp .env.template .env
```

Vuelve a la raíz del proyecto:

```bash
cd ..
```

Construye y levanta los servicios con Docker:

```bash
docker-compose build
docker-compose up
```

Ejecuta las migraciones:

```bash
docker exec -it examen-pulpo-backend-1 npm run migration:run
```

Para consultar la documentación swagger sera a través de:

-   [http://localhost:3000/api](http://localhost:3000/api)

El frontend estará visible en:

-   [http://localhost:4200](http://localhost:4200)
