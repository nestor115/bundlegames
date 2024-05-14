# bundlegames
# Manual de Instalación

## Clonar el repositorio

```bash
git clone https://github.com/daw2072024/bundlegames.git
cd bundlegames
Configuración de la IP del Servidor
Si la instalación se realiza en un servidor, es necesario realizar algunos ajustes de configuración:

En el archivo front/src/lib/axios, modificar la siguiente línea, reemplazando "http://Ip del servidor/back" por la IP del nuevo servidor:

javascript
Copiar código
baseURL: "http://Ip del servidor/back"
En el archivo .env dentro de la carpeta back/, cambiar la IP en la siguiente línea:

plaintext
Copiar código
APP_URL=http://Ip del servidor
Construcción y ejecución con Docker
bash
Copiar código
docker-compose build
docker-compose up -d
docker ps
Copiar el ID del contenedor web y ejecutar el siguiente comando para ingresar al contenedor:

bash
Copiar código
docker exec -it [ID del contenedor] /bin/bash
Dentro del contenedor:

bash
Copiar código
cd back
php artisan migrate
cd ..
cd bundlegames
apt install nano
nano .htaccess
Agregar el siguiente contenido dentro de .htaccess:

apache
Copiar código
<IfModule mod_rewrite.c>

  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]

</IfModule>
Finalmente, recargar el servicio de Apache:

bash
Copiar código
service apache2 reload
Acceso
Abrir un navegador web e ingresar la dirección IP del servidor.

Copiar código

Ahora puedes copiar y pegar este texto directamente en tu archivo README.
no, pero digo que me mandes todo junto en un documento txt con la sintaxis de md
ChatGPT
¡Entendido! Aquí tienes el manual de instalación en formato Markdown en un documento de texto:

bash
Copiar código
# Manual de Instalación

## Clonar el repositorio

```bash
git clone https://github.com/daw2072024/bundlegames.git
cd bundlegames
Configuración de la IP del Servidor
Si la instalación se realiza en un servidor, es necesario realizar algunos ajustes de configuración:

En el archivo front/src/lib/axios, modificar la siguiente línea, reemplazando "http://Ip del servidor/back" por la IP del nuevo servidor:

javascript
Copiar código
baseURL: "http://Ip del servidor/back"
En el archivo .env dentro de la carpeta back/, cambiar la IP en la siguiente línea:

plaintext
Copiar código
APP_URL=http://Ip del servidor
Construcción y ejecución con Docker
bash
Copiar código
docker-compose build
docker-compose up -d
docker ps
Copiar el ID del contenedor web y ejecutar el siguiente comando para ingresar al contenedor:

bash
Copiar código
docker exec -it [ID del contenedor] /bin/bash
Dentro del contenedor:

bash
Copiar código
cd back
php artisan migrate
cd ..
cd bundlegames
apt install nano
nano .htaccess
Agregar el siguiente contenido dentro de .htaccess:

apache
Copiar código
<IfModule mod_rewrite.c>

  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]

</IfModule>
Finalmente, recargar el servicio de Apache:

bash
Copiar código
service apache2 reload
Acceso
Abrir un navegador web e ingresar la dirección IP del servidor.