/*
 * A simple object to manage playing sounds.
 */
function soundManager(inVolume){

	//Scoping reasons
	var _this = this;

	//Set the initial volume
	this.volume = inVolume;

	this.play = function(soundName, volume){

		//The volume this sound will be played at
		var volumeLevel;

		//Use the function parameter by default
		if(typeof volume != "undefined"){
			volumeLevel = volume;
		}else{
			//Fall back to our objects default
			volumeLevel = _this.volume;
		}

		//Create an audio tag
		var audioElement = document.createElement('audio');	

		//Set the volume
		audioElement.volume = parseFloat(volumeLevel / 100);

		//Set the source relative to our sound path
		audioElement.setAttribute('src', '../sound/' + soundName + '.wav');

		//Play the sound
		audioElement.play();
	}

}

//Create a new sound object for the rest of our application
var audio = new soundManager(10);
