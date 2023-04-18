# `myContext()`

# ¿Qué es **myContext()**?

Es un [#archivo](https://drive.google.com/file/d/1Q4gLstjxg1f1Uv0fY1uvmRV_gZ7ma9rQ/view?usp=share_link) de javascript que tiene la funcionalidad de pasar valores entre componentes de React al igual que el hook useContext() y evitar los renderizados inecesarios como el hook useMemo(), pero en una sola linea de código. Es simple, legible, facil de entender y de usar, no usa useContext() ni props ni useMemo(), y puede pasar el valor entre componentes y funciones.

**Aquí el ejemplo mas sencillo de como pasar un valor a otros componentes o funciones en un proyecto con React JS**:
```
import myContext from "./myContext.js";

myContext({user: "David"});
```
Solo con ésto ya pusiste un valor que puede ser consumible por componentes y funciones, sin necesidad de crear una variable con createContext(), ni crear un componente Provider, ni recibir un { children } para pasarle los valores, etc, etc, etc.. bien!, sigamos.

*El poder de `myContext()` radica en su simplicidad, eficiencia, efectividad y facil comprensión*.

## Ejemplo práctico
Descarga el archivo [myContext.js](https://drive.google.com/file/d/1Q4gLstjxg1f1Uv0fY1uvmRV_gZ7ma9rQ/view?usp=share_link) y juega con el mientras lees ésta guia para entenderlo mejor.

`myContext()` puede recibir "0", "1", "2" ó "3" parametros.

Analicemos la sintaxis de `myContext()` que más vas a usar, que son 2 parametros y el retorno de la función:

`const { user } = myContext(useState, {user: "David"});`

Ahora crea un archivo Componente.jsx con el siguiente código y agregalo dentro del componente App:
  ```
import myContext from "./myContext.js";
import { useState } from "react";

function Componente() {
  const { user } = myContext(useState, { user: "David" });
  console.log(user());
  return (
    <>
      <h1> Hola soy {user()} </h1>
      <Button />
    </>
  );
}

function Button() {
  const { user } = myContext({ user: "German" });
  return (
    <button type="button" onClick={() => user("Javier")}>
      Cambiar usuario
    </button>
  );
}

export default Componente;
  ```
  
  **Así quedaría en el componente App:**
  
  ```
import "./App.css";
import Componente from "./Componente";

function App() {
  return (
    <div className="App">
      <Componente />
    </div>
  );
}

export default App;
  ```
### Empecemos con el componente "Componente" y analicemos la llamada a `myContext() `de derecha a izquierda.

`{ user: "David" }`: es el argumento que agrega un valor con el identificador **user** a la lista de `myContext()`para que sea consumible por otros componentes y funciones desde cualquier parte de la aplicación.

Puedes pasar un objeto con muchos valores por ejemplo: `{ user: "David", cumpleanios: "22/11/2009", mascota: "fatiga" }`.

Puedes pasar un Array con los nombres de los identificadores por ejemplo: `["user", "cumpleanios", "mascota"]`, éstos se inicializaran con `undefined` como si ubieces pasado el siguiente objeto: *{ user: undefined, cumpleanios: undefined, mascota: undefined }*

Tambien puedes pasarle un mix de Objeto con Array por ej: `{ user: "David", _$_:[ "cumpleanios", "mascota" ] }`, con el nombre clave `_$_` para el Array de nombres de identificadores.

***Bien!, siguiente argumento:***

`useState`: **myContext()** hace uso de un único hook, el **useState** y __¡¡ SIN PARENTESIS !!__, el useState lo único que hace es decirle a **myContext()**, oye! quiero que me avises cuando **"user"** cambia de valor así vuelvo a renderizar **"éste"** componente . Y eso es todo con useState, bien! sigamos.

**Valores que retorna `myContext()`:**

`{ user } =`: **myContext()** tiene 2 tipos de retorno, hablaremos del principal que es el que está por defecto y es el que mayormente vas a usar, es un Objeto con funciones y depende de los valores que se le pase a **myContext()**. Por ejemplo si se le pasó el Objeto *{ user: "David", cumpleanios: "22/11/2009", mascota: "fatiga" }*, **myContext()** retornará `{ user: f(x), cumpleanios: f(x), mascota: f(x)}`.

**¿Qué hacen las funciones que retorna `myContext()`?**

Tomando el ejemplo anterior `{ user: f(x), cumpleanios: f(x), mascota: f(x)}`, usaremos una de las funciones que devolvio **myContext()**, ésta será **user**, **user** es una función, al llamar a la función **user()** sin argumentos ésta retorna el valor de "David", que es el valor con el que inicializamos el identificador cuando lo pasamos a **myContext()**; cuando llamo a la función **user("Javier")**, con argumentos, estoy cambiando el valor de **user** en la lista de `myContext()`, y si vuelvo a llamar a la funcion **user()** sin parametros, ésta me devolvera "Javier" y no "David".


### Sigamos con el componente "Button" y analicemos la llamada a `myContext()` de derecha a izquierda:

`{ user: "German" }`: Aquí nuevamente le pasamos un valor a inicializar en "user", pero como éste ya fue inicializado por el componente "Componente" y ya se encuentra en la lista de `myContext()` no volvera a ser inicializado y **user()** seguira retornando "David"; tampoco serán renderizados los componentes que estén consumiendo **user** porque el valor no fue cambiado con **user('nuevo valor')**.

*Notece* que aquí no paso el "*useState*" como argumento porque no me interesa que el componente "Button" se vuelva a renderizar cuando cambie el valor de **user**, (*aclaración de alcance*: en éste caso "Button" si se volvera a renderizar por que es hijo de "Componente", y al volverse a renderizar "Componente" tambien se vuelve a renderizar "Button").

**Retorno de `myContext():`**

`{ user } =`: Al igual que en "Componente" `myContext()` retorna un Objeto de funciones, y adivina que ocurre si llamo a la funcion **user()** sin argumentos?... exacto!, éste me retorna "David".

**¿Qué pasa con el componente "Button" cuando es presionado?**

Al presionar el componente "Button" éste llama a la funcion **user("Javier")**, `myContext()` cambia el valor de **user** en su lista y renderiza todos los componentes que pasaron "*useState*" como parte de los argumentos en la llamada a `myContext()` y voila! datos cambiados y componentes renderizados con el nuevo valor.

## Parametros y Sintaxis

`const { name } = myContext(useState, { name: valor_inicial });`: Éste es el de el ejemplo.

`const todos = myContext();`: Retorna un Objeto de funciones con "todos" los identificadores de la lista de `myContext()`.

`const { name } = myContext({ name: valor_inicial });`: Éste tambien lo vimos en el ejemplo. Si el idenficador "name" __No__ está en la lista de `myContext()` lo crea, lo inicializa y retorna la funcion para manipular dicho valor; si el identificador "name" __Si__ está en la lista, solo retorna la función para manipular el valor de ese identficador.

`const { name } = myContext([ name ]);`: Lo mismo que la opción anterior pero aquí si el identificador "name" __No__ se encuentra en la lista de `myContext()` éste lo inicializa automaticamente con *undefined*.

### A todas las anteriores se le puede pasar un argumento más: `true`

`true` hace que `myContext()` retorne no un Objeto de funciones sinó un Objeto con las propiedades "get" y "set" así `{ get, set}`.

`get` contiene todos los valores que se encuentran en la lista de `myContext()`, por ejemplo para `const { name } = myContext(useState, { name: valor_inicial }, true);` **myContext()** retorna `{ get: { name: valor_inicial, etc... }, set: f(x) }`.

`set` recibe un objeto con los idenficadores a cambiarles el valor y el nuevo valor, por ejemplo: `set({ name: nuevo_valor, etc... })` al terminar la funcion retorna un Objeto con los nuevos valores asi `{ name: nuevo_valor, etc... }`.

Fin.

Gracias por leer hasta aquí, si te fue útil el archivo recuerda comentarselo a tus colegas y amigos desarrolladores para que lo puedan usar.

Saludos!!!
