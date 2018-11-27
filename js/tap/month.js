/**
 * Created by huangzh on 2018/10/17.
 */

var anMonth = (function(){
    var d = new Date;
    var result = [];
    var month = d.getMonth()+1;
    var nowmonth =(month<10 ? "0"+month:month);
    var year=d.getFullYear();
    var day = d.getDate();
    var nowday = (day<10?"0"+day:day);
    //用来获取“按月”的数据
    var loadData = (year.toString()+"-"+nowmonth.toString()+"-"+"01");
    //显示在select
    var selData = (year.toString()+"-"+nowmonth.toString());

    var firstData = year+"-"+nowmonth+"-"+nowday;

    for(var i=0;i<12;i++){
        d.setMonth(d.getMonth());
        var m = d.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        result.push(d.getFullYear() + "-" + m);
        d.setMonth(d.getMonth()-1);
    }

    function text(obj){
        var text = obj.innerHTML;
        text = text+"-01";
        topbar.show();
        anMonth.load(text,1);
    }


    return{
        anMonthLi : function(){//日期选项
           // $("#anYbut").html(selData+" &nbsp;&nbsp;&nbsp; <span class='caret'></span>");
            for(var i=0;i<result.length;i++){
                var node = document.createTextNode(result[i]);
                var li = document.createElement('li');
                var a = document.createElement('a');
                a.href = "javascript:void(0)";
                a.appendChild(node);
                a.onclick = function(){
                    return text(this)
                }
                li.appendChild(a);
                $("#anM").append(li);
            }
        },
        monthPie_echarts : function(){//生成饼图
            var div_gauge = echarts.init(document.getElementById('mon_pie'));
            div_gauge.setOption(month_pie_option);
        },
        monthPie_text : function(){ //饼图旁边的文字
            var text ='<p>保本点:%(BaoBenDian)?</p>'+
                       '<p>历史最高:%(TopPaid)?</p>'+
                        '<p>总收入:%(PresentPaid)?</p>'+
                        '<p>总人数:%(PersonCou)?</p>';
            return text;
        },
        monthLine_echarts : function(){//折线图
            var div_gauge = echarts.init(document.getElementById('mon_line'));
            div_gauge.setOption(month_line_option);
        },
        createTable : function(table){
            $("#tby").empty();
           for(var i=0;i<table.length;i++){
               var p = parseFloat(table[i].Paid);
               p = p>0? p.toLocaleString() + "万" : p;
               var tr = "<tr><td>"+table[i].Area+"</td>"+
                        "<td>"+parseFloat(table[i].Count1).toLocaleString()+"</td>"+
                       "<td>"+p+"</td><tr>";
               $("#tby").append(tr);
           }
        },
        createDep : function(department){
            for(var i=0;i<department.length;i++){
                var Present = department[i].Present;
                Present = (Present * 100).toFixed();
             /*   if(Present<0){
                    $("#dp_"+i+" span").removeClass("glyphicon-arrow-up").addClass("glyphicon-arrow-down");
                }else{
                    $("#dp_"+i+" span").removeClass("glyphicon-arrow-down").addClass("glyphicon-arrow-up");
                }*/
                $("#dep_"+i).find('p').eq(0).text(department[i].Area);
                $("#dep_"+i).find('p').eq(1).text(parseFloat(department[i].Paid).toLocaleString()+ "万");
                $("#dp_"+i).find('p').text(Present+"%");
            }
        },
        load : function(data,status){
            var url = API+"GetCollectMonthPaidData";
            $.ajax({
                type:'get',
                url: url,
                data: {'date':data},
                dataType:'json',
                success: function(json){
                   if(json.state!=200){
                       alert("服务器错误，请稍后！");
                       return;
                   }
                    /*列表&环形图的数据 */
                    var listJson = json.data.paidData;
                    var BaoBenDian = parseFloat(listJson.BaoBenDian).toLocaleString()+"万";//listJson.BaoBenDian+"万";
                    var TopPaid = parseFloat(listJson.TopPaid).toLocaleString()+"万";
                    var PresentPaid = parseFloat(listJson.PresentPaid).toLocaleString()+"万";
                    var PersonCou = parseFloat(listJson.PersonCou).toLocaleString();
                    var Proportion = ((listJson.Proportion)*100).toFixed(2);
                    var MuBiao = listJson.MuBiao;
                    var Month = listJson.Month;
                    var t = (Proportion>100)?100:Proportion;
                    month_pie_option.series[0].data[0].value = t;
                    month_pie_option.series[0].data[1].value = 100-t;
                    month_pie_option.series[0].data[1].label.normal.formatter = "\n"+PresentPaid;/*'\n'+MuBiao+"万"*/;
                    month_pie_option.series[0].data[0].label.normal.formatter = Proportion+"%";
                    /*--------------------------------------------------------------------*/

                    /*折线图数据*/
                    var listLine = json.data.listDayPaidData;
                    var lineMonth = [];
                    var lineData = [];
                    for(var i=0;i<listLine.length;i++){
                        lineMonth.push(listLine[i].RIQI);
                        lineData.push(listLine[i].Paid);
                    }
                    month_line_option.xAxis[0].data = lineMonth;
                    month_line_option.series[0].data = lineData;
                    /*--------------------------------------------------------------------*/

                    /*部门数据*/
                    var department = json.data.listPresentPaidData;
                    /*---------------------------------------------------------------------*/

                    /*table*/
                    var table = json.data.listDepartmentPaidData;
                    /*---------------------------------------------------------------------*/

                    if(status==0){ //下拉和页面数据只加载一次 0是由主页面进入，1是下拉框
                        $("#div1").html(monthData);//加载html页面
                        anMonth.anMonthLi();//下拉框
                    }else if(status==1){
                        topbar.hide();
                    }
                    $("#anYbut").html(Month+" &nbsp;&nbsp;&nbsp; <span class='caret'></span>");
                    var listText = anMonth.monthPie_text();
                    listText = String.format(listText,{"BaoBenDian":BaoBenDian,"TopPaid":TopPaid,"PresentPaid":PresentPaid,"PersonCou":PersonCou});
                    $("#mon_pie_text").html(listText);
                    anMonth.monthPie_echarts();//环形图
                    anMonth.monthLine_echarts();//折线图
                    anMonth.createDep(department);//部门图
                    anMonth.createTable(table);//table
                },
                error:function(){
                    alert("获取月数据失败，请稍后重试");
                }
            });

        }





    }


})();
