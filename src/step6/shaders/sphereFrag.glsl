varying vec3 v_normal;
varying vec3 v_eye;

#include './fresnel.glsl'

void main() {
  float _fresnel = fresnel(v_eye, v_normal);
  // vec3 color = vec3(_fresnel);
  vec3 color = v_normal;
  color *= _fresnel;
  gl_FragColor = vec4(color, 1.0);
}