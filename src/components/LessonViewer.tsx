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
      method: "GET",
      url: "http://localhost:8080/students/3",
      description: "Get student by ID"
    },
    {
      method: "POST",
      url: "http://localhost:8080/students",
      description: "Add new student",
      body: '{"name": "John", "email": "john@example.com"}'
    },
    {
      method: "PATCH",
      url: "http://localhost:8080/students",
      description: "Update student",
      body: '{"name": "Updated Name"}'
    },
    {
      method: "DELETE",
      url: "http://localhost:8080/students/3",
      description: "Delete student by ID"
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
                <strong>Middleware</strong> is any function that runs in the middle between the server 
                receiving a request and sending a response. Think of your Express server as an assembly line. 
                A request comes in at one end, and a response goes out the other. Middleware functions are 
                the different stations along that assembly line.
              </p>
              
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-3">Every middleware function has access to:</h4>
                <ul className="space-y-2 text-foreground">
                  <li>• <strong>request (req):</strong> Contains all information about the incoming request</li>
                  <li>• <strong>response (res):</strong> Used to build and send the response back to the client</li>
                  <li>• <strong>next:</strong> A function that passes control to the next middleware</li>
                </ul>
              </div>

              <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-3">Middleware Functions Can:</h4>
                <ul className="space-y-2 text-foreground">
                  <li>• Execute any code</li>
                  <li>• Make changes to the request and response objects</li>
                  <li>• End the request-response cycle</li>
                  <li>• Call the next middleware function in the stack</li>
                </ul>
              </div>

              <CodeBlock 
                language="javascript"
                code={`// Standard middleware function signature
function middlewareName(request, response, next) {
    // Middleware logic here
    console.log(\`Request received for: \${request.url}\`);
    next(); // Pass control to the next middleware
}

// Error handling middleware signature (4 parameters)
function errorHandler(error, request, response, next) {
    console.error(error);
    response.status(500).json({message: "Something went wrong"});
}`}
              />
            </div>
          </LessonSection>

          <LessonSection title="Types of Middleware" badge="Types">
            <div className="space-y-6">
              <div className="grid gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-3">A. Application-Level Middleware</h4>
                  <p className="text-foreground mb-2">Bound to the main app object and runs for every request</p>
                  <CodeBlock 
                    language="javascript"
                    code={`// Runs for ALL requests
app.use((req, res, next) => {
    console.log(\`LOG: \${req.method} request to \${req.url}\`);
    next();
});`}
                  />
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-3">B. Router-Level Middleware</h4>
                  <p className="text-foreground mb-2">Bound to express.Router() instances, runs only for specific routes</p>
                  <CodeBlock 
                    language="javascript"
                    code={`const adminRouter = express.Router();
adminRouter.use((req, res, next) => {
    // Only runs for /admin/* routes
    if (req.user.isAdmin) {
        next();
    } else {
        res.status(403).send("Forbidden");
    }
});`}
                  />
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-3">C. Built-in Middleware</h4>
                  <p className="text-foreground mb-2">Express comes with useful middleware functions</p>
                  <CodeBlock 
                    language="javascript"
                    code={`// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies (forms)
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));`}
                  />
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-3">D. Third-Party Middleware</h4>
                  <p className="text-foreground mb-2">Community packages that add functionality</p>
                  <CodeBlock 
                    language="javascript"
                    code={`// Install: npm install morgan cors
const morgan = require('morgan');
const cors = require('cors');

// Request logging
app.use(morgan('combined'));

// Enable CORS
app.use(cors());`}
                  />
                </div>
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
                <p><strong>Create Project:</strong> <code className="bg-muted px-2 py-1 rounded">mkdir my-api && cd my-api</code></p>
                <p><strong>Initialize npm:</strong> <code className="bg-muted px-2 py-1 rounded">npm init -y</code></p>
                <p><strong>Install Express:</strong> <code className="bg-muted px-2 py-1 rounded">npm install express</code></p>
                <p><strong>Create Structure:</strong> <code className="bg-muted px-2 py-1 rounded">mkdir Controllers Routes</code></p>
                <p><strong>Create Files:</strong> <code className="bg-muted px-2 py-1 rounded">touch index.js Controllers/studentController.js Routes/studentRoute.js</code></p>
              </div>
            }
          />

          <LessonStep
            stepNumber={2}
            title="Create the Controllers (The Workers)"
            description="Build controllers that contain the business logic for both students and departments."
            content={
              <div className="space-y-6">
                <div>
                  <p className="text-foreground mb-3">Create <code className="bg-muted px-2 py-1 rounded">Controllers/studentController.js</code>:</p>
                  <CodeBlock 
                    language="javascript"
                    code={`// In Controllers/studentController.js
exports.getAllstudents = (request, response, next) => {
    // Handle query parameters for filtering
    const { name, email } = request.query;
    let message = "[Here is the list of all students]";
    
    if (name || email) {
        message = \`Filtered students by: \${name ? 'name=' + name : ''} \${email ? 'email=' + email : ''}\`;
    }
    
    response.status(200).json({ data: message });
};

exports.getStudentById = (request, response, next) => {
    const { id } = request.params;
    response.status(200).json({ 
        data: \`Student with ID: \${id}\` 
    });
};

exports.addStudent = (request, response, next) => {
    console.log("Request Body:", request.body);
    const { name, email } = request.body;
    
    if (!name || !email) {
        return response.status(400).json({ 
            error: "Name and email are required" 
        });
    }
    
    response.status(201).json({ 
        data: "Student has been added!",
        student: { name, email }
    });
};

exports.updateStudent = (request, response, next) => {
    console.log("Update data:", request.body);
    response.status(200).json({ 
        data: "Student has been updated!" 
    });
};

exports.deleteStudent = (request, response, next) => {
    const { id } = request.params;
    response.status(200).json({ 
        data: \`Student with ID \${id} has been deleted!\` 
    });
};`}
                  />
                </div>

                <div>
                  <p className="text-foreground mb-3">Create <code className="bg-muted px-2 py-1 rounded">Controllers/departmentController.js</code>:</p>
                  <CodeBlock 
                    language="javascript"
                    code={`// In Controllers/departmentController.js
exports.getAllDepartments = (request, response, next) => {
    response.status(200).json({ 
        data: "[Here is the list of all departments]" 
    });
};

exports.addDepartment = (request, response, next) => {
    console.log("Department data:", request.body);
    const { name } = request.body;
    
    if (!name) {
        return response.status(400).json({ 
            error: "Department name is required" 
        });
    }
    
    response.status(201).json({ 
        data: "Department has been added!",
        department: { name }
    });
};`}
                  />
                </div>
              </div>
            }
          />

          <LessonStep
            stepNumber={3}
            title="Create the Routers (The Traffic Directors)"
            description="Set up routing to connect URLs to controller functions for both students and departments."
            content={
              <div className="space-y-6">
                <div>
                  <p className="text-foreground mb-3">Create <code className="bg-muted px-2 py-1 rounded">Routes/studentRoute.js</code>:</p>
                  <CodeBlock 
                    language="javascript"
                    code={`// In Routes/studentRoute.js
const express = require("express");
const controller = require("./../Controllers/studentController");

// Create a new router object
const studentRouter = express.Router();

// Define routes and link them to controller functions
studentRouter.route("/students")
    .get(controller.getAllstudents)
    .post(controller.addStudent)
    .patch(controller.updateStudent);

// Route with parameter for specific student
studentRouter.route("/students/:id")
    .get(controller.getStudentById)
    .delete(controller.deleteStudent);

// Export the router
module.exports = studentRouter;`}
                  />
                </div>

                <div>
                  <p className="text-foreground mb-3">Create <code className="bg-muted px-2 py-1 rounded">Routes/departmentRoute.js</code>:</p>
                  <CodeBlock 
                    language="javascript"
                    code={`// In Routes/departmentRoute.js
const express = require("express");
const controller = require("./../Controllers/departmentController");

// Create a new router object
const departmentRouter = express.Router();

// Define routes and link them to controller functions
departmentRouter.route("/departments")
    .get(controller.getAllDepartments)
    .post(controller.addDepartment);

// Export the router
module.exports = departmentRouter;`}
                  />
                </div>
              </div>
            }
          />

          <LessonStep
            stepNumber={4}
            title="Create the Complete Server (The Conductor)"
            description="Build the main server file that orchestrates everything with both routers."
            content={
              <div className="space-y-4">
                <p className="text-foreground">Create <code className="bg-muted px-2 py-1 rounded">index.js</code>:</p>
                <CodeBlock 
                  language="javascript"
                  code={`// In index.js
const express = require("express");
const studentRouter = require("./Routes/studentRoute");
const departmentRouter = require("./Routes/departmentRoute");

let server = express();

// --- MIDDLEWARE PIPELINE ---
// Logging middleware (optional but helpful)
server.use((req, res, next) => {
    console.log(\`\${new Date().toISOString()} - \${req.method} \${req.url}\`);
    next();
});

// JSON parsing middleware (MUST come before routers)
server.use(express.json());

// Route Middleware - Order matters!
server.use(studentRouter);
server.use(departmentRouter);

// Not Found Handler (catches unmatched routes)
server.use((request, response, next) => {
    response.status(404).json({ 
        message: \`\${request.url} not found on this server\` 
    });
});

// Global Error Handler (MUST be last with 4 parameters)
server.use((error, request, response, next) => {
    console.error("Error occurred:", error);
    response.status(500).json({ 
        message: "An error occurred: " + error.message 
    });
});

// Start the server
server.listen(8080, () => {
    console.log("🚀 Server is listening on port 8080...");
    console.log("📋 Available endpoints:");
    console.log("   GET    /students");
    console.log("   POST   /students");
    console.log("   PATCH  /students");
    console.log("   GET    /students/:id");
    console.log("   DELETE /students/:id");
    console.log("   GET    /departments");
    console.log("   POST   /departments");
});`}
                />
              </div>
            }
          />

          <LessonStep
            stepNumber={5}
            title="Understanding Common Mistakes"
            description="Learn from typical errors and how to fix them."
            content={
              <div className="space-y-4">
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                  <h4 className="font-semibold text-destructive mb-3">❌ Common Mistake #1: Forgetting to Use the Router</h4>
                  <p className="text-foreground mb-2">If you don't add <code className="bg-muted px-2 py-1 rounded">server.use(studentRouter)</code>, you'll get:</p>
                  <code className="text-destructive">Cannot GET /students</code>
                </div>
                
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                  <h4 className="font-semibold text-destructive mb-3">❌ Common Mistake #2: Missing JSON Middleware</h4>
                  <p className="text-foreground mb-2">Without <code className="bg-muted px-2 py-1 rounded">server.use(express.json())</code>, request.body will be:</p>
                  <code className="text-destructive">undefined</code>
                </div>

                <div className="bg-green-100 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-3">✅ The Fix: Proper Middleware Order</h4>
                  <p className="text-foreground">Always place middleware in the correct order: JSON parsing → Routes → Error handlers</p>
                </div>
              </div>
            }
          />

          <LessonSection title="Getting Data From Client" badge="Data">
            <div className="space-y-6">
              <p className="text-foreground">There are three primary ways your server can receive data from a client request:</p>
              
              <div className="grid gap-6">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-3">1. Query String Parameters</h4>
                  <p className="text-foreground mb-2">Key-value pairs appended to the URL after a <code className="bg-muted px-2 py-1 rounded">?</code></p>
                  <CodeBlock 
                    language="javascript"
                    code={`// Example: /students?name=john&email=john@gmail.com
// Access in Express:
const { name, email } = request.query;
// Result: { name: 'john', email: 'john@gmail.com' }`}
                  />
                </div>

                <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-3">2. Route Parameters</h4>
                  <p className="text-foreground mb-2">Segments of the URL path defined with <code className="bg-muted px-2 py-1 rounded">:</code></p>
                  <CodeBlock 
                    language="javascript"
                    code={`// Route: /students/:id/:name
// Example: /students/3/john
// Access in Express:
const { id, name } = request.params;
// Result: { id: '3', name: 'john' }`}
                  />
                </div>

                <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-3">3. Request Body</h4>
                  <p className="text-foreground mb-2">Data sent in the HTTP request body (requires middleware)</p>
                  <CodeBlock 
                    language="javascript"
                    code={`// Requires: server.use(express.json());
// POST body: {"name": "John", "email": "john@example.com"}
// Access in Express:
const { name, email } = request.body;
// Result: { name: 'John', email: 'john@example.com' }`}
                  />
                </div>
              </div>
            </div>
          </LessonSection>

          <LessonSection title="Best Practices & Common Patterns" badge="Best Practices">
            <div className="space-y-6">
              <div className="grid gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-3">✅ Authentication Middleware</h4>
                  <CodeBlock 
                    language="javascript"
                    code={`server.use((req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        // Verify token here
        next(); // Token exists, proceed
    } else {
        res.status(401).json({message: "Unauthorized"});
    }
});`}
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-3">📝 Logging Middleware</h4>
                  <CodeBlock 
                    language="javascript"
                    code={`server.use((req, res, next) => {
    console.log(\`\${new Date().toISOString()} - \${req.method} \${req.url}\`);
    next();
});`}
                  />
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-3">🌐 CORS Middleware</h4>
                  <CodeBlock 
                    language="javascript"
                    code={`server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});`}
                  />
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-3">⚠️ Key Reminders</h4>
                <ul className="space-y-2 text-foreground">
                  <li>• Always call <code className="bg-muted px-2 py-1 rounded">next()</code> unless you're ending the response</li>
                  <li>• Place middleware in the correct order: JSON parsing → Routes → Error handlers</li>
                  <li>• Use meaningful HTTP status codes (200, 201, 404, 500, etc.)</li>
                  <li>• Keep controllers "thin" - separate business logic from HTTP handling</li>
                  <li>• Always validate input data from clients</li>
                </ul>
              </div>
            </div>
          </LessonSection>

          <LessonSection title="Testing Your API" badge="Testing">
            <div className="space-y-6">
              <p className="text-foreground">Start your server with <code className="bg-muted px-2 py-1 rounded">node index.js</code> and test these endpoints:</p>
              
              <div className="grid lg:grid-cols-2 gap-6">
                <APIEndpoints title="Student Endpoints" endpoints={studentEndpoints} />
                <APIEndpoints title="Department Endpoints" endpoints={departmentEndpoints} />
              </div>
            </div>
          </LessonSection>

          <LessonSection title="Troubleshooting Common Errors" badge="Debug">
            <div className="space-y-6">
              <div className="grid gap-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-3">🚫 Error: "Cannot GET /students"</h4>
                  <p className="text-foreground mb-2"><strong>Cause:</strong> Router not connected to main app</p>
                  <p className="text-foreground mb-2"><strong>Solution:</strong> Add <code className="bg-muted px-2 py-1 rounded">server.use(studentRouter)</code> in index.js</p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-3">🚫 Error: "request.body is undefined"</h4>
                  <p className="text-foreground mb-2"><strong>Cause:</strong> Missing JSON parsing middleware</p>
                  <p className="text-foreground mb-2"><strong>Solution:</strong> Add <code className="bg-muted px-2 py-1 rounded">server.use(express.json())</code> before routes</p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-3">🚫 Error: Request hangs/never responds</h4>
                  <p className="text-foreground mb-2"><strong>Cause:</strong> Middleware doesn't call <code className="bg-muted px-2 py-1 rounded">next()</code></p>
                  <p className="text-foreground mb-2"><strong>Solution:</strong> Always call <code className="bg-muted px-2 py-1 rounded">next()</code> or send a response</p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-3">🚫 Error: "Cannot set headers after they are sent"</h4>
                  <p className="text-foreground mb-2"><strong>Cause:</strong> Trying to send multiple responses</p>
                  <p className="text-foreground mb-2"><strong>Solution:</strong> Ensure only one <code className="bg-muted px-2 py-1 rounded">res.send()</code> or <code className="bg-muted px-2 py-1 rounded">res.json()</code> per request</p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-3">🚫 Error: "EADDRINUSE: Port already in use"</h4>
                  <p className="text-foreground mb-2"><strong>Cause:</strong> Another process is using port 8080</p>
                  <p className="text-foreground mb-2"><strong>Solution:</strong> Kill the process or use a different port</p>
                  <CodeBlock 
                    language="bash"
                    code={`# Kill process on port 8080 (Windows)
netstat -ano | findstr :8080
taskkill /PID <PID_NUMBER> /F

# Or use a different port
server.listen(3000, () => console.log("Server on port 3000"));`}
                  />
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-3">✅ Debugging Tips</h4>
                <ul className="space-y-2 text-foreground">
                  <li>• Use <code className="bg-muted px-2 py-1 rounded">console.log()</code> to trace middleware execution</li>
                  <li>• Check the browser's Network tab for HTTP status codes</li>
                  <li>• Verify middleware order: JSON parsing → Routes → Error handlers</li>
                  <li>• Test endpoints one by one using Postman or browser</li>
                  <li>• Read error messages carefully - they usually point to the exact problem</li>
                </ul>
              </div>
            </div>
          </LessonSection>

          <LessonSection title="Complete Project Summary" badge="Summary">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-800 mb-4">📁 Final Project Structure</h4>
                <CodeBlock 
                  language="text"
                  code={`my-api/
├── Controllers/
│   ├── studentController.js     ✅ Complete with CRUD operations
│   └── departmentController.js  ✅ Complete with basic operations
├── Routes/
│   ├── studentRoute.js          ✅ All HTTP methods configured
│   └── departmentRoute.js       ✅ GET and POST configured
├── index.js                     ✅ Complete server with middleware
├── package.json                 ✅ Express dependency
└── package-lock.json           ✅ Auto-generated`}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-3">✅ What You've Learned</h4>
                  <ul className="space-y-2 text-foreground text-sm">
                    <li>• Middleware concepts and execution flow</li>
                    <li>• Professional project structure</li>
                    <li>• Controllers vs Routes separation</li>
                    <li>• Error handling patterns</li>
                    <li>• Request data handling (query, params, body)</li>
                    <li>• HTTP status codes and REST principles</li>
                    <li>• Debugging common Express.js issues</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-3">🚀 Next Steps</h4>
                  <ul className="space-y-2 text-foreground text-sm">
                    <li>• Add database integration (MongoDB/PostgreSQL)</li>
                    <li>• Implement authentication & authorization</li>
                    <li>• Add input validation (Joi, express-validator)</li>
                    <li>• Set up environment variables (.env)</li>
                    <li>• Add unit and integration tests</li>
                    <li>• Deploy to cloud platforms (Heroku, AWS)</li>
                    <li>• Add API documentation (Swagger)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-3">💡 Pro Tips for Production</h4>
                <ul className="space-y-2 text-foreground text-sm">
                  <li>• Use environment variables for configuration</li>
                  <li>• Implement proper logging (Winston, Morgan)</li>
                  <li>• Add rate limiting and security headers</li>
                  <li>• Use HTTPS in production</li>
                  <li>• Implement graceful shutdown handling</li>
                  <li>• Monitor your API performance</li>
                </ul>
              </div>
            </div>
          </LessonSection>
        </div>

        <Card className="mt-12 bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20">
          <CardContent className="pt-6 text-center">
            <h3 className="text-xl font-bold text-foreground mb-4">🎯 Congratulations!</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You now understand Express.js middleware, routing patterns, and can build professional APIs 
              with proper structure, error handling, and debugging capabilities!
            </p>
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground">
                <strong>Ready to test?</strong> Run <code className="bg-muted px-2 py-1 rounded">node index.js</code> 
                and start making API calls to see your creation in action! 🚀
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};