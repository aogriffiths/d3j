d3j = {"version":"0.0.2"};

d3j.select = function(d3Selection){
  return new d3j.selection(d3Selection);
} 

d3j.selection = function(d3Selection){
  this.d3Selection = d3Selection;
  this.stack = [];
};
/*

 p = (new jade.Parser("element(type=type, value='Hello #{name}') text")).parse()


  d3j
    .sele("html")  
    .sele("  head")
    .mele("    p.x#y #{d}" )
    .data(      [1,2,3])
    .text(      function(d){return d})
    .attr(      "id", funcion(d){return d})
    .sele("    p cool")

Bcause you select on class, id and element data, if you want to change it

    */
d3j.selection.prototype = {
  "s" : singleElement,
  "m" : manyElement,
  "d" : data,
  "t" : text,
  "a" : attribute,
  "sele" : singleElement,
  "mele" : manyElement,
  "data" : data,
  "text" : text,
  "attr" : attribute
}

function singleElement(val){
  
}

function manyElement(val){
  
}

function data(val){
  
}

function text(val){
  
}

function attribute(attr, val){
  
}

/* 
append(1,      ".btn-group").
append(2,         "button.btn.btn-default.dropdown-toggle(type='button', data-toggle='dropdown')").
append(3,           "| Title").
append(3,           "span.caret").
append(2,         ".dropdown-menu").
e(3,           "ul.dropdown-menu-fixed").
*/


module.exports = d3j;