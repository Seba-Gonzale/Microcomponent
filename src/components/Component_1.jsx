import { useState } from "react";
import Component_2 from "./Component_2";
import myContext from "@/utils/myContext";

export default function Component_1() {
  //
  // ! ****************AQUÍ ESTA LA MAGIA******************* */
  // Se inicializa bColor7="blue" y se deja listo para ser consumido por cualquier funcion o componente.
  // La función retorna un objeto de funciones, en éste caso retorna {bColor: f(x)} sigue leyendo para saber más...
  /**/ myContext({ bColor7: "blue" });

  // Aquí repito la función pero como ya fue inicializada el valor de bColor7 no cambia a "red"
  // Ahora ya solo se puede cambiar su valor con su funcion bColor7(*nuevo valor*), sigue leyendo para saber mas...
  /**/ myContext({ bColor7: "red" });

  // Aquí abajo lo mismo pero ésta vez tambien consumimos el valor, se le pasa *useState* ¡¡¡Sin parentesis!!!
  //  para que se renderice el componente solo cuando se cambia su valor, lo que se recibe es un objeto
  // con una o mas funciones dependiendo de la cantidad de elementos que se le pasa.
  // Para ver el valor sería: unoParaTodos() y para cambiarlo: unoParaTodos(*nuevo valor*)
  //. todos los componentes que consumen "unoParaTodos" y han pasado su *useState* son renderizados
  //  cuando éste es cambiado en cualquier lugar de toda la aplicación
  // ahora no voy a hacer el cambio solo inicializarlo y consumirlo, el cambio será en el ultimo componente del arbol
  /**/ const { unoParaTodos } = myContext(useState, { unoParaTodos: false });
  // Si cuando se cambia unoParaTodos a false, por ejemplo unoParaTodos(false), pero éste ya tiene el mismo valor
  // no se renderizan los componentes que consumen unoParaTodos
  console.log("hola soy COMPONENT_1, me he renderizado!");
  console.log("unoParaTodos es: " + unoParaTodos());

  // !. En los componentes del 2 al 6 solo se consumen valores, las mutaciones estan en el componente 7

  return (
    <div className="Component_1">
      <h1 className="Component_1__title">myContext</h1>
      <p className="Component_1__description">
        Sin <b>useContext()</b> ni <b>Props</b>
      </p>
      <p className="Component_1__description">
        más rápido más sencillo más legible más chevere
      </p>
      <p className="Component__title">&quot; Component_1 &quot;</p>
      <Component_2 />
    </div>
  );
}
