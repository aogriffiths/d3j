

d3j syntax
========== 
A d3j template follows these rules:



File syntax
-----------

*   It __MAY__ mix javascript and "d3jade" syntax interchangeably.

*   The d3jade syntax and javascript __MUST__ be kept on separate lines.

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
    with the examples in the following table (A is a mirror of B and B is a mirror of A):



| A   |  B  |
|-----|-----|
| <   |  >  |
| (   |  )  |
| {   |  }  |
| [   |  ]  |
| <<  |  >> |
| ]}- | -{[ |



| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |



*   A valide jade string __MUST__ follow the `OPEN` string.

        ^START + OPEN + WHITESPACE + JADE
        e.g:
        //> p.myclass Text

*   d3jade supports a subset of jade (see "supported jade" below for details).

*   The `CLOSE` string __MAY__ be used one time on the d3j line or not at all. If it used 
    it must be followed by a d3j command  (see "d3j commands" below for details).

        ^START + OPEN + WHITESPACE + JADE + CLOSE + COMMAND
        e.g:
        //> p.myclass Text < all(d)

*   Any line that does not much the criteria of a d3j line will be treated as a javascript
    line. Practically this means it can start with any characters, including the `START`
    string as long as it is directly followed by white space.

### Example

The requsit hello world example. Here there are three lines of d3jade, wrapped by two lines of javascript.

```javascript
    function(test){
//>   html
//>     body
//>       p Hello world!
    }
```

This is the base syntax, but you will need to know some more to make it useful. Read on...


D3j line syntax
---------------

As mentioned above a d3j line starts with:

    ^START + OPEN + WHITESPACE

For example:

    //> 

A valid jade string should follow  optionally the escape string followed by a a valid d3j command. E.g.

START + ESCAPE + WHITESPACE + JADE [ + ESCAPE + COMMAND ]

E.g.

//> h1.myclass#id  #{i}. #{d} <forall(data)

As with jade white space at the start of a line is significant. More accurately a line is assigned an INDENT based on the number of characters from the start of the line to the first character of the JADE string. e.g. The length of this regexp match:

"^" + START + "\w+\s*"

The INDENT of first d3j line sets the minimum intent for all other d3j lines.
Practically this just means the jade like syntax needs to be visually "lined up" or intended at you read down the file. (This assumes your using a fixed width character set - if you're not you really need to be!). For example the following lines use different ESCAPE strings but are considered to be at the same INDENT:

//>   div.one
//:=~ div.two