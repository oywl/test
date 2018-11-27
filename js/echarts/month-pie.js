/**
 * Created by huangzh on 2018/10/18.
 */
month_pie_option = {
    color: ['#40d738','#2235d4'],
    tooltip: {
        show: false
    },
    series: [{
        name: '任务进度',
        type: 'pie',
        radius: ['90%','80%'],
        label: {
            normal: {
                position: 'center'
            }
        },
        hoverAnimation: false,
        data: [{
            value: 80,
            name: '任务进度',
            itemStyle:{
                normal:{
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: '#CB1277' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#4B00E1' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    }

                }
            },
            label: {
                normal: {
                    formatter: '{d}%',
                    textStyle: {
                        color:'#4B00E1',
                        fontSize: 20,
                        fontWeight:'bold'
                    }
                }
            },
        }, {
            value:20,
            name: '占位',
            label: {
                normal: {
                    formatter: '\n'+'任务进度',
                    textStyle: {
                        color: '#666666',
                        fontSize: 14
                    }
                }
            },
            itemStyle:{
                normal:{
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: '#e6e6e6' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#e6e6e6' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    }
                }
            },
        }]
    }]
};


