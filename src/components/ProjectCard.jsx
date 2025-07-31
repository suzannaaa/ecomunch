import { motion, useMotionValue, useAnimation } from "framer-motion";

export default function ProjectCard({ project, isTop, onSwipe }) {
    const x = useMotionValue(0);
    const controls = useAnimation();

    const handleDragEnd = (_, info) => {
        if (Math.abs(info.offset.x) > 100) {
            controls
                .start({
                    x: info.offset.x > 0 ? 1000 : -1000,
                    opacity: 0,
                    transition: { duration: 0.3 },
                })
                .then(onSwipe);
        } else {
            controls.start({ x: 0 });
        }
    };

    return (
        <motion.div
            className={`absolute w-[90%] md:w-[800px] h-[22rem] md:h-[20rem] 
              rounded-xl shadow-xl p-6 md:p-10 
              flex flex-col md:flex-row items-center 
              justify-between gap-6 z-10 
              ${project.bgClass || "bg-white dark:bg-gray-800"}`}
            style={{ x }}
            animate={controls}
            drag={isTop ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragEnd={handleDragEnd}
            initial={{ scale: 1, y: 0 }}
            animate={{ scale: isTop ? 1 : 0.95, y: isTop ? 0 : 10 }}
            transition={{ duration: 0.3 }}
        >
            {/* Title Section */}
            <div className="w-full md:w-1/3 text-center md:text-left flex items-center justify-center h-1/4">
                <h3 className={`text-2xl md:text-3xl font-bold ${project.textClass || ""}`}>
                    {project.title}
                </h3>
            </div>

            {/* Divider */}
            <div className={`w-full h-[1px] bg-yellow-600 dark:bg-yellow-400 md:hidden`} />
            <div className={`hidden md:block w-[1px] h-[80%] bg-yellow-600 dark:bg-yellow-400`} />

            {/* Description Section */}
            <div className="w-full md:w-2/3 text-center md:text-left flex items-center justify-center h-full">
                <p className={`text-base md:text-lg ${project.textClass || ""}`}>
                    {project.description}
                </p>
            </div>
        </motion.div>
    );
}