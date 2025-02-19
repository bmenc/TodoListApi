# Todo App

Este proyecto es una aplicación de tareas (To-Do List) con funcionalidad CRUD completa. El backend está desarrollado con C# y ASP.NET Core, mientras que el frontend utiliza Next.js con Tailwind CSS, Zod, Tanstack React Table, Axios y React Hook Form.

### Backend

- **Lenguaje**: C#
- **Framework**: ASP.NET Core (.NET 9)
- **ORM**: Entity Framework Core
- **Base de datos**: SQL Server
- **Herramientas**: Visual Studio 2022 / VS Code

### Frontend

- **Framework**: Next.js
- **Estilos**: Tailwind CSS
- **Validación de formularios**: Zod
- **Tablas**: Tanstack React Table
- **Cliente HTTP**: Axios
- **Gestión de formularios**: React Hook Form

### Pruebas

- **Thunderclient**: Colección para pruebas CRUD

## Estructura del Proyecto

```plaintext
/TodoListApi (Backend)
├── Controllers
│   └── TaskItemsController.cs
├── Data
│   └── ApplicationDbContext.cs
├── Models
│   └── TaskItem.cs
├── appsettings.json
├── Program.cs
└── TodoListApi.csproj
```

## Instalación

### Requisitos Previos

- **Backend:**
  - Visual Studio 2022 o VS Code
  - [.NET 6/8 SDK](https://dotnet.microsoft.com/en-us/download)
  - SQL Server
  - SQL Server Management Studio (SSMS)

- **Frontend:**
  - [Node.js (LTS)](https://nodejs.org/)
  - npm o yarn
- **Control de versiones:**
  - Git

### Configuración del Backend

1. **Clonar el repositorio:**
   ```bash
   git clone <repository_url>
   cd <repository_directory>/TodoListApi
   ```

2. **Configurar la cadena de conexión:**

   En `appsettings.json`, actualizar la conexión a la base de datos:

   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Server=YOUR_SERVER;Database=TodoListDb;Trusted_Connection=True;MultipleActiveResultSets=true"
   }
   ```

3. **Instalar dependencias:**
   ```powershell
   Install-Package Microsoft.EntityFrameworkCore
   Install-Package Microsoft.EntityFrameworkCore.SqlServer
   Install-Package Microsoft.EntityFrameworkCore.Tools
   ```

4. **Aplicar migraciones y crear la base de datos:**
   ```powershell
   Add-Migration InitialCreate
   Update-Database
   ```

5. **Ejecutar el Backend:**
   ```bash
   dotnet run
   ```

   La API estará disponible en: `https://localhost:7045/api/TaskItems`

### Configuración del Frontend

1. **Navegar a la carpeta del frontend:**
   ```bash
   cd <repository_directory>/todo-app-frontend
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

   Abrir en el navegador: `http://localhost:3000`

## Pruebas con Thunderclient

Se incluye una colección de Thunderclient (`Thunderclient_Collection.json`) en el repositorio para probar la API.

1. Abrir Thunderclient en VS Code.
2. Importar la colección.
3. Probar los siguientes endpoints:
   - **GET**: `https://localhost:7045/api/TaskItems`
   - **POST**: Crear una nueva tarea.
   - **PUT**: Actualizar una tarea existente. Ejemplo de payload:
     ```json
     {
       "id": 3,
       "title": "Tarea actualizada A",
       "isCompleted": true
     }
     ```
   - **DELETE**: Eliminar una tarea por ID.

## Uso

- **Agregar tarea:** Utilizar el formulario en la página principal.
- **Editar tarea:** Hacer clic en "Edit" para modificar el título y estado.
- **Eliminar tarea:** Hacer clic en "Delete" para eliminar una tarea.

## Contribución

¡Contribuciones, problemas y solicitudes de características son bienvenidos! 

## Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).
