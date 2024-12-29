import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextInput(
    { type = 'text', className = "", isFocused = false, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    // useImperativeHandle(ref, () => ({
    //     focus: () => localRef.current?.focus(),
    // }));

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                'rounded-md w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 ' +
                className
            }
            ref={input}
        />
    );
});
