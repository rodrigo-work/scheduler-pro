import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '@repo/design-system/components/ui/alert-dialog'
import { Button } from '@repo/design-system/components/ui/button'
import { cn } from '@repo/ui/lib/utils'
import { Loader2Icon } from 'lucide-react'

interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: React.ReactNode
  disabled?: boolean
  desc: React.JSX.Element | string
  cancelBtnText?: string
  confirmText?: React.ReactNode
  destructive?: boolean
  handleConfirm: () => void
  isLoading?: boolean
  className?: string
  children?: React.ReactNode
}

export function ConfirmDialog(props: ConfirmDialogProps) {
  const {
    title,
    desc,
    children,
    className,
    confirmText,
    cancelBtnText,
    destructive,
    isLoading,
    disabled = false,
    handleConfirm,
    ...actions
  } = props
  return (
    <AlertDialog {...actions}>
      <AlertDialogContent className={cn(className && className)}>
        <AlertDialogHeader className="text-left">
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div>{desc}</div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        {children}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>
            {cancelBtnText ?? 'Cancel'}
          </AlertDialogCancel>
          <Button
            variant={destructive ? 'destructive' : 'default'}
            onClick={handleConfirm}
            disabled={disabled || isLoading}
          >
            {isLoading && <Loader2Icon className="animate-spin" />}
            {confirmText ?? 'Continue'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
