//基本設定
var is_trigger = false; //重覆觸發
var is_forPC = document.body.clientWidth > 767; //forPC
var is_Online = (location.protocol).indexOf('http') === 0; //線上
var is_EcmWriter = document.querySelectorAll('input[id^="eWriterBtn"]').length > 0; //ECM編輯模式

//圖檔路徑
var artjsSrc = {};
    artjsSrc.get = document.getElementById('artjs').getAttribute('src');
    artjsSrc.src = artjsSrc.get.substring(0,artjsSrc.get.indexOf("images\/"));
    artjsSrc.time = '?' + artjsSrc.get.split('?')[1];
    artjsSrc.getartImgPath = function(imgName){   //artjsSrc.getartImgPath('images/fixed_Area_top.png')
      return artjsSrc.src + imgName + artjsSrc.time;
    };

//訊息套件設定檔  
toastr.options = {
  // 參數設定
  "closeButton": true, // 顯示關閉按鈕
  "debug": false, // 除錯
  "newestOnTop": true,  // 最新一筆顯示在最上面
  "progressBar": false, // 顯示隱藏時間進度條
  "positionClass": "toast-bottom-right", // 位置的類別
  "preventDuplicates": false, // 隱藏重覆訊息
  "onclick": function(){
    toastr.clear()	//淡出方式移除全部提示訊息
  }, // 當點選提示訊息時，則執行此函式
  "showDuration": "300", // 顯示時間(單位: 毫秒)
  "hideDuration": "1000", // 隱藏時間(單位: 毫秒)
  "timeOut": "10000", // 當超過此設定時間時，則隱藏提示訊息(單位: 毫秒)
  "extendedTimeOut": "10000", // 當使用者觸碰到提示訊息時，離開後超過此設定時間則隱藏提示訊息(單位: 毫秒)
  "showEasing": "swing", // 顯示動畫時間曲線
  "hideEasing": "linear", // 隱藏動畫時間曲線
  "showMethod": "fadeIn", // 顯示動畫效果
  "hideMethod": "fadeOut" // 隱藏動畫效果
}

//Vue串接
var vm = new Vue({
  el: '#app',
  data: PD_layout_data,
  computed: {
  },
  methods: {

    isNewOfrenLayoutFu(val){ //高亮最近新增的常用版型
      if(this.isNewOfrenLayout){
        var isnew;
        Object.entries(this.isNewOfrenLayout).forEach(([i,key]) => {
          if(key === val){
            isnew = true
          }
        });
      };
      return isnew
    },
    isNewIdFu(){ //高亮最近新增的功能物件
      if(this.isNewId){
        var isnew;
        Object.entries(this.isNewId).forEach(([i,key]) => {
          $(key).addClass('isnew')
        });
      };
    },
    
    isImgLoading (val){ //更新圖片
      return val || artjsSrc.getartImgPath('images/loadinggif.gif')
    },
    
    isToggleLayoutStartFu (){ //切換版型時停用CSS-transition
      this.isToggleLayoutIng = true;
      this.isToggleLayoutIngEndFu(this);
    },
    isToggleLayoutIngEndFu (val){
      setTimeout(function(){
        var _this = val;
        _this.isToggleLayoutIng = false;
      },100)
    },
    
    getIntotextFu (name){ //html公版匯入文案
      return this.intotext.lists[this.intotext.isTextFilter].val[name].val
    },
    
    updateImgArrayFu (val){ //更新圖片狀態陣列資料
      this.isImgTransparent_Array = [];
      for(var i = 0; i < this.intosetup.linum; i++){
        this.isImgTransparent_Array.push(val)
      }
    },
    
    chrckImgTransparent_Array(i){ //判斷圖片狀態陣列對應圖片的副檔名
      return (this.isImgTransparent_Array[i]) ? 'png':'jpg'
    },
    chrckboxToStringFu (val){ //陣列資料轉字串
      val.val = val.val_checkbox.join(' ');
    },
    
    chrckboxToSplitFu (val){ //字串資料轉陣列
      if( val === true ){ return [val] }
      if( val === false ){ return [val] }
      return val.split(' ')
    },
    
    groupsFu (){ //篩選出群組名稱(手動設定)
      var groups = new Array;
      Object.entries(this.lists).forEach(([key,val]) => {
        groups.push(val.group)
      });
      groups = [...new Set(groups)]
      return groups
    },
    groupFilterFu (group){ //檢查目前篩選資料(手動設定)
      if( this.isGroupFilter !== 'ALL'){
        return group === this.isGroupFilter
      }
      return true
    },
    
    layoutsGroupsFu (){ //篩選出群組名稱(常用版型)
      var groups = new Array;
      Object.entries(this.layouts).forEach(([key,val]) => {
        groups.push(val.group)
      });
      groups = [...new Set(groups)]
      return groups
    },
    layoutsGroupFilterFu (group){ //檢查目前篩選資料(常用版型)
      return group === this.isLayoutGroupFilter
    },
    
    checkNowLayoutFu (){ //檢查目前設定是否已存在常用版型內
      Object.entries(this.layouts).forEach(([layouts_i,layouts_val]) => { //檢查常用版型
        var checkArray = [];
        this.layouts[layouts_i].now = false;
        if(layouts_val){
          checkArray.push( layouts_val.classname  === this.intosetup.classname );
          checkArray.push( layouts_val.col        === this.intosetup.col );
          checkArray.push( layouts_val.group      === this.intosetup.group );
          checkArray.push( layouts_val.linum      === this.intosetup.linum );
          checkArray.push( layouts_val.name       === this.intosetup.name );
          checkArray.push( layouts_val.name2      === this.intosetup.name2 );
          Object.entries(this.lists).forEach(([key,val],i) => { //比對目前設定
            var layout_val = (this.layouts[layouts_i].lists[key]) ? this.layouts[layouts_i].lists[key].val : false;
            checkArray.push( (val.val === layout_val) );
          });
        }
        if( checkArray.indexOf(false) === -1 ){
          this.layouts[layouts_i].now = true;   
        }
      });
    },
          
    toggleLayoutFu (layout,num){ //載入常用版型參數
      console.log('切換常用版型:'+ num +' / '+ layout.group +'('+ layout.no +')')
      //紀錄目前版型編號
      this.isLayoutNum = num;
      //清空資料+載入資料
      //匯出文案
      Object.entries(this.intotext.lists.exportTxt.val).forEach(([key,val]) => {
        this.intotext.lists.exportTxt.val[key].val = this.intotext.lists.test.val[key].val;
        if(layout.exportTxt && layout.exportTxt.val[key]){
          this.intotext.lists.exportTxt.val[key].val = layout.exportTxt.val[key].val
        }
      });
      //樣式      
      Object.entries(this.lists).forEach(([key,val]) => {
        this.lists[key].val = false;
        if(this.lists[key].type){
          this.lists[key].val_checkbox = [false];
        }
      });
      if(layout.lists){
        Object.entries(layout.lists).forEach(([key,val]) => {
          this.lists[key].val = val.val;
          if(this.lists[key].type){
            this.lists[key].val_checkbox = this.chrckboxToSplitFu(val.val);
          }
        });
      }
      //品數
      if(layout.linum){
        this.intosetup.old_linum = this.intosetup.linum;
        this.intosetup.linum = layout.linum;
      } else {
        this.intosetup.linum = this.intosetup.old_linum;
      }
      //主圖去背狀態
      this.isImgTransparent = false;
      this.isImgTransparent_Array = [];
      if(layout.isImgTransparent_Array){
        //有指定狀態
        this.isImgTransparent_Array = layout.isImgTransparent_Array;
      } else {
        //無指定狀態
        if(layout.isImgTransparent){ 
          this.isImgTransparent = layout.isImgTransparent;
          this.updateImgArrayFu(layout.isImgTransparent);
        }
      }
      //Class
      this.intosetup.classname = ''; 
      if(layout.classname){ 
        this.intosetup.classname = layout.classname; 
      }
      //CSS
      Object.entries(this.intosetup.css).forEach(([key,val]) => { 
        this.intosetup.css[key] = ''; 
      }); 
      if(layout.css){ 
        Object.entries(layout.css).forEach(([key,val]) => {
          this.intosetup.css[key] = val; 
        }); 
      }
      //name、name2、col、group
      this.intosetup.no    = ''; 
      this.intosetup.name  = ''; 
      this.intosetup.name2 = '';
      this.intosetup.col   = ''; 
      this.intosetup.group = ''; 
      if(layout.no)   { this.intosetup.no    = layout.no; }
      if(layout.name) { this.intosetup.name  = layout.name; }
      if(layout.name2){ this.intosetup.name2 = layout.name2; }
      if(layout.col)  { this.intosetup.col   = layout.col; }
      if(layout.group){ this.intosetup.group = layout.group; }
      //切換版型後執行的
      this.intosetup.updated = '';
      if(layout.updated){
        this.intosetup.updated = layout.updated;
        console.log('切換版型後執行的:',layout.updated)
        setTimeout(function(){
          layout.updated();
        },300)
      }
    },
    
    toggleTagDataFu (layout){ //更新HTML的data-pd資料
      var lists  = (layout)? layout.lists : this.lists;
      var pdtest = $('#PDtest');
      Object.entries(this.lists).forEach(([key,val]) => {
        pdtest.removeAttr('data'+ camelcase2hyphenFu(key));
      });
      Object.entries(lists).forEach(([key,val]) => {
        if(val.val){
          pdtest.attr('data'+ camelcase2hyphenFu(key), val.val);
        }
      });
    },
    
    data2htmlcodeFu (){ //轉碼PD_layout的code
      var data2html    = '';
      var lists        = this.lists;
      var linum        = this.intosetup.linum;
      var exportTxt    = this.intotext.lists.exportTxt.val;
      var isindent     = this.htmlcode.isindent; //li縮排
      var isloadinggif = this.htmlcode.isloadinggif; //刪除loadinggif
      var isdel        = this.htmlcode.isdel; //顯示隱藏元素
      var isexportTxt  = this.htmlcode.isexportTxt; //顯示入搞資料 
      function isexportTxtFu(val){ //顯示入搞資料 
        return (isexportTxt) ? val : ''
      };
      var isdebug = this.debug.isshowAllLayout; //顯示全公版列表
      function isdebugImgFu(val){ //顯示全公版列表-圖片加上系統路徑
        return (isdebug) ? artjsSrc.getartImgPath(val) : val
      };
      //產出HTML
      data2html += `\n        <div class="PD_layout `+ this.intosetup.classname +`"`;
      Object.entries(lists).forEach(([key,val]) => {
        if(val.val){ 
          data2html += `\n             data`+ camelcase2hyphenFu(key) +`="`+ val.val +`"`; 
        }
      });
      data2html += `\n             >`;
      data2html += `
          <div class="lbtclass" id="lbtclass_B01">
            <div class="btclass" id="bt_B_000_01">
              <ul class="PD_wrapper">
<!-- -----------------------------------------------【】入稿貼語法從這邊開始----------------------------------------------- -->
`;
        if(!this.htmlcode.islinum){
          linum = 1;
        }
        for(var i=0; i<linum; i++){
          data2html += `\n`
                                if(!isindent){ data2html += `\n                ` } data2html += `<li class="PD_slide js-PD_id" data-id="">`
                                if(!isindent){ data2html += `\n                  ` } data2html += `<div class="PD">`
                                if(!isindent){ data2html += `\n                    ` } data2html += `<a class="js-PD_url" data-title="商品連結" data-urlpc="`+ isexportTxtFu(exportTxt.PD_url.val) +`" data-urlphone="`+ isexportTxtFu(exportTxt.PD_url.val) +`" href="`+ isexportTxtFu(exportTxt.PD_url.val) +`" target="_blank">`
          if(isdel || lists.PdPdimg.val !== 'off') {
            if(lists.PdLi.val !== 'BN' && lists.PdLi.val !== 'BN-AWD'){
              if(!isindent){ data2html += `\n                      ` } data2html += `<div class="PD_img"><img class="lazy js-PD_img" data-title="商品圖" src="`+ isdebugImgFu('images/loadinggif.gif') +`" data-original="`+ isdebugImgFu( exportTxt.PD_img.val +`.`+ this.chrckImgTransparent_Array(i) ) +`" alt="" width="230" height="230" border="0"></div>`
            } else {
              if(!isindent){ data2html += `\n                      ` } data2html += `<div class="PD_img"><img class="lazy js-PD_img" data-title="商品圖" data-original="`+ isdebugImgFu( exportTxt.PD_img.val +`.`+ this.chrckImgTransparent_Array(i) ) +`" alt="" border="0"></div>`
            }
          }
          if(isdel || lists.PdInto.val !== 'off') {
            if( lists.PdLi.val !== 'BN' && lists.PdLi.val !== 'BN-AWD' || lists.PdPdlogo.val !== false){ //BN模式，有LOGO時要顯示
                                if(!isindent){ data2html += `\n                      ` } data2html += `<div class="PD_into">`
            }
            if(isdel || lists.PdPdlogo.val !== false) {
              if(lists.PdLi.val !== 'BN' && lists.PdLi.val !== 'BN-AWD'){
                if(!isindent){ data2html += `\n                        ` } data2html += `<div class="PD_logo"><img class="lazy js-PD_logo" data-title="品牌LOGO" src="`+ isdebugImgFu('images/loadinggif.gif') +`" data-original="`+ isdebugImgFu( exportTxt.PD_logo.val ) +`" alt="" width="195" height="195" border="0"></div>`
              } else {
                if(!isindent){ data2html += `\n                        ` } data2html += `<div class="PD_logo"><img class="lazy js-PD_logo" data-title="品牌LOGO" data-original="`+ isdebugImgFu( exportTxt.PD_logo.val ) +`" alt="" border="0"></div>`
              }
            }
            if(isdel || lists.PdH3.val !== 'off' && lists.PdLi.val !== 'BN' && lists.PdLi.val !== 'BN-AWD') {
                                if(!isindent){ data2html += `\n                        ` } data2html += `<h3><span class="js-PD_txt3" data-title="特標">`+ isexportTxtFu(exportTxt.PD_txt3.val) +`</span><i></i></h3>`
            }
            if(isdel || lists.PdH4.val !== 'off' && lists.PdLi.val !== 'BN' && lists.PdLi.val !== 'BN-AWD') {
                                if(!isindent){ data2html += `\n                        ` } data2html += `<h4>`
                                if(!isindent){ data2html += `\n                          ` } data2html += `<b class="js-PD_txt1" data-title="品牌">`+ isexportTxtFu(exportTxt.PD_txt1.val) +`</b>`
                                if(!isindent){ data2html += `\n                          ` } data2html += `<span class="js-PD_txt2" data-title="品名">`+ isexportTxtFu(exportTxt.PD_txt2.val) +`</span><i></i>`
                                if(!isindent){ data2html += `\n                        ` } data2html += `</h4>`
            }
            if(isdel || lists.PdP.val !== 'off' && lists.PdLi.val !== 'BN' && lists.PdLi.val !== 'BN-AWD') {
                                if(!isindent){ data2html += `\n                        ` } data2html += `<p>`
                                if(!isindent){ data2html += `\n                          ` } data2html += `<del class="js-PD_del" data-title="原價">`+ isexportTxtFu(exportTxt.PD_del.val) +`</del>`
                                if(!isindent){ data2html += `\n                          ` } data2html += `<b class="js-PD_priceTxt" data-title="特價標">`+ isexportTxtFu(exportTxt.PD_priceTxt.val) +`</b>`
                                if(!isindent){ data2html += `\n                          ` } data2html += `<span class="money">$</span>`
                                if(!isindent){ data2html += `\n                          ` } data2html += `<span class="Price js-PD_price" data-title="特價">`+ isexportTxtFu(exportTxt.PD_price.val) +`</span>`
                                if(!isindent){ data2html += `\n                          ` } data2html += `<small class="js-PD_unit" data-title="單位">`+ isexportTxtFu(exportTxt.PD_unit.val) +`</small>`
                                if(!isindent){ data2html += `\n                        ` } data2html += `</p>`
            }
            if(isdel || lists.PdBtnIntopdgo.val !== false && lists.PdLi.val !== 'BN' && lists.PdLi.val !== 'BN-AWD') {
                                if(!isindent){ data2html += `\n                        ` } data2html += `<div class="PD_btn PD_into_PDgo PD_go"><span><b></b><i></i></span></div>`
            }
            if( lists.PdLi.val !== 'BN' && lists.PdLi.val !== 'BN-AWD' || lists.PdPdlogo.val !== false){ //BN模式，有LOGO時要顯示
                                if(!isindent){ data2html += `\n                      ` } data2html += `</div>`
            }
          }
          if(isdel || lists.PdBtnPdgo.val !== false) {
                                if(!isindent){ data2html += `\n                      ` } data2html += `<div class="PD_btn PD_go"><span><b></b><i></i></span></div>`
          }
                                if(!isindent){ data2html += `\n                    ` } data2html += `</a>`
                                if(!isindent){ data2html += `\n                  ` } data2html += `</div>`
          if(isdel || lists.PdBtnMore.val !== false) {
            
            //特殊機制--看更多按鈕取消另開視窗
            if( lists.Pdit.val === 'more'){
                                if(!isindent){ data2html += `\n                  ` } data2html += `<div class="PD_btn more"><a class="js-More_url" data-title="看更多連結" data-urlpc="`+ isexportTxtFu(exportTxt.More_url.val) +`" data-urlphone="`+ isexportTxtFu(exportTxt.More_url.val) +`" href="`+ isexportTxtFu(exportTxt.More_url.val) +`"><span><b class="js-More_txt" data-title="看更多"></b><i></i></span></a></div>`              
            } else {
                                if(!isindent){ data2html += `\n                  ` } data2html += `<div class="PD_btn more"><a class="js-More_url" data-title="看更多連結" data-urlpc="`+ isexportTxtFu(exportTxt.More_url.val) +`" data-urlphone="`+ isexportTxtFu(exportTxt.More_url.val) +`" href="`+ isexportTxtFu(exportTxt.More_url.val) +`" target="_blank"><span><b class="js-More_txt" data-title="看更多"></b><i></i></span></a></div>`              
            }
          }
                                if(!isindent){ data2html += `\n                ` } data2html += `</li>`
        }
      data2html += `\n`
      data2html += `
<!-- -----------------------------------------------【】入稿貼語法到這邊結束----------------------------------------------- -->
              </ul>
            </div>
          </div>
        </div>\n`
      return data2html
    },
    
    sharecodeFu (){ //分享目前設定
      var sharecode = '';
      var intosetup    = this.intosetup;
      var exportTxt    = this.intotext.lists.exportTxt.val;
      var lists        = this.lists;
      sharecode += `\n  //分享設定`;
      sharecode += `\n  { `;
      if(intosetup){ 
        sharecode += `
    'group' : '`+ intosetup.group +`', 'no': '',
    'classname': '`+ intosetup.classname +`',
    'col' : '`+ intosetup.col +`',
    'name': '`+ intosetup.name +`',
    'name2': '`+ intosetup.name2 +`',
    'isImgTransparent': `+ this.isImgTransparent +`, 
    'linum': `+ intosetup.linum +`,
    'css': {
      'bgc': '`+ intosetup.css.bgc +`',
      'libgc' : '`+ intosetup.css.libgc +`',
    },`
      }
      if(exportTxt){ 
        sharecode += `
    'exportTxt': {
      'val' : {
        'PD_txt1'     : { 'val': '`+ exportTxt.PD_txt1.val +`'},
        'PD_txt2'     : { 'val': '`+ exportTxt.PD_txt2.val +`'},
        'PD_txt3'     : { 'val': '`+ exportTxt.PD_txt3.val +`'},
        'PD_del'      : { 'val': '`+ exportTxt.PD_del.val +`'},
        'PD_priceTxt' : { 'val': '`+ exportTxt.PD_priceTxt.val +`'},
        'PD_price'    : { 'val': '`+ exportTxt.PD_price.val +`'},
        'PD_unit'     : { 'val': '`+ exportTxt.PD_unit.val +`'},
        'PD_url'      : { 'val': '`+ exportTxt.PD_url.val +`'},
        'More_url'    : { 'val': '`+ exportTxt.More_url.val +`'},
      },
    },`
      }
      if(lists){
                                     sharecode += `\n    'lists': {`
        if(lists.PdColPc.val || 
           lists.PdColPhone.val ||
           lists.PdDirection.val ||
           lists.PdLi.val ||
           lists.PdLiNum.val)      { sharecode += `\n      //佈局`}
        if(lists.PdColPc.val)      { sharecode += `\n      'PdColPc'      : { 'val': '`+ lists.PdColPc.val +`'},`}
        if(lists.PdColPhone.val)   { sharecode += `\n      'PdColPhone'   : { 'val': '`+ lists.PdColPhone.val +`'},`}
        if(lists.PdDirection.val)  { sharecode += `\n      'PdDirection'  : { 'val': '`+ lists.PdDirection.val +`'},`}
        if(lists.PdLi.val)         { sharecode += `\n      'PdLi'         : { 'val': '`+ lists.PdLi.val +`'},`}
        if(lists.PdLiNum.val)      { sharecode += `\n      'PdLiNum'      : { 'val': '`+ lists.PdLiNum.val +`'},`}
        
        if(lists.PdBr.val || 
           lists.PdImg.val ||
           lists.PdPdimg.val)      { sharecode += `\n      //主圖區`}
        if(lists.PdBr.val)         { sharecode += `\n      'PdBr'         : { 'val': '`+ lists.PdBr.val +`'},`}
        if(lists.PdImg.val)        { sharecode += `\n      'PdImg'        : { 'val': '`+ lists.PdImg.val +`'},`}
        if(lists.PdPdimg.val)      { sharecode += `\n      'PdPdimg'      : { 'val': '`+ lists.PdPdimg.val +`'},`}
        
        if(lists.PdPdlogo.val)     { sharecode += `\n      //品牌LOGO區`}
        if(lists.PdPdlogo.val)     { sharecode += `\n      'PdPdlogo'     : { 'val': '`+ lists.PdPdlogo.val +`'},`}
        
        if(lists.PdH3.val || 
           lists.PdH4.val || 
           lists.PdP.val ||
           lists.PdNumber.val)     { sharecode += `\n      //文案區`}
        if(lists.PdH3.val)         { sharecode += `\n      'PdH3'         : { 'val': '`+ lists.PdH3.val +`'},`}
        if(lists.PdH4.val)         { sharecode += `\n      'PdH4'         : { 'val': '`+ lists.PdH4.val +`'},`}
        if(lists.PdP.val)          { sharecode += `\n      'PdP'          : { 'val': '`+ lists.PdP.val +`'},`}
        if(lists.PdNumber.val)     { sharecode += `\n      'PdNumber'     : { 'val': '`+ lists.PdNumber.val +`'},`}
        
        if(lists.PdInto.val || 
           lists.PdTa.val || 
           lists.PdFsPc.val ||
           lists.PdFsPhone.val)    { sharecode += `\n      //文字樣式`}
        if(lists.PdInto.val)       { sharecode += `\n      'PdInto'       : { 'val': '`+ lists.PdInto.val +`'},`}
        if(lists.PdTa.val)         { sharecode += `\n      'PdTa'         : { 'val': '`+ lists.PdTa.val +`'},`}
        if(lists.PdFsPc.val)       { sharecode += `\n      'PdFsPc'       : { 'val': '`+ lists.PdFsPc.val +`'},`}
        if(lists.PdFsPhone.val)    { sharecode += `\n      'PdFsPhone'    : { 'val': '`+ lists.PdFsPhone.val +`'},`}
        
        if(lists.PdBtn.val || 
           lists.PdBtnPdgo.val || 
           lists.PdBtnMore.val ||
           lists.PdBtnIntopdgo.val){ sharecode += `\n      //按鈕`}
        if(lists.PdBtn.val)        { sharecode += `\n      'PdBtn'        : { 'val': '`+ lists.PdBtn.val +`'},`}
        if(lists.PdBtnPdgo.val)    { sharecode += `\n      'PdBtnPdgo'    : { 'val': '`+ lists.PdBtnPdgo.val +`'},`}
        if(lists.PdBtnMore.val)    { sharecode += `\n      'PdBtnMore'    : { 'val': '`+ lists.PdBtnMore.val +`'},`}
        if(lists.PdBtnIntopdgo.val){ sharecode += `\n      'PdBtnIntopdgo': { 'val': '`+ lists.PdBtnIntopdgo.val +`'},`}
        
        if(lists.Pdit.val)         { sharecode += `\n      //特殊`}
        if(lists.Pdit.val)         { sharecode += `\n      'Pdit'         : { 'val': '`+ lists.Pdit.val +`'},`}
                                     sharecode += `\n    },`
      }
      if(intosetup.updated){
        sharecode += `\n    'updated' : `+ intosetup.updated +`,`
      }
      sharecode += `\n  },`
      return sharecode
    }, 
        
    showAllLayout(val){ //全公版列表
      if(val){
        var old_isexportTxt = this.htmlcode.isexportTxt; //紀錄舊資料
        var old_islinum     = this.htmlcode.islinum;
        var old_isLayoutNum = this.isLayoutNum;
        this.htmlcode.isexportTxt = true;
        this.htmlcode.islinum = true;
        var AllLayout = $('#AllLayout');
        var intosetup = this.intosetup;
        var layouts   = this.layouts;
        AllLayout.empty();
        for(var i=0; i< layouts.length; i++){
          newPD_Layout(this,i)
        };
        //產出公版
        function newPD_Layout(_this,i){
          var h4,html;
          _this.toggleLayoutFu(layouts[i],i);
          h4 = '<br><h4>序號:'+ intosetup.group +'('+ intosetup.no +')　/　主軸方向: '+ intosetup.col +'　/　名稱: '+ intosetup.name +'　/　品數: 1排'+ intosetup.name2 +'，共'+ intosetup.linum +'品　/　Class: '+ intosetup.classname +'</h4><br>'
          html = _this.data2htmlcodeFu()
          AllLayout.append(h4)
          AllLayout.append(html)
        };
        this.htmlcode.isexportTxt = old_isexportTxt;
        this.htmlcode.islinum = old_islinum;
        this.isLayoutNum = old_isLayoutNum;
      } else {
        this.toggleLayoutFu(this.layouts[this.isLayoutNum],this.isLayoutNum); //取消切回上一個版型
      }
    },
    
    updateSwiperFu (){ //更新輪播器
      setTimeout(function(){
        Area_operate_adjust.update();
        Area_operate_adjust.updateSize();
        Area_operate_ofrenLayout.update();
        Area_operate_ofrenLayout.updateSize();
      },10)
    },
   
    clickToggleLayoutFu (layout,i){ //切換版型動作
      this.toggleLayoutFu(layout,i); //載入常用版型參數
      this.toggleTagDataFu(layout); //更新HTML的data-pd資料
      this.checkNowLayoutFu(); //檢查目前設定是否已存在常用版型內
      this.isToggleLayoutStartFu(); //切換版型時停用CSS-transition
      lazyLoadInstance.update();
    },
    
    vListsFu (){ //版控列表
      var text = '';
      text += this.v_lists.title + '\n';
      Object.entries(this.v_lists.list).forEach(([key,val]) => {
        text += val.v +' '+ val.time +' '+ val.txt + '\n';
      });
      var length = this.v_lists.list.length;
      var new_v = this.v_lists.list[length-1].time;
      return [new_v,text]
    },
    hammerFu (){ //可拖移物件
      Object.entries(this.isHammer).forEach(([key,val]) => {
        hammer(val);
      });
    }, 
    
    toastrFu(){ //彈跳訊息:最新更新內容
      var _list = this.v_lists.list;
      var _length = _list.length;
      var _num = (is_forPC)? this.v_lists.shownum : 0; //電腦手機訊息數量
      var num;
      if(_num === 0){
        return
      }
      for(let i=0; i<_num; i++){
        setTimeout(function(){
          num = _length - _num + i;
          toastr[ _list[num].type ]( (_list[num].message)? '說明: '+ _list[num].message:'' , _list[num].time +' '+ _list[num].txt)
        },600*i)
        if(i===_num-1){
          setTimeout(function(){
            toastr['info']( '', '↓↓最新更新內容(最近'+ _num +'筆)↓↓');
          },600*(i+1))
        }
      }
    },
 
    intoFu (){ //初始化
      if(this.isLayoutNum){
        var num = this.isLayoutNum;
        this.intosetup.no = num;
        this.clickToggleLayoutFu (PD_layout_data.layouts[num],num)
      }
    },
    
  },

  beforeMount (){
    //延遲載圖
    lazyLoadInstance = new LazyLoad({
        elements_selector: ".articleList .lazy", //物件
        //threshold: 300, //預載量 預設300
    });
    this.intoFu(); //初始化
  }, //Vue2.6-未綁定前

  mounted: function(){
    this.isNewIdFu(); //高亮最近新增的功能物件
    this.intoFu(); //初始化
    this.hammerFu(); //可拖移物件
    this.toastrFu(); //彈跳訊息:最新更新內容
  }, //Vue2.6-綁定後

  updated (){
    //Vue2.6-更新後
    Prism.highlightAll(); //更新code轉碼
    lazyLoadInstance.update();
  },

});

//駝峰轉連字元 
function camelcase2hyphenFu(val){
  return val.replace(/([A-Z])/g,"-$1").toLowerCase()
};


//全選文字
function SelectText(element) {
  var doc = document,
    text = doc.getElementById(element),
    range, selection;
  if (doc.body.createTextRange) {
    range = document.body.createTextRange();
    range.moveToElementText(text);
    range.select();
  } else if (window.getSelection) {
    selection = window.getSelection();
    range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range); //全選文字
    document.execCommand("copy"); //一鍵COPY
  }
}

//手動設定
var Area_operate_adjust = new Swiper('.Area_operate_adjust > .box', {
  //★5.2.1★滾動bar <div class="scrollbar swiper-scrollbar"></div>
  scrollbar: {
    el: '.Area_operate_adjust .swiper-scrollbar',
    hide: true, //自動隱藏
    draggable: true, //允許拖移
    snapOnRelease: false, //拖移不貼齊
  },
  //★5.2.1★左右切換-白色箭頭swiper-button-white, 黑色箭頭swiper-button-black
  navigation:{
    nextEl: '.Area_operate_adjust .swiper-button-next',
    prevEl: '.Area_operate_adjust .swiper-button-prev',
  },
  //★5.2.1★基本
  //grabCursor: true, //手掌游標
  //排版
  slidesPerView: 'auto', //顯示幾個
  //抵亢反彈
  freeMode: true, //取消只滑動1格,但不會貼齊(要貼齊要再加Sticky)
  mousewheel: true,  //滑鼠滾輪功能
  //★5.2.1★RWD(換成大於)
  breakpoints: {
    0: {
      direction: 'horizontal', //滑動方向-垂直(預設水平horizontal),最大包的Class要搭配設定swiper-container-vertical
    },
    768: {
      direction: 'vertical', //滑動方向-垂直(預設水平horizontal),最大包的Class要搭配設定swiper-container-vertical
    },
  },
});
//常用版型
var Area_operate_ofrenLayout = new Swiper('.Area_operate_ofrenLayout > .box', {
  //★5.2.1★滾動bar <div class="scrollbar swiper-scrollbar"></div>
  scrollbar: {
    el: '.Area_operate_ofrenLayout .swiper-scrollbar',
    hide: true, //自動隱藏
    draggable: true, //允許拖移
    snapOnRelease: false, //拖移不貼齊
  },
  //★5.2.1★左右切換-白色箭頭swiper-button-white, 黑色箭頭swiper-button-black
  navigation:{
    nextEl: '.Area_operate_ofrenLayout .swiper-button-next',
    prevEl: '.Area_operate_ofrenLayout .swiper-button-prev',
  },
  //★5.2.1★基本
  //grabCursor: true, //手掌游標
  //排版
  slidesPerView: 'auto', //顯示幾個
  //抵亢反彈
  freeMode: true, //取消只滑動1格,但不會貼齊(要貼齊要再加Sticky)
  mousewheel: true,  //滑鼠滾輪功能
  //★5.2.1★RWD(換成大於)
  breakpoints: {
    0: {
      direction: 'horizontal', //滑動方向-垂直(預設水平horizontal),最大包的Class要搭配設定swiper-container-vertical
    },
    768: {
      direction: 'vertical', //滑動方向-垂直(預設水平horizontal),最大包的Class要搭配設定swiper-container-vertical
      spaceBetween: 4, //間距
    },
  },
});
function resizeSwiperFu(){
  if(is_forPC){
    $('.Area_operate_adjust > .box').addClass('swiper-no-swiping');
    $('.Area_operate_ofrenLayout > .box').addClass('swiper-no-swiping');
  } else {
    $('.Area_operate_adjust > .box').removeClass('swiper-no-swiping');
    $('.Area_operate_ofrenLayout > .box').addClass('swiper-no-swiping');
  }
};resizeSwiperFu();

window.addEventListener('resize',function(){
  Area_operate_adjust.update();
  Area_operate_adjust.updateSize();
  Area_operate_ofrenLayout.update(); 
  Area_operate_ofrenLayout.updateSize(); 
  resizeSwiperFu();
});
