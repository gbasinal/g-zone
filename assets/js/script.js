var app = {
    init: function() {
        if (this.initialized) return;
        this.initialized = true;
        for (var obj in this) this[obj].hasOwnProperty("init") && this[obj]["init"](this);
        
    },
    uiCustom: {
        defaults: {
           tl: new TimelineMax()
        },
        init: function(scope) {
            var _self = this,
                _defaults = _self.defaults;
                _self.fullpageInit();
                // _self.particleInit();
                _self.menuNavigation();
                _self.skillsAnimation();
        },
        fullpageInit: function(){
            $('#fullpage-main').fullpage({
                licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
                autoScrolling:true,
                scrollHorizontally: true,
                anchors:['home', 'about', 'skills']
                
            });
            $.fn.fullpage.setAllowScrolling(false);
        },
        particleInit: function(){
            particlesJS('particles-js',
                {
                  "particles": {
                    "number": {
                      "value": 120,
                      "density": {
                        "enable": true,
                        "value_area": 800
                      }
                    },
                    "color": {
                      "value": "#ec4d37"
                    },
                    "shape": {
                      "type": "circle",
                      "stroke": {
                        "width": 0,
                        "color": "#000000"
                      },
                      "polygon": {
                        "nb_sides": 5
                      },
                      "image": {
                        "src": "img/github.svg",
                        "width": 100,
                        "height": 100
                      }
                    },
                    "opacity": {
                      "value": 1,
                      "random": true,
                      "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0,
                        "sync": false
                      }
                    },
                    "size": {
                      "value": 20.029964827381747,
                      "random": true,
                      "anim": {
                        "enable": false,
                        "speed": 4,
                        "size_min": 0.3,
                        "sync": false
                      }
                    },
                    "line_linked": {
                      "enable": false,
                      "distance": 150,
                      "color": "#ffffff",
                      "opacity": 0.4,
                      "width": 1
                    },
                    "move": {
                      "enable": true,
                      "speed": 1,
                      "direction": "none",
                      "random": true,
                      "straight": false,
                      "out_mode": "out",
                      "bounce": false,
                      "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 600
                      }
                    }
                  },
                  "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                      "onhover": {
                        "enable": true,
                        "mode": "bubble"
                      },
                      "onclick": {
                        "enable": true,
                        "mode": "repulse"
                      },
                      "resize": true
                    },
                    "modes": {
                      "grab": {
                        "distance": 400,
                        "line_linked": {
                          "opacity": 1
                        }
                      },
                      "bubble": {
                        "distance": 250,
                        "size": 0,
                        "duration": 2,
                        "opacity": 0,
                        "speed": 3
                      },
                      "repulse": {
                        "distance": 400,
                        "duration": 0.4
                      },
                      "push": {
                        "particles_nb": 4
                      },
                      "remove": {
                        "particles_nb": 2
                      }
                    }
                  },
                  "retina_detect": true
                }
             
        )},
        menuNavigation: function(){
          $('.menu-item').on('click',function(target){
            target.preventDefault();
            let targetSection = $(this).data("nav");
            let currentSection = fullpage_api.getActiveSection().anchor
            app.uiCustom.toSectionAnimation(currentSection)
            setTimeout(function(){
              fullpage_api.moveTo(targetSection);
            },2000)
            
          })
        },
        toSectionAnimation: function(section){
          
          let sectionName = $('.section--'+section+'-page')
          console.log(sectionName)
          TweenMax.to(sectionName, .3, {scale:.8});
          TweenMax.to(sectionName, .8, {opacity: 0})
          setTimeout(function(){
            app.uiCustom.sectionOverlayAnimation('in')

          },500)
          setTimeout(function(){
            app.uiCustom.sectionOverlayAnimation('out')
            TweenMax.to(sectionName, 0, {opacity: 1})
            TweenMax.to(sectionName, .3, {scale:1});
          },2700)
          
        },
        sectionOverlayAnimation: function(action){
          let tl = new TimelineMax();
          let sectionOverlay = $('.section--overlay');
          let left = $('.overlay-container--left');
          let right = $('.overlay-container--right');
          let message = $('.overlay-container--content .overlay-message-wrapper')
          sectionOverlay.show()

          if(action==='in'){
            sectionOverlay.show(200)
            tl.to([
              left,right
            ],.5,{width:'50%'})
            
            TweenMax.to(message, 2, {opacity: 1})
            $('.tilt').textillate(
              {
                in: {
                 effect: 'tada',
                 delayScale: 1
                },
                out: {
                  effect : 'fadeOut',
                  shuffle: true,
                  delayScale: 1
                },
                inEffects: [
                  'fade'
                ],
                loop: true,
                autoStart: true,
                initialDelay: 1
              }
            );
            
            $('.tilt').on('inAnimationBegin.tlt', function(){
              app.uiCustom.loadingBarAnimation()
            })

            //   .to(message, .3, {opacity: 1})

          }else {
            TweenMax.to(left,.3,{width : 0})
            TweenMax.to(right,.3,{width : 0})
            sectionOverlay.hide(200)
          }

          
          
        },
        loadingBarAnimation(){
          let bar = $('.overlay-bar');
          TweenMax.to(bar, 2, {width: '100%'})
        },
        skillsAnimation(){
          let content =  $('.skills-content-container')
          let anim = $('.skills-animation-wrapper h1')
          let header = $('.page-header')
          let tl2 = new TimelineMax({repeat:-1, yoyo:false, repeatDelay:0});
          let tl = app.uiCustom.defaults.tl;
          let feItems = $('.fe-items');


          
          tl2.to(anim, 0.8, {text:{value:"back end development", newClass : "back-end", oldClass:"front-end"}, padSpace:true,  ease:Linear.easeNone,delay:2});
          tl2.to(anim, 0.8, {text:{value:"content management systems",newClass : "cms", oldClass:"cms"}, padSpace:true, ease:Linear.easeNone,delay:2});
          tl2.to(anim, 0.8, {text:{value:"front end development",newClass : "front-end", oldClass:"front-end"}, padSpace:true, ease:Linear.easeNone,delay:2});
          
          anim.on('mouseover', function(e){
            tl.to([header,content], .5 , {scale: .8, opacity: .5, transformOrigin: '50%'})
              .to(anim, .5 , {scale:1.1},'-=.5')

            tl2.pause()
            console.log(e.target.className)
            if(e.target.className === "front-end"){
              $('.skills-fe-container').show(200)
              app.uiCustom.skillFrontEndAnimation('front-end',null, "in");
            }
            
          })
          anim.on('mouseout', function(){
            let items = $(this).attr('data-items');
            let level = $(this).attr('data-level');
            // tl.to([header,content], .5 , {scale:1, opacity: 1, transformOrigin: '50%'})
            //   .to(anim, .5 , {scale:1},'-=.5')
            // tl2.resume()
            // $('.skills-fe-container').hide(200)
            // TweenMax.to($('.fe-items h3'), 1 , {opacity: 0})
            app.uiCustom.skillFrontEndAnimation('front-end', null, null)
          })

          feItems.on('mouseover',function(e){
            let items = $(this).attr('data-items');
            let level = $(this).attr('data-level');
            let lvls = $('.items-level-container');

            app.uiCustom.skillFrontEndAnimation(items, level, "in")

          })

          feItems.on('mouseout',function(e){
            let items = $(this).attr('data-items');
            let level = $(this).attr('data-level');
            let lvls = $('.items-level-container');

            app.uiCustom.skillFrontEndAnimation(items, level, "out")



          })



        },
        skillFrontEndAnimation(items, level, hover){
          
          let item1 = $('.fe-items--1 h3')
          let item2 = $('.fe-items--2 h3')
          let item3 = $('.fe-items--3 h3')
          let item4 = $('.fe-items--4 h3')
          let item5 = $('.fe-items--5 h3')
          let item6 = $('.fe-items--6 h3')
          let item7 = $('.fe-items--7 h3')
          let lvl = level;
          let tl = new TimelineMax();

          
          let levels = [
            "Tsk, More practice required",
            "I'm finally getting the hang of it!",
            "I'm Awesome at this!"
          ]


          if(hover === "in"){
            if(items === "front-end"){
              tl.to(item1, .8, {scrambleText:"html", opacity: 1, chars: 'lowerCase'})
                .to(item2, .8, {scrambleText:"css",opacity: 1, chars: 'lowerCase'},'-=.3')
                .to(item3, .8, {scrambleText:"javascript",opacity: 1, chars: 'lowerCase'},'-=.3')
                .to(item4, .8, {scrambleText:"gsap animation",opacity: 1, chars: 'lowerCase'},'-=.3')
                .to(item5, .8, {scrambleText:"html canvas animation",opacity: 1, chars: 'lowerCase'},'-=.3')
                .to(item6, .8, {scrambleText:"reactjs",opacity: 1, chars: 'lowerCase'},'-=.3')
                .to(item7, .8, {scrambleText:"angular2+",opacity: 1, chars: 'lowerCase'},'-=.3')
            }else {
              let i = $("."+items+"").find('p');
              tl.to(i, .8 , {scrambleText :"" +levels[lvl]+ "" , opacity: 1 , chars: 'lowerCase'})
            }

          }else if(hover === "out"){
            let i = $("."+items+"").find('p');
            console.log(i)
            console.log(hover)
            console.log(items)
            
            tl.to(i, .8 , {scrambleText :"" +levels[lvl]+ "" , opacity: 0 , chars: 'lowerCase'})
          }
        } 
    }
}
$(document).ready(function() {
    app.init()
});
$(window).on('load', function() {
})