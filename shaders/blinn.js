/*
Blinn vertex and fragment shader
vertex shader:
transform eye and lights to cameraspace.

fragment shader:
compute for each pixel its blinn color-contribution.

TODO: Add initial values for uniforms, attributes.
*/

Plane = {};
Plane.BlinnShader = {
  uniforms: {},
  attributes: {},

  vertexShader: [
    "void main() {",
      "// add missing code",
      "gl_Position = projectionMatrix*modelViewMatrix*vec4(position, 1.0);",
    "}"
  ].join("\n"),
  
  fragmentShader: [
    "void main() {",
      "// add missing code",
      "gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);",
    "}"
  ].join("\n")                                
};