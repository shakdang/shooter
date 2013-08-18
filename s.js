// --------------------------------------------------

// invader
// 11100101000000101100100001001101 = 3842164813
// 11111110111101111011111111111111 = 4277649407
// 111111111111101111111111000      = 134209528
// 1000000100010000000010           = 2114562

//invader 2
// 110110010000010000010001000001111  //7281844751
// 111000110111011011111111111101111  //7632453615
// 111011010000010100011011000        //124266712

// inavader 2 without the length bits
// 1001000001000001000100000111111    //1210091583
// 10001101110110111111111111011111   //2380005343
// 11011010000010100011011000         //57157848

// invader 3 without the length bits
// 100001100000000111100000011111     //562067487
// 10000110110110001111111100000      //282796000
// 100100000010110100001010010100     //604717716

// ship
// 11101000000100000001111111111101   //3893370877
// 1111111111111111111111111          //33554431

// ship without the length bits

// 10000010000000001110000011111111   //2181095679
// 101111111111111111111111           //12582911

// star
// 100011                           = 35

var j = {
        k: [[562067487,282796000,604717716],[1210091583,2380005343,57157848]],   // enemy shape and size bit template
        l: [2181095679,12582911],              // ship shape and size
        j: [3]},                               // star shape and size
    k = {},                                    // keytracker
    l = {                                      // object collection
        j:[],                                  // stars
        k:[],                                  // enemies
        l:[],                                  // ship/s
        m:[]},                                 // bullets                                       
    m = ['#000','#FFF'],                       // colours

D = function(d,e,f,g,h,i) {
    Q(0,0,n,0) // clear canvas by drawing a black rectangle of the same size

    // if left key pressed then go left else if right key pressed go right else don't do anything
    l.l[0].m(k[37]?-2:k[39]?2:0) 

    //collision detection + bullet position rollup
    l.m.map(function(d,e,f,g,h,i){ // for each bullet
        // update bullet positions and remove bullet if out of view
        d.y < 0 ? l.m.splice(e,1) : d.y -= 4
        l.k.map(function(k,j){ // for each enemy
            //if bullet and enemy overlap, remove both
            d.x < (k.x + k.w*k.j) && d.x > k.x && d.y < (k.y + k.h) && l.k.splice(j,1) && l.m.splice(e,1)
        })
    })

    // auto generate stars by moving them to a random x and y=0 once they've gone out of view
    l.j.map(function(d,e,f,g,h,i){(d.y += d.h), d.y > n && (d.y = 0, d.x = R(n))})
    
    for (o in l) l[o].map(function(d,e,f,g,h,i){d.k()}) // render all the objects to canvas
    //webkitRequestAnimationFrame(D) // pass the self into the animation frame request as callback to update game state again
},

// OBJECTS

/**
 * Generates and renders all shapes that are drawn for this game using the bit templates
 * @constructor
 */
Z =function(d,e,f,g,h,i) {
    var o = this                                     // shape local reference
    f.splice(0,1)
    o.x = d                                          // shape position x
    o.y = e                                          // shape position y
    o.w = h                                          // shape width - first 5 bits from the map minus the least significant marker bit
    o.h = f.length/o.w * g                           // shape height
    o.z = f                                          // shape matrix
    o.j = g                                          // shape scaling multiplier

    this.k = function(d,e,f,g,h,i) {
        // use the Q function to render the object by drawing out the bit map one rect at a time
        with(o) z.map(function(d,e,f,g,h,i){d && Q((e%w*j)+x, (e/w|0*j)+y, j, d)})
    }

    this.m = function(d,e,f,g,h,i) {
        e = o.x+d // position update
        // make sure the ship stays within the canvas bounding box
        e > 0 && e+o.w < n && (o.x = e*o.j) // shape movement function (scaled)
    }
},

// UTILITIES
Q = function(d,e,f,g,h,i) {
    // canvas is drawn on twice so we'll alias the procedure into a function
    p.fillStyle = m[g]
    p.fillRect(d,e,f,f)
},

X = function(d,e,f,g,h,i) {
    var k = []
    d.map(function(d,e,f,g,h,i){k=k.concat(d.toString(2).split(''))})
    return k
},

R = function(d,e,f,g,h,i) { return (Math.random()*d)+1 },

J = function(d,e,f,g,h,i) { l[h].push(new Z(d,e,f,g,i)) };

(function(d,e,f,g,h,i) {

    v = d.getElementById('g') // canvas
    p = v.getContext('2d')          // context 2d
    v.width = v.height = n = 186 // size of the canvas
    // j.k.map(function(d,e,f,g,h,i) {
    //     i=11
    //     e && J(n/2,n-8,X(j.l),1,'l',i)                         // load the ship in the first pass
    //     for (z=9;z--;) {
    //         J(z*20+8,i*e+6,X(d),1,'k',i)                       // load enemy rows grid
    //         J(R(n), R(n), X(j.j), (105/(40+R(2E2))), 'j',1)    // load stars for all passes which will be recycled througout
    //     }
    // })

    for (e=4;e--;) {
        i=11
        !e && J(n/2,n-8,X(j.l),1,'l',i)                        // load the ship in the first pass
        for (z=8;z--;) {
            J(z*22+i,i*e+6,X(j.k[~~(e/2)]),1,'k',i)                // load enemy rows grid
            z > 3 && J(R(n), R(n), X(j.j), (105/(40+R(2E2))), 'j',1)    // load stars for all passes which will be recycled througout
        }
    }

    onkeyup = onkeydown = function(d,e,f,g,h,i) {
        k[d.keyCode] = !(d.type == 'keyup') // track key press for up and down
        k[32] && (g=l.l[0], J(g.x+5, g.y, X(j.j), 2, 'm',1)) // create new bullet on space bar press
    };
    setInterval(D, 16)
})(document);