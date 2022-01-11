comandos:
git init = inicializa mi proyecto para estar listos para realizar todos los cambios;
git add . = prepara a git para tomar una foto del codigo;
git commit -m "Primer Commit" = toma la foto del codigo;



npm install = reconstruye los modulos de node;

Para subir a github pages:
1. Crear un nuevo repositorio
2. En la terminal: git init, git add . , git commit -m ""
3. npm run build: genera una carpeta dist, la cual vamo a renombrar a docs
4. Enlazar mis carpetas con github, con los siguientes comandos (sacados de github.com):
git remote add origin https://github.com/Marvin180/todo-js.git
git branch -M main
git push -u origin main