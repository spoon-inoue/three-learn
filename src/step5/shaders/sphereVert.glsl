varying vec3 v_normal;
varying vec3 v_eye;

void main() {
  v_normal = normalize(normalMatrix * normal);
  v_eye = normalize(modelViewMatrix * vec4( position, 1.0 )).xyz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}