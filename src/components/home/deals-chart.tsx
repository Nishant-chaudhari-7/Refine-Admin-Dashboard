import { DollarOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import React from 'react'
import { Text } from '../text'
import { Area, AreaConfig } from '@ant-design/plots'
import { useList } from '@refinedev/core'
import { DASHBOARD_DEALS_CHART_QUERY } from '@/graphql/queries'
import { mapDealsData } from '@/utilities/helpers'
import { GetFieldsFromList } from '@refinedev/nestjs-query'
import { DashboardDealsChartQuery } from '@/graphql/types'

const DealsChart = () => {
  const { data } = useList<GetFieldsFromList<DashboardDealsChartQuery>>({ // get data from graphql
    resource: 'dealStages',
    filters: [
      {
        field: 'title', operator: 'in', value: ['WON', 'LOST']
      }
    ],
    meta: {
      gqlQuery: DASHBOARD_DEALS_CHART_QUERY
    }
  });

  const dealData = React.useMemo(() => { // it filter out the charts (mapdeals ),, Use memo is use for not re calculate the data
    return mapDealsData(data?.data);
  }, [data?.data])

  const config: AreaConfig = {
    data: dealData,
    xField: 'timeText',
    yField: 'value',
    isStack: false, // to not stack the data on one another
    seriesField: 'state', // for lost and won in graph
    animation: true,
    startOnZero: false, // ensured that y axis start from 0
    smooth: true,
    legend: {
      offsetY: -6
    },
    yAxis: {
      tickCount: 4, // horizontal lines 
      label: {
        formatter: (v: string) => {
          return `$${Number(v) /1000}k`
        }
      }
    },
    tooltip: {
      formatter: (data) => {
        return {
          name: data.state,
          value: `$${Number(data.value) / 1000}k` // it shows grapgh information when we are on grapgh
        }
      }
    },
  }

  return (
    <Card
      style={{ height: '100%' }}
      headStyle={{ padding: '8px 16px' }}
      bodyStyle={{ padding: '24px 24px 0 24px'}}
      title={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <DollarOutlined />
          <Text size="sm" style={{ marginLeft: '0.5rem'}}>
            Deals
          </Text>
        </div>
      }
    >
      <Area {...config} height={325}  />
    </Card>
  )
}

export default DealsChart