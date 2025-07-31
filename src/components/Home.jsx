import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import { useInView } from 'react-intersection-observer';
import { clone } from "three/examples/jsm/utils/SkeletonUtils";
import logo from '../assets/ecomunch logo (transparent).png';

function SmallSpoonModel() {
    const { scene } = useGLTF('/ecomunch/spoon.glb');
    return <primitive object={scene} />;
}

function SpoonModel() {
    const gltf = useGLTF("/ecomunch/spoon(long).glb");
    const ref = useRef();

    const clonedScene = useMemo(() => clone(gltf.scene), [gltf.scene]);

    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += 0.01;
        }
    });

    return (
        <primitive
            // ref={ref}
            object={clonedScene}
            // Z, X, Y
            position={[0, 0, 0]}
            rotation={[Math.PI / -6, 0, Math.PI / 1.25]}
        />
    );
}

function ZiplockModel() {
    const gltf = useGLTF("/ecomunch/ziplock.glb");

    const clonedScene = useMemo(() => clone(gltf.scene), [gltf.scene]);

    return (
        <primitive
            object={clonedScene}
            // Z, X, Y
            position={[0, 0, -10]}
            rotation={[0, Math.PI / -1, 0]}
        />
    );
}

function ModelCanvas({ type }) {
    let ModelComponent;

    switch (type) {
        case "ziplock":
            ModelComponent = ZiplockModel;
            break;
        case "spoon":
            ModelComponent = SpoonModel;
            break;
        case "smallspoon":
            ModelComponent = SmallSpoonModel;
            break;
        default:
            return <div>Invalid model type</div>;
    }

    return (
        <Canvas
            camera={{ position: [0, 0, 10], fov: 45 }}
            gl={{ alpha: true }}
            style={{ width: "100%", height: "100%", background: "transparent" }}
        >
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 5, 5]} intensity={0.5} />
            <Environment preset="sunset" background={false} />
            <ModelComponent />
        </Canvas>
    );
}

const models = ["ziplock", "spoon", "ziplock", "smallspoon"];
const duplicatedModels = [...models, ...models];

function LazyItem({ type }) {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    return (
        <div
            ref={ref}
            className="relative max-w-[10rem] md:max-w-[20rem] h-32 md:h-80 md:w-full bg-amber-200 dark:bg-amber-950 rounded-lg shadow-md flex items-center justify-center"
        >
            {inView ? <ModelCanvas type={type} /> : <p className="text-white text-sm">Loading...</p>}
        </div>
    );
}

export default function Home() {
    const [showTooltip, setShowTooltip] = useState(true);
    const leftScrollRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const el = leftScrollRef.current;
        if (!el) return;

        const scroll = () => {
            if (window.innerWidth < 768) {
                el.scrollLeft += 1;
                if (el.scrollLeft >= el.scrollWidth / 2) {
                    el.scrollLeft = 0;
                }
            } else {
                // Scroll Up
                // el.scrollTop += 1;
                // if (el.scrollTop >= el.scrollHeight - el.clientHeight) {
                //     el.scrollTop = 0;

                // Scroll Down
                el.scrollTop -= 1;
                if (el.scrollTop <= el.scrollHeight / 2 - el.clientHeight) {
                    el.scrollTop = el.scrollHeight / 2;
                }
            }
        };

        const interval = setInterval(scroll, 50);
        return () => clearInterval(interval);
    }, []);

    const handleButtonClick = () => {
        navigate('/about');
    };

    return (
        <div className="fixed inset-0 bg-lime-50 dark:bg-gray-900 font-sans overflow-hidden flex flex-col-reverse md:flex-row">
            {/* Heading */}
            {/* <h2 className="absolute md:top-1/3 left-1/4 text-xl md:text-3xl font-bold text-yellow-900 dark:text-yellow-100 z-10">
                EcoMunch!
                <img src={logo} alt="Ecomunch Logo" className="w-60 h-60 object-contain" />
            </h2> */}

            {/* Left Scrollable Column (bottom on mobile, side on desktop) */}
            <div
                ref={leftScrollRef}
                className="w-full h-1/4 md:w-[30%] md:h-full overflow-x-auto md:overflow-y-auto scrollbar-hide z-0 
                bg-gradient-to-bl from-orange-400 via-amber-500 to-yellow-400
                dark:bg-gradient-to-br dark:from-yellow-500 dark:via-amber-700 dark:to-orange-900 
                shadow-inner p-4"
            >
                <div className="flex md:items-center md:flex-col space-x-4 md:space-x-0 md:space-y-10 min-w-max">
                    {duplicatedModels.map((modelType, i) => (
                        <LazyItem key={i} type={modelType} />
                    ))}
                </div>
            </div>

            {/* Right Side - Full Canvas Area */}
            <div className="flex-1 relative w-full h-full">
                {/* Background */}
                <div className="absolute inset-0 
                bg-gradient-to-br from-amber-300 via-lime-200 to-lime-300
                dark:bg-gradient-to-br dark:from-lime-200 dark:via-green-700 dark:to-emerald-200 
                shadow-inner z-0" />

                {/* Heading */}
                <h2 className="absolute top-1/3 left-12 md:top-1/3 md:left-1/4 text-xl md:text-3xl font-bold text-yellow-900 dark:text-yellow-100 z-10">
                    EcoMunch!
                    {/* <img src={logo} alt="Ecomunch Logo" className="w-60 h-60 object-contain" /> */}
                </h2>

                {/* Tooltip */}
                {/* {showTooltip && (
                    <div
                        className="absolute top-32 left-1/2 transform -translate-x-1/2 w-52 bg-white/80 text-sm px-3 py-1 rounded-full shadow-md animate-bounce flex items-center justify-between gap-2 cursor-pointer z-20"
                        onClick={() => setShowTooltip(false)}
                    >
                        🖱️ Drag to rotate!
                        <button className="text-xs font-bold text-gray-600 hover:text-red-500">✕</button>
                    </div>
                )} */}

                {/* Learn More */}
                <button
                    onClick={handleButtonClick}
                    className="absolute z-20 md:top-3/4 top-3/4 left-1/2 md:left-2/3 text-lg md:text-2xl font-bold text-yellow-900 dark:text-yellow-100 
                    bg-gradient-to-br from-purple-300/50 via-orange-200/50 to-amber-300/50
                    dark:from-fuchsia-800/75 dark:via-purple-800/75 dark:to-violet-700/75
                    ml-4 md:ml-0 py-2 px-4 md:py-4 md:px-6 border border-amber-200 rounded-full shadow-lg 
                    transition-all duration-300 ease-in-out 
                    hover:ring-4 hover:ring-amber-200 dark:hover:ring-yellow-400 hover:scale-105"
                >
                    Learn More
                </button>

                {/* Spoon 3D Canvas */}
                <Canvas
                    className="absolute top-1/3 left-1/2 w-full max-w-[600px] h-[60vh] transform -translate-x-1/2 -translate-y-1/4 z-10"
                    camera={{ position: [0, 0, 10], fov: 45 }}
                    gl={{ alpha: true }}
                >
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 5, 5]} intensity={1} />
                    <Environment preset="sunset" background={false} />
                    <SpoonModel />
                    <OrbitControls enableZoom={false} enablePan={false} target={[0, -0.5, 0]} />
                </Canvas>

                {/* Ziplock 3D Canvas */}
                <Canvas
                    className="absolute top-1/3 left-3/4 w-full max-w-[500px] h-[50vh] transform -translate-x-1/2 -translate-y-1/4 z-0 pointer-events-none"
                    camera={{ position: [0, 0, 30], fov: 45 }}
                    gl={{ alpha: true }}
                >
                    <ambientLight intensity={0.3} />
                    <directionalLight position={[5, 5, 5]} intensity={0.5} />
                    <Environment preset="sunset" background={false} />
                    <ZiplockModel />
                </Canvas>
            </div>
        </div>
    );
}