import ProjectCard from "./ProjectCard";

export default function CardStack({
    cards,
    setCards,
    onSwipe,
    onReset,
    showHint,
}) {
    return (
        <div className="flex flex-col items-center">
            <div className="relative w-full flex justify-center min-h-[28rem] md:min-h-[20rem] mb-12">
                {showHint && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-12 z-50 pointer-events-none">
                        <div className="bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 backdrop-blur-md rounded-lg md:px-4 py-2 text-sm font-medium shadow-lg max-w-xs text-center">
                            👉 Swipe to view mission & vision
                        </div>
                        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white dark:border-t-gray-800" />
                    </div>
                )}

                {cards
                    .slice(0)
                    .reverse()
                    .map((project, i, arr) => (
                        <ProjectCard
                            key={project.title}
                            project={project}
                            isTop={i === arr.length - 1}
                            onSwipe={onSwipe}
                        />
                    ))}
            </div>
        </div>
    );
}