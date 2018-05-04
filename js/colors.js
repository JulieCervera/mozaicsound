
// function pour les differente pallette de couleur
function colorToRGB(hue, sat, value, colorScheme) 
{
    let nbColors = colorScheme.length;

    let size = (0xFF + 1) / nbColors;

    let ti = Math.floor(hue / size) % nbColors;
    
    let f = ((hue / size) % nbColors) - ti;

    let high = value;
    let low = value * (0xFF - sat) / 0xFF;

    let beginRed = map(colorScheme[ti].r, 0, 0xFF, low, high);
    let endRed = map(colorScheme[(ti + 1) % nbColors].r, 0, 0xFF, low, high);

    let newRed = (endRed - beginRed) * f + beginRed;

    let beginGreen = map(colorScheme[ti].g, 0, 0xFF, low, high);
    let endGreen = map(colorScheme[(ti + 1) % nbColors].g, 0, 0xFF, low, high);

    let newGreen = (endGreen - beginGreen) * f + beginGreen;

    let beginBlue = map(colorScheme[ti].b, 0, 0xFF, low, high);
    let endBlue = map(colorScheme[(ti + 1) % nbColors].b, 0, 0xFF, low, high);

    let newBlue = (endBlue - beginBlue) * f + beginBlue;

    return {
        r: newRed,
        g: newGreen,
        b: newBlue
    };
}

let colorSchemes = [
    [ // Terracota scheme pallette de couleur
        {r: 0x00, g: 0x30, b: 0x49},
        {r: 0xD6, g: 0x28, b: 0x28},
        {r: 0xF7, g: 0x7F, b: 0x00},
        {r: 0xFC, g: 0xBF, b: 0x49},
        {r: 0xEA, g: 0xE2, b: 0xB7}
    ],
    [ // HSV scheme pallette de couleur
        {r: 0xFF, g: 0x00, b : 0x00},
        {r: 0xFF, g: 0xFF, b : 0x00},
        {r: 0x00, g: 0xFF, b : 0x00},
        {r: 0x00, g: 0xFF, b : 0xFF},
        {r: 0x00, g: 0x00, b : 0xFF},
        {r: 0xFF, g: 0x00, b : 0xFF},
    ],
    [ // Party pallette de couleur
        {r: 0x0F, g: 0xA3, b : 0xB1},
        {r: 0xEE, g: 0x6C, b : 0x4D},
        {r: 0xF3, g: 0x8D, b : 0x68},
        {r: 0x84, g: 0x56, b : 0xA7},
        {r: 0xDA, g: 0xE5, b : 0x39},
    ],
    [ // Lounge pallette de couleur
        {r: 0xCC, g: 0xDB, b : 0xBC},
        {r: 0x80, g: 0xCE, b : 0xD7},
        {r: 0x63, g: 0xC7, b : 0xB2},
        {r: 0x8E, g: 0x6C, b : 0x88},
        {r: 0x0D, g: 0x5E, b : 0x70},
        
    ],
    [ // Sunrise pallette de couleur
        {r: 0xE3, g: 0xFF, b : 0x00},
        {r: 0xFF, g: 0x8D, b : 0x00},
        {r: 0xFF, g: 0x4D, b : 0x00},
        {r: 0xFF, g: 0x00, b : 0x00},
        {r: 0xE1, g: 0x00, b : 0x00},
        
    ],
    [ // Neonite pallette de couleur
        {r: 0x00, g: 0xEE, b : 0xEE},
        {r: 0x00, g: 0xFF, b : 0x99},
        {r: 0xFF, g: 0x99, b : 0x00},
        {r: 0x99, g: 0xFF, b : 0x00},
        {r: 0x99, g: 0x00, b : 0xFF},
        
    ],

];
