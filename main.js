import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();
scene.background = new THREE.Color(0xAAAAAA);
			const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

			const renderer = new THREE.WebGLRenderer({
                antialias: true
            });
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );
            
            const light = new THREE.AmbientLight(0xffffff);
            scene.add(light);

            let controls = new OrbitControls(camera,renderer.domElement)

            camera.position.z = 40;



// we want the function get quotes to give us a string from the data 
// we will then pass the string to the textGeometry constructor
 
const apiURL = "https://api.quotable.io/random"
// /* make a function that returns a promise */

async function getQuotes(){
    const response  = await fetch(apiURL);
    const data = await response.json();
    const {content} = data;
    

   var thequote = data.content;
  
   //as we can get the sring legth we could pass it to the box geo
  
   console.log( thequote);

   animate();
 
  loadText(thequote);
           
}
getQuotes();
//console.log(getQuotes());

// create a function for getting the data from get quotes and returns a string!



    //create function for text 


    const loader = new THREE.FontLoader();
    // promisify font loading
    function loadFont(url) {
      return new Promise((resolve, reject) => {
        loader.load(url, resolve, undefined, reject);
      });
    }
   
    async function loadText(thequote) {
      const font = await loadFont('node_modules/three/examples/fonts/helvetiker_regular.typeface.json');  /* threejsfundamentals: url */
      const geometry = new THREE.TextGeometry(thequote, {
        font: font,
        size: 10,
        height: .01,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.15,
        bevelSize: .3,
        bevelSegments: 5,
      });
      const material = new THREE.MeshBasicMaterial({color: 0xffffff});
      const myText = new THREE.Mesh(geometry, material);

   scene.add(myText);
    
    }
    
    
 

			const animate = function () {
				requestAnimationFrame( animate );

				
				renderer.render( scene, camera );
			};

			