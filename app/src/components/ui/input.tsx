import * as React from 'react'


export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}


export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
const cls = ['flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:border-gray-700 dark:focus-visible:ring-white', className]
.filter(Boolean)
.join(' ')
return <input ref={ref} className={cls} {...props} />
})
Input.displayName = 'Input'
