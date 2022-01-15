import Board from './board.js';
import Game from './game.js';
const game = new Game();
let settingsForm = document.getElementById("settings-form");
document.getElementById("boardSize").addEventListener('change', function (ev) {
	let v = +ev.target.value;
	toggleSettingMenu();
	game.board = new Board(v);
	game.reset();
})
Array.from(document.getElementsByName("mode")).forEach(function(elem) {
	elem.addEventListener("change", function (event) {
		var v = +event.target.value;
		toggleSettingMenu();
		game.setGameMode(v);
		game.reset();
	});
});
document.getElementById("restart").addEventListener("click", function(){
	game.reset();
})
document.getElementById("settings-btn").addEventListener("click", function() {
	toggleSettingMenu();
})
canvas.addEventListener('click', game.nextPlay.bind(game));

function toggleSettingMenu(){
	if (settingsForm.classList.contains("hidden")){
		settingsForm.classList.remove("hidden");
		document.getElementById("cog-icon").className = "fas fa-times";
	} else {
		settingsForm.classList.add("hidden");
		document.getElementById("cog-icon").className = "fas fa-cog";
	}
}