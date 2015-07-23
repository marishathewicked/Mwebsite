(function($){
	
	
	$(document).ready(function(){
	
		var page	= $('#page');

		// Creating images размер рамки и область заполнения:
			
		var picArr = [
			new pic({
				top : 100, left : 30, width : 60,height : 100, href:'#',
				img : { src : 'https://s3.eu-central-1.amazonaws.com/marishathewicked/images/img5.jpg', offsetTop : 0, offsetLeft: 30}
			}),
			new pic({
				top : 55, left : 107, width : 70,height : 115, href:'#',
				img : { src : 'https://s3.eu-central-1.amazonaws.com/marishathewicked/images/img6.jpg', offsetTop : 0, offsetLeft: 40}
			}),
			new pic({
				top : 188, left : 115, width : 82,height : 69, href:'#',
				img : { src : 'https://s3.eu-central-1.amazonaws.com/marishathewicked/images/img20.jpg', offsetTop : 80, offsetLeft: 66}
			}),
			new pic({
				top : 90, left : 198, width : 100,height : 62, href:'#',
				img : { src : 'https://s3.eu-central-1.amazonaws.com/marishathewicked/images/img23.jpg', offsetTop : 43, offsetLeft: 73}
			}),
			new pic({
				top : 52, left : 315, width : 58,height : 90, href:'#',
				img : { src : 'https://s3.eu-central-1.amazonaws.com/marishathewicked/images/img9.jpg', offsetTop : 13, offsetLeft: 42}
			}),
			new pic({
				top : 167, left : 216, width : 90,height : 58, href:'#',
				img : { src : 'https://s3.eu-central-1.amazonaws.com/marishathewicked/images/img10.jpg', offsetTop : 80, offsetLeft: 13}
			}),
			new pic({
				top : 159, left : 325, width : 63,height : 93, href:'#',
				img : { src : 'https://s3.eu-central-1.amazonaws.com/marishathewicked/images/img16.jpg', offsetTop : 37, offsetLeft: 9}
			}),
			new pic({
				top : 148, left : 406, width : 137,height : 74, href:'#',
				img : { src : 'https://s3.eu-central-1.amazonaws.com/marishathewicked/images/img12.jpg', offsetTop : 99, offsetLeft: 56}
			}),
			new pic({
				top : 69, left : 394, width : 75,height : 63, href:'#',
				img : { src : 'https://s3.eu-central-1.amazonaws.com/marishathewicked/images/img13.jpg', offsetTop : 56, offsetLeft: 54}
			}),
			new pic({
				top : 40, left : 491, width : 62,height : 93, href:'#',
				img : { src : 'https://s3.eu-central-1.amazonaws.com/marishathewicked/images/img17.jpg', offsetTop : 90, offsetLeft: 37}
			}),
			new pic({
				top : 72, left : 576, width : 64,height : 107, href:'#',
				img : { src : 'https://s3.eu-central-1.amazonaws.com/marishathewicked/images/img14.jpg', offsetTop : 40, offsetLeft: 50}
			})
		];
		
		//  #page div:
		
		$.each(picArr,function(){
			page.append(this.elem);
		});
		
	
				
		$(window).load(function(){

			page.mousemove(function(e){
				
				var left = (e.pageX - page.offset().left),
					top = (e.pageY - page.offset().top),
					pic = null;
				
				
				for(var i = 0;i < picArr.length;i++){
					pic = picArr[i];
					
					if(pic.near(left,top)){

						if(pic.over(left,top)){
							pic.open();
						}
						else pic.focus();
					}
					else pic.close();
				}
				
			}).mouseleave(function(){
				
				// после смены позиции курсора изобажение сворачивается 
				
				for(var i = 0;i < picArr.length;i++){
					picArr[i].close();
				}
				
			});
		});	
	});

	function pic(options){
	
		$.extend(this,options);
				this.elem = $('<a>',{
			className: 'pic',
			href: this.href,
			css : {
				top : this.top,
				left : this.left,
				width: this.width,
				height: this.height
			}
		});

		var borderWidth = 5;

		this.bottom = this.top+this.height+2*borderWidth;
		this.right = this.left+this.width+2*borderWidth;
		
		this.image = $('<img>',{
			css:{
				left : -this.img.offsetLeft,
				top : -this.img.offsetTop
			}
		});
		
		var self = this;
		
		//  this.elem:
		
		this.image.hide().appendTo('body').load(function(){
			
			self.img.width = self.image.width();
			self.img.height = self.image.height();
			self.elem.append(self.image.show());
			
		}).attr('src',this.img.src);
		
	}

	pic.prototype = {
		open	: function(){
			if(this.opened){
				return false;
			}
			
			this.opened = true;
			
			// полный размер картинки 100:
			this.expand(100);
		},
		close	: function(){
			if(!this.opened && !this.focused){
				return false;
			}
			
			this.opened = this.focused = false;
			this.expand(0);
		},
		focus	: function(){
			if(this.focused || this.opened){
				return false;
			}
			
			this.focused = true;

			this.expand(30);
		},
		
		near	: function(x,y){
			return (x > this.left-15 && x < this.right+15 && y > this.top-15 && y < this.bottom+15);
		},
		
		over	: function(x,y){
			return (x > this.left && x < this.right && y > this.top && y < this.bottom);
		},
		
		expand : function(animPercent){
			if(!this.animateObj){
				this.animateObj = {count:0};
			}
			$(this.animateObj).stop().animate({
				count:animPercent
			},{
				duration:150,
		
				step:$.proxy(this.stepAnimation,this)
			});
		},
		
		stepAnimation : function(p,fx){
				
			p = p/100;
						this.elem.css({
				width : (this.img.width - this.width)*p + this.width ,
				height : (this.img.height - this.height)*p + this.height,
				marginTop : -this.img.offsetTop*p,
				marginLeft: -this.img.offsetLeft*p,
				zIndex: 100*p
			});
		
			this.image.css({
				marginLeft : p*this.img.offsetLeft,
				marginTop : p*this.img.offsetTop
			});
		}
	};

})(jQuery);
