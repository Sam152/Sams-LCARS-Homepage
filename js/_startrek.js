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
			$('#bottom-section-content, .body-content').height(body.height() - (181 + 65));

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
			
			var nextTimeout = Math.floor(Math.random() * 2000);
			
			//Update the time at a random time
			setTimeout(setTime, nextTimeout);
		};
		
		//Apply time when the page loads
		setTime();
	})();
	
	//Put a number animation in the panel
	(function(){

		//Set up some parameters of the animation
		var animationNumber = -17;
		var animationOffset = 16;
		var animationSpeed = 6000;

		//The previous animated number		
		var previousValue = 0;

		//This ended up way more complicated than it should have been, refactor
		function animateNumbers(){

			//Animate in the opposite direction each call
			animationNumber *= -1;

			//Called when the animate number changes
			function numberChange(now, fx){
				
				//Round the tick number
				now = Math.floor(now);
				
				//Reset the previous counter
				if(previousValue == -1 * animationNumber){
					previousValue = 0;
				}

				//Get the panel we are putting the number into
				var panel = $('#panel-bottom-square-1');
				
				//If the panel is empty populate it
				if(panel.html().trim() == ''){
					panel.html(animationOffset);
				}else{
			
					//Otherwise populate it with some values
					var number = parseInt(
						panel.html()
							.replace('EAX, ','')
							.replace('H','')
					);
			
					var panelValue = number  + now - previousValue;
					panel.html('EAX, '+panelValue + 'H');
				}

				//Maintain a previous value
				previousValue = now;
			}

			//I'm sure there are better ways to do this		
			$('#panel-bottom-square-1').animate(
				{	
					//Set a random CSS property we can hook into
					left : animationNumber,
				},
				{
					step: numberChange,
					duration: animationSpeed,
					complete: animateNumbers
				}
			);
		}
		
		//Call the function when the page loads
		animateNumbers();

	})();
	
	
	//Populate the last panel with some numbers
	(function(){
	
		$('#panel-bottom-square-3').html('UIMMD-99');
		$(document).mousemove(function(e){
			var displayNumber = (Math.ceil((e.pageX + e.pageY) / 120));
			$('#panel-bottom-square-3').html('UIMMD-' + displayNumber);			
		});
	})();
	
	//Make the initial panel slide out nicely
	(function(){
		
		//Set the width timeline
		var initialWidth = 100;
		var firstAnimation = 90;
		var secondAnimation = 100;
		
		//Set the animation speeds
		var firstAnimationSpeed = 50;
		var secondAnimationSpeed = 500;
	
		//Get the target element of the transform
		var targetElement = $('.panel-long-inner');
		
		//Shorten the width
		targetElement.css('width',initialWidth+'%');
		
		//Create a function to restore the width
		function runAnimations(){
			targetElement.animate(
				{
					width : firstAnimation+'%'
				},
				{
					duration: firstAnimationSpeed,
					complete: function(){
						targetElement.animate(
							{
								width: secondAnimation+'%'
							},
							{
								duration: secondAnimationSpeed
							}
						);
					}
				}
			);
		}
		
		$('#panel-top').mousedown(function(){
			targetElement = $('.panel-long-inner:eq(0)');
			runAnimations();
		});

		$('#panel-bottom').mousedown(function(){
			targetElement = $('.panel-long-inner:eq(1)');
			runAnimations();
		});
	
	})();
	
	
	//Do all the sound stuff
	(function(){
	
		//Define a data structure that maps an element, event, volume and list of sounds
		var sounds = [
			{
				element : '#panel-bottom, #panel-top',
				volume : 10,
				event : 'mousedown',
				sounds : [
					'Computer - Beep'
				],
			},
			{
				element : '#bottom-panels > div',
				volume : 5,
				event : 'mousedown',
				sounds : [
					'Computer thinking-short'
				],
			},
			{
				element : 'a',
				volume : 20,
				event : 'mousedown',
				sounds : [
					'Computer sound 44'
				]
			}
		];


		//sound.play('Computer thinking-short', volume);
		
		$.each(sounds, function(index, sound){
			
			//Bind to the click event
			$(sound.element).bind(sound.event, function(){
				//Cycle the sounds				
				if(typeof sound.upTo == 'undefined'){
					sound.upTo = 0;
				}else{
					sound.upTo++;
					sound.upTo %= sound.sounds.length;
				}
				//Get the sound to play
				var soundToPlay = sound.sounds[sound.upTo];

				//Play the sound
				audio.play(soundToPlay, sound.volume);
			});
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
				element : '#panel-top-square-1',
				property : 'backgroundColor',
				colors : [
					'#C498C4',
					'#ab75ab'
				]
			}
		];
	
		//Define a duration for the pulse
		var pulseDuration = 1000;
	
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
		
		//Run the shift immediately
		runColorShift();

		//Run the animation shift every pulse duration
		setInterval(runColorShift, pulseDuration);

	})();
	
	
	//Enable scrolling in the main content region
	(function(){
		
		var options = {
			verticalDragMaxHeight : 16,
			animateScroll: true
		};
		
		//Run the jQuery plugin
		function contentScrollbars(){
			$('.body-content').jScrollPane(options);
		}
		
		//Run it when the page load
		contentScrollbars();
		
		//Fix the bars when the window resizes
		$(window).bind('load resize',contentScrollbars);

	})();
	
	
	//Create a nice federation opening screen
	(function(){
		
		//The content div
		var content = $('#bottom-section-content');
		
		//Wrap the body content in a tempory div to hide stuff
		var wrapper = content
			.wrapInner('<div class="body-content"></div>')
			.find('.body-content');

		//Hide the main content
		wrapper.hide();
		
		//Add the federation div after the wrapper
		var federation = wrapper.after('<div id="federation"></div>').siblings('#federation');
		
		federation.css(
			'margin-top',
			((federation.parent().height() / 2) - (federation.height() / 2)) + 'px'
		);
		
		//Hide the federation symbol
		function hideFederation(){
			federation.fadeOut(3000, function(){
				federation.remove();
				wrapper.fadeIn(500);
				$(window).trigger('resize');
			});
		}
		
		$(window).load(function(){
			setTimeout(hideFederation, 1000);
		});
		
	})();
	
	
	//Make the numbers at the top of the page
	(function(){
		
		var rows = 5;
		var cols = 12;
		var sourceElements = $('.under-profile-buttons-source');
		var targetElement = $('.under-profile-buttons');
	
		//Generate a number for the front end based on the column or row		
		function generateNumber(row, col){
			
			var lowerLimit;
			var upperLimit;
			
			if(row % 2 == 0 && row > 0){
				lowerLimit = 0;
				upperLimit = lowerLimit + 140;
			}else{
				lowerLimit = 500;
				upperLimit = lowerLimit + 5000;
			}
			
			return rand(lowerLimit, upperLimit);
		}
		
		//Run quicksand
		function runQuicksand(){
			targetElement.quicksand(
				sourceElements.find('div'),
				{
					duration : 3000,
					adjustHeight : false,
					useScaling : false
				}
			);
			
			targetElement = $('.under-profile-buttons');
		}
		
		
		//Debug
		ST_rq = runQuicksand;

		//The initial seed
		(function(){
			//Loop through the cols and rows
			for(var i = 0; i < rows; i++){
				for(var n = 0; n < cols; n++){
				
					var element = $('<div>');
	
					//Add some classes for styling
					element.addClass('col-' + n);
					element.addClass('row-' + i);
				
					//Make them float the correct distance
					element.css('width',Math.floor(100 / cols) + '%');
				
					//Add something for quicksand
					element.attr('data-id','number-element-'+ i +'-'+ n);
				
					//Add a nice number to it
					element.html(generateNumber(i,n));
				
					//Add it to our source
					sourceElements.append(element);		
				}
			}
		})();

		//Apply quicksand right away with no animation duration
		targetElement.quicksand(sourceElements.find('div'), { duration : 0 });
		
		
		//Change the colors of rows and stuff
		(function(){
			
			var currentActiveRow = 0;
			var direction = 1;
			var timeout = 1000;
			
			//Get all the target divs
			var allTargets;
			
			function changeRow(){
				
				//Keep the target list up to date
				allTargets = $.merge(
					targetElement.find('div'),
					sourceElements.find('div')	
				);
			
				//Get rid of the active class for all elements
				allTargets.removeClass('highlighted');
				
				//Find the row to target
				currentActiveRow += direction;
				
				//Don't overflow the rows boundary
				currentActiveRow %= rows; 

				//Add the class to our target row
				allTargets.filter('.row-'+currentActiveRow).addClass('highlighted');
				
				//Call this function again later
				setTimeout(changeRow, timeout);
				
				if(rand(0,7) == 0){
					direction = rand(0,1);
				}
				
				if(rand(0,1) == 0){
					direction *= 1;
				}
			}

			//Call the function to get the ball rolling			
			changeRow();
	
		})();
		
		(function(){
			
			//Some variables to make it work
			var cellUpdateFrequency = 3;			
			var numberVariance = 100;
			var updateFrequency = 7000;
			var cellSwapFrequency = 30;
			
			function runNumberUpdates(){

				//Get all the active elements
				var elements = $('.under-profile-buttons-source > div');
				
				$.each(elements, function(index, element){
					
					//Get the value in the cell
					var cellValue = parseInt($(element).html());
					var amountToAdd = 0;
					
					if(rand(0,cellUpdateFrequency) == 0){

						amountToAdd = (rand(0,1) == 0)
							? -1 * numberVariance
							: numberVariance;
							
						//Do it within the next five seconds some time
						var whenToRun = rand(1000,5000);

						setTimeout(function(){
							$(element).html(cellValue + amountToAdd);
						},whenToRun);
					}
					
					//Swap some random elements with eachother
					if(rand(0,cellSwapFrequency) == 0){
						var swapTo = '.col-'+rand(0,cols-1)+'.row-'+rand(0,rows-1);
						$(element).swap(swapTo);
					}
				
				});
				
				runQuicksand();
				
				//Make it live to run another day
				setTimeout(runNumberUpdates,updateFrequency);
			
			}
			
			runNumberUpdates();
			
		
		})();
		
		

	})();

});
