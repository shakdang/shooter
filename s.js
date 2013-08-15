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

var u, v, x, i=0, d=document, l={s:[],o:[],m:[],f:[]}

/**
 * Main drawing function
 */
function D() {
    x.fillStyle = '#EEE'
    x.fillRect(0,0,v.width,v.height)

    $K.kd(37) && l.m[0].ml()
    $K.kd(39) && l.m[0].mr()
    
    for (o in l) l[o].map(r)
}

function r(o) { o.r() } // renderer for the map function

// OBJECTS

/** @constructor*/
function S(p,y,m) {
    var o = this
    o.x = x
    o.y = y
    o.h = o.w = m

    this.r = function() {
        o.y += o.h
        if (o.y > h) {
            o.y -= h
            o.x = R(w,u)
        }
        x.fillStyle = '#CCC'
        x.fillRect(o.x, o.y, o.w, o.h)
    }
}

/** @constructor*/
function O(p,y,m) {
    var o = this
    o.x = p
    o.y = y
    o.h = m.height
    o.w = m.width
    o.i = m

    this.r = function() {
        x.drawImage(o.i, o.x, o.y)
    }

    this.ml = function() {
        o.x > 0 && (o.x-=2)
    }

    this.mr = function() {
        (o.x + o.w) < w && (o.x+=2)
    }
}

// UTILITIES

/**
 * javascript object length alias
 */
function C(o) { return o.length }

/**
 * Random number generator
 */
function R(n,x) {
    if (x === u) {
        x = n
        n = 0
    }
    return (Math.random() * (x-n)) + n
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

    this.kd = function (k) { return(o.a[k]) } // is keydown

    A(o,'keydown')
    A(o,'keyup')
};

function A(o,m) {
    d.addEventListener(m, function(e) {
        c = e.keyCode
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
    P  = window['webkitRequestAnimationFrame'] // setup the pacemaker
    $K = new K()

    // initialise canvas
    v = d.getElementById('g')
    x = v.getContext('2d')
    v.width = v.height = w = h = 170 // size of the vanvas
    var s = 6, m

    // using nested loops to load image, sgenerate the ship, the enemies and the stars.
    // 2 images need to be loaded, 1 of which generates 5 enemies so we break loops
    // once to generate the 5 enemies and once to generate the ship. combined, we get
    // 10 iterations which is exactly the number of stars we want to generate so
    // instead of 3 individual loops, we don 1 nested to acheive the same
    for(i=2; i--;) { //image loader
        m = new Image()
        m.src = i+'.png'
        i>0 ? (m = new O(s,s,m)) : l.m.push(new O(w/2,h-m.height,m))// add ship
        for (j=5;j--;) {
            i>0 && l.o.push(new O((j*m.w+s+s*j),s,m.i)) // generate enemy grid
            l.s.push(new S(R(w,u),R(h,u),(250/(250+R(3E2,2E3)))*10)) // add stars
        }
    }
    $K.b.push({k:32,f:function(){ m = l.m[0]; l.f.push(new S(m.x + m.w/2, m.y, 4)) }})


    L() //kick off the recursive main loop
}

window.addEventListener('load', I, false);
