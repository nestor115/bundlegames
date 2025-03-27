# Bundle Games

## Descripción

Bundle Games es una aplicación diseñada para la gestión eficiente de colecciones de juegos de mesa, dirigida a aficionados de los juegos de mesa. Facilita la organización de los juegos de mesa y el seguimiento de las personas que han jugado a dichos juegos, proporcionando así una experiencia óptima para los usuarios.

Bundle Games se integra con la API de BoardGameGeek para obtener información detallada sobre los juegos de mesa. Permite a los usuarios buscar y añadir juegos a su colección, así como eliminar juegos existentes. Además, los usuarios pueden añadir amigos a su lista y registrar las partidas jugadas con ellos, asociando amigos a juegos específicos de su colección.

La aplicación cuenta con un sistema de autenticación y gestión de usuarios implementado con Laravel Breeze, asegurando que cada usuario tenga su propia colección y lista de amigos.

## Motivación y Finalidad

Bundle Games surge de la pasión por los juegos de mesa y la comunidad que los rodea. Reconociendo la creciente diversidad y complejidad de las colecciones de juegos de mesa, la aplicación se propone proporcionar una solución integral para organizar y gestionar estas colecciones de manera eficiente.

Además de simplificar la gestión de juegos, Bundle Games busca fomentar la interacción social y la colaboración entre los jugadores al facilitar el seguimiento de las partidas jugadas con amigos. En última instancia, la aplicación tiene como objetivo enriquecer la experiencia de juego y fortalecer los lazos dentro de la comunidad de aficionados a los juegos de mesa.

## Características Principales

* **Gestión de Colección de Juegos:** Permite a los usuarios añadir y eliminar juegos de mesa de su colección.
* **Búsqueda de Juegos:** Integración con la API de BoardGameGeek para buscar nuevos juegos de mesa.
* **Visualización Detallada:** Muestra información detallada sobre cada juego, incluyendo los amigos que han jugado a ese juego.
* **Gestión de Amigos:** Permite a los usuarios añadir, ver y eliminar amigos de su lista.
* **Registro de Partidas:** Los usuarios pueden registrar qué amigos han jugado a cada juego de mesa de su colección.
* **Autenticación de Usuarios:** Sistema de registro e inicio de sesión seguro utilizando Laravel Breeze.
* **Interfaz Intuitiva:** Diseño de interfaz de usuario receptivo y fácil de usar.

## Tecnologías Utilizadas

* **Frontend:** React
* **Backend:** Laravel (PHP)
* **Base de Datos:** MySQL
* **API:** BoardGameGeek API
* **Autenticación:** Laravel Breeze
* **Contenedorización:** Docker

## Instalación

1.  Clonar el repositorio:
    ```bash
    git clone [https://github.com/daw2072024/bundlegames.git](https://github.com/daw2072024/bundlegames.git)
    cd bundlegames
    ```

2.  Configuración del servidor (si es necesario):
    * En el archivo `front/src/lib/axios.js`, cambiar la línea `baseURL: http://localhost/back` a la IP del servidor si se está instalando en un servidor:
        ```javascript
        baseURL: http://[IP del servidor]/back
        ```
    * En el archivo `back/.env`, cambiar la línea `# APP_URL=http://localhost` a la IP del servidor:
        ```
        APP_URL=http://[IP del servidor]
        ```

3.  Construir y levantar los contenedores Docker:
    ```bash
    docker compose build
    docker compose up -d
    ```

4.  Ejecutar las migraciones de Laravel:
    * Obtener el ID del contenedor web:
        ```bash
        docker ps
        ```
    * Acceder al contenedor web:
        ```bash
        docker exec -it [ID del contenedor web] /bin/bash
        ```
    * Navegar al directorio del backend y ejecutar las migraciones:
        ```bash
        cd back
        php artisan migrate
        ```
    * Salir del contenedor:
        ```bash
        exit
        ```

5.  Configurar el archivo `.htaccess` (si se utiliza Apache):
    * Acceder al contenedor web:
        ```bash
        docker exec -it [ID del contenedor web] /bin/bash
        ```
    * Navegar al directorio `bundlegames`:
        ```bash
        cd bundlegames
        ```
    * Instalar `nano` (si no está instalado):
        ```bash
        apt install nano
        ```
    * Editar el archivo `.htaccess`:
        ```bash
        nano .htaccess
        ```
    * Añadir el siguiente contenido al archivo:
        ```apache
        <IfModule mod_rewrite.c>
          RewriteEngine On
          RewriteBase /
          RewriteRule ^index\.html$ - [L]
          RewriteCond %{REQUEST_FILENAME} !-f
          RewriteCond %{REQUEST_FILENAME} !-d
          RewriteCond %{REQUEST_FILENAME} !-l
          RewriteRule . /index.html [L]
        </IfModule>
        ```
    * Guardar y cerrar el archivo.
    * Recargar el servicio Apache:
        ```bash
        service apache2 reload
        ```
    * Salir del contenedor:
        ```bash
        exit
        ```

6.  Acceder a la aplicación en el navegador utilizando la IP del servidor.

## Manual de Uso

1.  **Página Principal:** Al entrar en la aplicación, se muestra la página principal con dos botones: "Register" y "Login".

2.  **Registro:**
    * Haciendo clic en "Register", se accede a la pantalla de registro.
    * Para registrarse, se debe introducir un nombre, un correo electrónico, una contraseña de al menos 8 caracteres y confirmar la contraseña.
    * Finalmente, hacer clic en el botón "Register".

3.  **Inicio de Sesión:**
    * Haciendo clic en "Login" desde la página principal, se accede a la pantalla de inicio de sesión.
    * Introducir el correo electrónico y la contraseña del usuario registrado.
    * Hacer clic en el botón "Login".

4.  **Colección de Juegos:**
    * Tras iniciar sesión, se muestra la pantalla de la colección de juegos de mesa.
    * En la barra de navegación, se encuentran enlaces a la colección, la búsqueda de nuevos juegos, la página de amigos y la opción de cerrar sesión ("Logout").

5.  **Buscar Nuevo Juego:**
    * Haciendo clic en "Search a new game" en la barra de navegación, se accede a la página de búsqueda.
    * Escribir el nombre del juego deseado en la barra de búsqueda y hacer clic en "Search".
    * Se mostrará una lista de juegos similares al nombre introducido.
    * Hacer clic en el juego deseado para ver sus detalles y un botón "Add game".
    * Haciendo clic en "Add game", el juego se añadirá a la colección del usuario y se redirigirá a la página de la colección.

6.  **Amigos:**
    * Haciendo clic en "Friends" en la barra de navegación, se accede a la página de amigos.
    * Se muestra una lista de los amigos actuales del usuario.
    * Para añadir un nuevo amigo, introducir su nombre en el campo correspondiente y hacer clic en "Add friend". El nuevo amigo se añadirá a la lista.
    * Para eliminar un amigo, seleccionarlo de la lista y hacer clic en "Delete selected friend".

7.  **Detalles del Juego:**
    * En la página de la colección de juegos, hacer clic en el botón "Details" de un juego para ver su página de detalles.
    * En la página de detalles, además de la información del juego, se muestra una lista de los amigos que han jugado a ese juego.
    * Para añadir un amigo a la lista de jugadores de ese juego, seleccionar un amigo del desplegable y hacer clic en "add friend to game".
    * Para eliminar un amigo de la lista de jugadores, seleccionarlo y hacer clic en "Delete selected player".

8.  **Eliminar Juego de la Colección:**
    * En la página de la colección de juegos, hacer clic en el botón "Delete" de un juego para eliminarlo de la colección.

9.  **Cerrar Sesión:**
    * Haciendo clic en el botón "Logout" en la barra de navegación, se cerrará la sesión del usuario y se redirigirá a la página principal.

## Mejoras a Futuro

* Añadir filtros de búsqueda a la colección de juegos por género, duración, número de jugadores y amigos.
* Implementar un buscador en la pantalla de la colección de juegos para buscar juegos por nombre.
* Permitir que los usuarios registrados se conecten entre ellos y añadir usuarios registrados a los juegos.
* Crear un sistema de valoraciones para que los amigos puedan valorar los juegos después de jugar.
* Implementar un filtro de valoraciones para ver los juegos mejor y peor valorados.
* Agregar más funcionalidades al registro de usuarios, como la verificación de correo electrónico.

## Bibliografía

* [BoardGameGeek XML API2](https://boardgamegeek.com/wiki/page/BGG_XML_API2)
* [BGG API Get Requests](https://www.tayloraliss.com/bggapi/getRequests.html)
* [Stack Overflow](https://stackoverflow.com/)
* [Laravel Documentation](https://laravel.com/)
* [Understand Error: useHistory not found in React Router Dom](https://www.dhiwise.com/post/understand-error-usehistory-not-found-in-react-router-dom)
* [Docker Documentation](https://docs.docker.com/engine/install/debian/)
* [Canva](https://www.canva.com/)
* [Remove Background](https://www.remove.bg/)
* [Tailwind CSS Documentation](https://tailwindcss.com/docs)
