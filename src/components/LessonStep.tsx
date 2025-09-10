import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "./CodeBlock";

interface LessonStepProps {
  stepNumber: number;
  title: string;
  description?: string;
  content: React.ReactNode;
  code?: {
    content: string;
    filename?: string;
    language?: string;
  };
}

export const LessonStep = ({ stepNumber, title, description, content, code }: LessonStepProps) => {
  return (
    <div className="mb-12">
      <Card className="bg-step-bg border-step-border shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <Badge className="bg-primary text-primary-foreground font-semibold px-3 py-1">
              Step {stepNumber}
            </Badge>
            <CardTitle className="text-xl font-bold text-foreground">{title}</CardTitle>
          </div>
          {description && (
            <CardDescription className="text-muted-foreground mt-2">
              {description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose prose-gray max-w-none">
            {content}
          </div>
          {code && (
            <CodeBlock
              code={code.content}
              filename={code.filename}
              language={code.language}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};