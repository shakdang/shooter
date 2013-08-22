// --------------------------------------------------

// invader
// 0 0111100
// 0 0111010
// 0 1111110
// 0 0001111
// 0 0111100
// 0 1001100
//
// star bullet (1px top left)
// 00000001
//
// ship
// 01111000
// 01111110
// 00110000
// 01110110
// 01111111
//
// e1 at offset 0 width 9 e1 at offset 1 width 11, pixel at offset 7 width 1 ship at offset 8 width 9
var j = '^L<~:<v0~x',
    k = {},                                    // keytracker
    l = {                                      // object collection
        j:[],                                  // stars
        k:[],                                  // enemies
        l:[],                                  // ship/s
        m:[]},                                 // bullets
    m = ['#FFF','#CCC'],                       // colours

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
            d.x < (k.x + k.w*k.v) && d.x > k.x && d.y < (k.y + 7) && l.k.splice(j,1) && l.m.splice(e,1)
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
 * d = pos x
 * e = pos y
 * f = map offset
 * g = scale
 * h = width/height
 * i = -
 * @constructor
 */
Z =function(d,e,f,g,h,i) {
    var o = this // shape local reference
    o.x = d      // shape position x
    o.y = e      // shape position y
    o.w = h      // shape width
    o.h = h*g    //
    o.z = f      // shape map string offset
    o.v = g      // shape scaling multiplier

    this.k = function(d,e,f,g,h,i) {
        e = o.w
        for (i=e;i--;)
            for(g=8;g--;)
                (j.charCodeAt(o.z+Math.abs(~~(e/2)-i))&1<<g) && Q(o.x+i*o.v,o.y+g*o.v,o.v,1)
    }

    this.m = function(d,e,f,g,h,i) {
        e = o.x+d // position update
        // make sure the ship stays within the canvas bounding box
        e > 0 && e+o.w < n && (o.x = e*o.v) // shape movement function (scaled)
    }
},

// UTILITIES
Q = function(d,e,f,g,h,i) {
    // canvas is drawn on twice so we'll alias the procedure into a function
    a.fillStyle = m[g]
    a.fillRect(d,e,f,f)
},

R = function(d,e,f,g,h,i) { return (Math.random()*d)+1 },

/**
 * d = pos x
 * e = pos y
 * f = map offset
 * g = scale
 * h = height
 * i = pointer
 */
J = function(d,e,f,g,h,i) { l[i].push(new Z(d,e,f,g,h)) };

(function(d,e,f,g,h,i) {
    c = d.getElementById('g')              // canvas
    a = c.getContext('2d')                 // context 2d
    c.width = c.height = n = 186           // size of the canvas
    for (e=4;e--;) {
        i=11
        !e && J(n/2,170,8,1,9,'l')         // load the ship in the last pass
        for (g=8;g--;) {
            J(g*22+i,i*e+6,~~(e/2),1,11,'k')  // load enemy rows grid
            g > 3 && J(R(n), R(n), 7, (105/(40+R(2E2))),1,'j')    // load stars for all passes which will be recycled througout
        }
    }

    onkeyup = onkeydown = function(d,e,f,g,h,i) {
        k[d.keyCode] = !(d.type == 'keyup') // track key press for up and down
        k[32] && (g=l.l[0]) && J(g.x+5, g.y, 7, 2, 1,'m') // create new bullet on space bar press
    };
    //D()
    setInterval(D, 16)
})(document);
