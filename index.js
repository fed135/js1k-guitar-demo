var ac=void 0;
var rh = () => {
    c.strokeStyle = '#a22'
    c.lineWidth = 4
    c.beginPath()
    c.moveTo(100,360)
    c.arcTo(100, 100, 320, 320, 100)
    c.arcTo(320, 320, 460, 240, 100)
    c.arcTo(520, 200, 520, 320, 100)
    c.fill()
    c.stroke()
    c.beginPath()
    c.arc(670, 400, 10, 0, 2 * Math.PI)
    c.fill()

    c.beginPath()
    c.arc(710, 400, 10, 0, 2 * Math.PI)
    c.fill()
}

var n = '1234567890qwertyuiopasdfghjkl;zxcvbnm,.?'
var s = {}
var w = [
    0,
    -0.6,
    0.7,
    -0.1,
    0.1,
    0,
    -0.03,
    0.03,
    -0.01,
    0.01,
    0.0,
    0.0,
  ]
/*
  var w = [
    0,
    0.8,
    0,
    -0.6,
    -0.6,
    0,
    0.9,
    0,
    -0.5,
    0,
    0.9,
    0,
    -0.5,
    0,
    0.4,
    -0.4,
    0.5,
    0,
    0.4,
    0,
    0.7,
    0.7,
    0,
    -0.3,
    0
  ]*/
  
var g
window.onkeydown = (evt) => {
    if (evt.repeat) return;
    ac = ac || new AudioContext()
    if(!g) {
        g = ac.createGain()
        g.connect(ac.destination)
    }
    var f = n.indexOf(evt.key)
    if (f >= 0) {
        if (!s[f]) {
            s[f] = ac.createOscillator()
            s[f].frequency.value = 90 + (f * 8)
            s[f].setPeriodicWave(ac.createPeriodicWave(Float32Array.from(w), Float32Array.from(w.map(a=>0))));
            s[f].index = f
            s[f].start(0)
        }
        if (!s[f].pressed) {
            v = 1;
            s[f].p = true 
            s[f].connect(g)      
        }
    }
}
var v=x = 0
//var x = 0
//var y = 0
setInterval(()=> {
    //if (++x % 0xff == 0) y = ++y%3
    a.width=a.width
    if(g) g.gain.value = v;
    v = Math.max(0, v - 0.1)
    /*c.globalAlpha = 0.01
    c.fillStyle=`#${[y==0?'F':8,y==1?'F':8,y==2?'F':8].join('')}`
    c.fillRect(0,0,800,720)
    c.globalAlpha = 1*/
    c.fillStyle=`hsl(${++x*3},75%,95%)`
    c.fillRect(0,0,1080,720)
    c.fillStyle='#fd0'

    rh()
    c.save()
    c.translate(540,360)
    c.scale(1, -1)
    c.translate(-540,-360)
    rh()
    c.restore()

    c.fillStyle = '#a22'
    c.fillRect(220, 335, 520, 50)

    c.beginPath()
    c.arc(220, 360, 50, 0, 2 * Math.PI)
    c.fillStyle='#000'
    c.fill()

    c.fillStyle = '#fff'
    for(var i=0;i<4;i++){
        c.fillRect(150, 340+i*12, 590, 2)
    }
    for (i in s) {
        if(s[i].p) {
            c.fillStyle = 'red'
            c.beginPath()
            c.arc(300 + (s[i].index % 10) * (300/8), 340 + ((s[i].index/10) >> 0) * 12, 7, 0, 2 * Math.PI)
            c.fill()
        }
    }
},50)

window.onkeyup = (evt) => {
    var f = n.indexOf(evt.key)
    if (f >= 0 && s[f] && s[f].p) {
        s[f].p = false;
        s[f].disconnect()
    }
}
