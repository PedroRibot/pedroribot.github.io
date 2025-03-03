import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import gs_fragment from '../shaders/gs_fragment.js';
import vertex from '../shaders/vertex.js';
import fragment from '../shaders/fragment.js';


//Referencing the code in https://github.com/Proinn/reaction_diffusion_three_js/

export default class GrayScott{
	constructor(){
		//create renderer
		this.canvas = document.getElementsByTagName('canvas')[0];
		
		this.renderer = new THREE.WebGLRenderer( {canvas: this.canvas} );
		this.renderer.setSize( this.canvas.clientWidth, this.canvas.clientHeight );

        //set camera
		this.camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, -10000, 10000);
		this.camera.position.z = 100;
		this.width = this.canvas.clientWidth;
		this.height = this.canvas.clientHeight;
        //create render targets
        let textureOptions = {
            minFilter: THREE.LinearFilter,
			magFilter: THREE.LinearFilter,
			format: THREE.RGBAFormat,
			type: THREE.FloatType,
			wrapS: THREE.RepeatWrapping,
			wrapT: THREE.RepeatWrapping,
        };
        this.prev_target = new THREE.WebGLRenderTarget(this.width, this.height, textureOptions);
        this.next_target = new THREE.WebGLRenderTarget(this.width, this.height, textureOptions);
		let init_texture_array = new Float32Array(this.width * this.height * 4);
		for(let i=0; i< this.width * this.height; i++){
			init_texture_array[4*i] = 1;
			if (Math.random > 0.5){
				init_texture_array[4*i+1] = 1;}
		}


		let init_texture = new THREE.DataTexture(init_texture_array, this.width, this.height, THREE.RGBAFormat,THREE.FloatType );
		this.prev_target.texture = init_texture;
		// create scene
		this.scene = new THREE.Scene();

		// create uniforms
		this.time = 0;
        // this.killrate_min = 0.0605;
		// this.killrate_max = 0.06232;
		// this.killrate_max = 0.0645;
		this.killrate_min = 0.06185;
		this.killrate_max = 0.06295;
        this.feedrate = 0.05888;
		// this.feedrate = 0.02;
		// this.feedrate = 0.06;
        this.difussion_a = 1.;
        this.difussion_b = 0.5;
		this.brush_size = 250;

		this.addMesh();
		this.mouseEffects();
		this.render();
	}


	render(){
        //calculate gs step

        this.mesh.material = this.gs_material;
		for (let index = 0; index < 16; index++) {
			this.gs_material.uniforms.previous_texture.value = this.prev_target.texture;
			this.renderer.setRenderTarget(this.next_target);
			this.renderer.render( this.scene, this.camera);

			let temp = this.prev_target;
			this.prev_target = this.next_target;
			this.next_target = temp;
		}

        this.screen_material.uniforms.gs_texture.value = this.prev_target.texture;
        this.mesh.material = this.screen_material;
		this.renderer.setRenderTarget(null);
        this.renderer.render(this.scene, this.camera);
		window.requestAnimationFrame(this.render.bind(this));
	}

	

	mouseEffects(){

		document.addEventListener("mousemove", (e)=>{    
    		// var mMouseX = e.offsetX;
    		// var mMouseY = e.offsetY;

			var mMouseX = e.clientX;
    		var mMouseY = e.clientY;

        	this.gs_material.uniforms.brush.value = new THREE.Vector2(mMouseX/this.canvas.clientWidth, 1-mMouseY/this.canvas.clientHeight );
			this.gs_material.uniforms.mouse_pressed.value = 1 ;
			});

		// const hoverElements = document.querySelectorAll('.hover-element');

		// const positionsArray = [];

		// hoverElements.forEach(element => {
		// 	const rect = element.getBoundingClientRect();
			
		// 	// Get position and size
		// 	const position = {
		// 		x: rect.left + window.scrollX, // Position relative to the document
		// 		y: rect.top + window.scrollY,  // Position relative to the document
		// 		width: rect.width,
		// 		height: rect.height
		// 	};

		// 	positionsArray.push(new THREE.Vector2(position.x, position.y));
		
		// });

		// this.gs_material.uniforms.hover_positions = positionsArray; // Assuming v2v type for an array of Vector2
		
		// console.log('Hover Positions:', positionsArray);
		// // Select all elements with the class 'hover-element'
		// const hoverElements = document.querySelectorAll('.hover-element');

		// // Function to handle mouse hover event
		// function handleMouseEnter(event) {
		// 	this.gs_material.uniforms.panel_pos.value = event.position;
		// 	this.gs_material.uniforms.panel_size.value = event.width;
		// 	this.gs_material.uniforms.hovered.value = 1;
		// }

		// function handleMouseLeave() {
		// 	this.gs_material.uniforms.hovered.value = 0;
		// }

		// // Add mouseenter and mouseleave events to each element
		// hoverElements.forEach(element => {
		// 	element.addEventListener('mouseenter', handleMouseEnter.bind(this));
		// 	element.addEventListener('mouseleave', handleMouseLeave.bind(this));
		// });	
		
		// document.addEventListener("mousedown", (e)=>{    
		// 	this.gs_material.uniforms.brush_size  = 2000 ;
		// 	});
		// document.addEventListener("mouseup", (e)=>{    
		// 	this.gs_material.uniforms.brush_size  = 200 ;
		// 	});

		
		// const material = this.gs_material;
		// const canvas = this.canvas;
	
		// function updateMouseUniforms(evt) {
		// 	const bounds = canvas.getBoundingClientRect();
		// 	// Normalize mouse coordinates to be relative to the canvas and handle device pixel ratio
		// 	const x = ((evt.clientX - bounds.left) / bounds.width) * window.devicePixelRatio;
		// 	const y = ((evt.clientY - bounds.top) / bounds.height) * window.devicePixelRatio;
		// 	// Update the uniforms with normalized coordinates
		// 	material.uniforms.brush.value.set(x, 1 - y); // Flipping y as per WebGL/Three.js convention
		// }
	
		// function handleMouseDown() {
		// 	material.uniforms.mouse_pressed.value = 1;
		// }
	
		// function handleMouseUp() {
		// 	material.uniforms.mouse_pressed.value = 1;
		// }
	
		// // Listen for mouse events on the window to cover all areas
		// window.addEventListener('mousemove', updateMouseUniforms);
		// window.addEventListener('mousedown', handleMouseDown);
		// window.addEventListener('mouseup', handleMouseUp);
		// window.addEventListener('mouseout', handleMouseUp); // Optionally reset on mouse out
		

	}

	addMesh(){
		this.gs_material = new THREE.ShaderMaterial({
			fragmentShader: gs_fragment,
			vertexShader: vertex,
			uniforms:{
				killrate_min: {type: 'f', value: this.killrate_min},
				killrate_max: {type: 'f', value: this.killrate_max},
                feedrate: {type: 'f', value: this.feedrate},
                difussion_a: {type: 'f', value: this.difussion_a},
                difussion_b: {type: 'f', value: this.difussion_b},
                previous_texture: {type: 't', value: undefined},
				time: {type: 'f', value: this.time},
				brush: {type: 'vec2', value: new THREE.Vector2(0,0)},
				brush_size: {type: 'f', value: this.brush_size},
				screen_size: {type: 'vec2', value: new THREE.Vector2(this.width, this.height)},
				mouse_pressed: {type:'int', value: 1},

				hovered: {type:'int', value: 0},
				panel_pos: {type:'vec2',value: new THREE.Vector2(0,0)},
				panel_size: {type: 'f', value: 0.0}
			},
			transparent: true,
			depthTest: false,
			depthWrite: false,
		});

        this.screen_material = new THREE.ShaderMaterial({
			fragmentShader: fragment,
			vertexShader: vertex,
			uniforms:{
                gs_texture: {type: 't', value: undefined},
			},
			transparent: true,
			depthTest: false,
			depthWrite: false,
		});

		this.plane = new THREE.PlaneGeometry(1.0, 1.0);

		this.mesh = new THREE.Mesh( this.plane, this.material );
		this.scene.add( this.mesh );

	}
}

new GrayScott();

