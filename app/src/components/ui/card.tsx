import * as React from 'react'


export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
<div className={["rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-neutral-900", className].filter(Boolean).join(' ')} {...props} />
)
export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
<div className={["mb-4", className].filter(Boolean).join(' ')} {...props} />
)
export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, ...props }) => (
<h3 className={["text-xl font-semibold", className].filter(Boolean).join(' ')} {...props} />
)
export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
