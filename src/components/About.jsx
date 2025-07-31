import { useState, useRef, useEffect } from "react";
import CardStack from "./CardStack";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import member1 from '../assets/team/suzanna.png';
import member2 from '../assets/team/shervel.png';
import member3 from '../assets/team/maya.png';
import member4 from '../assets/team/harith.png';
import member5 from '../assets/team/miguel.png';
import member6 from '../assets/team/henzi.png';

function ZiplockModel() {
    const { scene } = useGLTF("/ecomunch/ziplock.glb");
    const ref = useRef();

    return (
        <primitive
            object={scene}
            // Z, X, Y
            position={[0, 0, 0]}
            rotation={[0, Math.PI / -1, 0]}
        />
    );
}

const teamMembers = [
    { name: "Suzanna", role: "Co-Founder", image: member1 },
    { name: "Shervel", role: "Co-Founder", image: member2 },
    { name: "Maya", role: "Co-Founder", image: member3 },
    { name: "Harith", role: "Co-Founder", image: member4 },
    { name: "Miguel", role: "Co-Founder", image: member5 },
    { name: "Henzi", role: "Co-Founder", image: member6 },
];

const projects = [
    {
        title: "Mission",
        description: "To eliminate single-use plastic waste by creating biodegradable, edible alternatives that are functional, nutritious, and environmentally responsible, transforming everyday consumption into a sustainable habit.",
        textClass: "text-blue-900 dark:text-blue-100",
        bgClass: "bg-cyan-100 dark:bg-blue-900",
    },
    {
        title: "Vision",
        description: "To lead the global shift toward zero-waste dining by pioneering beautiful, science-driven products that merge sustainability with innovation, making eco-conscious choices effortless and impactful for all.",
        textClass: "text-green-900 dark:text-lime-200",
        bgClass: "bg-green-100 dark:bg-lime-900",
    }
];

export default function AboutUs() {
    const [cards, setCards] = useState(projects);
    const [showHint, setShowHint] = useState(true);
    const missionRef = useRef(null);

    const topProject = cards[0];

    const handleSwipe = () => {
        setShowHint(false);
        setCards((prev) => [...prev.slice(1), prev[0]]);
    };

    const resetStack = () => {
        setCards(projects);
    };

    return (
        <div className="min-h-screen
                        bg-gradient-to-br from-amber-300 via-yellow-200 to-orange-300
                        dark:bg-gradient-to-br dark:from-yellow-500 dark:via-amber-700 dark:to-orange-900
                        px-6 py-4 md:py-14 font-sans text-yellow-900 dark:text-yellow-100">

            <div className="max-w-5xl mx-auto">
                <div className="relative min-h-[80vh]
                                bg-gradient-to-br from-amber-500 via-yellow-300 to-orange-400
                                dark:bg-gradient-to-br dark:from-yellow-800 dark:via-amber-600 dark:to-orange-900
                                p-8 md:p-12 mb-16">
                    <h1 className="text-4xl md:text-5xl mb-6 text-center">
                        What is <strong>EcoMunch</strong>?
                    </h1>

                    <p className="text-lg md:text-xl text-center">
                        A biodegradable and edible <strong>replacement</strong> for disposable utensils that also serves as a supplement and health snack.
                    </p>

                    {/* Ziplock 3D Canvas */}
                    <div className="relative w-full h-[300px] md:h-[400px]">
                        <Canvas
                            className="w-full h-full"
                            camera={{ position: [0, 0, 20], fov: 45 }}
                            gl={{ alpha: true }}
                        >
                            <ambientLight intensity={0.3} />
                            <directionalLight position={[5, 5, 5]} intensity={0.5} />
                            <Environment preset="sunset" background={false} />
                            <ZiplockModel />
                            <OrbitControls enableZoom={false} enablePan={false} target={[0, 0, 0]} />
                        </Canvas>
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={() => {
                            if (missionRef.current) {
                                const offset = -100;
                                const y = missionRef.current.getBoundingClientRect().top + window.pageYOffset + offset;
                                window.scrollTo({ top: y, behavior: 'smooth' });
                            }
                        }}
                        className="absolute bottom-4 right-4 text-lg md:text-xl px-4 py-2 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 transition-all"
                    >
                        Next ↓
                    </button>
                </div>

                <section ref={missionRef}>
                    <h2 className="text-2xl md:text-4xl text-center font-semibold text-orange-800 dark:text-amber-300 mb-3">
                        Our Mission & Vision
                    </h2>
                    <p className="text-base md:text-2xl text-center leading-relaxed">
                        At EcoMunch, we're reimagining everyday packaging and cutlery...
                    </p>

                    {/* CardStack */}
                    <div className="w-full justify-center items-center p-8">
                        <CardStack
                            cards={cards}
                            setCards={setCards}
                            onSwipe={handleSwipe}
                            onReset={resetStack}
                            showHint={showHint}
                            setShowHint={setShowHint}
                        />
                    </div>
                </section>

                <section className="mb-24 justify-items-center">
                    <h2 className="text-2xl md:text-4xl font-semibold text-orange-800 dark:text-amber-300 mb-3">
                        What We Do
                    </h2>
                    <ul className="text-base md:text-2xl list-disc pl-6 space-y-2">
                        <li>Design biodegradable cutlery and eco-friendly packaging</li>
                        <li>Replace plastics with edible and alternatives</li>
                        <li>Collaborate with food businesses to reduce packaging waste</li>
                        <li>Promote sustainability through education and advocacy</li>
                    </ul>
                </section>

                <section className="mb-12">

                    <div className="justify-items-center text-center">
                        <h2 className="text-2xl md:text-4xl font-semibold text-orange-800 dark:text-amber-300 mb-3">
                            Our Team
                        </h2>
                        <p className="text-base md:text-2xl leading-relaxed mb-6">
                            We are entreprenuers, innovators, and changemakers united by a shared mission:
                            to create better environmental outcomes through smarter, more beautiful products.
                        </p>
                    </div>

                    {/* Team Members */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                        {teamMembers.map((member, i) => (
                            <div
                                key={i}
                                className="bg-yellow-100 dark:bg-amber-900 rounded-xl shadow-lg overflow-hidden flex flex-col items-center p-4 md:py-12"
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-24 h-24 md:w-44 md:h-44 rounded-full object-cover mb-3 border-4 border-yellow-300 dark:border-amber-500"
                                />
                                <h3 className="text-lg md:text-2xl font-semibold text-yellow-900 dark:text-yellow-100">
                                    {member.name}
                                </h3>
                                <p className="text-sm md:text-lg text-gray-700 dark:text-gray-300">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* <section>
                    <h2 className="text-2xl font-semibold text-orange-800 dark:text-amber-300 mb-3">
                        Get in Touch
                    </h2>
                    <p className="text-base leading-relaxed mb-2">
                        We’d love to hear from you. Drop us a note:
                    </p>
                    <p className="text-lg font-semibold text-fuchsia-700 dark:text-fuchsia-300">
                        hello@ecomunch.co
                    </p>
                </section> */}
            </div>
        </div>
    );
}