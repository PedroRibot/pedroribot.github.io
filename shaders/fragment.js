const frag=`

varying vec2 vUv;
uniform sampler2D gs_texture;

void main(){
    float gs = texture2D(gs_texture, vUv).r;
    float gs_map = step(0.5,(gs - 0.3) / (0.9 - 0.3) ) ;
    
    vec3 color = (1.0 - gs_map, 1.0 - gs_map,1.0 - gs_map) * vec3(0.05, 0.05, .05);

    gl_FragColor = vec4(0.99-color, 1.);
}`;

export default frag;