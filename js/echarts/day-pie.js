/**
 * Created by huangzh on 2018/11/7.
 */
day_pie_option = {
    color:['#4AEAB0', '#FF8352', '#E271DE', '#F8456B', '#2C6CF0'],
    legend: {
        orient: 'vertical',
        right: 0,
        bottom:'20',
        data: ['物业部','项目部','工商部','汇瀚','房友圈']
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series : [
        {
            name: '业绩占比',
            type: 'pie',
            radius : '85%',
            center: ['30%', '50%'],
            data:[
                {value:20, name:'物业部'},
                {value:20, name:'项目部'},
                {value:20, name:'工商部'},
                {value:20, name:'汇瀚'},
                {value:20, name:'房友圈'}
            ],
            label:{
                show:false,
            },
            itemStyle: {
                shadowBlur: 0,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'

            }
        }
    ]
};
