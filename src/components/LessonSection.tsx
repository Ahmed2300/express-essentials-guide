import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface LessonSectionProps {
  title: string;
  badge?: string;
  children: React.ReactNode;
  className?: string;
}

export const LessonSection = ({ title, badge, children, className = "" }: LessonSectionProps) => {
  return (
    <Card className={`bg-section-bg border-section-border shadow-sm ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          {badge && (
            <Badge className="bg-accent text-accent-foreground font-semibold px-3 py-1">
              {badge}
            </Badge>
          )}
          <CardTitle className="text-xl font-bold text-foreground">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {children}
      </CardContent>
    </Card>
  );
};