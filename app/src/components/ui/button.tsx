import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'


const buttonVariants = cva(
'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2',
{
variants: {
variant: {
default: 'bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90',
outline: 'border border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800'
},
size: { default: 'h-10 px-4 py-2', sm: 'h-8 px-3', lg: 'h-12 px-6' }
},
defaultVariants: { variant: 'default', size: 'default' }
}
)


export interface ButtonProps
extends React.ButtonHTMLAttributes<HTMLButtonElement>,
VariantProps<typeof buttonVariants> { asChild?: boolean }


export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
({ className, variant, size, asChild = false, ...props }, ref) => {
const Comp = asChild ? Slot : 'button'
const cls = [buttonVariants({ variant, size }), className].filter(Boolean).join(' ')
return <Comp className={cls} ref={ref} {...props} />
}
)
Button.displayName = 'Button'
