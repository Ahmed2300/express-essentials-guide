import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowRight } from "lucide-react";

export const MiddlewareFlow = () => {
  const flowSteps = [
    { name: "1. Request Arrives", color: "bg-blue-100 border-blue-300 text-blue-800", description: "Client sends HTTP request" },
    { name: "2. Logging MW", color: "bg-green-100 border-green-300 text-green-800", description: "Log request details" },
    { name: "3. JSON Parser MW", color: "bg-yellow-100 border-yellow-300 text-yellow-800", description: "Parse request body" },
    { name: "4. Student Router", color: "bg-purple-100 border-purple-300 text-purple-800", description: "Route to /students" },
    { name: "5. Route Handler", color: "bg-orange-100 border-orange-300 text-orange-800", description: "Match HTTP method" },
    { name: "6. Controller Function", color: "bg-pink-100 border-pink-300 text-pink-800", description: "Execute business logic" },
    { name: "7. Response Sent", color: "bg-blue-100 border-blue-300 text-blue-800", description: "Send JSON response" }
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
              <div className={`px-4 py-3 rounded-lg border-2 ${step.color} font-medium text-center min-w-[200px]`}>
                <div className="font-semibold">{step.name}</div>
                <div className="text-xs mt-1 opacity-80">{step.description}</div>
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