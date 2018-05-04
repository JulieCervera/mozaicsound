
class StarsBackground
{
    constructor(t)
    {
        this.width  = t.width * 10;
        this.height = t.height * 10;
        
        this.nbStars = 100;
    }
    
    setup()
    {
        this.stars = [];
        for (let i = 0; i < this.nbStars; ++i) 
        {
            this.stars.push({
                x: 0,
                y: 0,
                offset: Math.random() * 360,
                // Weight orbit a little to be outside origin
                orbit: (Math.random() + 0.01) * max(this.width, this.height),
                radius: Math.random() * 2,
                vx: Math.floor(Math.random() * 10) - 5,
                vy: Math.floor(Math.random() * 10) - 5
            });
        }
    }
    
    draw()
    {
        push();
        noFill();
        
        stroke("white");
        strokeCap(ROUND);
        strokeWeight(0.5);
        
        for (let i = 0; i < this.stars.length; ++i)
        {
            let s = this.stars[i];
            ellipse(s.x, s.y, s.radius, 0);
        }
        
        pop();
        
        let originX = this.width / 2;
        let originY = this.height / 2;

        for (let i = 0; i < this.stars.length; ++i) 
        {
            let s = this.stars[i];

            let rad = (frameCount * (1 / (s.orbit * 2 + s.offset)) + s.offset) % TAU;
            s.x = (originX + cos(rad) * (s.orbit * 2));
            s.y = (originY + sin(rad) * (s.orbit));
        }
    }
}

class MozaicBackground
{
    constructor(t)
    {
        this.width  = t.width * 10;
        this.height = t.height * 10;
        this.ratio   = 1.78125;
    }
    
    setup()
    {
        
    }
    
    makeHex(a, b, size) 
    {
        let diff =
            sin(radians(dist(a, b, width / 2, height / 2) - frameCount)) * size / this.ratio;
            
        beginShape();
        for (let i = 0; i < 6; ++i) 
        {
            let angle = PI * i / 3;
            vertex(
                a + sin(angle) * (size / this.ratio - diff),
                b + cos(angle) * (size / this.ratio - diff)
            );
        }
        endShape(CLOSE);

    }
    
    draw()
    {
        let size = 10;
        let offset = size * this.ratio;
        for (let x = 0; x <= width + size; x += size * 2) 
        {
            for (let y = 0; y <= height + offset; y += offset) 
            {
                let x0 = 0;
                if (y % (offset * 2) === 0) 
                {
                    noStroke();
                    fill('rgba(255,255,255,0.25)');
                    x0 = size;
                } 
                else 
                {
                    noStroke();
                    fill('rgba(166,166,166,0.25)');
                    x0 = 0;
                }

                this.makeHex(x + x0, y, size);
            }
        }
    }
}

class NoneBackground
{
    constructor()
    {
    }
    
    setup()
    {
        
    }
    
  
    
    draw()
    {
    }
}
