const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(60,innerWidth/innerHeight,0.1,1000);
camera.position.z=7;

const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});
renderer.setSize(innerWidth,innerHeight);
document.body.appendChild(renderer.domElement);

const geo=new THREE.IcosahedronGeometry(2.6,1);
const mat=new THREE.MeshStandardMaterial({color:0x4da3ff,wireframe:true});
const mesh=new THREE.Mesh(geo,mat);
scene.add(mesh);

const pGeo=new THREE.BufferGeometry();
const count=1600, arr=[];
for(let i=0;i<count;i++){
    arr.push((Math.random()-0.5)*40,(Math.random()-0.5)*40,(Math.random()-0.5)*40);
}
pGeo.setAttribute('position',new THREE.Float32BufferAttribute(arr,3));
const pMat=new THREE.PointsMaterial({color:0x4da3ff,size:0.05,opacity:.6,transparent:true});
const points=new THREE.Points(pGeo,pMat);
scene.add(points);

scene.add(new THREE.AmbientLight(0x4da3ff,.7));
const light=new THREE.PointLight(0xffffff,1);
light.position.set(6,6,6);
scene.add(light);

function animate(){
    requestAnimationFrame(animate);
    mesh.rotation.x+=0.0013;
    mesh.rotation.y+=0.002;
    points.rotation.y+=0.0005;
    renderer.render(scene,camera);
}
animate();

addEventListener('scroll',()=>{
    const maxScroll = document.body.scrollHeight - innerHeight;
const startZ = 4.3;   // posição inicial da câmera
const endZ = 1.2;   // quão “dentro” da cena ela entra

addEventListener('scroll', () => {
    const scrollPercent = scrollY / maxScroll;
    camera.position.z = startZ - (scrollPercent * (startZ - endZ));
});

    mesh.rotation.x=scrollY*0.0015;
    mesh.rotation.y=scrollY*0.002;
});

const reveals = document.querySelectorAll('.reveal');

function reveal(){
    const windowHeight = innerHeight;

    reveals.forEach(section => {
        const rect = section.getBoundingClientRect();
        const center = windowHeight / 2;

        // distância do centro da tela
        const distance = Math.abs(rect.top + rect.height / 2 - center);

        // normalização
        const maxDistance = windowHeight * 0.75;
        const progress = Math.min(distance / maxDistance, 1);

        // efeitos
        section.style.opacity = 1.5 - progress;
        section.style.transform = `translateY(${progress * 60}px)`;
    });
}

addEventListener('scroll', reveal);
reveal();


addEventListener('scroll',reveal);
reveal();
