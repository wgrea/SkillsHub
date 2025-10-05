// src/components/ui/empty-state.tsx
import { FolderOpen } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export function EmptyState({ 
  title, 
  description, 
  icon = <FolderOpen className="h-12 w-12 text-muted-foreground/60" /> 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-sm">
          {description}
        </p>
      </div>
    </div>
  );
}