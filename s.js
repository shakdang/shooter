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
    k,                         // key tracker
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
    a = {},
    n = ['#000', '#FFF']

/**
 * Main drawing function
 */
D = function(x,y,m,s) {
    Q(0,0,w,0)

    l.s[0].m(a[37]?-2:a[39]?2:0) // if left key pressed then go left else if right key pressed go right else don't do anything

    // Simple collision detection code
    l.b.map(function(b,i){
        l.e.map(function(e,j){
            b.x < (e.x + e.w) && b.x > e.x && b.y > e.y && b.y < (e.y + e.h) && l.e.splice(j,1) && l.b.splice(i,1)
        })
    })

    l.t.map(function(x,y,m,s){(x.y += x.h), x.y > w && (x.y -=w,x.x = R(w))}) // update stars
    l.b.map(function(x,y,m,s){x.y < 0 ? l.b.splice(y,1) : x.y -= x.h})        // update bullets
    
    for (o in l) l[o].map(function(x,y,m,s){x.r()})                              // render the object collection
    P(D)                                                                   // get the next animation frame and draw again
},

// OBJECTS

/**
 * Generates and renders all shapes that are drawn for this game using the bit templates
 * @constructor
 */
Z =function(x,y,m,s) {
    var o = this                                     // shape local reference
    o.x = x                                          // shape position x
    o.y = y                                          // shape position y
    o.w = 16^(parseInt(m.splice(0,5).join(''),2))    // shape width - first 5 bits from the map minus the least significant marker bit
    o.h = C(m)/o.w * s                               // shape height
    o.i = m                                          // shape matrix
    o.e = s                                          // shape scaling multiplier

    this.r = function(x,y,m,s) {
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
Q = function(x,y,m,s) {
    p.fillStyle = n[s]
    p.fillRect(x,y,m,m)
},
/**
 * javascript object length alias
 */
C = function(x,y,m,s) { return x.length },

/**
 * converts int to bit map and then to bit array
 */
X = function (x,y,m,s) {
    var r = []
    x.map(function(i){r=r.concat(i.toString(2).split(''))})
    return r
},

/**
 * Random number generator returns random number between x and 1 (inclusive)
 */
R = function(x,y,m,s) { return (Math.random()*x)+1 };

/**
 * Initialising bootstrap, is only called once as soon as it is loaded
 */
(function(x,y,m,s) {
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
    window.onkeyup = window.onkeydown = function(x,y,m,s) {
        a[x.keyCode] = !(x.type == 'keyup')
        a[32] && (s=l.s[0], l.b.push(new Z(s.x, s.y, X(t.b), 1)))
    };
    D() //kick off the recursive drawing loop
})();