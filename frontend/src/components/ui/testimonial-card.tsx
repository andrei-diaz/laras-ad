import { cn } from "../../lib/utils"
import { Avatar, AvatarImage, AvatarFallback } from "./avatar"
import { Star } from "lucide-react"

export interface TestimonialAuthor {
    name: string
    handle: string
    avatar: string
}

export interface TestimonialCardProps {
    author: TestimonialAuthor
    text: string
    rating?: number
    href?: string
    className?: string
}

export function TestimonialCard({
    author,
    text,
    rating,
    href,
    className
}: TestimonialCardProps) {
    const Card = href ? 'a' : 'div'

    // Truncate text to ~150 characters for consistent card sizes
    const truncatedText = text.length > 150
        ? text.substring(0, 147) + "..."
        : text

    // Get initials for fallback
    const initials = author.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2)

    return (
        <Card
            {...(href ? { href } : {})}
            className={cn(
                "flex flex-col rounded-lg border-t",
                "bg-gradient-to-b from-muted/50 to-muted/10",
                "p-4 text-start sm:p-6",
                "hover:from-muted/60 hover:to-muted/20",
                "w-[320px] h-[200px]",
                "transition-colors duration-300",
                className
            )}
        >
            <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                    <AvatarImage src={author.avatar} alt={author.name} />
                    <AvatarFallback className="bg-amber-100 text-amber-700 font-bold">
                        {initials}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                    <h3 className="text-md font-semibold leading-none">
                        {author.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {author.handle}
                    </p>
                </div>
            </div>

            {/* Star Rating */}
            {rating && (
                <div className="flex gap-0.5 mt-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            className={cn(
                                "w-4 h-4",
                                star <= rating
                                    ? "fill-amber-400 text-amber-400"
                                    : "fill-gray-200 text-gray-200"
                            )}
                        />
                    ))}
                </div>
            )}

            <p className="sm:text-md mt-3 text-sm text-muted-foreground line-clamp-3 flex-1">
                {truncatedText}
            </p>
        </Card>
    )
}
