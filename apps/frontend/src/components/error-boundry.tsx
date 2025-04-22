'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function ErrorBoundary({
    error,
    reset,
}: {
    error: Error
    reset: () => void
}) {
    useEffect(() => {
        console.error('Error:', error)
    }, [error])

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-bold">Something went wrong!</h2>
                <p className="mt-2 text-gray-600">
                    {error.message || 'An unexpected error occurred'}
                </p>
                <Button
                    onClick={reset}
                    className="mt-4"
                >
                    Try again
                </Button>
            </div>
        </div>
    )
}