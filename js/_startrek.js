$(document).ready(function(){

	//Fix the heights of various elements
	(function(){
		//Fix heights of structural elements
		var fixHeights = function(){
	
			//Get the body height
			var body = $('body');
		
			//Get the topSection height with 7 for margins
			var topSection = $('#top-section').height() + 7;

			//Set the bottom section height
			var bottomSection = body.height() - topSection;
			$('#bottom-section').height(bottomSection);

			//Set the height of the bottom panels, minux 15 for margins
			var panelBottom = $('#panel-bottom').height();
			$('#bottom-panels').height(bottomSection - 113 - 15);

			//Fix the content div width 160 for margins
			$('#content').width(body.width() - 160);
			$('#content').height(body.height());
			
			//Fix the height for the bottom content
			$('#bottom-section-content').height(body.height() - (181 + 65));

		};

		//Fix the heights on document ready
		fixHeights();

		//Fix the heights when the window resizes
		$(window).resize(fixHeights);
	})();
	
	
	//Put the star date in the top left hand corner
	(function(){
		
		var placeStarDate = function(){
			$('#panel-top').html(starDate());
		};
		
		//Do it when the page loads
		placeStarDate();
		
		//Change the date every so often
		setInterval(placeStarDate,10000);
	
	})();
	
	//Put unix time in the panel
	(function(){
		
		var setTime = function(){
			//Get the time
			var unixTime = Date.now();

			//Add it to the UI
			$('#panel-bottom').html(unixTime);
			
			var nextTimeout = Math.floor(Math.random() * 4000);
			
			//Update the time at a random time
			setTimeout(setTime, nextTimeout);
		};
		
		//Apply time when the page loads
		setTime();
	})();
	
	
	(function(){
		
		//The number of options to cycle
		var numberOfOptions = 3;	
			
		//The sound of this UI click
		var volume = 10;
		
		//Keep track of sound we are up to
		var upTo = 0;

		//When certain elements are clicked
		$('#bottom-section > div, #top-section > div').click(function(){
			//Play the correct sound
			switch(upTo){
				case 0:
					sound.play('Computer - Beep', volume);
					break;
				case 1:
					sound.play('Computer sound 44', volume);
					break;
				case 2:
					sound.play('Computer thinking-short', volume);
					break;
			}
			
			upTo++;
			upTo %= numberOfOptions;
		});
	})();
	
	//Play a sound when links are clicked
	(function(){
		//When links are clicked
		$('a').click(function(){
			sound.play('Star Trek TNG Asterisk',50);
		});
	})();
	
	
	//Pulse the color of various elements
	(function(){
	
		//Define a data structure for pulsing elements
		var animations = [
			{
				element : '#panel-top',
				property : 'backgroundColor',
				colors : [
					'#8B88EE',
					'#7B78DE'
				]
			}
		];
	
		//Define a duration for the pulse
		var pulseDuration = 3000;
	
		//A simple helper to animate an element
		function animateTo(element, inColor, cssAnimateProperty){
			
			//Options object
			var options = {};
			
			//Set the color of the animated property
			options[cssAnimateProperty] = inColor;
		
			//Use the jQuery animate and color plugins
			$(element).animate(options, pulseDuration);
		}

		//Loop through the elements cycling their color
		function runColorShift(){
			$.each(animations, function(index, animation){
			
				if(typeof animation.currentColor == 'undefined'){
					animation.currentColor = 0;
				}else{
			
					//Get the next animation set and make sure it stays within boundary
					animation.currentColor++;
					animation.currentColor %= animation.colors.length;
				}

				//Get the color to animate
				var animatingTo = animation.colors[animation.currentColor];

				animateTo(animation.element, animatingTo, animation.property);

			});
		}
		
		//Run the animation shift every pulse duration
		setInterval(runColorShift, pulseDuration);

	})();


});
