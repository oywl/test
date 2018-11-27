/**
 * Created by huangzh on 2018/11/7.
 */
var anDays = (function(){
    var d = new Date;
    var result = [];
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    month = month<10 ? "0" + month : month;
    var day = d.getDate();

    for(var i=0;i<day;i++){
        var day1 = d.getDate();
        day1 = day1<10? "0"+day1 : day1;
        d.setDate(d.getDate()-1);
        result.push(year+"-"+month+"-"+day1);
    }


    function liop(obj){
        var text = obj.innerHTML;
        topbar.show();
        anDays.load(text,1);

    }




    return{
        daysLi : function(){
            for(var i=0;i<result.length;i++){
                var node = document.createTextNode(result[i]);
                var li = document.createElement('li');
                var a = document.createElement('a');
                a.href = "javascript:void(0)";
                a.appendChild(node);
                a.onclick = function(){
                    return liop(this);
                }
                li.appendChild(a);
                $("#anM").append(li);
            }
        },
        dayPie_echarts : function(){
            var div_gauge = echarts.init(document.getElementById('day_pie'));
            div_gauge.setOption(day_pie_option);
        },
        createTable : function(table){
            $("#tby").empty();
            for(var i=0;i<table.length;i++){
                var p = table[i].Paid;
                p = p>0? p + "万" : p;
                var tr = "<tr><td>"+table[i].Area+"</td>"+
                    "<td>"+table[i].Count1+"</td>"+
                    "<td>"+p+"</td><tr>";
                $("#tby").append(tr);
            }
        },
        createTable : function(table){
            $("#tby").empty();
            for(var i=0;i<table.length;i++){
                var p = table[i].Paid;
                p = p>0? p + "万" : p;
                var tr = "<tr><td>"+table[i].Area+"</td>"+
                    "<td>"+table[i].Count1+"</td>"+
                    "<td>"+p+"</td><tr>";
                $("#tby").append(tr);
            }
        },
        createDep : function(department){
            for(var i=0;i<department.length;i++){
                var Present = department[i].Present;
                Present = (Present * 100).toFixed();
                if(Present<0){
                    $("#dp_"+i+" span").removeClass("glyphicon-arrow-up").addClass("glyphicon-arrow-down");
                }else{
                    $("#dp_"+i+" span").removeClass("glyphicon-arrow-down").addClass("glyphicon-arrow-up");
                }
                $("#dep_"+i).find('p').eq(0).text(department[i].Area);
                $("#dep_"+i).find('p').eq(1).text(department[i].Paid+ "万");
                $("#dp_"+i).find('p').text(Present+"%");
            }
        },
        load : function(data,status){
            var url = API+"GetCollectDayPaidData";
            $.ajax({
                type:"get",
                url:url,
                data: {'date':data},
                dataType:'json',
                success:function(json){
                    if(json.state!=200){
                        alert("服务器错误，请稍后！");
                        return;
                    }

                    if(status==0){ //下拉和页面数据只加载一次 0是由主页面进入，1是下拉框
                        $("#div1").html(dayData);//加载html页面
                        anDays.daysLi();//下拉框
                    }else if(status==1){
                        topbar.hide();
                    }

                    var riqi = json.data.Day;
                    $("#anYbut").html(riqi+" &nbsp;&nbsp;&nbsp; <span class='caret'></span>");
                    /*饼图数据*/
                    var pieJson = json.data.listTotalData;
                    var title = [];
                    var data = [];
                    for(var i=0;i<pieJson.length;i++){
                        var p = (pieJson[i].Present * 100).toFixed(2);
                        title.push(pieJson[i].Type);
                        data.push({"value":p,"name":pieJson[i].Type});
                    }
                    day_pie_option.legend.data = title;
                    day_pie_option.series[0].data = data ;
                    /*------------------------------------------------*/

                    /*table*/
                    var tableList = json.data.listDepartmentPaidData;
                    /*-------------------------------------------------*/

                    /*部门表*/
                    var department = json.data.listPresentPaidData;
                    /*-------------------------------------------------*/

                    anDays.dayPie_echarts();
                    anDays.createTable(tableList);
                    anDays.createDep(department);//部门图

                },
                error:function(){
                    alert("获取当天数据失败，请稍后重试");
                }
            })

        }



    }
})();
