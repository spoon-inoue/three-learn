#include <output_fragment>
// ----------------------------
float _fresnel = fresnel(v_eye, v_normal);
vec3 _color = vec3(1.0);
outgoingLight += _fresnel * _color;
outgoingLight = clamp(outgoingLight, 0.0, 1.0);
// outgoingLight = vec3(_fresnel);
gl_FragColor = vec4( outgoingLight, diffuseColor.a );