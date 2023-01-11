Module.register("MM-timeto",{

	defaults: {
		text: "Time to:"

	},

  getScripts: function() {
    return ["moment.js"]
  },

	getDom: function() {
		var wrapper = document.createElement("div");
    wrapper.id = "timeto_wrapper"
    wrapper.style = ""

    var canvas = document.createElement("canvas")
    canvas.width = 100
    canvas.height = 320
    canvas.id = "TODO"

    var ctx = canvas.getContext("2d");
		ctx.font = "60px Arial";
    ctx.fillStyle = "gray";
    ctx.textAlign = "center";
		var hour = moment().format("h")
    ctx.fillText(hour, 50, 60);

		var currentTime = moment();

		var brushTeeth = moment().startOf('day').add(21, 'hour')
		let morningBrushTeeth = moment().startOf('day').add(7, 'hour').add(30,'minute')
		let pyjamas = moment().startOf('day').add(21, 'hour').add(30,'minute')
		let bed = moment().startOf('day').add(22, 'hour')
		let wakyWaky = moment().startOf('day').add(7, 'hour').add(30,'minute')
		let dress =	moment().startOf('day').add(7, 'hour').add(45,'minute')
		let brush =  moment().startOf('day').add(8, 'hour')
		let school = moment().startOf('day').add(8, 'hour').add(30,'minute')
		let homeTime = moment().startOf('day').add(18, 'hour')
		let weekday = currentTime.format("E")
		var img = new Image();
		img.src = "./modules/timeto/public/question.svg";

		if (currentTime >= brushTeeth && currentTime  < pyjamas) {
			img.src = "./modules/timeto/public/toothbrush.svg";
		};
		if (currentTime >= pyjamas && currentTime < bed) {
			img.src = "./modules/timeto/public/pajamas.png";
		};
		if (currentTime >= bed || currentTime  < wakyWaky) {
			img.src = "./modules/timeto/public/bed.svg";
		};
		if (currentTime >= morningBrushTeeth &&  currentTime  < dress) {
			img.src = "./modules/timeto/public/toothbrush.svg";
		}
		if (currentTime >= dress && currentTime < brush) {
			img.src = "./modules/timeto/public/shirt.svg";
		}
		if (currentTime >= brush && currentTime < school) {
			img.src = "./modules/timeto/public/brush.svg";
		}
		if (currentTime >= school && currentTime < homeTime) {
			img.src = "./modules/timeto/public/backpack.svg";
		}
		if (currentTime >= homeTime && currentTime < brushTeeth) {
			img.src = "./modules/timeto/public/question.svg";
		}
		if (weekday > 5 && currentTime < brushTeeth) {
			img.src = "./modules/timeto/public/question.svg";
		};

		img.onload = function() {
			ctx.drawImage(img, 0, 80, 100, 100);
		};

		Log.info("current image: " + img.src + "currentTime: " + currentTime.format('hh mm') + morningBrushTeeth.format('hh mm'));
    wrapper.appendChild(canvas);
		return wrapper
	},

	start: function () {
		var self = this;
    Log.info("Starting module: " + this.name);
    moment().locale("lt")
		setInterval(function() {
  		self.updateDom(); // no speed defined, so it updates instantly.
  	}, 100000); //p
  },

	notificationReceived: function(noti, payload, sender) {
		switch(noti) {
			case "DOM_OBJECTS_CREATED":
				this.updateDom()
				break
		}
	},
});
