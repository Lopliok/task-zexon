type MessageType = "success" | "error";

interface MessageProps {
  type: MessageType;
  children: React.ReactNode;
}

export default function Message({ type, children }: MessageProps) {
  return (
    <p className={`message message--${type}`} role="status">
      {children}
    </p>
  );
}
