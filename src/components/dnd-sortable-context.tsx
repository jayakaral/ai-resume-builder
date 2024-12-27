import React, { ReactNode } from 'react';
import {
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    SortableContext,
    sortableKeyboardCoordinates,
    SortingStrategy,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

type DndSortableContextProps = React.ComponentProps<typeof DndContext> & React.ComponentProps<typeof SortableContext>

const DndSortableContext: React.FC<DndSortableContextProps> = ({
    items,
    strategy = verticalListSortingStrategy,
    children,
    ...props
}) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    return (
        <DndContext sensors={sensors} {...props}>
            <SortableContext items={items} strategy={strategy}>
                {children}
            </SortableContext>
        </DndContext>
    );
};

export default DndSortableContext;
