import { LessonHeader } from "./LessonHeader";
import { LearningObjectives } from "./LearningObjectives";
import { LessonStep } from "./LessonStep";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "./CodeBlock";

export const LessonViewer = () => {
  const objectives = [
    "Organization: Instead of one massive file, your code will be neatly organized by its function (server setup, routing, and logic). This makes it easier to read and understand.",
    "Scalability: This structure makes it simple to add new features and endpoints without breaking existing ones.",
    "Maintainability: When you need to fix a bug or update a feature, you'll know exactly which file to look in."
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <LessonHeader 
          lessonNumber={2}
          title="Building with Express.js"
          description="Learn how to build a structured, professional-grade web server and API using the Express.js framework"
        />

        <LearningObjectives objectives={objectives} />

        <div className="space-y-12">
          <LessonStep
            stepNumber={1}
            title="The Initial Setup"
            description="This step prepares your workspace."
            content={
              <div className="space-y-4">
                <p><strong>Create a New Project Folder:</strong> Call it my-student-api. Open a terminal inside this new folder.</p>
                <p><strong>Initialize npm:</strong> Run <code className="bg-muted px-2 py-1 rounded">npm init -y</code>. This creates your package.json file.</p>
                <p><strong>Install Express:</strong> This is the only external library we need for now. Run <code className="bg-muted px-2 py-1 rounded">npm install express</code>.</p>
                <p><strong>Create Your Folders:</strong> Run <code className="bg-muted px-2 py-1 rounded">mkdir Controllers Routes</code>.</p>
                <p><strong>Create Your Files:</strong> Run <code className="bg-muted px-2 py-1 rounded">touch index.js Controllers/studentController.js Routes/studentRoute.js</code>.</p>
                <p>Your project is now empty but perfectly structured.</p>
              </div>
            }
          />

          <LessonStep
            stepNumber={2}
            title="The Controller (The 'Worker')"
            description="Let's start with the logic. The controller's job is to execute code when a request comes in."
            content={
              <div className="space-y-4">
                <p>Open <code className="bg-muted px-2 py-1 rounded">Controllers/studentController.js</code>.</p>
                <p>Write the <strong>getAllstudents</strong> function. This function will handle requests for the list of all students. For now, it will just send a placeholder response.</p>
              </div>
            }
            code={{
              content: `// In Controllers/studentController.js

exports.getAllstudents = (request, response, next) => {
    response.status(200).json({ data: "[List of all students]" });
};`,
              filename: "Controllers/studentController.js"
            }}
          />

          <Card className="bg-primary/5 border-primary/20 mb-8">
            <CardContent className="pt-6">
              <h4 className="font-semibold text-foreground mb-3">Explanation of the Code:</h4>
              <ul className="space-y-2 text-foreground">
                <li><strong>exports.getAllstudents = ...:</strong> We are creating a function and immediately exporting it so other files can use it.</li>
                <li><strong>(request, response, next) {"=>"} {"{ ... }"}</strong>: This is the standard signature for any Express middleware or controller function.</li>
                <li><strong>response.status(200).json(...):</strong> This sends a response back to the client with HTTP status code 200 (OK) and a JSON object.</li>
              </ul>
            </CardContent>
          </Card>

          <LessonStep
            stepNumber={3}
            title="The Router (The 'Traffic Director')"
            description="The router's job is to listen for specific URLs and direct them to the correct controller function."
            content={
              <div className="space-y-4">
                <p>Open <code className="bg-muted px-2 py-1 rounded">Routes/studentRoute.js</code>.</p>
                <p>Set up the router. We need to import express to use its Router() functionality. We also need to import our controller.</p>
              </div>
            }
            code={{
              content: `// In Routes/studentRoute.js

const express = require("express");
const controller = require("./../Controllers/studentController"); // Let's talk about this path

const studentRouter = express.Router();

studentRouter.route("/students")
    .get(controller.getAllstudents);

module.exports = studentRouter;`,
              filename: "Routes/studentRoute.js"
            }}
          />

          <LessonStep
            stepNumber={4}
            title="The Server Core (The 'Conductor')"
            description="This is the main file that starts everything and connects all the pieces."
            content={
              <div className="space-y-6">
                <p>Open <code className="bg-muted px-2 py-1 rounded">index.js</code>.</p>
                <p>Write the initial server code. Let's start by just creating the server and making it listen.</p>
                
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 my-4">
                  <h5 className="font-semibold text-destructive mb-2">🚨 TRY THIS FIRST (Common Mistake):</h5>
                  <p className="text-foreground">Run your server now (node index.js). It will start without errors. Now, open your browser and go to http://localhost:8080/students. What happens? You get a Cannot GET /students error.</p>
                  <p className="text-foreground mt-2"><strong>Why did this fail?</strong> Because while our server is running, we never told it to use the studentRouter we created.</p>
                </div>
              </div>
            }
            code={{
              content: `// In index.js

const express = require("express");

let server = express();
server.listen(8080, () => {
    console.log("I'm listening......");
});`,
              filename: "index.js (INCOMPLETE VERSION)"
            }}
          />

          <Card className="bg-accent/10 border-accent/20 mb-8">
            <CardContent className="pt-6">
              <h4 className="font-semibold text-accent mb-3">✅ THE CORRECTION:</h4>
              <p className="text-foreground mb-4">We need to import our router and tell our server to use it as middleware.</p>
              <CodeBlock 
                code={`// In index.js

const express = require("express");
const studentRouter = require("./Routes/studentRoute"); // Import the router

let server = express();
server.listen(8080, () => {
    console.log("I'm listening......");
});

// Use the studentRouter as middleware
server.use(studentRouter);`}
                filename="index.js (CORRECTED VERSION)"
              />
            </CardContent>
          </Card>

          <LessonStep
            stepNumber={5}
            title="Adding More Routes and the Middleware Pipeline"
            description="Now let's build out the rest of the functionality and add the full middleware pipeline."
            content={
              <div className="space-y-6">
                <h4 className="text-lg font-semibold">Handling POST Requests and the JSON Parser</h4>
                <p>Add the addStudent function to your controller:</p>
              </div>
            }
            code={{
              content: `// In Controllers/studentController.js

// ... (keep getAllstudents function) ...

exports.addStudent = (request, response, next) => {
    console.log(request.body); // We want to see the data from the client
    response.status(201).json({ data: "Student has been added!" });
};`,
              filename: "Controllers/studentController.js"
            }}
          />

          <div className="space-y-6">
            <CodeBlock 
              code={`// In Routes/studentRoute.js

// ... (keep the top part) ...

studentRouter.route("/students")
    .get(controller.getAllstudents)
    .post(controller.addStudent); // Add this line

// ... (keep module.exports) ...`}
              filename="Routes/studentRoute.js (Updated)"
            />

            <Card className="bg-accent/10 border-accent/20">
              <CardContent className="pt-6">
                <h4 className="font-semibold text-accent mb-3">🎉 Final Complete Server Setup</h4>
                <CodeBlock 
                  code={`// In index.js

const express = require("express");
const studentRouter = require("./Routes/studentRoute");

let server = express();

// MIDDLEWARE
// This middleware parses incoming JSON bodies
server.use(express.json());

// ROUTING MIDDLEWARE
server.use(studentRouter);

// Not Found handler
server.use((request, response) => {
    response.status(404).json({ message: "Not Found" });
});

// Error handler
server.use((error, request, response, next) => {
    response.status(500).json({ message: "Error: " + error });
});

server.listen(8080, () => {
    console.log("I'm listening......");
});`}
                  filename="index.js (FINAL VERSION)"
                />
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="mt-12 bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20">
          <CardContent className="pt-6 text-center">
            <h3 className="text-xl font-bold text-foreground mb-4">🎯 Congratulations!</h3>
            <p className="text-muted-foreground leading-relaxed">
              You have now successfully built a robust, structured Express application, understanding not just how to write the code, 
              but why it's structured the way it is and how to debug common issues.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
