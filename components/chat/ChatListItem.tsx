import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Props = {
  name: string;
  lastMessage: string;
  active?: boolean;
  onClick: () => void;
};

export function ChatListItem({ name, lastMessage, active, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 p-3 cursor-pointer rounded-md",
        active ? "bg-muted" : "hover:bg-muted/50"
      )}
    >
      <Avatar>
        <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>

      <div className="flex-1 overflow-hidden">
        <p className="font-medium truncate">{name}</p>
        <p className="text-sm text-muted-foreground truncate">{lastMessage}</p>
      </div>
    </div>
  );
}
