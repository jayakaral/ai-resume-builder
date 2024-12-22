import React from 'react'

const useReloadWarning = (condition = true) => {
    React.useEffect(() => {
        if (!condition) return

        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault()
        }

        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [condition])
}

export default useReloadWarning
