#define STANDARD
// ---------------------------------
varying vec3 v_normal;
varying vec3 v_eye;

float fresnel(vec3 eye, vec3 normal) {
  return pow(1.0 + dot(eye, normal), 3.0);
}