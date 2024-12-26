import React from 'react';
import { Link } from 'react-router-dom';
import {
    Breadcrumb as ChakraBreadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface BreadcrumbProps {
    pathSegments: string[]; // Array of route segments
    separator?: React.ReactNode; // Optional custom separator
}

const PathNavigator: React.FC<BreadcrumbProps> = ({ pathSegments, separator = '/' }) => {
    // Regular expression to match UUIDs
    const isUuid = (segment: string) =>
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(segment);

    // Handle empty or undefined path segments
    if (!pathSegments || pathSegments.length === 0) return null;

    // Remove the first segment (typically an empty root path or "home") and filter out UUIDs
    const filteredSegments = pathSegments.slice(1).filter(segment => !isUuid(segment));

    // Capitalize each word in the segment
    const capitalizeSegment = (segment: string) => {
        return segment
            .split('-') // Split if there are hyphens
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '); // Rejoin the words with spaces
    };

    return (
        <ChakraBreadcrumb className="pb-5" separator={separator}>
            <BreadcrumbList>
                {filteredSegments.map((segment, index) => {
                    // Construct URL based on the filtered path segments
                    const url = `/${pathSegments.slice(0, index + 2).join('/')}`;

                    // Capitalize the segment for better readability
                    const displayName = capitalizeSegment(segment);

                    return (
                        <React.Fragment key={url}>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link to={url}>{displayName}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {index < filteredSegments.length - 1 && <BreadcrumbSeparator />}
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </ChakraBreadcrumb>
    );
};

export default PathNavigator;
