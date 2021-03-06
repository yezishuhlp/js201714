var list=document.getElementById("list");
var sortList=document.getElementById("header").getElementsByTagName("a");
var data=null;
//1.创建一个AJAX对象
var xhr=new XMLHttpRequest();
//2.打开一个URL并发请求
xhr.open("GET","Data/product.json",false);
//3.监听请求状态,并获取数据
xhr.onreadystatechange=function () {
    if(xhr.status==200&&xhr.readyState==4){
        data=JSON.parse(xhr.responseText);
        bindHTML(data);
    }
};
//4.发送数据
xhr.send(null);
//绑定数据到页面上
function bindHTML(data) {
    //先准备一个空的ES6模板字符串
    var strHTML=``;
    //循环数据拼接字符串
    data.forEach((item)=>{
        strHTML+=`
         <li>
            <a href="javascript:;">
                <img src="${item.img}" alt="">
                <p>${item.title}</p>
                <p class="hot">热度:${item.hot}</p>
                <del>$9999</del>
                <span>￥${item.price}</span>
                <p class="time">上架时间：${item.time}</p>
            </a>
         </li>
            `
    });
    //将拼接好的字符串,绑定到页面
    list.innerHTML=strHTML;
}
//给三个排序的维度绑定事件
//注意:排序只需要重新拍一下数据data就可以,然后重新执行一下bindHTML即可
for(let i=0;i<sortList.length;i++){
    sortList[i].flag=-1;//初始状态
    sortList[i].onclick=function () {
        this.flag*=-1;
        //this.getAttribute("sort-attr");
        // "time","price","hot"
        sort.call(this,this.getAttribute("sort-attr"));
        //this当前点击的a标签
        //实现三角的切换
        arrowFollow.call(this);
       //清除不被当前不被点击的a标签中俩三角的class名bg
        clearOther.call(this);
    }
}
function sort(atr) {
    data.sort((a,b)=>{
        if(atr=="time"){
            return (new Date(a[atr])-new Date(b[atr]))*this.flag;
        }else {
            return (a[atr]-b[atr])*this.flag;
        }

    });
    bindHTML(data);
};
function arrowFollow() {
    //根据this获取对应下面的俩个三角,up和down
    var up=this.children[0];
    var down=this.children[1];
    //根据当前的状态flag的值判断让谁加上bg的className
    if(this.flag>0){
        up.classList.add("bg");
        down.classList.remove("bg")
    }else {
        down.classList.add("bg");
        up.classList.remove("bg");
    }
};
function clearOther() {
    for(var i=0;i<sortList.length;i++){
        if(sortList[i]!=this){
            //说明现在点击的不是你
            //你下面的三角就不可以带bg类名
            sortList[i].children[0].classList.remove("bg");
            sortList[i].children[1].classList.remove("bg");
            //将当前不被点击的a状态变成初始状态
            sortList[i].flag=-1;
        }
    }
};