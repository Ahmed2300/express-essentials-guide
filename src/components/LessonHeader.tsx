import { Badge } from "@/components/ui/badge";

interface LessonHeaderProps {
  title: string;
  lessonNumber: number;
  description?: string;
}

export const LessonHeader = ({ title, lessonNumber, description }: LessonHeaderProps) => {
  return (
    <header className="relative mb-12 text-center">
      <div 
        className="absolute inset-0 opacity-20 rounded-3xl"
        style={{ background: "var(--lesson-gradient)" }}
      />
      <div className="relative py-16 px-8">
        <Badge className="mb-4 bg-primary text-primary-foreground font-medium px-4 py-2">
          Lesson {lessonNumber}
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          {title}
        </h1>
        {description && (
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </header>
  );
};