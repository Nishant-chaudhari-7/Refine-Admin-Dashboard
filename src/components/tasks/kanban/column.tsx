import { Text } from '@/components/text'
import { PlusOutlined } from '@ant-design/icons'
import { UseDroppableArguments, useDroppable } from '@dnd-kit/core'
import { Badge, Button, Space } from 'antd'

type Props = {
  id: string,
  title: string,
  description?: React.ReactNode,
  count: number,
  data?: UseDroppableArguments['data'],
  onAddClick?: (args: { id: string }) => void,
}

const KanbanColumn = ({
  children,
  id,
  title,
  description,
  count,
  data,
  onAddClick
}: React.PropsWithChildren<Props>) => {
  const { isOver, setNodeRef, active } = useDroppable({ id, data })

  const onAddClickHandler = () => {
    onAddClick?.({ id })
  }

  return (
    <div
      ref={setNodeRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '0 16px'
      }}
    >
      <div style={{ padding: '12px' }}>
        <Space style={{ width: '100%', justifyContent: 'space-between'}}>
          <Space>
            <Text // for heading and total count
              ellipsis={{ tooltip: title}}
              size="xs"
              strong
              style={{ 
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              {title}
            </Text>
            {!!count && <Badge count={count} color="cyan" />}
          </Space>
          <Button // for (+) sign on click
            shape="circle"
            icon={<PlusOutlined />}
            onClick={onAddClickHandler}
          />
        </Space>
        {description}
      </div>
      <div
        style={{ // for coloumn
          flex: 1,
          overflowY: active ? 'unset' : 'auto', // PROBLEM INSTEAD OF SCROLL WE USE AUTO TO REOMVE THE LINE IN BETWEEN COLOUMN 
          border: '2px dashed transparent',
          borderColor: isOver ? '#000040' : 'transparent', // if else 
          borderRadius: '4px'
        }}
      >
        <div
          style={{
            marginTop: "12px",
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default KanbanColumn