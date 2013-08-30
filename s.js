/**
 * (WIP) Tiny space invaders clone - Shahrukh Omar
 * 861 bytes crushed (814 bytes using js-1k shim) - aiming for 700 bytes mark
 *
 * Randomly generated stars background with depth of field and parallex affect
 * Active collision detection on every frame
 * Advanced key press tracking - able to detect short and continuous key press
 * No images, no external files, no libraries, no includes
 *
 * Code is hand minified (whitespace and comments removed using basic YUI compressor)
 * and crushed using brilliant JS Crush by Avio Pass (http://www.iteral.com/jscrush/)
 * http://jsfiddle.net/k33Jd/
 */

// e1 at offset 0 width 9 e1 at offset 1 width 11, pixel at offset 7 width 1 ship at offset 8 width 9
var j = '^L<~:<v0~x',
    k = {},    // keytracker
    l = {      // object collection
        j:[],  // stars
        k:[],  // enemies
        l:[],  // ship
        m:[]}, // bullets

/*
 * Main draw function
 * d,e,f,g,h,i = unused
 */
D = function(d,e,f,g,h,i) {
    a.fillStyle = '#FFF'
    a.fillRect(0,0,n,n)
    a.fillStyle = '#CCC'

    l.l[0].m(k[37]?-2:k[39]?2:0)
    l.l[0].k()

    l.k.map(function(d,e,f,g,h,i){
        m=d,o=e
        l.m.map(function(d,e,f,g,h,i){
            d.k()
            !o && (d.y < 0 ? l.m.splice(e,1) : d.y -= 4)
            d.x < (m.x + m.w*m.v) && d.x > m.x && d.y < m.y + 7 && l.m.splice(e,1) && (m.x = 0)
        })
        m.x && d.k()
    })

    // auto generate stars by moving them to a random x and y=0 once they've gone out of view
    l.j.map(function(d,e,f,g,h,i){d.y += d.h; d.y > n && (d.y = 0, d.x = (Math.random()*n)+1); d.k()})
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
    var m = this // shape local reference
    m.x = d      // shape position x
    m.y = e      // shape position y
    m.z = f      // shape map string offset
    m.v = g      // shape scaling multiplier
    m.w = h      // shape width
    m.h = h*g    // scaled height to help with collision detection

    this.k = function(d,e,f,g,h,i) {
        i=m.w
        while(i--)
            for(g=8;g--;)
                (j.charCodeAt(m.z+Math.abs(~~(m.w/2)-i))&1<<g) && a.fillRect(m.x+i*m.v,m.y+g*m.v,m.v,m.v)
    }

    this.m = function(d,e,f,g,h,i) {
        i = m.x+d
        i > 0 && i+m.w < n && (m.x = i*m.v) // shape movement function (scaled)
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
    c = d.getElementById('g')                  // canvas
    a = c.getContext('2d')                     // context 2d
    c.width = c.height = n = 186, i = 4        // size of the canvas
    while(i--)
        for (g=8;g--;) {
            !i && !g && J(n/2,170,8,1,9,'l')  // load the ship in the last pass
            J(g*22+11,11*i+6,~~(i/2),1,11,'k') // load enemy rows grid
            g > 3 && J((Math.random()*n)+1, (Math.random()*n)+1, 7, (105/(40+(Math.random()*2E2)+1)),1,'j')   // load stars for all passes which will be recycled througout
        }

    onkeyup = onkeydown = function(d,e,f,g,h,i) {
        k[d.keyCode] = !(d.type == 'keyup') // track key press for up and down
        k[32] && J(l.l[0].x+5, l.l[0].y, 7, 2, 1,'m') // create new bullet on space bar press
    };
    //D()
   setInterval(D, 16) // 60 fps hardcoded heartbeat
})(document);
