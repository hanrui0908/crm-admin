var get_sub_lore_index = function() {//科目
    var param = "{}";
    var optionHtml = "";
    var url = "http://193.168.0.170:15000/yc-crm/sub/search/" + param;
    var msg = dataM(url);
    if(msg!=""){
	    var optionDom = msg.result.result;
	    for(var i =0;i<optionDom.length;i++){
			optionHtml +="<option value='"+optionDom[i].id+"'>"+optionDom[i].name+"</option>"
		}
    }
    return optionHtml;
}
function get_sub() {//科目
    var optionHtml = "";
    var url = "http://193.168.0.170:15000/yc-crm/sub/search";
    var obj={};
    obj.param='{}';
    var msg = dataM(url,obj);
    if(msg!=""){
        var optionDom = msg.result.result;
        console.log(optionDom[0]);
        for(var i =0;i<optionDom.length;i++){
            optionHtml +="<option value='"+optionDom[i].id+"'>"+optionDom[i].name+"</option>"
        }

    }
    console.log(optionHtml);
    return optionHtml;
}

var get_year_lore_index = function(){//年份
	var param = "{}";
    var optionHtml = "";
    var url = "http://192.168.0.170:15000/yc-crm/year/search/" + param;
    var msg = dataM(url);
    if(msg!=""){
    	var optionDom = msg.result.result;
	    for(var i =0;i<optionDom.length;i++){
			optionHtml +="<option value='"+optionDom[i].create_time+"'>"+optionDom[i].create_time+"</option>"
		}
    }
    return optionHtml;
}

function get_year() {//科目
    var optionHtml = "";
    var url = "http://192.168.0.170:15000/yc-crm/year/search";
    var obj={};
    obj.param='{}';
    var msg = dataM(url,obj);
    if(msg!=""){
        var optionDom = msg.result.result;
        for(var i =0;i<optionDom.length;i++){
            optionHtml +="<option value='"+optionDom[i].id+"'>"+optionDom[i].create_time.substring(0,4)+"</option>"
        }
    }
    return optionHtml;
}

var alerts = function(msg){
	var html ="<div class='modal fade alerts' tabindex='-1' role='dialog' aria-labelledby='myModalLabel'>"+
"		  <div class='modal-dialog modal-sm' role='document'>"+
"		    <div class='modal-content'>"+
"		      <div class='modal-header'>"+
"		        <button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"+
"		        <h4 class='modal-title' id='myModalLabel'>提示</h4>"+
"		      </div>"+
"		      <div class='modal-body'>"+
				msg+
"		      </div>"+
"		      <div class='modal-footer'>"+
"		        <button type='button' class='btn btn-default' data-dismiss='modal'>确定</button>"+
"		      </div>"+
"		    </div>"+
"		  </div>"+
"		</div>";
	var alert_dom = $("body").find(".alerts");
	$("body").find(".alerts").remove();
	$("body").append(html);
	$("body").find(".alerts").modal('toggle');
}
var dataM = function(url){
	var html = "";
	$.ajax({
        url: url,
        type: "post",
		cache:false,
		async:false,
        dataType: "json",
        success: function (msg) {
            if (msg.status == 0) {
            	html = msg;
            }
        }
    });
    return html;
}

var dataM = function(url,paging){//分页
	var html = "";
	$.ajax({
        url: url,
        type: "post",
		cache:false,
		async:false,
		data:paging,
        dataType: "json",
        success: function (msg) {
            if (msg.status == 0) {
                html = msg;
            }
        }
    });
    return html;
}


function GetQueryString(name)//获得地址栏参数
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

function item_add_submit() {
    var currentParnet = ue.container.parentNode.parentNode;
    var currentContent = ue.getContent();
    ue.reset();
    $(currentParnet).html(currentContent);
    // var sub = $("#subjectName").find("option:selected").val();
    var sub = $("#subjectName").combobox('getValue');
    var item_from = $('#subjectForm').val();
    var year = $('#year').find("option:selected").text();
    var stars = $('#stars').val();
    //题型
    // var item_type=$("#subjectType").find("option:selected").val();
    var item_type = $("#subjectType").combobox('getValue');

    //启用类型
    var type = $("input[type='radio']:checked").val();
    var content = $("table:first tr:last td:last").children("div").html();

    content = encodeURIComponent(content);
    var param = '{';
    //单选的时候,对应数据库answers,选项
    if (sub == 1 && item_type == 1) {
        var answers = '';
        var page_answers = $("#sxdxcontents").find("tr td div");
        for (var i = 0; i < page_answers.length; i++) {
            answers += page_answers.eq(i).html() + ",";
        }
        answers = answers.substring(0, answers.length - 1);
        answers = encodeURIComponent(answers);

        var right_answers = $("#sxanswer").val();
        right_answers = encodeURIComponent(right_answers);

        var analysis = $(".sxdxjx div").html();
        analysis = encodeURIComponent(analysis);
        var param = '{';
        param += '"subject":"' + sub + '","itemtype":"' + item_type + '","titlefrom":"' + item_from + '","content":"' + content + '","tppe":"'
            + type + '","year":"' + year + '","stars":"' + stars + '","answers":"' + answers + '","correctanswers":"'
            + right_answers + '","anaylses":"' + analysis + '"}';
        param = encodeURIComponent(param);
    }
    //填空题
    if (sub == 1 && item_type == 2) {

        var answers = '';
        var page_answers = $("#sxtk").find("tr td div");

        answers += page_answers.eq(0).html();
        answers = answers.substring(0, answers.length);
        answers = encodeURIComponent(answers);
        var analysis = page_answers.eq(1).html() + ",";
        analysis = encodeURIComponent(analysis);
        var param = '{';
        param += '"subject":"' + sub + '","itemtype":"' + item_type + '","titlefrom":"' + item_from + '","content":"' + content + '","tppe":"'
            + type + '","year":"' + year + '","stars":"' + stars + '","answers":"' + answers + '","anaylses":"' + analysis + '"}';
        param = encodeURIComponent(param);

    }
    //解答(3)，证明(13)
    if (sub == 1 && (item_type == 3 || item_type == 13)) {

        var page_answers = $("#sxjd").find("tr td div");
        var analysis = page_answers.eq(0).html() + ",";
        analysis = encodeURIComponent(analysis);
        var param = '{';
        param += '"subject":"' + sub + '","itemtype":"' + item_type + '","titlefrom":"' + item_from + '","content":"' + content + '","tppe":"'
            + type + '","year":"' + year + '","stars":"' + stars + '","anaylses":"' + analysis + '"}';
        param = encodeURIComponent(param);

    }

    //政治,单选
    if (sub == 2 && item_type == 1) {
        var answers = '';
        var page_answers = $("#sxdxcontents").find("tr td div");
        for (var i = 0; i < page_answers.length; i++) {
            answers += page_answers.eq(i).html() + ",";
        }
        answers = answers.substring(0, answers.length - 1);
        answers = encodeURIComponent(answers);
        var right_answers = $("#sxanswer").val();
        right_answers = encodeURIComponent(right_answers);
        var analysis = $(".sxdxjx div").html();
        analysis = encodeURIComponent(analysis);
        param += '"subject":"' + sub + '","itemtype":"' + item_type + '","titlefrom":"' + item_from + '","content":"' + content + '","tppe":"'
            + type + '","year":"' + year + '","stars":"' + stars + '","answers":"' + answers + '","correctanswers":"'
            + right_answers + '","anaylses":"' + analysis + '"}';
        param = encodeURIComponent(param);
    }

    //政治，多选
    if (sub == 2 && item_type == 4) {
        var answers = '';
        var page_answers = $("#zzdxcontents").find("tr td div");
        for (var i = 0; i < page_answers.length; i++) {
            answers += page_answers.eq(i).html() + ",";
        }
        answers = answers.substring(0, answers.length - 1);
        answers = encodeURIComponent(answers);

        var right_answers = $("#zzdxanswer").val();
        right_answers = encodeURIComponent(right_answers);

        var analysis = $(".zzany div").html();
        analysis = encodeURIComponent(analysis);
        param += '"subject":"' + sub + '","itemtype":"' + item_type + '","titlefrom":"' + item_from + '","content":"' + content + '","tppe":"'
            + type + '","year":"' + year + '","stars":"' + stars + '","answers":"' + answers + '","correctanswers":"'
            + right_answers + '","anaylses":"' + analysis + '"}';
        param = encodeURIComponent(param);

    }

    //政治，材料
    if (sub == 2 && item_type != 1 && item_type != 4) {
        var questions = '';
        var page_questions = $("#zzcl").find("tr td div");
        for (var i = 0; i < page_questions.length; i++) {
            questions += page_questions.eq(i).html() + ",";
        }
        questions = questions.substring(0, questions.length - 1);
        questions = encodeURIComponent(questions);

        var right_answers = '';
        var page_answers = $("#zzcldn").find("tr td div");
        for (var j = 0; j < page_answers.length; j++) {
            right_answers += page_answers.eq(i).html() + ",";
        }
        right_answers = right_answers.substring(0, right_answers.length - 1);
        right_answers = encodeURIComponent(right_answers);
        var analysis = $(".zzany div").html();
        analysis = encodeURIComponent(analysis);
        param += '"subject":"' + sub + '","itemtype":"' + item_type + '","titlefrom":"' + item_from + '","content":"' + content + '","tppe":"'
            + type + '","year":"' + year + '","stars":"' + stars + '","questions":"' + questions + '","correctanswers":"'
            + right_answers + '","anaylses":"' + analysis + '"}';
        param = encodeURIComponent(param);

    }

    //英语单选
    if (sub == 3 && item_type == 1) {
        var answers = '';
        var page_answers = $("#sxdxcontents").find("tr td div");
        for (var i = 0; i < page_answers.length; i++) {
            answers += page_answers.eq(i).html() + ",";
        }
        answers = answers.substring(0, answers.length - 1);
        answers = encodeURIComponent(answers);

        var right_answers = $("#sxanswer").val();
        right_answers = encodeURIComponent(right_answers);

        var analysis = $(".sxdxjx div").html();
        analysis = encodeURIComponent(analysis);
        param += '"subject":"' + sub + '","itemtype":"' + item_type + '","titlefrom":"' + item_from + '","content":"' + content + '","tppe":"'
            + type + '","year":"' + year + '","stars":"' + stars + '","answers":"' + answers + '","correctanswers":"'
            + right_answers + '","anaylses":"' + analysis + '"}';
        param = encodeURIComponent(param);
    }

    //英语，完形
    if (sub == 3 && item_type == 6) {
        var questions = '';
        //多少个问题=page_questions.length
        var page_questions_big = $("#yywxwt0").find("tr.yywxwt0");
        var right_answers = '';
        var analysis = "";
        for (var i = 0; i < page_questions_big.length; i++) {
            var page_questions_inner = page_questions_big.eq(i).find("td.yywxwt1 .yywxwt2 tr td div");
            var arg_inner = "";
            var right_answer = page_questions_big.eq(i).find("td.yywxwt1 .yywxwt2 input.answerInput");
            for (var j = 0; j < page_questions_inner.length; j++) {
                var temp = page_questions_inner.eq(j).html();
                if (j != page_questions_inner.length - 1) {
                    arg_inner += temp + "@@@";
                }
                else {
                    arg_inner += temp;
                }
            }

            if (i != page_questions_big.length - 1) {
                questions += arg_inner + "###";
                right_answers += right_answer + ",";
            }
            else {
                questions += arg_inner;
                right_answers += right_answer;

            }

        }
        questions = encodeURIComponent(questions);
        right_answers = encodeURIComponent(right_answers);

        var page_analysis = $(".yywxjx .analysis");
        for (var i = 0; i < page_analysis.length; i++) {
            var inp_html = page_analysis.eq(i).html();
            if (i != page_analysis.length - 1) {
                analysis += inp_html + ",";
            }
            else {
                analysis += inp_html;
            }
        }
        analysis = encodeURIComponent(analysis);
        param += '"subject":"' + sub + '","itemtype":"' + item_type + '","titlefrom":"' + item_from + '","content":"' + content + '","tppe":"'
            + type + '","year":"' + year + '","stars":"' + stars + '","questions":"' + questions + '","correctanswers":"'
            + right_answers + '","anaylses":"' + analysis + '"}';
        param = encodeURIComponent(param);
    }

    //英语阅读
    if (sub == 3 && item_type == 7) {
        var answers = '';
        var questions = '';
        //多少个问题=page_questions.length
        var page_questions = $(".yyyd_out .yyyd_xx_outer .question");

        //    console.log($(".yyyd_out tr:first").html());
        console.log($(".yyyd_out tr").html());

        for (var i = 0; i < page_questions.length; i++) {
            //大问题
            var qustion_out = page_questions.eq(i).html();
            var qustion_inner = $(".yyyd_xx_inner div");

            //小问题
            var question = "";
            for (var j = 0; j < qustion_inner.length; j++) {
                var per_qustion = qustion_inner.eq(j).html();
                if (j != qustion_inner.length - 1) {
                    question += per_qustion + "@@@";
                }
                else {
                    question += per_qustion;
                }
            }

            if (i != page_questions.length - 1) {
                questions += qustion_out + "###" + question + "###";
            }
            else {
                questions += qustion_out + "###" + question;

            }
        }

        // console.log(questions);

        /*    var page_answers=$("#yyyd ").find("tr td div");
            for(var i=0;i<page_answers.length;i++){
                answers+=page_answers.eq(i).html()+",";
            }
            answers=answers.substring(0,answers.length-1);
            answers=encodeURIComponent(answers);

            var right_answers=$("#sxanswer").val();
            right_answers =encodeURIComponent(right_answers);

            var analysis=$(".sxdxjx div").html();
            analysis =encodeURIComponent(analysis);
            var param='{';
            param+='"subject":"'+sub+'","itemtype":"'+item_type+'","titlefrom":"'+item_from+'","content":"'+content+'","tppe":"'
                +type+'","year":"'+year+'","stars":"'+stars+'","answers":"'+answers+'","correctanswers":"'
                +right_answers+'","anaylses":"'+analysis+'"}';
            param =encodeURIComponent(param);*/
    }

    //7选5
    if (sub == 3 && item_type == 8) {
        var questions = "";
        var page_questions = $("#yy_7_xx tr td div");
        for (var i = 0; i < page_questions.length; i++) {
            if (i != page_questions.length - 1) {
                questions += page_questions.eq(i).html() + ",";
            }
            else {
                questions += page_questions.eq(i).html();

            }
        }
        questions = encodeURIComponent(questions);
        var analysis = "";
        var page_anaylses = $("#yy_7_jx tr td div");
        for (var i = 0; i < page_anaylses.length; i++) {
            if (i != page_questions.length - 1) {
                analysis += page_anaylses.eq(i).html() + ",";
            }
            else {
                analysis += page_anaylses.eq(i).html();

            }
        }
        analysis = encodeURIComponent(analysis);
        var param = '{';
        param += '"subject":"' + sub + '","itemtype":"' + item_type + '","titlefrom":"' + item_from + '","content":"' + content + '","tppe":"'
            + type + '","year":"' + year + '","stars":"' + stars + '","questions":"' + questions + '","anaylses":"' + analysis + '"}';
        console.log(param);
        param = encodeURIComponent(param);
    }
    //英语翻译
    if (sub == 3 && item_type == 9) {

        var questions = "";
        var page_questions = $("#yyfy_xx tr td div");
        for (var i = 0; i < page_questions.length; i++) {
            if (i != page_questions.length - 1) {
                questions += page_questions.eq(i).html() + ",";
            }
            else {
                questions += page_questions.eq(i).html();

            }
        }
        questions = encodeURIComponent(questions);
        var analysis = "";
        var page_anaylses = $("#yyfy_jx tr td div");
        for (var i = 0; i < page_anaylses.length; i++) {
            if (i != page_questions.length - 1) {
                analysis += page_anaylses.eq(i).html() + ",";
            }
            else {
                analysis += page_anaylses.eq(i).html();

            }
        }
        analysis = encodeURIComponent(analysis);
        param += '"subject":"' + sub + '","itemtype":"' + item_type + '","titlefrom":"' + item_from + '","content":"' + content + '","tppe":"'
            + type + '","year":"' + year + '","stars":"' + stars + '","questions":"' + questions + '","anaylses":"' + analysis + '"}';
        console.log(param);
        param = encodeURIComponent(param);

    }

    //英语排序
    if (sub == 3 && item_type == 10) {
        var questions = "";
        var page_questions = $("#yypx_xx tr td div");
        for (var i = 0; i < page_questions.length; i++) {
            if (i != page_questions.length - 1) {
                questions += page_questions.eq(i).html() + ",";
            }
            else {
                questions += page_questions.eq(i).html();

            }
        }
        questions = encodeURIComponent(questions);
        var analysis = "";
        var page_anaylses = $("#yypx_jx tr td div");
        for (var i = 0; i < page_anaylses.length; i++) {
            if (i != page_questions.length - 1) {
                analysis += page_anaylses.eq(i).html() + ",";
            }
            else {
                analysis += page_anaylses.eq(i).html();

            }
        }
        analysis = encodeURIComponent(analysis);
        param += '"subject":"' + sub + '","itemtype":"' + item_type + '","titlefrom":"' + item_from + '","content":"' + content + '","tppe":"'
            + type + '","year":"' + year + '","stars":"' + stars + '","questions":"' + questions + '","anaylses":"' + analysis + '"}';
        console.log(param);
        param = encodeURIComponent(param);

    }
    //英语作文
    if (sub == 3 && (item_type == 11 || item_type == 12)) {
        var analysis = $('#yyzw tr td dib').eq(0).html();
        analysis = encodeURIComponent(analysis);
        param += '"subject":"' + sub + '","itemtype":"' + item_type + '","titlefrom":"' + item_from + '","content":"' + content + '","tppe":"'
            + type + '","year":"' + year + '","stars":"' + stars + '","anaylses":"' + analysis + '"}';
        console.log(param);
        param = encodeURIComponent(param);
    }
   /* var lores = "";
    var lores_check = $("#item_add_lore").datagrid("getChecked");
    for (var i = 0; i < lores_check.length; i++) {
        if (i != lores_check.length - 1) {
            lores += lores_check[i].id + ",";
        }
        else {
            lores += lores_check[i].id;
        }
    }*/
   console.log(param);
   /* $.ajax({
        url: "http://193.168.0.170:15000/yc-crm/item/add?param='" + param + "'",
        type: "post",
        dataType: "json",
        success: function (msg) {
            if (msg.status == 0) {
                alert("加入习题库成功");
            }
        }
    })*/
}
