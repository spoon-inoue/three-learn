#include <fog_vertex>
// ----------------------------
v_normal = normalize(normalMatrix * normal);
v_eye = normalize(modelViewMatrix * vec4( position, 1.0 )).xyz;