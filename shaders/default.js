var Plane = Plane || {};
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