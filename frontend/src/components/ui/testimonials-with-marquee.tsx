import { cn } from "../../lib/utils"
import { TestimonialCard, TestimonialAuthor } from "./testimonial-card"

interface TestimonialsSectionProps {
    title: string
    description: string
    testimonials: Array<{
        author: TestimonialAuthor
        text: string
        rating?: number
        href?: string
    }>
    className?: string
}

export function TestimonialsSection({
    title,
    description,
    testimonials,
    className
}: TestimonialsSectionProps) {
    // Duplicate testimonials to fill space and create seamless loop
    const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

    return (
        <section className={cn(
            "bg-background text-foreground",
            "py-12 sm:py-24 md:py-32 px-0",
            className
        )}>
            <div className="mx-auto flex max-w-container flex-col items-center gap-4 text-center sm:gap-16">
                <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
                    <h2 className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
                        {title}
                    </h2>
                    <p className="text-md max-w-[600px] font-medium text-muted-foreground sm:text-xl">
                        {description}
                    </p>
                </div>

                {/* Marquee Container */}
                <div className="relative w-full overflow-hidden">
                    {/* Infinite scroll track */}
                    <div
                        className="flex gap-4 hover:[animation-play-state:paused]"
                        style={{
                            animation: 'scroll 25s linear infinite',
                            width: 'max-content'
                        }}
                    >
                        {duplicatedTestimonials.map((testimonial, i) => (
                            <TestimonialCard
                                key={i}
                                {...testimonial}
                            />
                        ))}
                    </div>

                    {/* Fade edges */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/4 bg-gradient-to-r from-background sm:block" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/4 bg-gradient-to-l from-background sm:block" />
                </div>
            </div>

            {/* Inline keyframes for infinite scroll */}
            <style>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>
        </section>
    )
}
