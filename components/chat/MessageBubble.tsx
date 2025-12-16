import { cn } from "@/lib/utils";

type Props = {
  message: string;
  isOwnMessage: boolean;
  senderName?: string;
};

export function MessageBubble({ message, isOwnMessage, senderName }: Props) {
  return (
    <div
      className={cn(
        "flex w-full",
        isOwnMessage ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[70%] rounded-xl px-4 py-2 text-sm",
          isOwnMessage ? "bg-primary text-primary-foreground" : "bg-muted"
        )}
      >
        {!isOwnMessage && (
          <p className="text-xs font-semibold mb-1">{senderName}</p>
        )}
        <p>{message}</p>
      </div>
    </div>
  );
}
