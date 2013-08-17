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
    v = document.getElementById('g'), // canvas
    p = v.getContext('2d'),    // context 2d
    i = 0,                     // counter
    l = {                      // object collection
        t:[],                  // stars
        e:[],                  // enemies
        s:[],                  // ship/s
        b:[]                   // bullets
    },
    // from LSB -> MSB: 1 bit marker followed by 4 bits of shape width followed by shape matrix
    t = {
        e: [3842164813,4277649407,134209528,2114562], // enemy shape and size bit template
        s: [3893370877,33554431],                     // ship shape and size
        b: [4863],                                    // bullet shape and size matrix
        t: [35]                                       // star shape and size
    },
    k = {},
    n = ['#000', '#FFF']

/**
 * Main drawing function
 */
D = function(a,b,c,d) {
    Q(0,0,w,0)

    l.s[0].m(k[37]?-2:k[39]?2:0) // if left key pressed then go left else if right key pressed go right else don't do anything

    // Simple collision detection code
    l.b.map(function(b,i){
        l.e.map(function(e,j){
            b.x < (e.x + e.w) && b.x > e.x && b.y > e.y && b.y < (e.y + e.h) && l.e.splice(j,1) && l.b.splice(i,1)
        })
    })

    l.t.map(function(a,b,c,d){(a.y += a.h), a.y > w && (a.y -=w,a.a = R(w))}) // update stars
    l.b.map(function(a,b,c,d){a.y < 0 ? l.b.splice(b,1) : a.y -= a.h})        // update bullets
    
    for (o in l) l[o].map(function(a,b,c,d){a.r()})                              // render the object collection
    P(D)                                                                   // get the next animation frame and draw again
},

// OBJECTS

/**
 * Generates and renders all shapes that are drawn for this game using the bit templates
 * @constructor
 */
Z =function(a,b,c,d) {
    var o = this                                     // shape local reference
    o.x = a                                          // shape position x
    o.y = b                                          // shape position y
    o.w = 16^(parseInt(c.splice(0,5).join(''),2))    // shape width - first 5 bits from the map minus the least significant marker bit
    o.h = C(c)/o.w * d                               // shape height
    o.i = c                                          // shape matrix
    o.e = d                                          // shape scaling multiplier

    this.r = function(a,b,c,d) {
        with(o) {
            i.map(function(v,i){
                Q((i%w*e)+x, (~~(i/w)*e)+y, e, v)
            })
        }
    }

    this.m = function(d) {
        (o.x+d > 0 && o.x+d+o.w < w) && (o.x += (d*o.e)) // shape movement function (scaled)
    }
},

// UTILITIES
Q = function(a,b,c,d) {
    p.fillStyle = n[d]
    p.fillRect(a,b,c,c)
},
/**
 * javascript object length alias
 */
C = function(a,b,c,d) { return a.length },

/**
 * converts int to bit map and then to bit array
 */
X = function (a,b,c,d) {
    var r = []
    a.map(function(i){r=r.concat(i.toString(2).split(''))})
    return r
},

/**
 * Random number generator returns random number between x and 1 (inclusive)
 */
R = function(a,b,c,d) { return (Math.random()*a)+1 };

/**
 * Initialising bootstrap, is only called once as soon as it is loaded
 */
(function(a,b,c,d) {
    P  = window['requestAnimationFrame'] // setup the pacemake
    v.width = v.height = w = 186 // size of the canvas

    for(i=2; i--;) {
        // we dont know the width or height of the shape unless it has been loaded as
        // this information is embded within the bit map, so we have to make two passes
        i ? l.s.push(new Z(w/2, w, X(t.s), 1)) : l.s[0].y = w-8               // first load ship then position it in the 2nd pass
        for (j=9;j--;) {
            i ? l.e.push(new Z(0, 6, X(t.e), 1)) : l.e[j].x = j*20+8          // load enemy grid and then position it in the 2nd pass
            l.t.push(new Z(R(w), R(w), X(t.t), (105/(40+R(2E2)))))            // add i*j stars which will be recycled througout
        }
    }
    window.onkeyup = window.onkeydown = function(a,b,c,d) {
        k[a.keyCode] = !(a.type == 'keyup')
        k[32] && (d=l.s[0], l.b.push(new Z(d.x, d.y, X(t.b), 1)))
    };
    D() //kick off the recursive drawing loop
})();