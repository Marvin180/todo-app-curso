import "./css/styles.css";

import { Todo, TodoList } from './classes'; //si no pongo nada luedo de /classes/ busca un index por defecto
import { crearTodoHTML } from "./js/componentes";


export const todoList =  new TodoList();
// console.log(todoList.todos);
// todoList.todos.forEach(crearTodoHTML); otra sintaxis
todoList.todos.forEach(todo => crearTodoHTML( todo ));

// todoList.todos[0].imprimir();
// const tarea = new Todo("Aprender js!!");


// todoList.nuevoTodo(tarea);

// console.log(todoList);

// crearTodoHTML( tarea );

