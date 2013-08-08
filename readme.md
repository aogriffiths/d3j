d3j
===

_Shorthand for creating data driven documents, inforgraphics and the like - fast._

Introduction
------------

[D3](http://d3js.org/) is a javascript library for manipulating documents based on data. 
Combined with css, __html__ and __svg__ it can be used to create stunning visualisations based on data and animated with transitions as the data changes.

[Jade](http://jade-lang.com/) is a javascript tempting engine that produces XML documents like __html__ and __svg__.

Hold on! They have so much in common... They should get together!!

[d3j](https://github.com/aogriffiths/d3j/) is the marriage of the two.

Background & Why?!
------------------

Ok, before you find out more about this beautiful union you need to know some basics. Have you used the following things?

* __html__, __svg__ - the final result of using d3, jade or d3j is going to be one of, or a combination of these.
* __css__ - not just for styling your html and svg but d3 also makes heavy use of css selectors.
* __d3__ - the javascript library that inspired all of this.

If you have, you may have found the code you wrote got a bit long winded or repetitive. Doing a `selectAll("div.myclass")` followed by a `enter().append("div").classed("myclass", true)` for example. Why do you have to say its a `div.myclass` you want twice? And in two different ways? (There are good reasons but d3j will save you the trouble.)

d3j is a Domain Specific Language (DSL) that aims to offer all the power of d3 without you needing to write so much code. It is also designed to be very readable; you should be able to look at a d3j document and easily see the kind of html or svg it's going to produce. It also compiles into pure javascript, only dependant on the d3.js library in the browser, so there is no need to include any more scripts libraries in your page.

If you have never used either d3 or jade you might find this a steep learning curve. I highly recommend doing a tutorial and playing with both before you start using d3j.

An Example
----------

In d3j you can write:
```javascript
    function sayhello(data){
//>   html
//>     body
//>       h1 Hello...
//>       p #{i}. #{d}! < all(data)
    }
```

In d3 you would write the same function as:
```javascript
    function sayhello(data){
      var html = d3.select("html");
      var body = html.select("body");
      if(body.empty()){
        body = html.append("body");
      }
      var h1 = body.select("h1");
      if(h1.empty()){
        h1 = body.append("h1");
      }
      h1.text("Hello...");
      body.selectAll("p")
        .data(data)
        .enter()
        .append("p")
        .text(function(d,i){return i + ". " + d});
    }
```

In your browser you call:
```javascript
sayhello(["Mathew","Mark","Luke","John"]);
```

And you will get:
```html
<html>
  <body>
    <h1>Hello...</h1>
    <p>0. Mathew</p>
    <p>1. Mark</p>
    <p>2. Luke</p>
    <p>3. John</p>
  </body>
</html>
```

Syntax
------
A d3j template follows these rules:


### File syntax


*   It __MAY__ mix javascript and "d3jade" syntax interchangeably.

*   The d3jade and javascript __MUST__ be kept on separate lines.

*   A d3jade line __MUST__ start with a `START` string (default is `//`) followed by an 
    `OPEN` string (default is `>`) followed by white space.

        ^START + OPEN + WHITESPACE
        e.g:
        //>

*   The `START` string is set at compile time and __MUST__ be the same throughout the 
    file.

*   The `OPEN` string __MAY__ be different on each line. However, for readability,
    keeping it consistent across a file is recommended.

*   The `OPEN` string is "mirrored" to give a `CLOSE` string. Mirroring is best explained 
    with the examples:



| A   |  B  |
|:---:|:---:|
| <   |  >  |
| (   |  )  |
| {   |  }  |
| [   |  ]  |
| <<  |  >> |
| ]=- | -=[ |
|  A  |  A  |
| abc | cba |

(A is a mirror of B and B is a mirror of A)


*   A valid jade string __MUST__ follow the `OPEN` string. d3jade supports a subset of jade (see "supported jade" below for details).

        ^START + OPEN + WHITESPACE + JADE
        e.g:
        //> p.myclass Text

*   The `CLOSE` string __MAY__ be used  after the jade string. If it used 
    it must be followed by a d3j command. If it is not used the default command is assumed.
    (see "d3j commands" below for details.)

        ^START + OPEN + WHITESPACE + JADE + CLOSE + COMMAND
        e.g:
        //> p.myclass Text < command(data)

*   Any line that does not much the criteria of a d3j line will be treated as a javascript
    line. Practically this means it can start with any characters, including the `START`
    string as long as it is directly followed by white space.

#### Example

Here is the requsit hello world example.

```javascript
    function sayhello(){
//>   html
//>     body
//>       p Hello world!
    }
```

There are three lines of d3jade, wrapped by two lines of javascript. Once compiled this will produce a function called sayhello, which will ensure a paragraph with the text "Hello Word!" is situated in a paragraph tag in the body of the html page.


### D3j line syntax

As mentioned above a d3j line starts with:

    ^START + OPEN + WHITESPACE
    e.g.
    //> 

And includes a jade string followed by optional a d3j command:

    START + OPEN + WHITESPACE + JADE [ + CLODE + COMMAND ]
    e.g.
    //> h1.myclass#id  #{i}. #{d} <forall(data)

As with jade, white space at the start of a line is significant. More accurately a line is assigned an __INDENT__ based on the number of characters from the start of the line to the first character of the JADE string. e.g. The length of this regexp match:

    "^" + START + "\w+\s*"

The INDENT of first d3j line sets the minimum intent for all other d3j lines.
Practically this just means the jade like syntax needs to be visually "lined up" and look right. For example the following lines use different `OPEN` strings but are considered to have the same __INDENT__:

    //>   div.one
    //:=~ div.two