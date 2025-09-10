import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export const CodeBlock = ({ code, language = "javascript", filename }: CodeBlockProps) => {
  return (
    <div className="my-6">
      {filename && (
        <div className="flex items-center gap-2 px-4 py-2 bg-code-bg border border-code-border rounded-t-lg">
          <Badge variant="secondary" className="text-xs">
            {filename}
          </Badge>
        </div>
      )}
      <Card className="bg-code-bg border-code-border rounded-t-none overflow-hidden">
        <pre className="p-4 overflow-x-auto">
          <code className="text-code-text text-sm leading-relaxed font-mono">
            {code}
          </code>
        </pre>
      </Card>
    </div>
  );
};