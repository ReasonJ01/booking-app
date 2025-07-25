import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookingFlow } from './actions';

// Query key for booking flow data
export const bookingFlowQueryKey = ['bookingFlow'] as const;

// Hook to fetch booking flow data
export function useBookingFlow() {
    return useQuery({
        queryKey: bookingFlowQueryKey,
        queryFn: getBookingFlow,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes (garbage collection time)
    });
}

// Hook to prefetch booking flow data
export function usePrefetchBookingFlow() {
    const queryClient = useQueryClient();

    return () => {
        queryClient.prefetchQuery({
            queryKey: bookingFlowQueryKey,
            queryFn: getBookingFlow,
            staleTime: 5 * 60 * 1000,
        });
    };
}

// Hook to invalidate booking flow cache
export function useInvalidateBookingFlow() {
    const queryClient = useQueryClient();

    return () => {
        queryClient.invalidateQueries({ queryKey: bookingFlowQueryKey });
    };
} 