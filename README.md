# Ejercicio-US

API REST creada con NestJS y TypeScript. Este proyecto utiliza almacenamiento temporal en memoria; los registros se pierden al reiniciar el servidor.

## Requisitos

- Node.js compatible con NestJS 11
- npm

## Instalación y ejecución

```bash
npm install
npm run start:dev
```

La API queda disponible normalmente en `http://localhost:3000`.

## Rutas disponibles

| Método | Ruta | Función |
|---|---|---|
| POST | `/usuarios` | Crear un usuario |
| GET | `/usuarios` | Listar usuarios |
| GET | `/usuarios/:id` | Consultar un usuario |
| HEAD | `/usuarios` | Consultar encabezados de la colección |
| HEAD | `/usuarios/:id` | Comprobar un registro sin devolver cuerpo |
| OPTIONS | `/usuarios` | Consultar los métodos aceptados por la colección |
| OPTIONS | `/usuarios/:id` | Consultar los métodos aceptados para un registro |
| PUT | `/usuarios/:id` | Reemplazar todos los datos de un usuario |
| PATCH | `/usuarios/:id` | Actualizar solo los campos enviados |
| DELETE | `/usuarios/:id` | Eliminar un usuario |

## Validación de datos

Para crear o reemplazar un registro, envía un JSON como:

```json
{
  "nombre": "Ana",
  "edad": 22
}
```

`nombre` debe ser texto no vacío y `edad` debe ser un entero mayor o igual que cero. En PATCH se puede enviar solo uno de los campos.

## Pruebas con Postman

1. Envía `POST http://localhost:3000/usuarios` con el JSON anterior.
2. Usa `GET http://localhost:3000/usuarios` para consultar la lista.
3. Copia el `id` devuelto y prueba `GET`, `HEAD`, `PUT`, `PATCH` y `DELETE` en `/usuarios/{id}`.
4. Prueba `OPTIONS http://localhost:3000/usuarios` y revisa el encabezado `Allow`.
5. En `HEAD`, comprueba que se reciben encabezados pero no un cuerpo de respuesta.
6. Para comprobar errores, consulta un identificador que no exista: la API debe responder con un error 404.

## Nota sobre el almacenamiento

El arreglo vive en memoria dentro del servicio. No es una base de datos persistente: al reiniciar la aplicación, la lista vuelve a estar vacía.
