import {
    AmbientLight,
    Color,
    DirectionalLight,
    // GridHelper,
    Group,
    OrthographicCamera,
    // PCFSoftShadowMap,
    Scene,
    SpotLight,
    Vector3,
    WebGLRenderer,
} from 'three';

import { AnimationFrame } from './AnimationFrame';

export class Canvas {

    protected canvas: HTMLCanvasElement;

    protected timeStart: number;
    protected origin: Vector3;
    protected camera: OrthographicCamera;
    protected scene: Scene;
    protected light: DirectionalLight | SpotLight;
    protected lightObject: Group;
    protected renderer: WebGLRenderer;

    protected frame: AnimationFrame;

    public constructor(container: HTMLElement) {
        this.canvas = document.createElement('canvas');
        container.appendChild(this.canvas);
        this.canvas.height = 600;
        this.canvas.width = 600;
        this.origin = new Vector3(0, 0, 0);

        this.createScene();
        this.createLight()
        this.createRenderer();
        this.createCamera();

        this.frame = new AnimationFrame(this.scene);

        this.bindEventListeners();        
    }

    public render() {
        requestAnimationFrame(this.render.bind(this));
        if (!this.timeStart) {
            this.timeStart = Date.now();
        }
        // this.camera.lookAt(0, 0, 0);
        // const time = (Date.now() - this.timeStart);
        // const val = this.easeOutExpo(time, 0, 1, 1);
        this.frame.update(performance.now());

        // if(time > 2500) {
        //     const tFunc = this.easeOutExpo((time-2500)/5500);
        //     this.lightObject.rotation.y = -Math.PI * tFunc;
        // }
        // console.log(this.light.position);
        this.renderer.render(this.scene, this.camera);
    }

    protected easeOutExpo(pos: number) {
        return (pos===1) ? 1 : -Math.pow(2, -10 * pos) + 1;
    }

    protected createScene() {
        this.scene = new Scene();
        this.scene.add(new AmbientLight('#F4F4F4'));
        this.scene.background = new Color('#F4F4F4');

        // const size = 20;
        // const divisions = 20;

        // const gridHelper = new GridHelper( size, divisions );
        // this.scene.add( gridHelper );
    }

    protected createLight() {
        this.lightObject = new Group;
        this.light = new SpotLight('#fff', 1);
        this.lightObject.add(this.light);
        this.light.position.set(500, 130, -500);
        
        this.scene.add(this.lightObject);
    }

    protected createRenderer() {
        const { width, height } = this.canvas;
        this.renderer = new WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
        const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
        this.renderer.setPixelRatio(DPR);
        this.renderer.setSize(width, height);

        this.renderer.gammaInput = true;
        this.renderer.gammaOutput = true; 

        // this.renderer.shadowMapType = PCFSoftShadowMap;
    }

    protected createCamera() {
        const { width, height } = this.canvas;

        this.camera = new OrthographicCamera(width/-2, width/2, height/2, height/-2, -20, 100);
        this.camera.position.set(10, 7.5, 10);
        this.camera.zoom = 5;
        this.camera.lookAt(0, 0, 0);
    }

    protected bindEventListeners() {
        window.onresize = this.resizeCanvas.bind(this);
        this.resizeCanvas();
    }

    protected resizeCanvas() {
        // this.renderer.setSize(window.innerWidth, window.innerHeight);
        // this.camera.setViewOffset(600, 600, 300, 300, 600, 600);
        this.camera.updateProjectionMatrix();
    }
}
