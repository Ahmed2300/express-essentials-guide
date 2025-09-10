import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface LearningObjectivesProps {
  objectives: string[];
}

export const LearningObjectives = ({ objectives }: LearningObjectivesProps) => {
  return (
    <Card className="mb-12 bg-gradient-to-r from-accent/5 to-primary/5 border-accent/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <CheckCircle className="w-5 h-5 text-accent" />
          What Will You Learn?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {objectives.map((objective, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-2 h-2 bg-accent rounded-full mt-3 flex-shrink-0" />
              <span className="text-foreground leading-relaxed">{objective}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};