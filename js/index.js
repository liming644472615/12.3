$(function(){
    var clientw=document.documentElement.clientWidth;
    var clienth=document.documentElement.clientHeight;
    function init(originSize,type){
        if(type=="x"){
            var scale=clientw/originSize*100;
        }else if(type=="y"){
            var scale=clienth/originSize*100;
        }
        var html=document.querySelector("html");
        html.style.fontSize=scale+"px";
    }
    init(750,"x");
    var myswiper=new Swiper(".swiper-container",{
        pagination:".swiper-pagination",
        paginationType:"progress",
        //autoplay: 2000,
        onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
            swiperAnimateCache(swiper); //隐藏动画元素
            swiperAnimate(swiper); //初始化完成开始动画
        },
        onSlideChangeEnd: function(swiper){
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
        }
    })

    var banners = $(".banner");
    var imgs = $(".banner a");
    imgs
    var lis = $(".btn li");
    var lefts = $(".banner .left");
    var rights = $(".banner .right");
    var now = 0;
    var next = 0;
    for(var i=1;i<imgs.length;i++){
        imgs[i].style.left=clientw+"px";
    }
    function move(ch){
        ch = ch ||"right"||"budong";
        if(ch=="budong"){
            imgs[now].style.left=0;
            imgs[next].style.left=0;
            $(imgs[now]).animate({left:0});
            $(imgs[next]).animate({left:0});
            lis[now].className="";
            lis[next].className="btn_xiaoguo";
            now=next;
        }
        if(ch=="right"){
            next++;
            if(next>=imgs.length){
                next=0;
            }
            imgs[now].style.left=0;
            imgs[next].style.left=clientw+"px";
            $(imgs[now]).animate({left:-clientw});
            $(imgs[next]).animate({left:0});
            lis[now].className="";
            lis[next].className="btn_xiaoguo";
            now=next;
        }
        if(ch=="left"){
            next--;
            if(next<0){
                next=imgs.length-1;
            }
            imgs[now].style.left=0;
            imgs[next].style.left=-clientw+"px";
            $(imgs[now]).animate({left:clientw});
            $(imgs[next]).animate({left:0});
            lis[now].className="";
            lis[next].className="btn_xiaoguo";
            now=next;
        }
    }

    //var t = setInterval(move,2000);

    banners[0].onmouseover=function(){
        clearInterval(t);
    }
    banners[0].onmouseout=function(){
        t = setInterval(move,2000);
    }
    lefts[0].onclick=function(){
        move("left");
    }
    rights[0].onclick=function(){
        move("right");
    }

    for(var j=0;j<lis.length;j++){
        lis[j].aa=j;
        lis[j].onclick=function(){
            if(now>this.aa){
                next=this.aa+1;
                move("left");
            }
            if(now<this.aa){
                next=this.aa-1;
                move("right");
            }
            if(this.aa==now){
                next=this.aa;
                move("budong");
            }
        }
    }
})