import {
  FileX,
  MessageSquare,
  BarChart3,
  User,
  Sparkles,
} from "lucide-react";

interface EmptyStateProps {
  title: string;
  message?: string;
  icon?: React.ReactNode;
  type?: "echos" | "feedback" | "summary" | "profile" | "general";
  className?: string;
}

export function EmptyState({
  title,
  message,
  icon,
  type = "general",
  className = "",
}: EmptyStateProps) {
  const getTypeIcon = () => {
    switch (type) {
      case "echos":
        return <FileX className="w-12 h-12" />;
      case "feedback":
        return <MessageSquare className="w-12 h-12" />;
      case "summary":
        return <BarChart3 className="w-12 h-12" />;
      case "profile":
        return <User className="w-12 h-12" />;
      default:
        return <Sparkles className="w-12 h-12" />;
    }
  };

  const getGradientColors = () => {
    switch (type) {
      case "echos":
        return "from-blue-500/20 to-purple-500/20";
      case "feedback":
        return "from-green-500/20 to-emerald-500/20";
      case "summary":
        return "from-orange-500/20 to-red-500/20";
      case "profile":
        return "from-pink-500/20 to-rose-500/20";
      default:
        return "from-primary/20 to-accent/20";
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center text-center py-8 px-6 ${className}`}
    >
      {/* Icon with gradient background */}
      <div className="relative mb-2">
        <div
          className={`w-40 h-14 rounded-2xl bg-gradient-to-br ${getGradientColors()} flex items-center justify-center backdrop-blur-sm border border-white/10 shadow-lg`}
        >
          <div className="text-foreground/70">{icon || getTypeIcon()}</div>
        </div>
        {/* Subtle glow effect */}
        <div
          className={`absolute inset-0 w-24 h-24 rounded-2xl bg-gradient-to-br ${getGradientColors()} blur-xl opacity-30 -z-10`}
        ></div>
      </div>

      {/* Content */}
      <div className="space-y-1 mb-2">
        <h3 className="text-xl font-semibold text-foreground tracking-tight">
          {title}
        </h3>
        <p className="text-muted-foreground max-w-md leading-relaxed text-sm">
          {message}
        </p>
      </div>
    </div>
  );
}
