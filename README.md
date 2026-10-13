#  VidaFit Market

# Plataforma web de bienestar y comercialización de productos para humanos y mascotas

---

# 🇪🇸 Español

## Información General

**Autor:** Juan Diego Manrique  
**Tipo de proyecto:** Proyecto personal de desarrollo de software

---

## Introducción

VidaFit Market es una aplicación web orientada a la gestión y comercialización de productos relacionados con el bienestar integral, diseñada para facilitar la administración de procesos comerciales, usuarios, productos y servicios dentro de una plataforma organizada.

El proyecto integra una solución tecnológica basada en una arquitectura Frontend - Backend - Base de Datos, permitiendo la interacción entre usuarios y administradores mediante diferentes módulos de gestión.

La plataforma está enfocada en ofrecer un espacio donde los usuarios puedan consultar productos saludables para personas y soluciones de cuidado para mascotas, mientras los administradores cuentan con herramientas para controlar y gestionar la información del sistema.

---

# Objetivo del proyecto

Desarrollar una plataforma web que permita gestionar procesos de comercialización de productos mediante una arquitectura organizada, facilitando la administración de usuarios, productos, pedidos y demás procesos relacionados con el funcionamiento del sistema.

El proyecto busca aplicar buenas prácticas de desarrollo de software, separación de componentes y manejo estructurado de información mediante tecnologías web modernas.

---

# Funcionalidades del sistema

## Gestión de usuarios

Permite administrar la información de los usuarios registrados dentro de la plataforma.

Funciones:

- Registro de usuarios.
- Inicio de sesión.
- Gestión de perfiles.
- Control de acceso.
- Administración de usuarios.

---

## Gestión de productos

Módulo encargado de administrar el catálogo disponible dentro de la plataforma.

Funciones:

- Registro de productos.
- Actualización de información.
- Consulta del catálogo.
- Administración de productos disponibles.
- Organización de productos para humanos y mascotas.

---

## Gestión de pedidos

Permite controlar el proceso comercial realizado dentro del sistema.

Funciones:

- Registro de pedidos.
- Consulta de pedidos.
- Seguimiento del estado de compra.
- Administración de solicitudes realizadas por usuarios.

---

## Gestión de devoluciones

Módulo destinado al control de solicitudes posteriores a la compra.

Funciones:

- Registro de devoluciones.
- Seguimiento del proceso.
- Administración de solicitudes.

---

## Módulo de mascotas

Espacio orientado a la gestión de información relacionada con animales de compañía.

Funciones:

- Registro de información de mascotas.
- Administración de productos enfocados en animales.
- Gestión de soluciones de cuidado.

---

## Blog informativo

Permite publicar contenido relacionado con bienestar y recomendaciones para los usuarios.

Funciones:

- Creación de publicaciones.
- Consulta de información.
- Gestión de contenido informativo.

---

## Sistema de recomendaciones

Módulo encargado de ofrecer sugerencias relacionadas con productos y necesidades del usuario.

Funciones:

- Recomendación de productos.
- Orientación de compra.
- Información personalizada.

---

## Reportes administrativos

Permite generar información para apoyar la gestión del sistema.

Funciones:

- Consulta de información.
- Generación de reportes.
- Apoyo a la toma de decisiones administrativas.

---

# Arquitectura del proyecto

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

Esta estructura permite mantener organizada la interfaz del usuario, la lógica del negocio y el almacenamiento de información.

---

# Tecnologías utilizadas

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

---

# Herramientas utilizadas

- Visual Studio
- Visual Studio Code
- SQL Server Management Studio
- GitHub

---

# Estructura del proyecto

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

# Requisitos para ejecutar el proyecto

Antes de ejecutar la aplicación se recomienda contar con:

- Visual Studio 2022.
- .NET SDK instalado.
- SQL Server.
- SQL Server Management Studio.
- Visual Studio Code.
- Navegador web actualizado.

---

# Instalación y configuración

## Descargar el proyecto

Clonar el repositorio:

```bash
git clone https://github.com/diego19-cpu/VidaFit-Market.git
```

Ingresar a la carpeta:

```bash
cd VidaFit-Market
```

---

# Configuración del Backend

Ingresar a:

```
backend/VidafitMarket.backend
```

Abrir el proyecto utilizando Visual Studio.

Restaurar las dependencias necesarias.

Configurar la conexión a la base de datos en:

```
appsettings.json
```

Ejemplo:

```json
"ConnectionStrings": {
  "ConexionSQL": "Server=localhost;Database=VidaFitMarket;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

Ejecutar el proyecto Backend.

---

# Configuración de Base de Datos

La información de la base de datos se encuentra ubicada en:

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

# Ejecución del Frontend

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

# Estado del proyecto

Proyecto funcional desarrollado como aplicación web completa, integrando frontend, backend y base de datos.

Actualmente cuenta con módulos administrativos y comerciales preparados para la gestión de usuarios, productos, pedidos, mascotas y contenidos informativos.

---

# Autor

Desarrollado por:

## Juan Diego Manrique

Proyecto personal de desarrollo de software.

---

---

# 🇺🇸 English

# VidaFit Market

## Web platform for wellness and commercialization of products for humans and pets

---

# General Information

**Author:** Juan Diego Manrique  
**Project Type:** Personal software development project

---

# Introduction

VidaFit Market is a web application focused on the management and commercialization of products related to integral wellness, designed to facilitate the administration of commercial processes, users, products, and services within an organized platform.

The project integrates a technological solution based on a Frontend - Backend - Database architecture, allowing interaction between users and administrators through different management modules.

The platform provides a space where users can consult healthy products for people and pet care solutions, while administrators have tools to control and manage system information.

---

# Project Objective

Develop a web platform that allows the management of product commercialization processes through an organized architecture, facilitating the administration of users, products, orders, and other processes related to the operation of the system.

The project applies software development best practices, component separation, and structured information management using modern web technologies.

---

# System Features

## User Management

Allows the administration of registered user information.

Functions:

- User registration.
- Login system.
- Profile management.
- Access control.
- User administration.

---

## Product Management

Module responsible for managing the available catalog.

Functions:

- Product registration.
- Information updates.
- Catalog consultation.
- Product administration.
- Organization of products for humans and pets.

---

## Order Management

Allows controlling the commercial process.

Functions:

- Order registration.
- Order consultation.
- Purchase status tracking.
- User request management.

---

## Returns Management

Module designed to control post-purchase requests.

Functions:

- Return registration.
- Process tracking.
- Request management.

---

## Pet Module

Focused on managing information related to companion animals.

Functions:

- Pet information registration.
- Animal product management.
- Care solution management.

---

## Informative Blog

Allows publishing wellness-related content.

Functions:

- Post creation.
- Information consultation.
- Content management.

---

## Recommendation System

Provides suggestions related to products and user needs.

Functions:

- Product recommendations.
- Purchase guidance.
- Personalized information.

---

## Administrative Reports

Provides information to support system management.

Functions:

- Information consultation.
- Report generation.
- Administrative decision support.

---

# Project Architecture

```
User
   |
Web Frontend
   |
ASP.NET API Backend
   |
SQL Server Database
```

This architecture separates the user interface, business logic, and information storage.

---

# Technologies Used

## Backend

- C#
- ASP.NET Web API
- Entity Framework
- .NET

## Frontend

- HTML5
- CSS3
- JavaScript

## Database

- SQL Server

---

# Tools Used

- Visual Studio
- Visual Studio Code
- SQL Server Management Studio
- GitHub

---

# Project Structure

```
VidaFit-Market
│
├── backend
│   └── VidafitMarket.backend
│
├── frontend
│
├── database
│
└── README.md
```

---

# Project Status

Functional web application integrating frontend, backend, and database components.

The system includes administrative and commercial modules for managing users, products, orders, pets, and informative content.

---

# Author

Developed by:

## Juan Diego Manrique

Personal software development project.

---

# License

This project was developed for educational purposes and personal software development practice.
