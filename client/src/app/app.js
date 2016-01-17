// uncomment this to use requireJS in Typescritpt
// declare function require(id: string): any; // declare there will be 'require' function in the runtime

import '../styles/main.scss';
var $ = require('jquery');



// var img = require('../images/newicon2.jpg');
// import greeter = require('./navbar/navbar.ts'); 
// console.log(greeter('test'));
// console.log('ggggsssgg');




$(document).ready(function() {
	$("body").html("This is Hello World by JQuery");
});