# `myContext()`

## ¿Qué es **myContext()**?

Es un archivo de javascript que tiene la funcionalidad de pasar valores entre componentes de React al igual que el hook useContext(), pero en una sola linea de código. Es simple, legible, facil de entender y de usar, no usa useContext() ni props, y puede pasar el valor entre componentes y funciones.

**Aquí el ejemplo mas sencillo de como pasar un valor a otros componentes o funciones en un proyecto con React JS**:
```
import myContext from "./myContext.js";

myContext({user: "David"});
```
Solo con ésto ya pusiste un valor que puede ser consumible por componentes y funciones, sin necesidad de crear una variable con createContext(), ni crear un componente Provider, ni recibir un { children } para pasarle los valores, etc, etc, etc.. bien!, sigamos.

*El poder de `myContext()` radica en su simplicidad, eficiencia, efectividad y facil comprensión*.

### Parametros
`myContext()` puede recibir hasta **"3"**, y puedes pasarle *1*, *2* o *0* parametros.

Descarga el archivo [myContext.js](https://drive.google.com/file/d/1NZx8XxNnTa8iLCU1wWxOcJzD2kTDMye8/view?usp=sharing) y juega con el mientras lees ésta guia para entenderlo mejor.

Empecemos con el que más vas a usar, que son 2 parametros y el retorno de la función:
  ```
  import myContext from "./myContext()";
  import { useState } from "react";
  
  function Componente () {
    const { user } = myContext(useState, {user: "David"});
    return <h1> Hola soy {user()} <h1/>;
  }
  ```
**Empecemos de derecha a izquierda.**

`{ user: "David" }` es el parametro que agrega un valor con el identificador **user** a la lista de `myContext()`para que sea consumible por otros componentes y funciones desde cualquier parte de la aplicación.

`{ user: "David", cumpleanios: "22/11/2009", mascota: "fatiga" }`, puedes pasar un objeto con muchos valores.

`["user", "cumpleanios", "mascota"]`, puedes pasar un Array con los nombres de los identificadores, éstos se inicializaran con `undefined` como si ubieces pasado el siguiente objeto: *{ user: undefined, cumpleanios: undefined, mascota: undefined }*

`{ user: "David", _$_:[ "cumpleanios", "mascota" ] }`, tambien puedes pasarselo mixto de Objeto con Array, con el nombre clave `_$_` para el Array de nombres de identificadores.

**Bien!, siguiente parametro:**

`useState`, **myContext()** hace uso de un único hook, el **useState** y __¡¡ SIN PARENTESIS !!__, el useState lo único que hace es que el componente le diga a **myContext()**, oye! quiero que me avises cuando **"user"** cambia de valor así me vuelvo a renderizar. Y esos todo con el useState, bien! sigamos.

**Asignacion:**
`{ user } =`, **myContext()** tiene 2 tipos de retorno, hablaremos del principal que es el que está por defecto y es el que siempre vas a usar, es un Objeto con funciones y depende de los valores que se le pase a **myContext**. Por ejemplo si se le pasó el Objeto *{ user: "David", cumpleanios: "22/11/2009", mascota: "fatiga" }*, myContext() retornará `{ user: f(x), cumpleanios: f(x), mascota: f(x)}`.

**¿Qué hacen las funciones que retorna `myContext()`?**

`{ user: f(x), cumpleanios: f(x), mascota: f(x)}`, tomando el ejemplo anterior usaremos una de las funciones que devolvio **myContext()**, ésta será **user**, **user** es una función, al llamar a la función **user()** sin parametros ésta retorna el valor de "David", que es el valor con que el que inicializamos el identificador cuando lo pasamos a **myContext()**; cuando llamo a la función **user("Javier")**, con parametros, estoy cambiando el valor que trae **user()**, y si vuelvo a llamar a la funcion **user()** sin parametros, ésta me devolvera "Javier" y no "David".
