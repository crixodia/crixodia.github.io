var imgRnd = new Array();
var message = new Array();

imgRnd[0]="./assets/img/1.webp";
message[0] = "It works on my pc 😕";

imgRnd[1]="./assets/img/2.webp";
message[1] = "Compiling... 😴";

imgRnd[2]="./assets/img/3.webp";
message[2] = "Rockets rocks 🚀🤘";

imgRnd[3]="./assets/img/4.webp";
message[3] = "Without internet service 🔌";

imgRnd[4]="./assets/img/5.webp";
message[4] = "Music 24/7 🎶";

imgRnd[5]="./assets/img/6.webp";
message[5] = "😎";

imgRnd[6]="./assets/img/7.webp";
message[6] = "I love tea 🍵";

imgRnd[7]="./assets/img/8.webp";
message[7] = "🌟";

imgRnd[8]="./assets/img/9.webp";
message[8] = "Automatons 👾";

imgRnd[9]="./assets/img/10.webp";
message[9] = "It was a ';' 😠";

function randomize(){
	var rnd = Math.floor(Math.random()*imgRnd.length);
	document.images["profile-picture-img"].src=imgRnd[rnd];
	return message[rnd]
}