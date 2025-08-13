# Proyecto Prueba-DB

## Descripcion

prueba-DB es una aplicacion web disenada para gestionar y practicar conceptos relacionados con bases de datos, brindando tanto un backend robusto como un frontend interactivo. El proyecto permite autenticarse, practicar consultas y gestionar datos de ejemplo desde una interfaz moderna

---

## Aprendizajes y Objetivos

-   Arquitectura Full Stack (Node.js + JavaScript, HTML, databases)
-   Consumo y desarrollo de API REST
-   Manejo de rutas y componentes en backend
-   Persistencia de datos y almacenamiento en frontend y backend
-   Validacion de formularios y sesiones
-   Buenas practicas de desarrollo en JavaScript
-   Interaccion entre frontend y backend
-   Entendimiento de la estructura de un proyecto con bases de datos
---

## Estructura del Proyecto

```
prueba_DB/
├── back/
│   ├── node_modules/
│   ├── uploads/
│   ├── routes/
│   ├── package.json
│   ├── package-lock.json
│   ├── .env
│   ├── .gitignore
│   ├── db.js
│   └── index.js
├── front/
│   ├── routes/
│   │   ├── views/
│   │   │   ├── router.js
│   │   ├── index.js
│   │   ├── main.js
│   │   ├── .gitignore
│   │   ├── package-lock.json
│   │   └── package.json
│   ├── js/
│   │   ├── dashboard.js
│   │   ├── login.js
│   │   └── services.js
│   └── 
└── README.md
```

**Principales archivos y carpetas:**

-   `back/`: Backend Node.js, rutas, logica API y dependencias.
-   `front/views/`: Vistas HTML principales (inicio, login, registro).
-   `front/js/`: Logica de frontend, control de temas y scripts de interaccion.
-   `front/index.html`: Punto de entrada para el frontend.
-   `package.json`: Dependencias y scripts del proyecto.
-   `README.md`: Documentacion del proyecto.

---

## Funcionalidades

-   [x] Registro y login de usuarios
-   [x] Practica de consultas y operaciones sobre datos
-   [x] Vistas de los datos de la base de datos
-   [x] Interfaz interactiva y responsiva
-   [x] Almacenamiento persistente de sesiones y datos
-   [x] Validacion y gestion de formularios
-   [x] Separacion clara entre frontend y backend

---

## Como ejecutar el backend y el frontend desde Visual Studio Code

### 1. Clonar el repositorio

```bash
git clone https://github.com/adr1ann32323/prueba_DB.git
cd prueba_DB
```

### 2. Ejecutar el Backend (Node.js) en Visual Studio Code

1. Abre Visual Studio Code.
2. Haz clic en `Archivo > Abrir carpeta...` y selecciona la carpeta `simulacro-db`.
3. Abre la terminal integrada (`Ctrl + ñ` o `Terminal > Nueva terminal`).
4. Cambia al directorio del backend:
    ```bash
    cd back
    ```
5. Instala las dependencias:
    ```bash
    npm install
    ```
6. Inicia el servidor backend:
    ```bash
    npm start
    ```
    El backend se ejecutara normalmente en `http://localhost:3000` .

### 3. Ejecutar el Frontend en Visual Studio Code

1. Abre una nueva terminal integrada en Visual Studio Code.
2. Cambia al directorio `public` donde esta el archivo principal del frontend:
    ```bash
    cd ../public
    ```
3. Para evitar problemas de rutas, se recomienda usar una extension como **Live Server**:
    - Instala la extension **Live Server** desde el marketplace de VS Code.
    - Haz clic derecho sobre `index.html` y selecciona `Open with Live Server`.
    - Esto abrira tu aplicacion en el navegador, normalmente en `http://127.0.0.1:5500/public/index.html` o similar.

---

## Para que son los endpoints del Backend

El backend expone una API REST con varios endpoints para manejar la logica de la aplicacion. Estos son ejemplos comunes

| Endpoint        | Metodo | Descripcion                                                      |
| --------------- | ------ | ---------------------------------------------------------------- |
| `/api/login`    | POST   | Autentica un usuario y responde con un token/sesion.             |
| `/api/data`     | GET    | Obtiene datos de ejemplo para practicar consultas.               |
| `/api/query`    | POST   | Permite enviar una consulta y devuelve los resultados simulados. |
| `/api/user`     | GET    | Devuelve la informacion del usuario autenticado.                 |


---

## Como es la interfaz del frontend

La interfaz de Simulacro-DB es intuitiva, moderna y responsiva, permitiendo una facil navegacion y practica. Incluye:

-   **Pantalla de inicio/sesion:** Permite registrarse o iniciar sesion con formularios validados.
-   **Panel principal:** Tras iniciar sesion, accedes a una pantalla donde puedes practicar consultas, ver datos de ejemplo y gestionar tu cuenta.
-   **Validacion visual:** Los formularios muestran mensajes claros de error/success.
-   **Responsive:** La UI se adapta a dispositivos moviles y de escritorio.

### Ejemplo de pantallas

#### Vista de registro/login

![Login](src/assets/noteimg.png)

#### Vista principal

![Home](src/assets/noteimg.png)


---

## Errores Comunes

| Error                         | Causa posible                                | Solucion                                                     |
| ----------------------------- | -------------------------------------------- | ------------------------------------------------------------ |
| `Uncaught TypeError`          | Variable no definida o mal uso de metodos    | Revisar variables y metodos declarados correctamente         |
| `cors` | Problemas de CORS (Cross-Origin Resource Sharing) | Asegurarse de que el backend permite solicitudes desde el frontend |
| Error de conexion API         | Backend no levantado o error en rutas        | Verificar que el backend esta ejecutandose y rutas correctas |

---

## Instrucciones para el Profesor

1. Abrir `public/index.html` en el navegador (recomendado con Live Server en VS Code).
2. Interactuar con la app (login, consultas).
3. Verificar almacenamiento de datos en la base de datos y comunicacion con backend.
4. Revisar el codigo fuente en los archivos principales.
5. Consultar comentarios y documentacion dentro del codigo para detalles de implementacion.

---

## Tecnologias usadas

-   **Frontend**:
    -   HTML5
    -   JavaScript (ES6+)
    -   Estilos bootstrap
-   **Backend**:
    -   Node.js
    -   Express
-   **Otras dependencias**:
    -   npm (gestion de paquetes)
    -   Librerias auxiliares incluidas en `package.json` como `cors`, `csv-parser`, `dotenv`,`nodemon`,`multer` etc.
---

## Autor

**Adrian Arboleda**  
[GitHub](https://github.com/adr1ann32323)

---

# prueba_DB
