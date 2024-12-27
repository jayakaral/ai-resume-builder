import { cn } from '@/lib/utils';
import { GripVertical, Trash } from 'lucide-react';
import React, { ReactNode } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type SortableItemMainProps = {
    id: string;
    index: number;
    remove: (index?: number | number[] | undefined) => void;
    isExpanded: boolean;
    setExpandedIndex: (index: number | null) => void;
    children: ReactNode;
    preview: ReactNode;
};

const SortableItemMain = ({
    id,
    index,
    remove,
    isExpanded,
    setExpandedIndex,
    children,
    preview,
}: SortableItemMainProps) => {
    const formRef = React.useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = React.useState(false);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const handleToggle = () => {
        setExpandedIndex(isExpanded ? null : index);
    };

    React.useEffect(() => {
        if (formRef.current) {
            formRef.current.style.maxHeight = isExpanded
                ? `${formRef.current.scrollHeight}px`
                : '0px';
        }
    }, [isExpanded]);

    return (
        <div
            style={style}
            ref={setNodeRef}
            {...attributes}
            className={cn(
                'rounded-md border bg-background shadow-sm py-3 select-none',
                isDragging && 'relative z-50 cursor-grab shadow-xl max-h-20 overflow-hidden',
            )}
        >
            <div className="flex gap-3 relative min-h-10">
                <div
                    className={cn(
                        'absolute right-[100%] top-1/2 -translate-y-1/2 mr-1 opacity-0 transition-opacity',
                        isHovered && 'opacity-100',
                    )}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    {...listeners}
                >
                    <GripVertical className="size-5 cursor-grab text-muted-foreground focus:outline-none" />
                </div>

                <div
                    className={cn('cursor-pointer grow px-3 hover:text-indigo-600')}
                    onClick={handleToggle}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {preview}
                </div>

                <div
                    className={cn(
                        'absolute left-[100%] top-1/2 -translate-y-1/2 ml-2 opacity-0 transition-opacity',
                        isHovered && 'opacity-100',
                    )}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <button type="button" onClick={() => remove(index)}>
                        <Trash size={18} />
                    </button>
                </div>
            </div>

            <div
                className={cn(
                    'space-y-3 px-3 pb-1 overflow-hidden transition-all duration-300 max-h-0',
                    isExpanded && 'mt-3',
                )}
                ref={formRef}
            >
                {children}
            </div>
        </div>
    );
};

export default SortableItemMain;
