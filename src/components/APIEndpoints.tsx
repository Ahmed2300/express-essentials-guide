import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface APIEndpoint {
  method: string;
  url: string;
  description: string;
  body?: string;
  example?: string;
}

interface APIEndpointsProps {
  title: string;
  endpoints: APIEndpoint[];
}

export const APIEndpoints = ({ title, endpoints }: APIEndpointsProps) => {
  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-green-100 text-green-800 border-green-200";
      case "POST":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "PATCH":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "DELETE":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="bg-api-bg border-api-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {endpoints.map((endpoint, index) => (
            <div key={index} className="p-4 bg-background border rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Badge className={`font-mono text-xs ${getMethodColor(endpoint.method)}`}>
                  {endpoint.method}
                </Badge>
                <code className="text-sm bg-muted px-2 py-1 rounded font-mono">
                  {endpoint.url}
                </code>
              </div>
              <p className="text-foreground text-sm mb-2">{endpoint.description}</p>
              {endpoint.body && (
                <div className="mb-2">
                  <p className="text-xs text-muted-foreground mb-1">Request Body:</p>
                  <code className="text-xs bg-muted px-2 py-1 rounded block">
                    {endpoint.body}
                  </code>
                </div>
              )}
              {endpoint.example && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Example:</p>
                  <code className="text-xs bg-muted px-2 py-1 rounded block">
                    {endpoint.example}
                  </code>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};