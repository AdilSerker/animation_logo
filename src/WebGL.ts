import {
    AmbientLight,
    Clock,
    Color,
    DirectionalLight,
    OrthographicCamera,
    Scene,
    Vector3,
    WebGLRenderer
} from 'three';

export class WebGl {

    protected canvas: HTMLCanvasElement;

    protected clock: Clock;
    protected origin: Vector3;

    protected camera: OrthographicCamera;

    protected scene: Scene;
    protected light: DirectionalLight;

    protected renderer: WebGLRenderer;

    protected sceneSubjects: any;

    public constructor(container: HTMLElement) {
        this.canvas = document.createElement('canvas');
        container.appendChild(this.canvas);
        const { width, height } = this.canvas;

        this.clock = new Clock();
        this.origin = new Vector3(0, 0, 0);

        this.scene = new Scene();
        this.scene.add(new AmbientLight('#F4F4F4'));
        this.scene.background = new Color('#F4F4F4');

        this.light = new DirectionalLight('#fff', 1);
        this.light.position.set(-1, -1, -1).normalize();
        this.scene.add(this.light);

        this.renderer = new WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
        const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
        this.renderer.setPixelRatio(DPR);
        this.renderer.setSize(width, height);

        this.renderer.gammaInput = true;
        this.renderer.gammaOutput = true; 

        this.camera = new OrthographicCamera(width/-2, width/2, height/2, height/-2, 1, 500);
        this.camera.position.z = 50;

        this.bindEventListeners();        
    }

    public render() {
        requestAnimationFrame(this.render.bind(this));

        // const delta = this.clock.getDelta();

        this.renderer.render(this.scene, this.camera);
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