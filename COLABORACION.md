# Reparto de tareas y guía de colaboración

## Partes del proyecto

| Integrante | Parte | Archivos que hace commit |
|---|---|---|
| Integrante 1 | Backend (API y servidor) | `backend/server.js`, `backend/package.json`, `.gitignore` |
| Integrante 2 | Frontend: estructura y estilos | `frontend/index.html`, `frontend/style.css` |
| Integrante 3 | Frontend: lógica y documentación | `frontend/app.js`, `README.md`, `COLABORACION.md` |

Cada integrante sube **solo los archivos de su parte**, en su propio commit.

## Pasos con Git

**Una sola persona (el dueño del repositorio):**
1. Crear el repositorio vacío en GitHub.
2. En GitHub: Settings → Collaborators → agregar a los otros dos integrantes.
3. Subir un commit inicial (por ejemplo, solo el `.gitignore`) a la rama `main`.

**Cada integrante:**
```bash
git clone https://github.com/USUARIO/NOMBRE-REPO.git
cd NOMBRE-REPO
git checkout -b parte-NOMBRE        # rama propia, ej: parte-backend

# copiar aquí los archivos de SU parte (respetando las carpetas)

git add archivo1 archivo2           # solo los de su parte
git commit -m "Agrega backend: API de vehículos"
git push -u origin parte-NOMBRE
```

Después, en GitHub se abre un **Pull Request** de cada rama hacia `main` y otro integrante lo revisa y hace el merge.

## Sugerencia de mensajes de commit
- Integrante 1: `Agrega backend: API REST de vehículos`
- Integrante 2: `Agrega frontend: estructura HTML y estilos`
- Integrante 3: `Agrega frontend: lógica del cliente y documentación`

## Verificar que todo funciona
Cuando los tres hayan hecho merge a `main`: `git pull`, luego `cd backend`, `npm install`, `npm start` y abrir http://localhost:3000
