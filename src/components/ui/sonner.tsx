import { useTheme } from "@/components/theme-provider"
import { Toaster as Sonner } from "sonner"
import { CheckCircle2, Info, AlertTriangle, XCircle, Loader2 } from "lucide-react"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      closeButton
      richColors
      position="bottom-right"
      icons={{
        success: <CheckCircle2 className="size-5 text-emerald-500" />,
        info: <Info className="size-5 text-blue-500" />,
        warning: <AlertTriangle className="size-5 text-amber-500" />,
        error: <XCircle className="size-5 text-red-500" />,
        loading: <Loader2 className="size-5 animate-spin text-blue-500" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground font-medium",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          closeButton:
            "group-[.toast]:bg-background group-[.toast]:text-foreground group-[.toast]:border-border hover:group-[.toast]:bg-muted",
          success:
            "group-[.toast]:bg-emerald-50 dark:group-[.toast]:bg-emerald-950/30 group-[.toast]:border-emerald-200 dark:group-[.toast]:border-emerald-900",
          error:
            "group-[.toast]:bg-red-50 dark:group-[.toast]:bg-red-950/30 group-[.toast]:border-red-200 dark:group-[.toast]:border-red-900",
          warning:
            "group-[.toast]:bg-amber-50 dark:group-[.toast]:bg-amber-950/30 group-[.toast]:border-amber-200 dark:group-[.toast]:border-amber-900",
          info:
            "group-[.toast]:bg-blue-50 dark:group-[.toast]:bg-blue-950/30 group-[.toast]:border-blue-200 dark:group-[.toast]:border-blue-900",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
