import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowRight } from "lucide-react";

export const MiddlewareFlow = () => {
  const flowSteps = [
    { name: "Request", color: "bg-primary/10 border-primary/20 text-primary" },
    { name: "First MW", color: "bg-accent/10 border-accent/20 text-accent" },
    { name: "Auth MW", color: "bg-accent/10 border-accent/20 text-accent" },
    { name: "JSON Parser", color: "bg-accent/10 border-accent/20 text-accent" },
    { name: "Router", color: "bg-secondary/10 border-secondary/20 text-secondary" },
    { name: "Controller", color: "bg-secondary/10 border-secondary/20 text-secondary" },
    { name: "Response", color: "bg-primary/10 border-primary/20 text-primary" }
  ];

  return (
    <Card className="bg-flow-bg border-flow-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Middleware Execution Flow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          {flowSteps.map((step, index) => (
            <div key={step.name} className="flex flex-col items-center">
              <div className={`px-4 py-2 rounded-lg border-2 ${step.color} font-medium`}>
                {step.name}
              </div>
              {index < flowSteps.length - 1 && (
                <ArrowDown className="mt-2 mb-2 text-muted-foreground" size={20} />
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-destructive font-semibold">Error Path:</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="px-2 py-1 bg-destructive/20 text-destructive rounded">Any Middleware</span>
            <ArrowRight size={16} className="text-destructive" />
            <span className="px-2 py-1 bg-destructive/20 text-destructive rounded">Error Handler</span>
            <ArrowRight size={16} className="text-destructive" />
            <span className="px-2 py-1 bg-destructive/20 text-destructive rounded">Response</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};