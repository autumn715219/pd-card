/*
 * Ghvzon
 * 表單UI MuiForm-v0.1
 *******************************************************************
 *  --2020.08.07--新增UI-選項樣式1-勾勾
 *  --2020.03.09--新增UI-輸入欄input,下拉選單select,上傳file
 *******************************************************************
 */ 

/*MuiForm*/
$(function(){
  var MuiForm = 'MuiForm';
  var MuiForm_box = 'MuiForm_box';
  var MuiForm_input = 'MuiForm_input';
  var MuiForm_select = 'MuiForm_select';
  var MuiForm_upload = 'MuiForm_upload';
  var MuiForm_preview_img = 'MuiForm_preview_img'; //預覽圖位置
  var MuiForm_btn_clear = 'MuiForm_btn_clear'; //清除
  var is_shrink = 'is_shrink'; //飄移
  var is_focused = 'is_focused'; //高亮
  var is_preview = 'is_preview'; //預覽
  function __class(val){ return val = '.'+val   }; //轉換CLASS
  function __jq(val){    return $(__class(val)) }; //轉換jQuery
  function add_shrink(_self)    { _self.parents(__class(MuiForm)).addClass(is_shrink) }; //加飄移
  function remove_shrink(_self) { _self.parents(__class(MuiForm)).removeClass(is_shrink) }; //刪飄移
  function add_focused(_self)   { _self.parents(__class(MuiForm)).addClass(is_focused) }; //加高亮
  function remove_focused(_self){ _self.parents(__class(MuiForm)).removeClass(is_focused) }; //刪高亮
  function add_preview(_self)   { _self.parents(__class(MuiForm)).addClass(is_preview) }; //加預覽
  function remove_preview(_self){ _self.parents(__class(MuiForm)).removeClass(is_preview); _self.parents(__class(MuiForm)).find(__class(MuiForm_upload))[0].value = ''; }; //刪預覽
  function readURL(_self){
    var input = _self.parents(__class(MuiForm)).find('input');
    if(input[0].files[0]){
      var reader =  new FileReader();
      reader.readAsDataURL(input[0].files[0])
      reader.onload = function(e){
        _self.parents(__class(MuiForm)).find(__class(MuiForm_preview_img)).attr('style', 'background-image: url('+ e.target.result +');');
      }
    }
  }; //預覽圖片
  
  //input
  __jq(MuiForm_input).focusin(function(){
    var _self = $(this);
    add_focused(_self); //加高亮
    add_shrink(_self); //加飄移
  });
  __jq(MuiForm_input).focusout(function(){
    var _self = $(this);
    remove_focused(_self); //刪高亮
    (_self.val() == '') ? remove_shrink(_self):'';  //刪飄移
  }); 
  //select
  __jq(MuiForm_select).focusin(function(){
    var _self = $(this);
    add_focused(_self); //加高亮
    add_shrink(_self); //加飄移
  });
  __jq(MuiForm_select).focusout(function(){
    var _self = $(this);
    remove_focused(_self); //刪高亮
    (_self[0].selectedIndex == 0) ? remove_shrink(_self):'';  //刪飄移
  }); 
  //file
  __jq(MuiForm_upload).focusin(function(){
    var _self = $(this);
    add_focused(_self); //加高亮
  });
  __jq(MuiForm_upload).focusout(function(){
    var _self = $(this);
    remove_focused(_self); //刪高亮
  }); 
  __jq(MuiForm_upload).change(function(){
    var _self = $(this);
    readURL(_self);
    add_preview(_self); //加預覽
  });
  __jq(MuiForm_btn_clear).click(function(){
    var _self = $(this);
    remove_preview(_self); //刪預覽
  });  
});
  
//品牌與型號連動設定
function renew(_self,index){
  var selectModel = document.querySelectorAll('#selectModel')
  selectModel[0].length = 1
  if( index !== 0){
    var brand = _self.options[index].value;
    var model = phoneBrandModelList[brand]
    var modelLength = phoneBrandModelList[brand].length
    for(var i=0;i<modelLength;i++)
    selectModel[0].options[i+1] = new Option( model[i],model[i] )
    selectModel[0].length = modelLength+1;
  }
};
  