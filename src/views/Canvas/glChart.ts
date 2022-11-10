
let canvas: HTMLCanvasElement
let gl: WebGLRenderingContext
const positions = [
  // Front face
  -1.0, -1.0,  1.0,
  1.0, -1.0,  1.0,
  1.0,  1.0,  1.0,
  -1.0,  1.0,  1.0,
  
  // Back face
  -1.0, -1.0, -1.0,
  -1.0,  1.0, -1.0,
  1.0,  1.0, -1.0,
  1.0, -1.0, -1.0,
  
  // Top face
  -1.0,  1.0, -1.0,
  -1.0,  1.0,  1.0,
  1.0,  1.0,  1.0,
  1.0,  1.0, -1.0,
  
  // Bottom face
  -1.0, -1.0, -1.0,
  1.0, -1.0, -1.0,
  1.0, -1.0,  1.0,
  -1.0, -1.0,  1.0,
  
  // Right face
  1.0, -1.0, -1.0,
  1.0,  1.0, -1.0,
  1.0,  1.0,  1.0,
  1.0, -1.0,  1.0,
  
  // Left face
  -1.0, -1.0, -1.0,
  -1.0, -1.0,  1.0,
  -1.0,  1.0,  1.0,
  -1.0,  1.0, -1.0,
];

const faceColors = [
  [ 1.0,  1.0,  1.0,  1.0 ],    // Front face: white
  [ 1.0,  0.0,  0.0,  1.0 ],    // Back face: red
  [ 0.0,  1.0,  0.0,  1.0 ],    // Top face: green
  [ 0.0,  0.0,  1.0,  1.0 ],    // Bottom face: blue
  [ 1.0,  1.0,  0.0,  1.0 ],    // Right face: yellow
  [ 1.0,  0.0,  1.0,  1.0 ],    // Left face: purple
];

const indices = [
  0,  1,  2,      0,  2,  3,    // front
  4,  5,  6,      4,  6,  7,    // back
  8,  9,  10,     8,  10, 11,   // top
  12, 13, 14,     12, 14, 15,   // bottom
  16, 17, 18,     16, 18, 19,   // right
  20, 21, 22,     20, 22, 23,   // left
];

export function initCharts (canvasElement: HTMLCanvasElement) {
  canvas = canvasElement
  const glCandidate = canvas.getContext('webgl')
  if (!glCandidate) { throw new Error('Could not get canvas context') }
  gl = glCandidate
  console.log(gl)
  console.log(positions);
  console.log(faceColors);
  drawCube();
  addZindication();
}

function drawCube () {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

function addZindication () {
  const numComponents = 3;
  const type: GLenum = gl.FLOAT;
  const normalize = false;
  const stride = 0;
  const offset = 0;
  const program: WebGLProgram = gl.createProgram() as WebGLProgram;
  const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
  gl.vertexAttribPointer(
    positionAttributeLocation,
    numComponents,
    type,
    normalize,
    stride,
    offset);
}
