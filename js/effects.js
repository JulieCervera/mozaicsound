
class OscilloEffect
{
    constructor(t)
    {
        this.width  = t.width * 10;
        this.height = t.height * 10;
        
        this.fft = new p5.FFT();
        this.color = [];
    }
    
    setup(input, color)
    {
        this.fft.setInput(input);
        this.color = color;
    }
    
    draw()
    {
        // get a buffer of 1024 samples over time.
        let binCount = 1024;
        let samples  = this.fft.waveform(binCount);
        let bufLen   = samples.length;

        // draw snapshot of the samples
        noFill();
        strokeWeight(1);
        
        beginShape();
        for (let i = 0; i < bufLen; i++) 
        {   
            let x = map(i, 0, bufLen, 0, this.width);
            let y = map(samples[i], -1, 1, -this.height / 2, this.height / 2);
            
            let hueValue = map(samples[i], -1, 1,0,255);
            let currentColor = colorToRGB(hueValue, 255, 255, this.color);
            stroke(currentColor.r, currentColor.g, currentColor.b);
            vertex(x, y + this.height / 2);
        }
        endShape();
    }
}

class WavesEffect
{
    constructor(t)
    {
        this.width  = t.width * 10;
        this.height = t.height * 10;
        
        this.prevLevels = new Array(60);
        this.amplitude  = new p5.Amplitude();
        
        this.amplitude.smooth(0.6);
        this.color = [];
    }
    
    setup(input, color)
    {
        this.prevLevels.fill(0);
        this.amplitude.setInput(input);
        this.color = color;
    }
    
    draw()
    {
        let level = this.amplitude.getLevel();
        if (level === undefined)
            level = 0;
        
        let spacing = 10;
        let w = this.width / (this.prevLevels.length * spacing);
        
        if (w < 1) w = 1;
        
        let minHeight = 2;

        this.prevLevels.push(level);
        this.prevLevels.shift();

        for (let i = 0; i < this.prevLevels.length; ++i) 
        {

            let x = map(i, this.prevLevels.length, 0, this.width / 2, this.width);
            let h = map(this.prevLevels[i], 0, 0.5, minHeight, this.height);

            noFill();
            noStroke();
            
            let hueValue = map(h, minHeight, this.height, 0, 255);
            let currentColor = colorToRGB(hueValue, 255, 255, this.color);
            
            fill(currentColor.r, currentColor.g, currentColor.b);
            rect(x, this.height / 2, w, Math.floor(h));
            rect(this.width - x, this.height / 2, w, Math.floor(h));

        }
    }
}

class FrequencyEffect
{
    constructor(t)
    {
        this.width  = t.width * 10;
        this.height = t.height * 10;
        
        this.fft = new p5.FFT();
    }
    
    setup(input, color, freqNumber)
    {
        this.fft.setInput(input);
        this.color = color;
        this.freqNumber = freqNumber;
    }
    
    draw()
    {
        let spectrum = this.fft.analyze();
        strokeWeight(1);
        noFill();
        for (let index = 0; index < this.freqNumber; index++) 
        {
            noStroke();
            beginShape();
            let myColor = color(this.color[index].r, this.color[index].g, this.color[index].b);
            stroke(myColor);
            
            for (let i = 0; i < spectrum.length; i++)
                vertex(i, Math.round(map(spectrum[i], 0, 255, ((index+1) * (this.height / (this.freqNumber + 1))+20), 0)));

    
            endShape();
        }
    }
}

class TilesEffect
{
    constructor(t)
    {
        this.width  = t.width * 10;
        this.height = t.height * 10;

        this.fft = new p5.FFT();
        
        this.previousTime = Date.now();
        
        // tiles variables
        this.squares = [];
        
        let nbModules = 0;
        
        for(let i = 0; i < t.height; ++i)
            for(let j = 0; j < t.width; ++j)
                if(t.matrix[i][j] == 1) ++nbModules;
                
                
        let x = Math.floor(t.width / 2);
        let y = Math.floor(t.height / 2);
        let cpt = 0;
        let maxCpt = 1;
        let direction = 0;
        let step = 0;
        
        for(let i = 0; i < nbModules; )
        {
            
            if(t.matrix[y] !== undefined && t.matrix[y][x] === 1)
            {
                
                this.squares.push({x : x * 10 + 5, y : y * 10 + 5, size : 10, oldColor:0, newColor: 0});
                ++i;
            }
            
            switch(direction)
            {
                case 0:
                    y++;
                    break;
                case 1:
                    x++;
                    break;
                case 2:
                    y--;
                    break;
                case 3:
                    x--;
                    break;
                
            }
            
            if(++cpt == maxCpt)
            {
                cpt = 0;
                if(++step == 2)
                {
                    maxCpt++;
                    step = 0;
                }
                
                direction  = (direction + 1) % 4;
                
                
            }
            
        }
            
        
    }
    
    setup(input, color)
    {
        this.fft.setInput(input);
        this.color = color;
    }
    
    draw()
    {
        let now = Date.now();
        
        let elapsed = now - this.previousTime;
        this.previousTime = now;
        let spectrum = this.fft.analyze();
        noStroke();
        
        for(let i = 0; i < this.squares.length; ++i)
        {
            let s = this.squares[i];
            
            let c = colorToRGB(s.oldColor, 200, 200, this.color);
            fill(c.r, c.g, c.b);
            rect(s.x, s.y, 10, 10);
            rect(s.x, s.y, 10, 10);
            
            if(s.size != 10)
            {
                c = colorToRGB(s.newColor, 200, 200, this.color);
                fill(c.r, c.g, c.b);
                rect(s.x, s.y, s.size, Math.floor(s.size));
                rect(s.x, s.y, s.size, Math.floor(s.size));
                
                s.size += elapsed / 50 * 2.8;
                if(s.size >= 10)
                {
                    s.size = 10;
                    s.oldColor = s.newColor;
                }
            }
            else// if(Math.random() > 0.5)
            {
                let spectrumIndex = Math.floor(map(i, 0, this.squares.length, 0, spectrum.length *0.5));
                
                if(spectrum[spectrumIndex] > 80)
                {
                    s.size = 0;
                    s.newColor = Math.floor(map(spectrum[spectrumIndex], 80, 255, 0, 255));
                }
            }
            
        }
    }
}
