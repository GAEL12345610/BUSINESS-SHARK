# Memoria de Brai

Lecciones aprendidas, una por archivo. La descripción de cada nota dice **qué hacer o qué no hacer**. Claude las lee cuando toca el tema. **Cada error nuevo se anota aquí antes de seguir**, en su propio archivo, y se agrega una línea a este índice.

Varias vienen de errores reales en otros proyectos con el mismo stack (React + Vite + Supabase + Vercel).

## Verificar

- [verificar-el-artefacto](verificar-el-artefacto.md): Compilar o que un script termine sin error NO es verificar: abre lo que produjo y pregunta si tu prueba vería el fallo
- [null-no-es-distinto](null-no-es-distinto.md): En pruebas SQL compara con IS DISTINCT FROM, nunca con <>; NULL <> 'x' da NULL y la prueba pasa aunque la función esté rota
- [scroll-suave-engana-pruebas](scroll-suave-engana-pruebas.md): Con scroll-behavior smooth, un script que hace scrollTo no llega a donde crees; en pruebas usa behavior instant antes de concluir que algo no aparece

## Seguridad (Supabase y API)

- [rls-es-la-unica-puerta](rls-es-la-unica-puerta.md): En una app Vite + Supabase la ÚNICA protección real de los datos es el RLS; los route guards de React solo esconden pantallas
- [revoke-anon-desde-el-dia-uno](revoke-anon-desde-el-dia-uno.md): Al crear las tablas en Supabase, revoca permisos al rol anon desde el primer día; RLS es un solo candado y conviene tener dos
- [service-role-nunca-en-vite](service-role-nunca-en-vite.md): Nada con prefijo VITE_ salvo la URL y la anon key de Supabase; la service_role jamás en el frontend. Revisa el bundle después de publicar
- [endpoint-que-escribe-se-defiende-solo](endpoint-que-escribe-se-defiende-solo.md): Cada función en app/api que escribe datos o gasta dinero valida auth adentro, falla cerrada y saca el usuario del token, nunca del body
- [funcion-nueva-nace-publica](funcion-nueva-nace-publica.md): En Postgres cada función nueva nace ejecutable por PUBLIC; el revoke de funciones va al FINAL del SQL y se prueba con el rol anon
- [huella-con-fecha-en-utc](huella-con-fecha-en-utc.md): Si una huella (hash) incluye una fecha, conviértela a texto en UTC con formato fijo, o la cadena se ve rota desde otra zona horaria
- [supabase-config-se-verifica-por-rechazo](supabase-config-se-verifica-por-rechazo.md): Un cambio en la config de auth de Supabase tarda segundos en aplicar; se verifica viendo el rechazo, no leyendo el flag

## NFC y demo

- [silueta-propia](silueta-propia.md): Antes de aprobar una mascota, mírala en silueta y chiquita: si se parece a un personaje famoso (Pac-Man), no sirve
- [tag-nfc-bloqueado-es-para-siempre](tag-nfc-bloqueado-es-para-siempre.md): Un tag NFC bloqueado no se puede reescribir nunca: la URL siempre es de brai.art, se prueba en 1 tag antes y nunca va sobre metal
- [supabase-free-se-pausa](supabase-free-se-pausa.md): El plan Free de Supabase pausa el proyecto tras 7 días sin uso; antes de una demo ábrelo el día anterior o pasa a Pro

## Código y frontend

- [update-con-patch-no-fila-entera](update-con-patch-no-fila-entera.md): Para guardar, manda solo los campos que cambiaron (update con patch), nunca la fila entera desde la copia de una pantalla
- [animacion-de-entrada-con-barrido](animacion-de-entrada-con-barrido.md): Las animaciones de aparecer al hacer scroll se hacen con un barrido, no solo con IntersectionObserver, o hay secciones que quedan invisibles
- [logo-animado-con-el-svg-real](logo-animado-con-el-svg-real.md): Para animar el logo se anima el SVG de brand/ (escala, giro, halo), nunca se redibuja un enso a mano en el código
- [contenido-en-html-crudo](contenido-en-html-crudo.md): Lo que debe leer Google o un modelo de IA (landing, página del artista) tiene que estar en el HTML crudo, no solo pintado por JavaScript
- [vercel-spa-rewrites](vercel-spa-rewrites.md): Toda SPA de Vite en Vercel necesita vercel.json con rewrite a index.html ANTES del primer deploy, o las subrutas dan 404

## Entorno, git y Windows

- [una-sesion-a-la-vez](una-sesion-a-la-vez.md): Antes de construir, revisa git branch -a; dos sesiones en ramas distintas hacen dos apps, dos bases y decisiones con el mismo número
- [pnpm-fuera-de-onedrive](pnpm-fuera-de-onedrive.md): El código JS vive en C:/dev/brai, nunca en OneDrive; siempre pnpm, nunca npm, con packageManager y onlyBuiltDependencies fijados
- [commit-sin-push-no-es-respaldo](commit-sin-push-no-es-respaldo.md): Un commit sin push vive solo en tu disco; al cerrar, confirma que git log origin/main..HEAD sale vacío
- [gitignore-sin-comentarios-inline](gitignore-sin-comentarios-inline.md): En .gitignore el # solo comenta al inicio de la línea; un comentario al final rompe la regla en silencio. Verifica con git check-ignore -v
- [heredoc-de-bash-come-backslashes](heredoc-de-bash-come-backslashes.md): En Windows no metas rutas con diagonal invertida ni scripts largos dentro de un heredoc de Bash; escríbelos en un archivo .py aparte

## Formato de una nota nueva

```markdown
---
name: <slug-en-kebab-case>
description: <una línea: qué hacer / qué no hacer>
---

<qué pasó, por qué importa y cómo aplicarlo>
```
