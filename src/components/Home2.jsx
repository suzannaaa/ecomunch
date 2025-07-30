import { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';

function MyModel() {
    const { scene } = useGLTF('/ecomunch/spoon(long).glb');
    return <primitive object={scene} />;
}

export default function Home() {
    const [showTooltip, setShowTooltip] = useState(true);

    const leftScrollRef = useRef(null);
    const rightScrollRef = useRef(null);

    useEffect(() => {
        // Left: scroll down then loop to top
        const scrollLeft = () => {
            const el = leftScrollRef.current;
            if (!el) return;
            el.scrollTop += 1;
            if (el.scrollTop >= el.scrollHeight - el.clientHeight) {
                el.scrollTop = 0;
            }
        };

        // Right: scroll up then loop to bottom
        const scrollRight = () => {
            const el = rightScrollRef.current;
            if (!el) return;
            el.scrollTop -= 1;
            if (el.scrollTop <= 0) {
                el.scrollTop = el.scrollHeight;
            }
        };

        const leftInterval = setInterval(scrollLeft, 50);
        const rightInterval = setInterval(scrollRight, 50);

        return () => {
            clearInterval(leftInterval);
            clearInterval(rightInterval);
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-lime-50 dark:bg-gray-900 font-mono overflow-hidden">
            <div className="relative w-full h-full">

                {/* Left Scrollable Column */}
                <div
                    ref={leftScrollRef}
                    className="absolute left-0 md:left-[10%] w-1/4 h-full overflow-y-auto scrollbar-hide z-10 bg-green-100 dark:bg-green-700 rounded-lg border border-green-100 dark:border-green-700 shadow-lg p-4"
                >
                    <div className="space-y-10 justify-items-center">
                        {Array.from({ length: 30 }).map((_, i) => (
                            <div key={i} className="h-48 w-64 bg-green-300 rounded-lg border border-green-400 shadow-md">
                                Left Item {i + 1}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Scrollable Column */}
                <div
                    ref={rightScrollRef}
                    className="absolute right-0 md:right-[10%] w-1/4 h-full overflow-y-auto scrollbar-hide z-10 bg-green-100 dark:bg-green-700 rounded-lg border border-green-100 dark:border-green-700 shadow-lg p-4"
                >
                    <div className="space-y-10 justify-items-center">
                        {Array.from({ length: 30 }).map((_, i) => (
                            <div key={i} className="h-48 w-64 bg-green-300 rounded-lg border border-green-400 shadow-md">
                                Right Info {i + 1}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Center content */}
                <div className="absolute h-full w-[50vw] md:w-[30vw] max-w-[600px] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-yellow-900 text-3xl font-bold">
                    <h2 className="relative left-12 lg:left-44 top-40 z-10 text-xl md:text-3xl">EcoMunch!</h2>
                    {showTooltip && (
                        <div
                            className="absolute top-52 md:top-60 md:left-[6%] lg:left-[30%] w-52 z-20 bg-white/80 text-sm px-3 py-1 rounded-full shadow-md animate-bounce flex items-center gap-2 cursor-pointer"
                            onClick={() => setShowTooltip(false)}
                        >
                            🖱️ Drag to rotate!
                            <button className="text-xs font-bold text-gray-600 hover:text-red-500">✕</button>
                        </div>
                    )}
                    {/* <svg
                            className="absolute inset-0 w-full h-full text-yellow-200 dark:text-yellow-500 z-0"
                            viewBox="0 0 200 200"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                        >
                            <path
                                fill="currentColor"
                                d="M49.4,-58.5C63.6,-48.7,75.3,-32.5,77.3,-15.7C79.3,1.1,71.6,18.5,61.2,34.1C50.9,49.6,37.8,63.3,22.4,69.4C7.1,75.5,-10.5,73.9,-25.1,66.3C-39.7,58.7,-51.2,45.2,-60.4,30.3C-69.6,15.4,-76.5,-0.8,-71.4,-13.5C-66.2,-26.2,-49.1,-35.4,-34.5,-45.7C-19.9,-56.1,-10,-67.5,3.8,-72.3C17.6,-77.2,35.2,-75.3,49.4,-58.5Z"
                                transform="translate(100 100)"
                            />
                        </svg> */}
                    <Canvas className="relative left-2 md:left-2 top-20 md:top-24 z-10" camera={{ position: [0, 0, 10], fov: 60 }}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[5, 5, 5]} intensity={1} />
                        <Environment preset="sunset" background={false} />
                        <MyModel />
                        <OrbitControls
                            enableZoom={false}
                            enablePan={false}
                            target={[0, -0.5, 0]}
                        />
                    </Canvas>
                    <div className="absolute inset-0 h-full z-0 bg-yellow-100 dark:bg-yellow-500 rounded-lg border border-yellow-100 dark:border-yellow-500 shadow-lg" />
                </div>
            </div>
        </div>

        // <div className="fixed w-screen">
        //     <section
        //         className="overflow-hidden min-h-screen bg-lime-50 dark:bg-gray-900 font-mono py-16 md:py-10 px-6 text-center"
        //     >
        //         <div className="gap-6 mx-auto md:grid-cols-3">

        //             {/* left */}
        //             <div className="absolute left-[10%] w-1/4 h-full z-0 bg-green-100 rounded-lg border border-green-400 shadow-lg overflow-y-auto max-h-screen p-2">
        //                 <div className="h-[150%] space-y-6">
        //                     <div className="w-1/2 h-1/4 bg-green-300 rounded-lg border border-green-400 shadow-lg mx-auto" />
        //                     <div className="w-1/2 h-1/4 bg-green-300 rounded-lg border border-green-400 shadow-lg mx-auto" />
        //                     <div className="w-1/2 h-1/4 bg-green-300 rounded-lg border border-green-400 shadow-lg mx-auto" />
        //                 </div>
        //             </div>

        //             {/* right */}
        //             <div className="absolute inset-0 left-[65%] w-1/4 h-full z-0 bg-green-100 rounded-lg border border-green-400 shadow-lg">
        //                 <div className="absolute inset-0 left-[25%] top-[10%] w-1/2 h-1/4 z-0 bg-green-300 rounded-lg border border-green-400 shadow-lg" />
        //                 <div className="absolute inset-0 left-[25%] top-[40%] w-1/2 h-1/4 z-0 bg-green-300 rounded-lg border border-green-400 shadow-lg" />
        //                 <div className="absolute inset-0 left-[25%] top-[70%] w-1/2 h-1/4 z-0 bg-green-300 rounded-lg border border-green-400 shadow-lg" />
        //             </div>
        //             <div className="relative w-full md:h-[85vh] mx-auto aspect-[2/3]">
        //                 {/* <div className="relative w-full h-full rounded-xl overflow-hidden border-[5px] border-dotted border-yellow-500"> */}

        //                 <h2 className="relative top-10 z-10 text-yellow-900 dark:text-yellow-200 text-xl md:text-3xl font-bold">EcoMunch!</h2>

        //                 {showTooltip && (
        //                     <div
        //                         className="absolute top-24 md:top-28 left-[20%] md:left-[43%] w-52 z-20 bg-white/80 text-sm px-3 py-1 rounded-full shadow-md animate-bounce flex items-center gap-2 cursor-pointer"
        //                         onClick={() => setShowTooltip(false)}
        //                     >
        //                         🖱️ Drag to rotate!
        //                         <button className="text-xs font-bold text-gray-600 hover:text-red-500">✕</button>
        //                     </div>
        //                 )}
        //                 {/* <svg
        //                     className="absolute inset-0 w-full h-full text-yellow-200 dark:text-yellow-500 z-0"
        //                     viewBox="0 0 200 200"
        //                     xmlns="http://www.w3.org/2000/svg"
        //                     preserveAspectRatio="none"
        //                 >
        //                     <path
        //                         fill="currentColor"
        //                         d="M49.4,-58.5C63.6,-48.7,75.3,-32.5,77.3,-15.7C79.3,1.1,71.6,18.5,61.2,34.1C50.9,49.6,37.8,63.3,22.4,69.4C7.1,75.5,-10.5,73.9,-25.1,66.3C-39.7,58.7,-51.2,45.2,-60.4,30.3C-69.6,15.4,-76.5,-0.8,-71.4,-13.5C-66.2,-26.2,-49.1,-35.4,-34.5,-45.7C-19.9,-56.1,-10,-67.5,3.8,-72.3C17.6,-77.2,35.2,-75.3,49.4,-58.5Z"
        //                         transform="translate(100 100)"
        //                     />
        //                 </svg> */}

        //                 <div className="absolute inset-0 left-[37.5%] w-1/4 h-full z-0 bg-yellow-100 rounded-lg border border-yellow-400 shadow-lg" />

        //                 <Canvas className="relative top-5 md:top-10 z-10" camera={{ position: [0, 0, 10], fov: 45 }}>
        //                     <ambientLight intensity={0.5} />
        //                     <directionalLight position={[5, 5, 5]} intensity={1} />
        //                     <Environment preset="sunset" background={false} />
        //                     <MyModel />
        //                     <OrbitControls
        //                         enableZoom={false}
        //                         enablePan={false}
        //                         target={[0, -0.5, 0]}
        //                     />
        //                 </Canvas>
        //             </div>
        //             {/* </div> */}
        //             <h2 className="relative bottom-20 z-10 text-yellow-900 dark:text-yellow-200 text-sm md:text-2xl font-bold">A Bite for Mother Earth</h2>
        //         </div>
        //     </section>
        // </div>
    );
}