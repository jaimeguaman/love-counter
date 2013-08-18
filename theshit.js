	//execute yourself mommy
	(function(){
		var app={
			//local variables
			timer : null,

			//options array
			options : [],

			//the number of hearts added
			added:0,

			//start this shit
			init: function(options){
				app.options=options;
				app.options.years=app.getYearRange(app.options.startDate.getFullYear());
				app.options.months=1;

				var currentMonth=app.options.currentDate.getMonth() + 1,
				currentYear=app.options.currentDate.getFullYear();
				for (var year in app.options.years){
					for (var month=1, _months=12; month <= _months;month++){

						if (app.options.years[year]==currentYear && currentMonth == month){
							app.timer = window.setInterval(function(){
								app.heart(app.options.months);
							}, 300);
							break;
						}else{
							if (month >= app.options.startDate.getMonth() + 1 
								|| currentYear > app.options.years[year] 
								) app.options.months++;
						}
					}
				}
			},

			//add a heart, or if all hearts already added, add the message
			heart : function (howMany){
				if (app.added !== howMany){
					$(app.options.heartContainer).append(app.heartMarkup());
					app.added++;
				}else{
					$(app.options.textContainer).append(app.textMarkup(howMany,app.options.name));
					clearInterval(app.timer);
				}

			},

			//html for a heart
			heartMarkup: function(){
				return '<div class="heart animated tada"></div>';
			},

			//html for the fucking message
			textMarkup : function(howMany,name){
				return '<p class="animated pulse"> ' + howMany + ' Meses Contigo, ' + name + '</p>';
			},

			//get year range
			getYearRange: function (from){
				var currentYear = new Date().getFullYear(), years = [];
				while (from <= currentYear) {
					years.push(from++);
				} 
				return years;
			},

			getURLParameter: function(name) {
				return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
			}

		};
		$(document).on('ready',function(){
			var who=app.getURLParameter('who'), date=app.getURLParameter('date');

			if (who && date){
				dateArray=date.split('-');
	
				app.init({
					currentDate : new Date(),
					startDate : new Date(dateArray[0], dateArray[1], dateArray[2]),
					heartContainer : '#hearts',
					textContainer : '#msg',
					name : who
				}); 
			}else{
				$('#start').fadeIn('slow');
				$('#btn-start').click(function(){
					who=$('#who').val();
					date=$('#startDate').val();
					if(who && date){
						$('#share').fadeIn('slow',function(){
							$('#link').text( document.URL + '?who=' + encodeURIComponent(who) + '&date=' +  date );
						});
					}
				});
			}
		});
	})();