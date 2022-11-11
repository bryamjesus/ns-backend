# Nacho Store - API
Clone o descargue el proyecto y en la consola ponga el siguiente comando
```bash
npm i
```

## Endpoint User
| Método | Ruta                                 | Descripción               |
| ------ | ------------------------------------ | ------------------------- |
| POST   | http://localhost:3000/api/user/login | Login                     |
| GET    | http://localhost:3000/api/user       | Listar todos los usuarios |
| GET    | http://localhost:3000/api/user/id    | Listar un usuario         |
| POST   | http://localhost:3000/api/user       | Crear usuario             |
| PUT    | http://localhost:3000/api/user/id    | Editar usuario            |
| DELETE | http://localhost:3000/api/user/id    | Eliminar usuario          |

## Endpoint Category
| Método | Ruta                                  | Descripción                 |
| ------ | ------------------------------------- | --------------------------- |
| GET    | http://localhost:3000/api/category    | Listar todas las categorías |
| GET    | http://localhost:3000/api/category/id | Listar una categoría        |
| POST   | http://localhost:3000/api/category    | Crear categoría             |
| PUT    | http://localhost:3000/api/category/id | Editar categoría            |
| DELETE | http://localhost:3000/api/category/id | Eliminar categoría          |