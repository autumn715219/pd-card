//元件data
var PD_layout_data = {
  
  //設定初始化頁籤
  v_num: 'v1.0-', //版本號
  v_lists: {
    title: '[版本紀錄] Ghvzon-@2020-2021',
    shownum: 1,
    list : [
      //類型 新增=success  修改=error  更版=info
      { v: 'v0.0-', time: '',           type: 'info',    txt: 'beta'},
      { v: '　　　', time: '2021/01/18', type: 'success', txt: '<br>新增版型 -> 常用版型/一課版型、二課版型'},
      { v: '　　　', time: '2021/01/19', type: 'success', txt: '<br>新增功能 -> 常用版型/可單獨指定圖片狀態(去背/情境)'},
      { v: '　　　', time: '2021/01/20', type: 'success', txt: '<br>新增功能 -> 下載CSS'},
      { v: '　　　', time: '2021/01/25', type: 'success', txt: '<br>新增功能 -> 匯出HTMLcode/顯示入搞資料(可選擇)'},
      { v: '　　　', time: '2021/01/27', type: 'success', txt: '<br>新增功能 -> 匯出HTMLcode/刪除隱藏標籤(可選擇)'},
      { v: 'v1.0-', time: '',           type: 'info',    txt: '教育訓練發佈'},
      { v: '　　　', time: '2021/01/28', type: 'success', txt: '<br>新增功能 -> 下載CSS/顯示最新版控時間，與css檔案版本'},
      { v: '　　　', time: '2021/01/28', type: 'success', txt: '<br>新增版型 -> 特殊/(1)加入購物車、(2)領折價券' , message: 'PD_layout.css 更新v20210128'},
      { v: '　　　', time: '2021/02/01', type: 'error',   txt: '<br>修正CSS -> 修正IE跑板問題+修正彈跳視窗套件影響body字級問題' , message: 'PD_layout.css 更新v20210201'},
      { v: '　　　', time: '2021/02/01', type: 'success', txt: '<br>新增功能 -> 手動設定/特殊/IT機制', message: '折價券/加入購物車機制，看更多連結不要另開新視窗'},
      { v: '　　　', time: '2021/02/03', type: 'error',   txt: '<br>修正CSS -> 二課D2_01公版調整', message: 'PD_layout.css 更新v20210203'},
      {
        v: '　　　', 
        time: '2021/02/22', 
        type: 'success',
        txt: '<br>新增版型 -> 一課/(6)D1_02B(排行榜)、特殊/(3)領折價券(BN翻牌)'
            +'<br>修正CSS -> 一課/4,5,6，套輪播器時調整ul設定'
            +'<br>修改功能 -> 常用功版依分類編號', 
        message: 'PD_layout.css 更新v20210222'
      },
      { 
        v: '　　　', 
        time: '2021/03/02', 
        type: 'error',   
        txt: '<br>修正CSS -> 一課/(1)BN用、二課/(14)D2_04'
            +'<br>修正功能 -> 匯出HTMLcode/BN用版型刪除圖片預設延遲載圖src', 
        message: 'PD_layout.css 更新v20210302'
      },
      { 
        v: '　　　', 
        time: '2021/03/15', 
        type: 'success',
        txt: '<br>新增版型 -> 二課/(21)~(27)'
            +'<br>新增功能 -> 分享目前設定'
            +'<br>新增功能 -> 進階工具/全公版列表、測試間距、ECM入搞擴充程式'
            +'<br>修改功能 -> 手動設定/佈局/主軸方向、手機品數',
        message: 'PD_layout.css 更新v20210315-15:00'
      },
      { 
        v: '　　　', 
        time: '2021/03/24', 
        type: 'success',
        txt: '<br>新增版型 -> 一課/(2)BN用-PC/Phone圖不共用'
            +'<br>新增版型 -> 二課/(7)搶購品'
            +'<br>修改功能 -> 進階工具/ECM入搞擴充程式',
        message: 'PD_layout.css 更新v20210324-20:00'
      },
      { 
        v: '　　　', 
        time: '2021/09/29', 
        type: 'success',
        txt: '<br>新增版型分類 -> BN'
            +'<br>新增版型 -> BN/(3)(4)(5)'
            +'<br>新增功能 -> 下載CSS/可選擇下載類型(CSS壓縮格式、CSS未壓縮格式、SCSS格式)',
        message: 'PD_layout.css 更新v20210928-20:00'
      },
        
    ]
  },

  //初始化
  isGroupFilter      : '佈局', //頁籤位置--手動設定
  isLayoutGroupFilter: '二課', //頁籤位置--常用版型 二課
  isLayoutNum        : '6',    //高亮位置--常用版型
  isNewOfrenLayout   : [35,36,37], //[1,14,28,29,30,31,32,33,34], //高亮最近新增的常用版型
  isNewId            : ['.Area_operate_Layoutfilter .box_1_box[data-title="BN"]','.Area_header .box_5'], //['.Area_header .box_6','.Area_header .box_7','#adjust_2','#adjust_4'], //高亮最近新增的功能物件
  isHammer           : [], //['.Area_EcmCode.js-hammer','.Area_sharecode.js-hammer'], //可拖移物件
  
  //基本設定
  isPreview: false,
  isPreview_adjust: false,
  isPreview_ofrenLayout: false,
  isToggleLayoutIng: false, //切換時觸發停用CSS-transition
  isImgTransparent: false, //圖片狀態
  isImgTransparent_Array: [], //多圖片狀態
  intosetup: {
    hover    : false,
    no       : '',
    name     : '',
    name2    : '',
    col      : '',
    group    : '',
    classname: '', 
    linum    : 8, //當下品數
    old_linum: 8, //備份上一次品數
    css: {
      bgc    : '',
      libgc  : '',
    },
    updated  : '',
  },
  
  //進階工具
  debug: {
    hover          : false,
    ispadding      : false, //測試間距
    isshowAllLayout: false, //顯示全公版列表
    isEcmCode      : {      //ECM進階功能
      hover : false,
      code  : `
    /* --------------------------------------
     * ECM入稿機制--進階功能-v20210315
     * --------------------------------------
     * ecmWriter_removeArea('.fixarea'); //針對ECM入稿區 (0)編輯模式時刪除
     * ecmWriter_showArea(''); //針對ECM入稿區 (0)編輯模式時顯示(純手機版位)
     * PdLayout_removeLi('.Area_AD,.Area_hoteven1,.Area_hoteven2'); //針對ECM入稿區 (1)沒入品隱藏
     * PdLayout_removeArea('.Area_AD'); //針對ECM入稿區 (2)全部品都沒有時整區隱藏
     * -------------------------------------- */
    //基本設定
    var is_trigger = false; //重覆觸發
    var is_forPC = document.body.clientWidth > 767; //forPC
    var is_Online = (location.protocol).indexOf('http') === 0; //線上
    var is_EcmWriter = document.querySelectorAll('input[id^="eWriterBtn"]').length > 0; //ECM編輯模式

    //啟動器
    ecmWriter_removeArea('.fixarea'); 
    //ecmWriter_showArea(''); //針對ECM入稿區 (0)編輯模式時顯示(純手機版位)
    //PdLayout_removeLi('.Area_AD,.Area_hoteven1,.Area_hoteven2'); //針對ECM入稿區 (1)沒入品隱藏
    //PdLayout_removeArea('.Area_AD'); //針對ECM入稿區 (2)全部品都沒有時整區隱藏

    //針對ECM入稿區進階功能
    function ecmWriter_removeArea(val){  //(0)編輯模式時刪除物件
     if(is_EcmWriter){ //執行時機
       let _self = $(val);
       //console.log(_self)
       if(_self.length>0){
         _self.remove();
         console.log(val,'在ECM編輯模式下暫持刪除');
       }
     }
    };
    function ecmWriter_showArea(val){  //(0)編輯模式時顯示(純手機版位)
     if(is_EcmWriter){ //執行時機
       let _self = $(val);
       //console.log(_self)
       if(_self.length>0){
         _self.attr('style','display:block !important');
         console.log(val,'在ECM編輯模式下暫持顯示(純手機版位)');
       }
     }
    };
    function PdLayout_removeLi(val){  //(1)沒入品刪除
      if(!is_EcmWriter && is_Online){ //執行時機
        $(val).find('.PD_slide').each(function(){
          var _this = $(this);
          (_this.attr('data-id') === '')? _this.remove():''
        });
      }
    };
    function PdLayout_removeArea(val){ //(2)全部品都沒有時整區刪除
      if(!is_EcmWriter && is_Online){ //執行時機
        $(val).each(function(){ 
          var _this = $(this);
          (_this.find('li').length === 0)? _this.remove():''
        })
      }
    };
      `,
    },
  },
  
  //匯出HTMLcode設定
  htmlcode: {
    hover        : false,
    fixed        : false, //放大視窗
    islinum      : false, //li數量
    isindent     : true,  //li縮排
    isloadinggif : false, //刪除loadinggif
    isdel        : false, //顯示隱藏元素
    isexportTxt  : false, //顯示入搞資料
  },

  //分享code設定
  sharecode: {
    hover        : false,
  },

  //下載CSS
  download: {
    hover : false,
  },

  //入搞文案 
  intotext: {
    hover : false,
    isTextFilter: 'exportTxt', //初始化高亮位置
    listname: {
        PD_txt1     : { val: '品牌'},
        PD_txt2     : { val: '品名'},
        PD_txt3     : { val: '特標'},
        PD_del      : { val: '原價'},
        PD_priceTxt : { val: '價錢標'},
        PD_price    : { val: '價錢'},
        PD_unit     : { val: '單位'},
        PD_logo     : { val: '品牌LOGO'},
        PD_img      : { val: '主圖'},
        PD_url      : { val: '連結-主商品'},
        More_url    : { val: '連結-看更多'},
    },
    listgroups : {
      test : '假字',
      exportTxt : '匯出',
    },
    lists : {
      test: {
        val : {
          PD_txt1     : { val: '【Apple 蘋果】'},
          PD_txt2     : { val: 'iPhone 12 Pro Max 128G'},
          PD_txt3     : { val: '破盤下殺現折2901'},
          PD_del      : { val: '39900'},
          PD_priceTxt : { val: ''},
          PD_price    : { val: '36999'},
          PD_unit     : { val: ''},
          PD_logo     : { val: 'images/logo.jpg'},
          PD_img      : { val: 'images/img'},
          PD_url      : { val: ''},
          More_url    : { val: ''},
        },
      },
      exportTxt: {
        val : {
          PD_txt1     : { val: ''},
          PD_txt2     : { val: ''},
          PD_txt3     : { val: ''},
          PD_del      : { val: ''},
          PD_priceTxt : { val: ''},
          PD_price    : { val: ''},
          PD_unit     : { val: ''},
          PD_logo     : { val: ''},
          PD_img      : { val: ''},
          PD_url      : { val: ''},
          More_url    : { val: ''},
        },
      },
    },
  },
    
  //版型--群組資料
  layouts_groups: {
    '一課'   : '#D63031',
    '二課'   : '#00BA94',
    'BN'     : '#0886E7',
    '特殊'   : '#E77152',
    //'品牌'   : '#FFCB6B',
    //''     : '#00CFCE',
    //''    : '#0886E7',
  },
  //版型--data
  layouts: [],

  //手動設定--群組資料
  lists_groups: {
   'ALL'      : '#E40480',
   '佈局'      : '#00BA94',
   '主圖區'    : '#0886E7',
   '品牌LOGO區': '#FFCB6B',
   '文案區'    : '#E77152',
   '文字樣式'   : '#D63031',
   '按鈕'      : '#00CFCE',
  },
  //↓手動設定--設定列表↓
  lists: {
    //佈局
    
    FsBnPc : {//20220818新增
      group : '佈局',
      name  : '(電腦)第一個商品BN',
      option:  [[false,'無=公版li(預)'],['true 1','占比lix1'],['true 2','占比lix2'],['true 3','占比lix3'],['true 4','占比lix4'],['true 5','占比lix5'],],
      val   : false,
    },
    
    FsBnPhone : {//20220818新增
      group : '佈局',
      name  : '(手機)第一個商品BN',
      option:  [[false,'無=公版li(預)'],['true 1','占比lix1'],['true 2','占比lix2'],['true 3','占比lix3'],['true 4','占比lix4'],['true 5','占比lix5'],],
      val   : false,
    },
    
    PdColPc : {
      group : '佈局',
      name  : '電腦版',
      option: [['1','1'],['2','2'],['3','3'],['4','4(預)'],['5','5'],['6','6'],['7','7'],['8','8'],
      ['4 wide','4鬆'],['5 wide','5鬆']],
      val   : '5',
    },      

    PdColPhone : {
      group : '佈局',
      name  : '手機版',
      option: [['1','1'],['2','2(預)'],['3','3'],['4','4'],
                 ['2 wide','2鬆'],['3 wide','3鬆'],],
      val   : '2',
    },
    PdDirection : {
      group : '佈局',
      name  : '主軸方向',
      option: [[false,'無=直(預)'],['row','橫'],['row-reverse','橫反向'],
                 ['pc-row','PC橫'],['pc-row-reverse','PC橫反向'],
                 ['phone-row','Phone橫'],['phone-row-reverse','Phone橫反向'],
                ],
      val   : false,
    },
    PdLi : {
      group : '佈局',
      name  : '品底色',
      option: [[false,'無=白(預)'],['off','透明'],['BN','純BN(RWD共用)'],['BN-AWD','純BN (PC/MB不共用)'],],
      val   : false,
    },
    PdLiNum : {
      group : '佈局',
      name  : '手機品數',
      option: [[false,'無=(預)'],['even','單數'],['odd','雙數'],],
      val   : false,
    },

    //商品主圖區
    PdBr : {
      group : '主圖區',
      name  : '圓角(含li圓角)',
      option: [[false,'無=0(預設)'],['1','1'],['2','2'],['3','3'],['4','4'],['50%','50%'],],
      val   : false,
    },
    PdImg : {
      group : '主圖區',
      name  : '間距',
      option: [[false,'無=1(預設)'],['0','0'],['1','1(預設)'],['2','2'],['3','3'],['4','4'],],
      val   : false,
    },
    PdPdimg : {
      group : '主圖區',
      name  : '商品主圖區',
      option: [['off','隱藏'],[false,'顯示(預)'],],
      val   : false,
    },
    
    //品牌LOGO圖區
    PdPdlogo : {
      group : '品牌LOGO區',
      name  : 'LOGO圖',
      option: [[false,'隱蔵(預)'],[true,'無樣式'],['1','矩型'],['2','膠囊型'],['3','圓型'],['4','圓角矩型(依圖片)'],],
      val   : false,
    },
    PdPdlogoTa : {
      group : '品牌LOGO區',
      name  : '對齊',
      option: [[false,'無=置中(預)'],['left','置左'],['right','置右'],],
      val   : false,
    },
    
    //商品文案區
    PdH3 : {
      group : '文案區',
      name  : '特標',
      option: [['off','隱藏'],[false,'無底色(預)'],['1','矩型'],['2','膠囊型'],['3','對角線圓角矩型'],['4','緞帶'],['5','灰底小圓角矩型'],['6','右上角標籤'],],
      val   : false,
    },
    PdH4 : {
      group : '文案區',
      name  : '品牌+品名',
      option: [['off','隱藏'],[false,'無=2行(預)'],['1','1行'],['3','3行'],],
      val   : false,
    },
    PdP : {
      group : '文案區',
      name  : '價錢',
      option: [['off','隱藏'],['off-del','隱藏原價'],[false,'顯示(預)'],],
      val   : false,
    },
    PdNumber : {
      group : '文案區',
      type  : 'checkbox',
      name  : '序號',
      option: [[false,'隱蔵(預)'],[true,'顯示'],
                 ['-r','相對定位'],['-a','絕對定位'],
                 ['top','上'],['bottom','下'],['left','左'],['right','右'],['col-center','水平置中'],['row-center','垂直置中']
                ],
      val   : false,
      val_checkbox : [false],
    },
    
    //文字樣式
    PdInto : {
      group : '文字樣式',
      name  : '區塊對齊',
      option: [['off','隱藏'],[false,'無=置前(預)'],['center','置中'],],
      val   : false,
    },
    PdTa : {
      group : '文字樣式',
      name  : '文字對齊',
      option: [[false,'無=置中(預)'],['left','置左'],['right','置右'],],
      val   : false,
    },
    PdFsPc : {
      group : '文字樣式',
      name  : '字級-電腦版',
      option: [[false,'無=300(預)'],['100','100'],['200','200'],['300','300(預)'],['400','400'],['500','500'],['600','600'],['700','700'],['800','800'],['900','900'],],
      val   : false,
    },
    PdFsPhone : {
      group : '文字樣式',
      name  : '字級-手機版',
      option: [[false,'無=400(預)'],['100','100'],['200','200'],['300','300'],['400','400(預)'],['500','500'],['600','600'],['700','700'],['800','800'],['900','900'],],
      val   : false,
    },
    
    //按鈕
    PdBtn : {
      group : '按鈕',
      name  : '樣式',
      type  : 'checkbox',
      option: [[false,'false=隱藏(預)'],[true,'顯示=無=矩型'],
                 ['box-0','白底矩型'],['box-1','圓角矩型'],['box-2','膠囊型'],['box-3','分隔線'],['box-4','純文字'],
                 ['line-1','線框矩型'],
                 ['icon-1','圓型'],['icon-2','三角'],['icon-3','Go'],
                 ['-r','相對定位'],['-a','絕對定位'],
                 ['top','上'],['bottom','下'],['left','左'],['right','右'],['col-center','水平置中'],['row-center','垂直置中'],
                ], 
      val   : false,
      val_checkbox : [false],
    },
    PdBtnPdgo : {
      group : '按鈕',
      name  : '搶購',
      option: [[false,'隱蔵(預)'],[true,'顯示'],],
      val   : false,
    },
    PdBtnMore : {
      group : '按鈕',
      name  : '看更多',
      option: [[false,'隱蔵(預)'],[true,'顯示'],],
      val   : false,
    },
    PdBtnIntopdgo : {
      group : '按鈕',
      name  : '*文案區的搶購',
      option: [[false,'隱蔵(預)'],[true,'顯示'],],
      val   : false,
    },
    
    //特殊機制
    Pdit : {
      group : '特殊',
      name  : 'IT機制',
      option: [[false,'無(預)'],['more','看更多按鈕取消另開視窗'],],
      val   : false,
    },
    

    
    
  },
  //↑l手動設定↑

}
