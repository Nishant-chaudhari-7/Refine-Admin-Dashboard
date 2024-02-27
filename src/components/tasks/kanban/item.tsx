import { DragOverlay, UseDraggableArguments, useDraggable } from '@dnd-kit/core'

interface Props {
  id: string;
  data?: UseDraggableArguments['data']
}

const KanbanItem = ({ children, id, data }: React.PropsWithChildren<Props>) => {
  const { attributes, listeners, setNodeRef, active } = useDraggable({ // item we want to drag 
    id,
    data,
  }) // attributes is an object whichis use to make item draggable  2 listeners object containing event handlers to apply to item 3 active - which item is currentlly been drag

  return (
    <div
      style={{ position: 'relative' }}
    >
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={{
          opacity: active ? (active.id === id ? 1 : 0.5) : 1,
          borderRadius: '8px',
          position: 'relative',
          cursor: 'grab'
        }}
      >
        {active?.id === id && (
          <DragOverlay zIndex={1000}>
            <div style={{
              borderRadius: '8px',
              boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
              cursor: 'grabbing',
            }}>
              {children}
            </div>
          </DragOverlay>
        )}
        {children}
      </div>
    </div>
  )
}

export default KanbanItem