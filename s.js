// e1 at offset 0 width 9 e1 at offset 1 width 11, pixel at offset 7 width 1 ship at offset 8 width 9
var j = '^L<~:<v0~x',
    k = {},                                    // keytracker
    l = {                                      // object collection
        j:[],                                  // stars
        k:[],                                  // enemies
        l:[],                                  // ship
        m:[]},                                 // bullets

/*
 * Main draw function
 * d,e,f,g,h,i = unused
 */
D = function(d,e,f,g,h,i) {
    a.fillStyle = '#FFF'
    a.fillRect(0,0,n,n)
    a.fillStyle = '#CCC'

    // if left key pressed then go left else if right key pressed go right else don't do anything
    l.l[0].m(k[37]?-2:k[39]?2:0)

    //collision detection + bullet position rollup
    l.m.map(function(d,e,f,g,h,i){ // for each bullet
        m=d,o=e
        // update bullet positions and remove bullet if out of view
        d.y < 0 ? l.m.splice(o,1) : d.y -= 4
        l.k.map(function(d,e,f,g,h,i){ // for each enemy
            //if bullet and enemy overlap, remove both
            m.x < (d.x + d.w*d.v) && m.x > d.x && m.y < (d.y + 7) && l.k.splice(e,1) && l.m.splice(o,1)
        })
    })

    // auto generate stars by moving them to a random x and y=0 once they've gone out of view
    l.j.map(function(d,e,f,g,h,i){(d.y += d.h), d.y > n && (d.y = 0, d.x = (Math.random()*n)+1)})

     // render all the objects to canvas
    for (o in l) l[o].map(function(d,e,f,g,h,i){d.k()})
},

/*
 * Generic drawable object
 * d = pos x
 * e = pos y
 * f = map offset
 * g = scale
 * h = width/height
 * i = unused but kept for crushing
 */
Z = function(d,e,f,g,h,i) {
    var o = this // shape local reference
    o.x = d      // shape position x
    o.y = e      // shape position y
    o.z = f      // shape map string offset
    o.v = g      // shape scaling multiplier
    o.w = h      // shape width
    o.h = h*g    // scaled height to help with collision detection

    this.k = function(d,e,f,g,h,i) {
        e = o.w
        for (i=e;i--;)
            for(g=8;g--;)
                (j.charCodeAt(o.z+Math.abs(~~(e/2)-i))&1<<g) && a.fillRect(o.x+i*o.v,o.y+g*o.v,o.v,o.v)
    }

    this.m = function(d,e,f,g,h,i) {
        e = o.x+d
        e > 0 && e+o.w < n && (o.x = e*o.v) // shape movement function (scaled)
    }
},

/*
 * Alias for constructing the drawable objects
 * d = pos x
 * e = pos y
 * f = map offset
 * g = scale
 * h = height
 * i = pointer
 */
J = function(d,e,f,g,h,i) { l[i].push(new Z(d,e,f,g,h,i)) };

(function(d,e,f,g,h,i) {
    c = d.getElementById('g')             // canvas
    a = c.getContext('2d')                // context 2d
    c.width = c.height = n = 186, e = 4   // size of the canvas
    for (i=e;i--;)
        for (g=8;g--;) {
            !i && !g && J(n/2,170,8,1,9,'l')                    // load the ship in the last pass
            J(g*22+11,11*i+6,~~(i/2),1,11,'k')                   // load enemy rows grid
            g > 3 && J((Math.random()*n)+1, (Math.random()*n)+1, 7, (105/(40+(Math.random()*2E2)+1)),1,'j')   // load stars for all passes which will be recycled througout
        }

    onkeyup = onkeydown = function(d,e,f,g,h,i) {
        k[d.keyCode] = !(d.type == 'keyup') // track key press for up and down
        k[32] && J(l.l[0].x+5, l.l[0].y, 7, 2, 1,'m') // create new bullet on space bar press
    };
    setInterval(D, 16) // 60 fps hardcoded heartbeat
})(document);
