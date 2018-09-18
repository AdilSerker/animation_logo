import {
    AmbientLight,
    Clock,
    Color,
    DirectionalLight,
    GridHelper,
    OrthographicCamera,
    PerspectiveCamera,
    Scene,
    Vector3,
    WebGLRenderer,
} from 'three';

import { Subjects } from './Subjects';

export class WebGl {

    protected canvas: HTMLCanvasElement;

    protected clock: Clock;
    protected origin: Vector3;
    protected camera: OrthographicCamera | PerspectiveCamera;
    protected scene: Scene;
    protected light: DirectionalLight;
    protected renderer: WebGLRenderer;

    protected subjects: Subjects;

    public constructor(container: HTMLElement) {
        this.canvas = document.createElement('canvas');
        container.appendChild(this.canvas);

        this.clock = new Clock();
        this.origin = new Vector3(0, 0, 0);

        this.createScene();
        this.createLight()
        this.createRenderer();
        this.createCamera();

        this.subjects = new Subjects(this.scene);

        this.bindEventListeners();        
    }

    public render() {
        requestAnimationFrame(this.render.bind(this));
        this.camera.lookAt(0, 0, 0);
        const delta = this.clock.getDelta();

        this.subjects.update(delta);
        
        this.renderer.render(this.scene, this.camera);
    }

    protected createScene() {
        this.scene = new Scene();
        this.scene.add(new AmbientLight('#F4F4F4'));
        this.scene.background = new Color('#F4F4F4');

        const size = 20;
        const divisions = 20;

        const gridHelper = new GridHelper( size, divisions );
        this.scene.add( gridHelper );
    }

    protected createLight() {
        this.light = new DirectionalLight('#fff', 1);
        this.light.position.set(-1, -1, -1).normalize();
        this.scene.add(this.light);
    }

    protected createRenderer() {
        const { width, height } = this.canvas;
        this.renderer = new WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
        const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
        this.renderer.setPixelRatio(DPR);
        this.renderer.setSize(width, height);

        this.renderer.gammaInput = true;
        this.renderer.gammaOutput = true; 
    }

    protected createCamera() {
        const { width, height } = this.canvas;

        // this.camera = new OrthographicCamera(width/-2, width/2, height/2, height/-2, 0, 1000);
        this.camera = new PerspectiveCamera(45, width/height, 1, 1000);
        this.camera.position.set(40, 10, 0);
        this.camera.lookAt(0, 0, 0);
    }

    protected bindEventListeners() {
        window.onresize = this.resizeCanvas.bind(this);
        this.resizeCanvas();
    }

    protected resizeCanvas() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.updateProjectionMatrix();
    }
}
