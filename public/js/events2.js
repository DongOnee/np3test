function create_btn(input) {
	// 1. Create the button
	var button = document.createElement("button");
	button.innerHTML = input;

	// 2. Append somewhere
	var body = document.getElementById("btn-group");
	body.appendChild(button);

	// 3. Add event handler
	button.addEventListener ("click", function() {
		console.log(input);
	});
}