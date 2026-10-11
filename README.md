#  VidaFit Market

## Plataforma web de bienestar y comercialización de productos para humanos y mascotas

VidaFit Market es una aplicación web orientada a la gestión y comercialización de productos relacionados con el bienestar integral, diseñada para facilitar la administración de procesos comerciales, usuarios, productos y servicios dentro de una plataforma organizada.

El proyecto integra una solución tecnológica con arquitectura Frontend - Backend - Base de Datos, permitiendo la interacción entre usuarios y administradores mediante diferentes módulos de gestión.

La plataforma está enfocada en ofrecer un espacio donde los usuarios puedan consultar productos saludables para personas y soluciones de cuidado para mascotas, mientras los administradores cuentan con herramientas para controlar la información del sistema.

---

#  Objetivo del proyecto

Desarrollar una plataforma web que permita gestionar procesos de comercialización de productos mediante una arquitectura organizada, facilitando la administración de usuarios, productos, pedidos y demás procesos relacionados con el funcionamiento del sistema.

El proyecto busca aplicar buenas prácticas de desarrollo de software, separación de componentes y manejo estructurado de información mediante tecnologías web modernas.

---

#  Funcionalidades del sistema

##  Gestión de usuarios

Permite administrar la información de los usuarios registrados dentro de la plataforma.

Funciones:

- Registro de usuarios.
- Inicio de sesión.
- Gestión de perfiles.
- Control de acceso.
- Administración de usuarios.

---

##  Gestión de productos

Módulo encargado de administrar el catálogo disponible en la plataforma.

Funciones:

- Registro de productos.
- Actualización de información.
- Consulta del catálogo.
- Administración de productos disponibles.
- Organización de productos para humanos y mascotas.

---

##  Gestión de pedidos

Permite controlar el proceso comercial realizado dentro del sistema.

Funciones:

- Registro de pedidos.
- Consulta de pedidos.
- Seguimiento del estado de compra.
- Administración de solicitudes realizadas por usuarios.

---

##  Gestión de devoluciones

Módulo destinado al control de solicitudes posteriores a la compra.

Funciones:

- Registro de devoluciones.
- Seguimiento del proceso.
- Administración de solicitudes.

---

##  Módulo de mascotas

Espacio orientado a la gestión de información relacionada con animales de compañía.

Funciones:

- Registro de información de mascotas.
- Administración de productos enfocados en animales.
- Gestión de soluciones de cuidado.

---

##  Blog informativo

Permite publicar contenido relacionado con bienestar y recomendaciones para los usuarios.

Funciones:

- Creación de publicaciones.
- Consulta de información.
- Gestión de contenido informativo.

---

##  Sistema de recomendaciones

Módulo encargado de ofrecer sugerencias relacionadas con productos y necesidades del usuario.

Funciones:

- Recomendación de productos.
- Orientación de compra.
- Información personalizada.

---

##  Reportes administrativos

Permite generar información para apoyar la gestión del sistema.

Funciones:

- Consulta de información.
- Generación de reportes.
- Apoyo a la toma de decisiones administrativas.

---

#  Arquitectura del proyecto

El sistema está organizado mediante una arquitectura separada por capas:

```
Usuario
   |
Frontend Web
   |
Backend API ASP.NET
   |
Base de Datos SQL Server
```

Esta estructura permite mantener organizada la interfaz, la lógica del negocio y el almacenamiento de información.

---

#  Tecnologías utilizadas

## Backend

- C#
- ASP.NET Web API
- Entity Framework
- .NET

## Frontend

- HTML5
- CSS3
- JavaScript

## Base de datos

- SQL Server

## Herramientas utilizadas

- Visual Studio
- Visual Studio Code
- SQL Server Management Studio
- GitHub

---

#  Estructura del proyecto

```
VidaFit-Market
│
├── backend
│   └── VidafitMarket.backend
│       ├── Controllers
│       ├── Models
│       ├── Data
│       ├── Properties
│       └── Program.cs
│
├── frontend
│   ├── css
│   ├── img
│   ├── js
│   ├── index.html
│   └── módulos del sistema
│
├── database
│   └── Scripts de base de datos
│
└── README.md
```

---

#  Requisitos para ejecutar el proyecto

Antes de ejecutar la aplicación se recomienda contar con:

- Visual Studio 2022.
- .NET SDK instalado.
- SQL Server.
- SQL Server Management Studio.
- Visual Studio Code.
- Navegador web actualizado.

---

#  Instalación y configuración

## 1. Descargar el proyecto

Clonar el repositorio:

```bash
git clone https://github.com/diego19-cpu/VidaFit-Market.git
```

Ingresar a la carpeta:

```bash
cd VidaFit-Market
```

---

#  Configuración del Backend

1. Abrir la carpeta:

```
backend/VidafitMarket.backend
```

2. Abrir el proyecto en Visual Studio.

3. Restaurar las dependencias.

4. Configurar la conexión a la base de datos en:

```
appsettings.json
```

Ejemplo:

```json
"ConnectionStrings": {
  "ConexionSQL": "Server=localhost;Database=VidaFitMarket;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

5. Ejecutar el backend.

---

#  Configuración de Base de Datos

La información de la base de datos se encuentra dentro de:

```
database
```

Pasos:

1. Abrir SQL Server Management Studio.

2. Ejecutar el script correspondiente.

3. Crear la base de datos:

```
VidaFitMarket
```

4. Verificar que la conexión configurada coincida con el servidor SQL instalado.

---

#  Ejecución del Frontend

Ingresar a:

```
frontend
```

Abrir:

```
index.html
```

También puede ejecutarse utilizando Live Server desde Visual Studio Code.

---

#  Estado del proyecto

Proyecto funcional desarrollado como aplicación web completa, integrando frontend, backend y base de datos.

Actualmente cuenta con módulos administrativos y comerciales preparados para la gestión de usuarios, productos, pedidos, mascotas y contenidos informativos.

---

#  Autor

Desarrollado por:

**Juan Diego Manrique**

Proyecto personal de desarrollo de software.

---

#  Licencia

Este proyecto fue desarrollado con fines educativos y como parte del proceso de aprendizaje en desarrollo de software.
