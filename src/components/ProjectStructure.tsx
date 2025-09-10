import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen, File } from "lucide-react";

export const ProjectStructure = () => {
  return (
    <Card className="bg-structure-bg border-structure-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Recommended Project Structure</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="font-mono text-sm space-y-1">
          <div className="flex items-center gap-2">
            <FolderOpen size={16} className="text-folder" />
            <span className="font-semibold">Project/</span>
          </div>
          <div className="ml-4 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">├──</span>
              <FolderOpen size={16} className="text-folder" />
              <span className="font-semibold">Controllers/</span>
            </div>
            <div className="ml-8 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">│   ├──</span>
                <File size={16} className="text-file" />
                <span>studentController.js</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">│   └──</span>
                <File size={16} className="text-file" />
                <span>departmentController.js</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">├──</span>
              <FolderOpen size={16} className="text-folder" />
              <span className="font-semibold">MiddelWares/</span>
            </div>
            <div className="ml-8">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">│   └──</span>
                <span className="text-muted-foreground">(custom middleware files)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">├──</span>
              <FolderOpen size={16} className="text-folder" />
              <span className="font-semibold">Routes/</span>
            </div>
            <div className="ml-8 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">│   ├──</span>
                <File size={16} className="text-file" />
                <span>studentRoute.js</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">│   └──</span>
                <File size={16} className="text-file" />
                <span>departmentRoute.js</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">├──</span>
              <File size={16} className="text-file" />
              <span>index.js</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">├──</span>
              <File size={16} className="text-file" />
              <span>package.json</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">└──</span>
              <File size={16} className="text-file" />
              <span>package-lock.json</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};