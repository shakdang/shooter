// /* ------------- VARS -------------- */

// var sw = sh = 1E2, // canvas height and width
//     cv = ctx = ms = undefined,
//     sc = 10,    // stars count
//     i  = 0,     // stock iterator
//     _u = void 0,// undefined alias
//     co  = '#EEE'

// // collections
// var $s = [],
//     $b = [],
//     $e = []

// /* ------------- DRAW -------------- */

// function draw() {
//     ctx.fillStyle = '#FFF'
//     ctx.fillRect(0,0,cv.width, cv.height)
//     _ck() // check for key presses
//     _uB() // update bullet positions
//     _co() // check for bullet collisions

//     $s.map(_r) //render stars
//     $e.map(_r) //render enemies
//     $b.map(_r) // render bullets
//     ms._r()    // ms is not a collection so render it straight away
// }

// /* ------------- UPDATE -------------- */

// function _uB() {
//     for (i=l($b); i--;) {
//         var b = $b[i]
//         if (b.y < 0) {
//             $b.splice(i,1); i++; break;
//         }
//         b.update()
//     }
// }

// /* ------------- RENDERS -------------- */

// function _r(o) {o._r()} // this will render everything

// /* ----------- INTERACTIONS ----------- */

// // FIRE PRESSED
// function _fp() {
//     console.log('asd')
//     $b.push(new _B(ms.x + ms.w/2, ms.y))
// }

// // CHECK KEY PRESSES
// function _ck() {
//     KT._isKD(KT.L) && ms.mvL()
//     KT._isKD(KT.R) && ms.mvR()
// }

// // COLLISION DETECTION
// function _co() {
//     for (i=l($b); i--;) {
//         var b = $b[i]
//         for (var j=l($e); j--;) {
//             var e = $e[j]
//             if (b.x < (e.x + e.w) && b.x > e.x) {
//                 if (b.y > e.y && b.y < (e.y + e.h)) {
//                     $e.splice(j,1); j++;
//                     $b.splice(i,1); i++;
//                     break;
//                 }
//             }
//         }
//     }
// }

// /* ------------- OBJECTS -------------- */

// /** @constructor*/
// function _E(x,y,i) {
//     this.w = i.width
//     this.h = i.height
//     this.x = x
//     this.y = y
//     this.i = i

//     this._r = function() {
//         ctx.drawImage(this.i, this.x, this.y);
//     }
// }

// /** @constructor*/
// function _B(x,y) {
//     this.w = 2
//     this.h = 4

//     this.x = x
//     this.y = y

//     this._r = function() {
//         _R(this, co)
//     }

//     this.update = function() {
//         this.y -= 5;
//     }
// }

// /** @constructor*/
// function _S() {
//     this.w = 30
//     this.h = 10

//     this.x = (sw/2) - (this.w/2)
//     this.y = sh - this.h

//     this._r = function() {
//         _R(this, co)
//     }

//     this.mvL = function() {
//         this.x > 0 && (this.x-=2)
//     }

//     this.mvR = function() {
//         (this.x + this.w) < sw && (this.x+=2)
//     }
// }

// /** @constructor*/
// function _T() {
//     this.x = _rnd(sw, _u)
//     this.y = _rnd(sh, _u)
//     this.h = this.w = (250/(250+_rnd(3E2,2E3)))*10

//     this._r = function() {
//         this.y += this.h;
//         if (this.y > sh) {
//             this.y -= sh
//             this.x = _rnd(sw, _u)
//         }
//         _R(this, co)
//     }
// }

// function _R(o,c) {
//     ctx.fillStyle = c
//     ctx.fillRect(o.x, o.y, o.w, o.h)
// }

// function _rnd(min, max) {
//     if (min === _u) {
//         min = 0;
//         max = 1;
//     } else if (max === _u) {
//         max = min;
//         min = 0;
//     }
//     return (Math.random() * (max-min)) + min;
// };

// function l(o) { return o.length }

// /* ------------- MAIN LOOP -------------- */
// function _l() {
//     window.draw()
//     raf(_l)
// }

// /* --------------- PACEMAKER -------------- */
// (function() { window.raf = window['webkitRequestAnimationFrame'] }())

// /* ------------- INITS -------------- */
// window.addEventListener('load', init, false);

// function init() {
//   // init canvas
//     cv        = document.getElementById('g')
//     ctx       = cv.getContext('2d')
//     cv.width  = sw
//     cv.height = sh

//     // init stars
//     for(i = 0; i<sc; i++) $s.push(new _T()) // star generator

//     _inE()             // init enemies
//     ms = new _S()      // create the mother ship
//     KT = new _kt()     // init keytracker
//     KT._aKDL(" ", _fp) // track fire presses
//     _l()               // kick off the main game loop
// }

// // INIT ENEMIES
// function _inE() {
//     var i = new Image()
//     i.src = "1.png"
//     $e.push(new _E(10,10,i))
// }

// /* ------------- KEY TRACKER -------------- */

// /** @constructor*/
// function _kt() {
//     this.L   = 37 // const Key Left
//     this.R   = 39 // const Key Right
//     this._kp = {} // key press history
//     t        = [] // key down tracker

//     this._isKD = function (k) { return(this._kp[k]) }

//     _al(t, 'keydown')
//     _al(t, 'keyup')

//     this._aKDL = function(k,f) { t.push({k:k.charCodeAt(0), f:f}) }
// }

// function _al(o,m) {
//     document.addEventListener(m, function(e) {
//         c = e.keyCode
//         m == 'keyup' && (KT._kp[c] = false)
//         for(i = l(o); i--;) {
//             if((c == o[i].k) && (!KT._kp[c])) o[i].f()
//         }
//         m == 'keydown' && (KT._kp[c] = true)
//     })
// }

// --------------------------------------------------

// invader
// 11100101000000101100100001001101 = 3842164813
// 11111110111101111011111111111111 = 4277649407
// 111111111111101111111111000      = 134209528
// 1000000100010000000010           = 2114562

// ship
// 11101000000100000001111111111101 = 3893370877
// 1111111111111111111111111        = 33554431

// bullet
// 10010111111                      = 1215

// star
// 100011                           = 35

var
    u,                         // undefined alias
    d = document,              // document alias
    v = d.getElementById('g'), // canvas
    c = v.getContext('2d'),    // context 2d
    k = new K(),               // key tracker
    i = 0,                     // counter
    l = {                      // object collection
        t:[],                  // stars
        e:[],                  // enemies
        s:[],                  // ship/s
        b:[]                   // bullets
    },
    // from LSB -> MSB: 1 bit marker followed by 4 bits of shape width followed by shape matrix
    m = {
        e: [3842164813,4277649407,134209528,2114562], // enemy shape and size bit template
        s: [3893370877,33554431],                     // ship shape and size
        b: [1215],                                    // bullet shape and size matrix
        t: [35]                                       // star shape and size
    },
    $ = 1

/**
 * Main drawing function
 */
function D() {
    c.fillStyle = '#EEE'
    c.fillRect(0,0,v.width,v.height)

    k.l(37) && l.s[0].m(-2) // key left press check
    k.l(39) && l.s[0].m(2)  // key right press check

    l.t.map(function(o,i){o.y += o.h; if (o.y > h){ o.y -=h; o.x = R(w)}}) // update stars
    l.b.map(function(o,i){o.y < 0 ? l.b.splice(i,1) : o.y -= o.h}) // update bullets

    for (o in l) l[o].map(function(o,i){o.r()}) // render the object collection
}

// OBJECTS

/**
 * Generates and renders all shapes that are drawn for this game using the bit templates
 * @constructor
 */
function Z(x,y,m,s) {
    var o = this                                     // shape local reference
    o.x = x                                          // shape position x
    o.y = y                                          // shape position y
    o.w = 16^(parseInt(m.splice(0,5).join(''),2))    // shape width - first 5 bits from the map minus the least significant marker bit
    o.h = C(m)/o.w * s                               // shape height
    o.i = m                                          // shape matrix
    o.s = s                                          // shape scaling multiplier

    this.r = function() {
        o.i.map(function(v,i){
            c.fillStyle = v > 0 ? '#000' : '#EEE'    // we only do two colours :D
            c.fillRect((i%o.w*o.s)+o.x, (Math.floor(i/o.w)*o.s)+o.y, $,o.s)
        })
    }

    this.m = function(d) {
        (o.x + d > 0 && o.x + d + o.w < w) && (o.x += (d * o.s)) // shape movement function (scaled)
    }
}

// UTILITIES

/**
 * javascript object length alias
 */
function C(o) { return o.length }

function X(o) {
        var r = []
        o.map(function(i){r=r.concat(i.toString(2).split(''))}) // converts int to bit map and then to bit array
    return r
}

/**
 * Random number generator returns random number between x and 1 (inclusive)
 */
function R(x) {
    return (Math.random()*x)+1
}

/**
 * Main recursive loop for drawing
 */
function L() { D(); P(L) };

/**
 * Keytracker
 * @constructor
 */
function K() {
    var o = this
    o.a = {} // key press events register
    o.b = [] // key press tracker

    this.l = function (k) { return(o.a[k]) } // is keydown

    A(o,'keydown')
    A(o,'keyup')
};

function A(o,m) {
    d.addEventListener(m, function(e) {
        var c = e.keyCode
        o.a[c] = !(m == 'keyup')
        for(i = C(o.b); i--;) {
            if((c == o.b[i].k) && (!o.a[c])) o.b[i].f()
        }
    }, 0)
};

/**
 * Initialising bootstrap, is only called once as soon as it is loaded
 */
function I() {
    P  = window['webkitRequestAnimationFrame'] // setup the pacemake
    v.width = v.height = w = h = 170 // size of the vanvas
    var s = 6// spacing

    for(i=2; i--;) {
        // we dont know the width or height of the shape unless it has been loaded
        // as this information is embded within the bit map, so we have to make two passes
        i > 0 ? l.s.push(new Z(w/2, h, X(m.s), $)) : l.s[0].y = h-l.s[0].h                 // first load ship then position it in the 2nd pass
        for (j=5;j--;) {
            i>0 ? l.e.push(new Z(0,s,X(m.e), $)) : l.e[j].x =  j*l.e[j].w*$+s+s*j          // load enemy grid and then position it in the 2nd pass
            l.t.push(new Z(R(w),R(h),X(m.t),(100/(400+R(2E3)))*10))                        // add 10 stars which will be recycled througout
        }
    }
    k.b.push({k:32,f:function(){ var s=l.s[0]; l.b.push(new Z(s.x+s.w/2,s.y,X(m.b),$)) }}) // key listener for the fire button

    L() //kick off the recursive main loop
}

window.addEventListener('load', I, false);

