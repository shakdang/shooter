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

    // from LSB -> MSB: 1 bit marker followed by 4 bits of shape width followed by shape matrix
var j = {
        z: [3842164813,4277649407,134209528,2114562], // enemy shape and size bit template
        s: [3893370877,33554431],                     // ship shape and size
        j: [35]},                                     // star shape and size
    k = {},                           // keytracker
    l = {                             // object collection
        j:[],                         // stars
        z:[],                         // enemies
        s:[],                         // ship/s
        b:[]},                        // bullets                                       
    m = ['#000','#FFF'],              // colours

D = function(d,e,f,g,h) {
    Q(0,0,n,0) // clear canvas

    l.s[0].m(k[37]?-2:k[39]?2:0) // if left key pressed then go left else if right key pressed go right else don't do anything

    //collision detection + bullet position rollup
    l.b.map(function(d,e,f,g,h){
        d.y < 0 ? l.b.splice(e,1) : d.y -= 4 // update bullet positions
        l.z.map(function(z,j){
            d.x < (z.x + z.w*z.j) && d.x > z.x && d.y < (z.y + z.h) && l.z.splice(j,1) && l.b.splice(e,1)
        })
    })

   l.j.map(function(d,e,f,g,h){(d.y += d.h), d.y > n && (d.y -= n, d.x = R(n))}) // update stars
    
    for (o in l) l[o].map(function(d,e,f,g,h){d.r()})                            // render the object collection
    this.requestAnimationFrame(D)                                                // get the next animation frame and draw again
},

// OBJECTS

/**
 * Generates and renders all shapes that are drawn for this game using the bit templates
 * @constructor
 */
Z =function(d,e,f,g,h) {
    var o = this                                     // shape local reference
    o.x = d                                          // shape position x
    o.y = e                                          // shape position y
    o.w = 16^(parseInt(f.splice(0,5).join(''),2))    // shape width - first 5 bits from the map minus the least significant marker bit
    o.h = f.length/o.w * g                           // shape height
    o.i = f                                          // shape matrix
    o.j = g                                          // shape scaling multiplier

    this.r = function(d,e,f,g,h) {
        with(o) i.map(function(d,e,f,g,h){Q((e%w*j)+x, (~~(e/w)*j)+y, j, d)})
    }

    this.m = function(d,e,f,g,h) {
        e = o.x+d
        e > 0 && e+o.w < n && (o.x = e*o.j) // shape movement function (scaled)
    }
},

// UTILITIES
Q = function(d,e,f,g,h) {
    p.fillStyle = m[g]
    p.fillRect(d,e,f,f)
},

X = function(d,e,f,g,h) {
    var r = []
    d.map(function(d,e,f,g,h){r=r.concat(d.toString(2).split(''))})
    return r
},

R = function(d,e,f,g,h) { return (Math.random()*d)+1 },

J = function(d,e,f,g,h) { l[h].push(new Z(d,e,f,g)) };

(function(d,e,f,g,h) {
    v = d.getElementById('g') // canvas
    p = v.getContext('2d')          // context 2d
    v.width = v.height = n = 186 // size of the canvas

    j.s.map(function(d,e,f,g,h) {
        e && J(n/2,n-8,X(j.s),1,'s')                         // first load ship then position it in the 2nd pass
        for (i=9;i--;) {
            e && J(i*20+8,6,X(j.z),1,'z')                    // load enemy grid and then position it in the 2nd pass
            J(R(n), R(n), X(j.j), (105/(40+R(2E2))), 'j')    // add i*j stars which will be recycled througout
        }
    })
    onkeyup = onkeydown = function(d,e,f,g,h) {
        k[d.keyCode] = !(d.type == 'keyup')
        k[32] && (g=l.s[0], J(g.x+5, g.y, X(j.j), 2, 'b'))
    };
    D() //kick off the recursive drawing loop
})(document);