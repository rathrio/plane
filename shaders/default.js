Plane = {};
Plane.DefaultShader = {
  uniforms: {},
  attributes: {},

  vertexShader: [
    "void main() {",
      "gl_Position = projectionMatrix*modelViewMatrix*vec4(position, 1.0);",
    "}"
  ].join("\n"),
  
  fragmentShader: [
    "void main() {",
      "gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);",
    "}"
  ].join("\n")                                
};

Plane.TextureShader = {
  uniforms: {},
  attributes: {},

  vertexShader: [
    "varying vec2 vUv;",
    "void main() {",
      "vUv = uv;",
      "gl_Position = projectionMatrix*modelViewMatrix*vec4(position, 1.0);",
    "}"
  ].join("\n"),
  
  fragmentShader: [
    "uniform sampler2D texture;",
    "varying vec2 vUv;",
    "void main() {",
      "vec4 color = texture2D(texture, vUv);",
      "gl_FragColor = color;",
    "}"
  ].join("\n")                                
};