import * as React from 'react'


export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ className, ...props }) => (
<label className={["text-sm font-medium leading-none", className].filter(Boolean).join(' ')} {...props} />
)
