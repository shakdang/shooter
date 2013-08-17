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

var u,                                // undefined alias
    v = document.getElementById('g'), // canvas
    p = v.getContext('2d'),           // context 2d
    i = 0,                            // counter
    l = {                             // object collection
        t:[],                         // stars
        z:[],                         // enemies
        s:[],                         // ship/s
        b:[]                          // bullets
    },
    // from LSB -> MSB: 1 bit marker followed by 4 bits of shape width followed by shape matrix
    t = {
        z: [3842164813,4277649407,134209528,2114562], // enemy shape and size bit template
        s: [3893370877,33554431],                     // ship shape and size
        t: [35]                                       // star shape and size
    },
    k = {},                                           // keytracker
    n = ['#000', '#FFF'],                             // colours
    w = window,

D = function(a,b,c,d,e) {
    Q(0,0,h,0) // clear canvas

    l.s[0].m(k[37]?-2:k[39]?2:0) // if left key pressed then go left else if right key pressed go right else don't do anything

    //collision detection
    l.b.map(function(b,i){
        l.z.map(function(z,j){
            b.x < (z.x + z.w) && b.x > z.x && b.y < (z.y + z.h) && l.z.splice(j,1) && l.b.splice(i,1)
        })
    })

   l.t.map(function(a,b,c,d,e){(a.y += a.h), a.y > h && (a.y -= h, a.x = R(h))}) // update stars
   l.b.map(function(a,b,c,d,e){a.y < 0 ? l.b.splice(b,1) : a.y -= 4})            // update bullets
    
    for (o in l) l[o].map(function(a,b,c,d,e){a.r()})                             // render the object collection
    P(D)                                                                        // get the next animation frame and draw again
},

// OBJECTS

/**
 * Generates and renders all shapes that are drawn for this game using the bit templates
 * @constructor
 */
Z =function(a,b,c,d,e) {
    var o = this                                     // shape local reference
    o.x = a                                          // shape position x
    o.y = b                                          // shape position y
    o.w = 16^(parseInt(c.splice(0,5).join(''),2))    // shape width - first 5 bits from the map minus the least significant marker bit
    o.h = C(c)/o.w * d                               // shape height
    o.i = c                                          // shape matrix
    o.f = d                                          // shape scaling multiplier

    this.r = function(a,b,c,d,e) {
        with(o) {
            i.map(function(a,b,c,d,e){
                Q((b%w*f)+x, (~~(b/w)*f)+y, f, a)    //~~(a/b) returns integer division results 
            })
        }
    }

    this.m = function(a,b,c,d,e) {
        (o.x+a > 0 && o.x+a+o.w < h) && (o.x += (a*o.f)) // shape movement function (scaled)
    }
},

// UTILITIES
Q = function(a,b,c,d,e) {
    p.fillStyle = n[d]
    p.fillRect(a,b,c,c)
},

C = function(a,b,c,d,e) { return a.length },

X = function (a,b,c,d,e) {
    var r = []
    a.map(function(a,b,c,d,e){r=r.concat(a.toString(2).split(''))})
    return r
},

R = function(a,b,c,d,e) { return (Math.random()*a)+1 },

J = function(a,b,c,d,e) { l[e].push(new Z(a,b,c,d)) };

(function(a,b,c,d,e) {
    P  = w['requestAnimationFrame'] // setup the pacemake
    v.width = v.height = h = 186 // size of the canvas

    for(i=2; i--;) {
        i && J(h/2,h-8,X(t.s),1,'s')                         // first load ship then position it in the 2nd pass
        for (j=9;j--;) {
            i && J(j*20+8,6,X(t.z),1,'z')                    // load enemy grid and then position it in the 2nd pass
            J(R(h), R(h), X(t.t), (105/(40+R(2E2))), 't')    // add i*j stars which will be recycled througout
        }
    }
    w.onkeyup = w.onkeydown = function(a,b,c,d,e) {
        k[a.keyCode] = !(a.type == 'keyup')
        k[32] && (d=l.s[0], J(d.x+5, d.y, X(t.t), 2, 'b'))
    };
    D() //kick off the recursive drawing loop
})();