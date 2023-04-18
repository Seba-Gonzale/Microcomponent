# `myContext()`
# What is myContext()?

It is a JavaScript [#file](https://drive.google.com/file/d/1u4Xhx9_2EGtb5j_yR-AVxNr3Tn2txKot/view) that has the functionality of passing values between React components like the useContext() hook and avoiding unnecessary renderings like the useMemo() hook, but in a single line of code. It is simple, readable, easy to understand and use, it does not use useContext() or props or useMemo(), and can pass values between components and functions.

**Here's the simplest example of how to pass a value to other components or functions in a React JS project:**
```
import myContext from "./myContext.js";

myContext({user: "David"});
```

With just this, you have already set a value that can be consumed by components and functions, without the need to create a variable with createContext(), create a Provider component, or receive a { children } to pass the values to it, etc, etc, etc.. well, let's continue.

*The power of **myContext()** lies in its simplicity, efficiency, effectiveness, and ease of understanding.*

## Practical example

Download the file [myContext.js](https://drive.google.com/file/d/1u4Xhx9_2EGtb5j_yR-AVxNr3Tn2txKot/view) and play with it while you read this guide to better understand it.

**myContext()** can receive "0", "1", "2", or "3" parameters.

Let's analyze the syntax of **myContext()** that you will use the most, which are 2 parameters and the function's return:

`const { user } = myContext(useState, {user: "David"});`

Now create a Component.jsx file with the following code and add it inside the App component:
```
import myContext from "./myContext.js";
import { useState } from "react";

function Component() {
  const { user } = myContext(useState, { user: "David" });
  console.log(user());
  return (
    <>
      <h1> Hello, I'm {user()} </h1>
      <Button />
    </>
  );
}

function Button() {
  const { user } = myContext({ user: "German" });
  return (
    <button type="button" onClick={() => user("Javier")}>
      Change user
    </button>
  );
}

export default Component;
```
This is how it would look in the App component:
```
import "./App.css";
import Component from "./Component";

function App() {
  return (
    <div className="App">
      <Component />
    </div>
  );
}

export default App;
```
### Let's start with the "Component" component and analyze the **myContext()** call from right to left.

`{ user: "David" }`: is the argument that adds a value with the identifier user to the list of **myContext()** so that it can be consumed by other components and functions from anywhere in the application.

You can pass an object with many values for example: ___{ user: "David", birthday: "22/11/2009", pet: "fatigue" }___.

You can also pass a mix of Object with Array, for example: ___{ user: "David", `_$_`:[ "birthday", "pet" ] }___, with the key name `_$_` for the Array of identifier names.

**Great! Next argument:**

useState: myContext() makes use of a single hook, useState, and WITHOUT PARENTHESES! The useState only tells myContext(), hey! Let me know when "user" changes its value so I can re-render "this" component. And that's all with useState, okay! Let's move on.

### Values returned by myContext():

`{ user } =`: myContext() has 2 types of return, we will talk about the main one which is the default and is the one you will mostly use, it is an Object with functions and depends on the values passed to myContext(). For example, if the Object __{ user: "David", birthday: "11/22/2009", pet: "Fatigue" }__ was passed, myContext() will return ___{ user: f(x), birthday: f(x), pet: f(x)}___.

### What do the functions returned by myContext() do?

Taking the previous example __{ user: f(x), birthday: f(x), pet: f(x)}__, we will use one of the functions returned by myContext(), this will be __user__, __user__ is a function, when calling the function __user()__ without arguments, it returns the value of "David", which is the value with which we initialized the identifier when we passed it to __myContext()__; when I call the function __user("Javier")__, with arguments, I am changing the value of user in the list of __myContext()__, and if I call the function __user()__ without parameters again, it will return "Javier" instead of "David".

### Let's continue with the "Button" component and analyze the call to myContext() from right to left:

`{ user: "German" }`: Here we pass a value to initialize "user" again, but since it was already initialized by the "Component" component and is already in the __myContext()__ list, it will not be initialized again and __`user()`__ will continue to return "David"; components that are consuming user will also not be re-rendered because the value was not changed with `user('new value')`.

Note that in this case, I did not pass the "useState" as an argument because I am not interested in having the "Button" component re-render when the value of user changes, (scope clarification: in this case "Button" will be re-rendered because it is a child of "Component", and when "Component" is re-rendered, "Button" is also re-rendered).

### Return of myContext():

`{ user } =`: Just like in the "Component" example, __myContext()__ returns an object of functions, and guess what happens if I call the __user()__ function without arguments?... that's right!, it returns "David".

### What happens to the "Button" component when it is pressed?

When the "Button" component is pressed, it calls the function __user("Javier")__, __myContext()__ changes the value of user in its list, and then renders all the components that passed through "useState" as part of the arguments in the call to __myContext()__. Voila! Data changed and components rendered with the new value.

## Parameters and Syntax

`const { name } = myContext(useState, { name: initial_value });`: This is the example we saw.

`const all = myContext();`: Returns an object of functions with "all" the identifiers in the __myContext()__ list.

`const { name } = myContext({ name: initial_value });`: This is also seen in the example. If the identifier "name" is not in the __myContext()__ list, it creates and initializes it, then returns the function to manipulate that value. If the identifier "name" is in the list, it just returns the function to manipulate the value of that identifier.

`const { name } = myContext([ name ]);`: The same as the previous option, but if the identifier "name" is not in the __myContext()__ list, it initializes it automatically with undefined.

### All of the above can also take an additional argument: `true`

`true` makes __myContext()__ return not an object of functions, but an object with properties "get" and "set" like so: `{ get, set }`.

`get` contains all the values found in the __myContext()__ list. For example, for __const { name } = myContext(useState, { name: initial_value }, __`true`__);__, __myContext()__ returns ___{ get: { name: initial_value, etc... }, set: f(x) }___.

`set` is a function that receives an object as a parameter with the identifiers whose values are going to be changed, and the new values for those identifiers. For example: __set({ name: new_value, etc... })__. After the function finishes, it returns an object with the new values like so: ___{ name: new_value, etc... }___.

That's it.

Thank you for reading this far, if this file was useful to you, remember to tell your colleagues and developer friends so they can use it too.

Cheers!!!
