import { Todo } from "../classes";
import { todoList } from '../index';

//Referencias en el html
const divTodoList = document.querySelector(".todo-list");
const txtInput = document.querySelector(".new-todo");
const btnBorrar = document.querySelector(".clear-completed");
const ulFilters = document.querySelector(".filters");
const anchorFiltros = document.querySelectorAll(".filtro");



export const crearTodoHTML= ( todo ) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ? "completed" : "" }" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? "checked" : ""}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;
    const div = document.createElement("div"); //se crea un div que almacene el li anterior porque el li ya estaba creado y para almacenar toda esa logica
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild );

    return div.firstElementChild;

}

//Eventos

txtInput.addEventListener("keyup", (event) => { //el event me dice que teclas se presiono

    if( event.keyCode === 13 && txtInput.value.length > 0 ){

        const nuevoTodo = new Todo( txtInput.value );

        todoList.nuevoTodo( nuevoTodo );

        // console.log(todoList);

        crearTodoHTML(nuevoTodo);
        txtInput.value = '';
    }

});

divTodoList.addEventListener("click", (event) => {
    // console.log("click");
    // console.log(event.target.localName); // el .target sirve para saber en que parte del html hice click, ya sea en el texto o en el check o en la x 

    const nombreELemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement; //parent element busca la etiqueta html padre
    

    const todoId = todoElemento.getAttribute("data-id"); //getAttribute obtiene el atributo de una etiqueta html

    if( nombreELemento.includes("input")){ //si incluye el nombre input, quiere decir que hizo click en el check

        todoList.marcarCompletado(todoId);

        todoElemento.classList.toggle("completed"); //classList para hacer referencia a todas las clases de la etiqueta y toggle para agregar o cambiar una clase

    }else if( nombreELemento.includes("button") ){ //hay que borrar el todo
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }

});

btnBorrar.addEventListener("click", () => {
      
    todoList.eliminarCompletados();

    for( let i =divTodoList.children.length-1; i>=0; i-- ){

        const elemento = divTodoList.children[i];

        if(elemento.classList.contains("completed")){
            divTodoList.removeChild(elemento);
        }
    }

});

ulFilters.addEventListener("click", (event) => {
    // console.log(event.target.text); para saber el nombre el lugar donde se clickeo

    const filtro = event.target.text;

    if( !filtro ){ return; }

    anchorFiltros.forEach(elem => elem.classList.remove("selected"));
    // console.log(event.target);

    event.target.classList.add("selected");

    for( const elemento of divTodoList.children ){
        // console.log(elemento);

        elemento.classList.remove("hidden");
        const completado = elemento.classList.contains("completed");

        switch(filtro){
            case "Pendientes":
                if(completado){
                    elemento.classList.add("hidden");
                }
            break;
            case "Completados":
                if(!completado){
                    elemento.classList.add("hidden");
                }
        }

    }

});

