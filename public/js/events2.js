// var classname = document.getElementsByClassName("btn");

// var i;
// for (i = 0; i < classname.length; i++) { 
// 	classname[i].addEventListener("click", function() {
// 		console.log("test");
// 	})
// }

// 1. Create the button
function test(item) {
	var button = document.createElement("button");
	button.innerHTML = item;

	// 2. Append somewhere
	var group = document.getElementById("btn-group");
	group.appendChild(button);

	// 3. Add event handler
	button.addEventListener ("click", function() {
		console.log(item);
	});
}