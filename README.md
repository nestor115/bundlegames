# bundlegames
# Manual de Instalación

# Instrucciones de instalación

Para comenzar, clona el repositorio desde GitHub:
git clone https://github.com/daw2072024/bundlegames.git
cd bundlegames
Si estás realizando la instalación en un servidor, asegúrate de hacer los siguientes cambios:

1. En el archivo `front/src/lib/axios`, en la línea correspondiente, cambia la dirección base a la IP de tu servidor:
baseURL: http://Ip_del_servidor/back

2. En el archivo `.env` dentro de la carpeta `back`, cambia la IP en la siguiente línea:

APP_URL=http://Ip_del_servidor

---

Una vez hecho esto, procede con los siguientes pasos:

1. Construye los contenedores Docker:

docker-compose build
docker-compose up -d

2. Verifica que los contenedores estén ejecutándose correctamente:

docker ps

3. Copia el ID del contenedor web.

4. Accede al contenedor usando el ID:
docker exec -it [ID_del_contenedor] /bin/bash
cd back
php artisan migrate
cd ..
cd bundlegames

5. Instala el editor de texto Nano:

apt install nano

6. Abre el archivo `.htaccess` con Nano:

nano .htaccess

7. Dentro de `.htaccess`, añade las siguientes líneas:
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

8. Guarda los cambios y cierra Nano.

9. Recarga el servicio de Apache:

service apache2 reload

Finalmente, abre un navegador y accede a la IP de tu servidor para verificar que la instalación se ha realizado correctamente.

