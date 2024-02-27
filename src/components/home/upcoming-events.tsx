import { CalendarOutlined } from '@ant-design/icons'
import { Badge, Card, List } from 'antd'
import { Text } from '../text'
import UpcomingEventsSkeleton from '../skeleton/upcoming-events';
import { getDate } from '@/utilities/helpers';
import { useList } from '@refinedev/core';
import { DASHBORAD_CALENDAR_UPCOMING_EVENTS_QUERY } from '@/graphql/queries';
import dayjs from 'dayjs';

const UpcomingEvents = () => {
  const { data, isLoading } = useList({ // fetching the data from resources  ,, USELIST = is a hook in refine that allows us to fetch the data from the api
    resource:  'events',
    pagination: { pageSize: 5},
    sorters: [
      {
        field: 'startDate',
        order: 'asc'
      }
    ],
    filters: [
      {
        field: 'startDate',
        operator: 'gte',
        value: dayjs().format('YYYY-MM-DD') // dayjs library
      }
    ],
    meta: {
      gqlQuery: DASHBORAD_CALENDAR_UPCOMING_EVENTS_QUERY
    }
  });

  return (
    <Card 
      style={{ height: '100%'}} 
      headStyle={{padding: '8px 16px' }} 
      bodyStyle={{ padding: '0 1rem' }}
      title={
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}> 
          <CalendarOutlined />
          
          <Text size="sm" style={{ marginLeft: "0.7rem" }}>
            Upcoming Events
          </Text>
        </div>
      }
    >
      {isLoading ? (
        <List // 5 because there are 5 loading lines
          itemLayout="horizontal"
          dataSource={Array.from({ length: 5 }).map((_, index) => ({
            id: index,
          }))}
          renderItem={() => <UpcomingEventsSkeleton />}
        />
      ) : (
        <List // actually we are going to fetch data
          itemLayout='horizontal'
          dataSource={data?.data || []} 
          renderItem={(item) => {
            const renderDate = getDate(item.startDate, item.endDate)

            return ( // list is render from ant design
              <List.Item> 
                <List.Item.Meta 
                  avatar={<Badge color={item.color} />}
                  title={<Text size="xs">{renderDate}</Text>}
                  description={<Text ellipsis={{ tooltip: true }} strong>
                    {item.title}
                  </Text>} // ellipsis is the three dots when text is too long strong use for bold
                />  
                
              </List.Item>
            )
          }}
        />
      )}
              
        {!isLoading && data?.data.length === 0 && ( // data is shwoing not loading
            <span
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '220px'
              }}
            >
              No upcoming events
            </span>
          )}
    </Card>
  )
}

export default UpcomingEvents