var example = document.getElementById("example"),
			    ctx     = example.getContext('2d');
			example.height = 480;
			example.width  = 640;
			ctx.beginPath();
			ctx.moveTo(10, 15);
			ctx.bezierCurveTo(75, 55, 175, 20, 250, 15);
			ctx.moveTo(10, 15);
			ctx.quadraticCurveTo(100, 100, 250, 15);
			ctx.stroke();