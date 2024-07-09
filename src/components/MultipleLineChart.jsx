import React from 'react';
import {Box, Typography} from "@mui/material";
import {ResponsiveLine} from "@nivo/line";
import {useTheme} from "@mui/material";
import {tokens} from "../theme";

const MultipleLineChart = ({isCustomLineColors = false, isDashboard = false, data}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const tickValues = 'every 4 days';
    return (
        <ResponsiveLine
            enablePoints={false}
            data={[
                { id: "Soil Temperature", data: data[0] },
                { id: "Soil Humidity", data: data[1] }
            ]}
            theme={{
                axis: {
                    domain: {
                        line: {
                            stroke: colors.grey[100],
                        },
                    },
                    legend: {
                        text: {
                            fill: colors.grey[100],
                        },
                    },
                    ticks: {
                        line: {
                            stroke: colors.grey[100],
                            strokeWidth: 1,
                        },
                        text: {
                            fill: colors.grey[100],
                        },
                    },
                },
                legends: {
                    text: {
                        fill: colors.grey[100],
                    },
                },
                tooltip: {
                    container: {
                        color: colors.primary[500],
                    },
                },
            }}
            colors={isDashboard ? { datum: 'color' } : { scheme: 'nivo' }}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{
                type: 'time',
                format: '%Y-%m-%dT%H:%M:%S',
                precision: 'hour',
            }}
            yScale={{
                type: 'linear',
                min: '0',
                max: '115',
                stacked: true,
                reverse: false,
            }}
            xFormat="time:%Y-%m-%d %H:%M:%S"
            axisTop={null}
            axisRight={null}

            axisBottom={{
                orient: 'bottom',
                tickSize: 10,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? undefined : 'Thời gian thực',
                legendOffset: 45,
                legendPosition: 'middle',
                format: '%d-%m-%Y %H:%M',
                // tickValues: 'every day'
                tickValues, // Hiển thị tick mỗi 3 ngày
            }}
            axisLeft={{
                orient: 'left',
                tickValues: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115],
                tickSize: 5, // Kích thước tick
                tickPadding: 5, // Khoảng cách giữa các tick
                tickRotation: 0, // Xoay các tick 0 độ
                legend: isDashboard ? undefined : 'Giá trị',
                legendOffset: -50,
                legendPosition: 'middle',
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={8}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 80,
                    translateY: -20,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1,
                            },
                        },
                    ],
                },
            ]}
        />
    );
};

export default MultipleLineChart;
