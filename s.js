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
    k,                         // key tracker
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
        b: [4863],                                    // bullet shape and size matrix
        t: [35]                                       // star shape and size
    },
    a = {},
    b = []

/**
 * Main drawing function
 */
function D() {
    c.fillStyle = '#000'
    c.fillRect(0,0,w,h)

    a[37] && l.s[0].m(-2) // key left press check
    a[39] && l.s[0].m(2)  // key right press check

    for (i=C(l.b); i--;) {
        var b = l.b[i]
        for (var j=C(l.e); j--;) {
            var e = l.e[j]
            if (b.x < (e.x + e.w) && b.x > e.x) {
                if (b.y > e.y && b.y < (e.y + e.h)) {
                    l.e.splice(j,1)
                    l.b.splice(i,1)
                    break
                }
            }
        }
    }

    l.t.map(function(o,i){o.y += o.h; if (o.y > h){ o.y -=h; o.x = R(w)}}) // update stars
    l.b.map(function(o,i){o.y < 0 ? l.b.splice(i,1) : o.y -= o.h})         // update bullets
    
    for (o in l) l[o].map(function(o){o.r()})                              // render the object collection
    P(D)                                                                   // get the next animation frame and draw again
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
            c.fillStyle = v > 0 ? '#FFF' : '#000'    // we only do two colours :D
            c.fillRect((i%o.w*o.s)+o.x, (Math.floor(i/o.w)*o.s)+o.y, o.s, o.s)
        })
    }

    this.m = function(d) {
        (o.x+d > 0 && o.x+d+o.w < w) && (o.x += (d*o.s)) // shape movement function (scaled)
    }
}

// UTILITIES

/**
 * javascript object length alias
 */
function C(o) { return o.length }

/**
 * converts int to bit map and then to bit array
 */
function X(o) {
    var r = []
    o.map(function(i){r=r.concat(i.toString(2).split(''))})
    return r
}

/**
 * Random number generator returns random number between x and 1 (inclusive)
 */
function R(x) { return (Math.random()*x)+1 }

function A(m) {
    d.addEventListener(m, function(e) {
        var c = e.keyCode
        a[c] = !(m == 'keyup')
        for(i = C(b); i--;) {
            if((c == b[i].k) && (!a[c])) b[i].f()
        }
    }, 0)
};

/**
 * Initialising bootstrap, is only called once as soon as it is loaded
 */
(function() {
    P  = window['webkitRequestAnimationFrame'] // setup the pacemake
    v.width = v.height = w = h = 186 // size of the vanvas

    A('keydown')
    A('keyup')

    for(i=2; i--;) {
        // we dont know the width or height of the shape unless it has been loaded as
        // this information is embded within the bit map, so we have to make two passes
        i > 0 ? l.s.push(new Z(w/2, h, X(m.s), 1)) : l.s[0].y = h-8               // first load ship then position it in the 2nd pass
        for (j=9;j--;) {
            i > 0 ? l.e.push(new Z(0, 6, X(m.e), 1)) : l.e[j].x = j*20+8          // load enemy grid and then position it in the 2nd pass
            l.t.push(new Z(R(w), R(h), X(m.t), (105/(40+R(2E2)))))                // add 10 stars which will be recycled througout
        }
    }
    b.push({k:32,f:function(){ var s=l.s[0]; l.b.push(new Z(s.x+s.w/2, s.y, X(m.b), 1)) }}) // key listener for the fire button

    D() //kick off the recursive drawing loop
})();

