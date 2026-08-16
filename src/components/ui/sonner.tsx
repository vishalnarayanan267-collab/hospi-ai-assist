import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            "!rounded-2xl !border !border-border !bg-card !text-card-foreground !shadow-lifted",
          description: "!text-muted-foreground",
        },
      }}
    />
  );
}
