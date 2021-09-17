let canvas = document.getElementById("canvas-gl");
let gl = canvas.getContext("webgl");
// define all vertex
// A (0.0, -0.5), B(0.5, -0.5), C(-0.5, -0.5)



let vertices = [
    -0.8, -0.5,
    -0.5, 0.5,
    -0.5, 0.5,
    -0.2, -0.5,
    -0.32, -0.1,
    -0.68, -0.1,
    -0.68, -0.1,
    -0.32, -0.1,
    -0.15, -0.5,
    0.3, 0.5,
    -0.15, 0.5,
    0.3, -0.5,
    0.4, 0.5,
    0.4, -0.5,
    0.4, -0.5,
    0.8, -0.5
];




let positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
gl.bindBuffer(gl.ARRAY_BUFFER, null);

let vertexShaderCode = `
    attribute vec2 a_Position;
    void main() {
        gl_Position = vec4(a_Position, 0.0, 1.0);
        gl_PointSize = 20.0;
    }
`;

let vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderCode);
gl.compileShader(vertexShader);

let fragmentShaderCode = `
    void main() {
        gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
    }
`;

let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderCode);
gl.compileShader(fragmentShader);

let shaderProgram = gl.createProgram(); 
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);


gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
let aPosition = gl.getAttribLocation(shaderProgram, "a_Position");
//disini floatnya ga besar smwa
// hoo okoklh
gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(aPosition);



gl.clearColor(1.0, 1.0, 1.0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.LINES, 0, 20);