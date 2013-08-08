A d3j template file has a valid base syntax if it meets the following rules:

* It MAY use normal javascript and a jade style syntax, referred to as "d3j", interchangeably.
* The d3j syntax and javascript MUST be kept on separate lines.
* A d3j line MUST start with the d3j line START string (default is //) followed by an ESCAPE START string (default is >) followed by white space e.g:
//>
or the regexp:
"^" + START + "\w+"

* The START string is set at compile time and MUST be the same throughout the file.
* The ESCAPE START string MAY be different on each line. However, for readability, keeping it consistent across a file is recommended.
* The ESCAPE string MAY be used one time on the remaining d3j line or not at all. The ESCAPE string is based on the ESCAPE START string and in most cases it is identical, except for parenthesis type char taters. The following table shows ESCAPE START string and their related ESCAPE strings:

( )
) (
> <
< >
{ }
} {
[ ]
] [
* *

* Any line that does not much the criteria of a d3j line will be treated as a javascript line. Practically this means it can start with any characters, including the START string directly followed by white space.

This is the base syntax. There are a number of future language rules that MUST be followed for a d3j file to compile and execute as expected.

As explained above a d3j line starts with:

START + ESCAPE + WHITESPACE

E.g.

//>

It's should then follow with a valid jade string and optionally the escape string followed by a a valid d3j command. E.g.

START + ESCAPE + WHITESPACE + JADE [ + ESCAPE + COMMAND ]

E.g.

//> h1.myclass#id  #{i}. #{d} <forall(data)

As with jade white space at the start of a line is significant. More accurately a line is assigned an INDENT based on the number of characters from the start of the line to the first character of the JADE string. e.g. The length of this regexp match:

"^" + START + "\w+\s*"

The INDENT of first d3j line sets the minimum intent for all other d3j lines.
Practically this just means the jade like syntax needs to be visually "lined up" or intended at you read down the file. (This assumes your using a fixed width character set - if you're not you really need to be!). For example the following lines use different ESCAPE strings but are considered to be at the same INDENT:

//>   div.one
//:=~ div.two