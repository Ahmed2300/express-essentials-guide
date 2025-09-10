import { LessonHeader } from "./LessonHeader";
import { LearningObjectives } from "./LearningObjectives";
import { LessonStep } from "./LessonStep";
import { LessonSection } from "./LessonSection";
import { MiddlewareFlow } from "./MiddlewareFlow";
import { ProjectStructure } from "./ProjectStructure";
import { APIEndpoints } from "./APIEndpoints";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "./CodeBlock";

export const LessonViewer = () => {
  const objectives = [
    "Organization: Instead of one massive file, your code will be neatly organized by its function (server setup, routing, and logic). This makes it easier to read and understand.",
    "Scalability: This structure makes it simple to add new features and endpoints without breaking existing ones.",
    "Maintainability: When you need to fix a bug or update a feature, you'll know exactly which file to look in.",
    "Understanding middleware execution flow and how requests are processed",
    "Building professional-grade APIs with proper error handling and structure"
  ];

  const studentEndpoints = [
    {
      method: "GET",
      url: "http://localhost:8080/students",
      description: "Get all students",
      example: "http://localhost:8080/students?name=john&email=john@gmail.com"
    },
    {
      method: "POST",
      url: "http://localhost:8080/students",
      description: "Add new student",
      body: '{"name": "John", "email": "john@example.com"}'
    }
  ];

  const departmentEndpoints = [
    {
      method: "GET",
      url: "http://localhost:8080/departments",
      description: "Get all departments"
    },
    {
      method: "POST",
      url: "http://localhost:8080/departments",
      description: "Add new department",
      body: '{"name": "Computer Science"}'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <LessonHeader 
          lessonNumber={2}
          title="Middleware & Express Routing"
          description="Master Express.js middleware, routing patterns, and build a complete structured API with proper error handling"
        />

        <LearningObjectives objectives={objectives} />

        <div className="space-y-12">
          <LessonSection title="What is Middleware?" badge="Theory">
            <div className="space-y-4">
              <p className="text-foreground">
                <strong>Middleware</strong> is a function that has access to the request object (req), 
                the response object (res), and the next middleware function in the application's 
                request-response cycle.
              </p>
              
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-3">Middleware Functions Can:</h4>
                <ul className="space-y-2 text-foreground">
                  <li>• Execute any code</li>
                  <li>• Make changes to the request and response objects</li>
                  <li>• End the request-response cycle</li>
                  <li>• Call the next middleware function in the stack</li>
                </ul>
              </div>
            </div>
          </LessonSection>

          <LessonSection title="Middleware Execution Flow" badge="Flow">
            <MiddlewareFlow />
          </LessonSection>

          <LessonSection title="Project Setup & Structure" badge="Setup">
            <ProjectStructure />
          </LessonSection>

          <LessonStep
            stepNumber={1}
            title="Initialize the Complete Project"
            description="Set up the project with proper structure and dependencies."
            content={
              <div className="space-y-4">
                <p><strong>Create Project:</strong> <code className="bg-muted px-2 py-1 rounded">mkdir Project && cd Project</code></p>
                <p><strong>Initialize npm:</strong> <code className="bg-muted px-2 py-1 rounded">npm init -y</code></p>
                <p><strong>Install Express:</strong> <code className="bg-muted px-2 py-1 rounded">npm install express</code></p>
              </div>
            }
          />

          <LessonSection title="Testing Your API" badge="Testing">
            <div className="space-y-6">
              <p className="text-foreground">Start your server with <code className="bg-muted px-2 py-1 rounded">node index.js</code> and test these endpoints:</p>
              
              <div className="grid lg:grid-cols-2 gap-6">
                <APIEndpoints title="Student Endpoints" endpoints={studentEndpoints} />
                <APIEndpoints title="Department Endpoints" endpoints={departmentEndpoints} />
              </div>
            </div>
          </LessonSection>
        </div>

        <Card className="mt-12 bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20">
          <CardContent className="pt-6 text-center">
            <h3 className="text-xl font-bold text-foreground mb-4">🎯 Congratulations!</h3>
            <p className="text-muted-foreground leading-relaxed">
              You now understand Express.js middleware, routing patterns, and can build professional APIs 
              with proper structure, error handling, and debugging capabilities!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};