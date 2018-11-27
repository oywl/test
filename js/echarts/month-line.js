/**
 * Created by huangzh on 2018/10/19.
 */

//var datas =[70,88,99,95,80,400,130,150];
month_line_option = {
    backgroundColor: '#fff',
   /* title: {
        text: '',
        textStyle: {
            fontWeight: 'normal',
            fontSize: 12,
            color: '#F1F1F3'
        },
        left: '6%'
    },*/
  /*  tooltip: {
        trigger: 'axis',
        axisPointer: {
            lineStyle: {
                color: '#57617B'
            }
        }
    },*/
   /* legend: {
        icon: 'rect',
        itemWidth: 14,
        itemHeight: 5,
        itemGap: 13,
        data: ['党费'],
        right: '4%',
        textStyle: {
            fontSize: 12,
            color: '#F1F1F3'
        }
    },*/
    grid: {
        left: '1%',
        right: '2%',
        bottom: '8%',
        top:'14%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        boundaryGap: false,
        axisLine: {
            lineStyle: {
                color: '#999999'
            }
        },
        data: ['1', '2', '3', '4', '5', '6', '7', '8'],
        axisLabel:{
            interval:0,
            rotate:0,
            textStyle:{
                fontSize:12
            }
        },
    }],
    yAxis: [{
        //type: 'value',
        //interval: 40,
        //max:200,
       /* axisTick: {
            show: false
        },*/
        axisLine: {
            lineStyle: {
                color: '#999999'
            }
        },
        axisLabel: {
            textStyle: {
                fontSize: 12
            }
        },
        splitLine: {
            lineStyle: {
                color: '#e6e6e6'
            }
        }
    }],
    series: [{
        name: '党费',
        type: 'line',
        smooth: true,
        lineStyle: {
            normal: {
                width: 2
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(168, 124, 245, 0.5)'
                }, {
                    offset: 0.8,
                    color: 'rgba(168, 124, 245, 0)'
                }], false),
                shadowColor: '#A87CF5',
                shadowBlur: 10
            }
        },
        symbolSize:4,
        itemStyle: {
            normal: {
                color: '#A87CF5',
                borderColor:'#e48b4c'
            },
        },
        //data: datas,
        data:[70,88,99,95,80,400,130,150]


    } ]
};
