/**
 * vanilla-lazyload
 * Project home: https://github.com/verlok/lazyload
 * Version: 12.4.0
 */

/*
* Ghvzon lazyload-12.4.0-G0.1.2
*******************************************************************
*  --2020.11.17 轉UTF-8 lazyload--12.4.0-G0.1.2
*  --2019.12.09 update時，需先清空removeImgStyle(element); lazyload--12.4.0-G0.1.1
*  --2019.12.05【針對非正方型尺寸圖片新增data-size撐出暫位空間】lazyload-12.4.0-G0.1.0
*******************************************************************
*/

/* 2019.12.05【針對非正方型尺寸圖片新增data-size撐出暫位空間】--插入暫位背景圖css */
var _CSS_lazy_off = document.createElement('style'); document.getElementsByTagName('head')[0].appendChild( _CSS_lazy_off ); _CSS_lazy_off.innerHTML = '.articleList img.lazy_off { background-size: contain; background-repeat:no-repeat; background-position: center center; background-image:url(data:image/png;charset=utf-8;base64,R0lGODlhTAFMAcQSAO7u7v39/fDw8Pj4+P7+/vn5+fT09PX19ff39+/v7/Pz8/////b29vLy8vHx8fv7+/z8/Pr6+v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpERTdBNDIxMjg1NDkxMUU2ODJCRDkxNzcwQjZDQjcxNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpERTdBNDIxMzg1NDkxMUU2ODJCRDkxNzcwQjZDQjcxNiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkRFN0E0MjEwODU0OTExRTY4MkJEOTE3NzBCNkNCNzE2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkRFN0E0MjExODU0OTExRTY4MkJEOTE3NzBCNkNCNzE2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAAEgAsAAAAAEwBTAEABf+gJI5kaZ5oqq5s675wLM90bd94ru987//AoHBILBqPyKRyyWw6n9CodEqtWq/YrHbL7Xq/4LB4TC6bz+i0es1uu9/wuHxOr9vv+Lx+z+/7/4CBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/AAMKHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFP/qlzJsqXLlzBjyowZAIECBwJy6tzJs6fPn0B/OjBQYIGLBQUM4AzKtKnTnQ0YQDA3IAGAq1izat3KtavXr1kFPGDxQADYs2jTcj1gVBwCtXDjpk0wNsUDq3Lz6gWgoO23B3sD7xVAAAUBs4ITo2UQroHix2kRoHgLufLWBIW9BbDMmasDFA46iy7wLYLo01czk1iAmvOBbwVai1Y9YrNsyAZg3+ZMW4Tt3Ylze4sNHHJvCb+L7xXejbjyxMeTP5fLnJvz6Xujq1VwoLv37+DDiwcfGm31bdex59V+VsBUIQPM6z5rYPx3x/Tte8cPlj3YukMwQN98YAXAQnxnGbgC/4L9mSCdZ0ZAMOBwaCmoAoNfWZgChl7555UCRrAG1nnapNeVhihweOKBaHnYFYhGTNhchSwmWGODJTy4FYxFyGgdjQsCeWGLDp7FIxE+oifkhkumSGSORh6RZIlNnqAiVyha+SQJOmp15BBTZmMiljdmWGaHRYL1pRBhYjPmVlmacCWcZ3blIldrBtHmNW9qFWcJc/pZJ1d37ijliASaGaSNi+LIZZQxIkoho0NSyuRZhXp56FckilmlnJ8CumVtkPYo6YyWOpmqlpim+VWeQOxpTZ9Z/UlCoLUOulWmWcH6g6zV0IqVrSPgOqyuWvGKla8+AEuNsFcRK4Kx0SKblf+yVzHLg4icJuqVtBJQCwC44mILQANGdJlVp26Gequ7xY7qG1rvDUFZt5MWaO2xjX5lLgAOHNfDXc5OA+24+1bbL5pQopXAAQNELPHEFFds8cQ2pcUun/BO23G48iKnXl4bz/qxuOSGrO7IXpUc7Mkwt9owy2q5/GzM+i5sp6s0y5evopXmHLS/JhDQs1qv/fxtwgjrTOgJiB0N1gDerug0nVcne4KAUgv946qggi2qzDni1fVa4Bycstjvkl3CwSwHnDbOQF/qqAkFmH32uQJTyXa8f3vstoMMOKA3ywkoQNpMjDfu+OOQRy755JRXbvnlmEcEwQFRS52AAwyA61v/4YePnPji4yzA9d5ZJYB6CnmzflUDfW9zgOxcvY437ljJDY5pvGuVwJ8BlM560t+UF3xWjG29PL/drCy7ACh0HjzV3gD/fFZ+jWA0ZFEVUAACB/D3GPJfb4/Vv2c5gECcBDxQuGI2G6z+tTznpQCAKzxggPE1q9rz2MeVBvDPBQG4nV7qJw24nY2ArcMeDSBgvgAqbXsQnJ3oVrCAe1kQVfcDQAYN0L0bRACAXWFgNA7GAAS48IUwdKECFhPDGmZscCJDmg8IpjEBYm1oS8sa/mZWsBlor4grpFsQgbgzIn6lASXkgQfxBcK6qcprVySaE7uSgHoBYYZIhIbamLa2/7vN6yySGYL0rqJCMSrRakx82hYvUzseKJCK6bMiq7C4Ry0+CizNI8Ia2/iMMQoRenbzI6nA4sUhVHArhHSGIeP4w0Qy7I9eSQASjBXJZkzSknAEpRwx+SIkSAiPSgocyFRZrvxtBX1E+F7LfCioQyqMklqbY1bSeAQUAqCTzPhkFpcoyl25Uiu8NIIvgbkMYfaRmMNsIim5EsgicCuFtMyVLZuGyyFO01BHkB4zleHMsPHRnIo8YyajGIQjcmWcySjn2M45z3Tm8CsHLNoOpgjJbCIymmTaprlKhgB4kuCRWjHoMeTZNno21J5rBEAjRyAgdOXglKj0m0MBt1HBmf/xnq86AWAAkAB2yuCOs7xgQLv5z2dKc5FnkeAIwAgA3c0Aoxn1FCvfOEqYgoUuqzEbYWxAAOXltF07TepHI3qVLvr0lyZlwQJoeqo8QtOlKy1mLr/5FfeIQJbLqiMKAoBQbKq0kgBFK1aNqctMLs56JC3KUaoCF4Uag6Ec1SM6L/nUtCigJl0RAAMeEFUIIACuYSwkT9W615eK4Jpx+d9XEtAAA7RwAORrgC/BAkuN6rWeV21sT0dg1ODZVKcdXWVqW2kCfsoOM/68pVa1ydLUnOAwz6umVUOZ1lrWVoQo4CHu+jI3pX72oXwtQVlwx5ZwRMAp4CoAdFkg3abUESmkSnmKdrfbk6hMNHPgDa94x0ve8pr3vOhNr3rXy972uve98I2vfOdL3/ra9774za9+98vf/vr3vwAOsIAHTOACG/jACE6wghfM4AY7+MEQjrCEJ0zhClv4whjOsIY3zOEOe/jDIA6xiEdM4hKb+MQoTrGKV8ziFrv4xTCOsYxnTOMa2/jGOM6xjnfM4x77+MdADrKQh0zkIhv5yEhOspKXzGRehAAAOw==);}';
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }
function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.LazyLoad = factory();
})(this, function () {
  'use strict';
  var runningOnBrowser = typeof window !== "undefined";
  var isBot = runningOnBrowser && !("onscroll" in window) || typeof navigator !== "undefined" && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent);
  var supportsIntersectionObserver = runningOnBrowser && "IntersectionObserver" in window;
  var supportsClassList = runningOnBrowser && "classList" in document.createElement("p");
  var defaultSettings = {
    elements_selector: ".lazy",
    container: isBot || runningOnBrowser ? document : null,
    threshold: 300,
    thresholds: null,
    data_src: "original",
    data_srcset: "srcset",
    data_sizes: "sizes",
    data_bg: "bg",
    data_poster: "poster",
    class_loading: "lazy-loading",
    class_loaded: "lazy-loaded",
    class_error: "lazy-error",
    load_delay: 0,
    auto_unobserve: true,
    callback_enter: null,
    callback_exit: null,
    callback_reveal: null,
    callback_loaded: null,
    callback_error: null,
    callback_finish: null,
    use_native: false
  };

  var getInstanceSettings = function getInstanceSettings(customSettings) {
    return _extends({}, defaultSettings, customSettings);
  };
  /* Creates instance and notifies it through the window element */

  var createInstance = function createInstance(classObj, options) {
    var event;
    var eventString = "LazyLoad::Initialized";
    var instance = new classObj(options);
    try {
      // Works in modern browsers
      event = new CustomEvent(eventString, {
        detail: {
          instance: instance
        }
      });
    } catch (err) {
      // Works in Internet Explorer (all versions)
      event = document.createEvent("CustomEvent");
      event.initCustomEvent(eventString, false, false, {
        instance: instance
      });
    }
    window.dispatchEvent(event);
  };
  /* Auto initialization of one or more instances of lazyload, depending on the options passed in (plain object or an array) */
  
  function autoInitialize(classObj, options) {
    if (!options) {
      return;
    }
    if (!options.length) {
      // Plain object
      createInstance(classObj, options);
    } else {
      // Array of objects
      for (var i = 0, optionsItem; optionsItem = options[i]; i += 1) {
        createInstance(classObj, optionsItem);
      }
    }
  }
  
  var dataPrefix = "data-";
  var processedDataName = "was-processed";
  var timeoutDataName = "ll-timeout";
  var trueString = "true";
  
  var getData = function getData(element, attribute) {
    return element.getAttribute(dataPrefix + attribute);
  };
  
  var setData = function setData(element, attribute, value) {
    var attrName = dataPrefix + attribute;
    if (value === null) {
      element.removeAttribute(attrName);
      return;
    }
    element.setAttribute(attrName, value);
  };

  var resetWasProcessedData = function resetWasProcessedData(element) {
    return setData(element, processedDataName, null);
  };

  var setWasProcessedData = function setWasProcessedData(element) {
    return setData(element, processedDataName, trueString);
  };

  var getWasProcessedData = function getWasProcessedData(element) {
    return getData(element, processedDataName) === trueString;
  };

  var setTimeoutData = function setTimeoutData(element, value) {
    return setData(element, timeoutDataName, value);
  };

  var getTimeoutData = function getTimeoutData(element) {
    return getData(element, timeoutDataName);
  };

  var purgeProcessedElements = function purgeProcessedElements(elements) {
    return elements.filter(function (element) {
      return !getWasProcessedData(element);
    });
  };

  var purgeOneElement = function purgeOneElement(elements, elementToPurge) {
    return elements.filter(function (element) {
      return element !== elementToPurge;
    });
  };

  var safeCallback = function safeCallback(callback, arg1, arg2, arg3) {
    if (!callback) {
      return;
    }
    if (arg3 !== undefined) {
      callback(arg1, arg2, arg3);
      return;
    }
    if (arg2 !== undefined) {
      callback(arg1, arg2);
      return;
    }
    callback(arg1);
  };

  var updateLoadingCount = function updateLoadingCount(instance, plusMinus) {
    instance._loadingCount += plusMinus;
    if (instance._elements.length === 0 && instance._loadingCount === 0) {
      safeCallback(instance._settings.callback_finish, instance);
    }
  };

  var getSourceTags = function getSourceTags(parentTag) {
    var sourceTags = [];
    for (var i = 0, childTag; childTag = parentTag.children[i]; i += 1) {
      if (childTag.tagName === "SOURCE") {
        sourceTags.push(childTag);
      }
    }
    return sourceTags;
  };

  var setAttributeIfValue = function setAttributeIfValue(element, attrName, value) {
    if (!value) {
      return;
    }
    element.setAttribute(attrName, value);
  };

  var setImageAttributes = function setImageAttributes(element, settings) {
    setAttributeIfValue(element, "sizes", getData(element, settings.data_sizes));
    setAttributeIfValue(element, "srcset", getData(element, settings.data_srcset));
    setAttributeIfValue(element, "src", getData(element, settings.data_src));
  };

  var setSourcesImg = function setSourcesImg(element, settings) {
    var parent = element.parentNode;
    if (parent && parent.tagName === "PICTURE") {
      var sourceTags = getSourceTags(parent);
      sourceTags.forEach(function (sourceTag) {
        setImageAttributes(sourceTag, settings);
      });
    }
    setImageAttributes(element, settings);
  };

  var setSourcesIframe = function setSourcesIframe(element, settings) {
    setAttributeIfValue(element, "src", getData(element, settings.data_src));
  };

  var setSourcesVideo = function setSourcesVideo(element, settings) {
    var sourceTags = getSourceTags(element);
    sourceTags.forEach(function (sourceTag) {
      setAttributeIfValue(sourceTag, "src", getData(sourceTag, settings.data_src));
    });
    setAttributeIfValue(element, "poster", getData(element, settings.data_poster));
    setAttributeIfValue(element, "src", getData(element, settings.data_src));
    element.load();
  };

  var setSourcesBgImage = function setSourcesBgImage(element, settings) {
    var srcDataValue = getData(element, settings.data_src);
    var bgDataValue = getData(element, settings.data_bg);
    if (srcDataValue) {
      element.style.backgroundImage = "url(\"".concat(srcDataValue, "\")");
    }
    if (bgDataValue) {
      element.style.backgroundImage = bgDataValue;
    }
  };

  var setSourcesFunctions = {
    IMG: setSourcesImg,
    IFRAME: setSourcesIframe,
    VIDEO: setSourcesVideo
  };

  var setSources = function setSources(element, instance) {
    var settings = instance._settings;
    var tagName = element.tagName;
    var setSourcesFunction = setSourcesFunctions[tagName];
    if (setSourcesFunction) {
      setSourcesFunction(element, settings);
      updateLoadingCount(instance, 1);
      instance._elements = purgeOneElement(instance._elements, element);
      return;
    }
    setSourcesBgImage(element, settings);
  };

  var addClass = function addClass(element, className) {
    if (supportsClassList) {
      element.classList.add(className);
      return;
    }
    element.className += (element.className ? " " : "") + className;
  };

  var removeClass = function removeClass(element, className) {
    if (supportsClassList) {
      element.classList.remove(className);
      return;
    }
    element.className = element.className.replace(new RegExp("(^|\\s+)" + className + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "");
  };

  var genericLoadEventName = "load";
  var mediaLoadEventName = "loadeddata";
  var errorEventName = "error";
  
  var addEventListener = function addEventListener(element, eventName, handler) {
    element.addEventListener(eventName, handler);
  };

  var removeEventListener = function removeEventListener(element, eventName, handler) {
    element.removeEventListener(eventName, handler);
  };

  var addEventListeners = function addEventListeners(element, loadHandler, errorHandler) {
    addEventListener(element, genericLoadEventName, loadHandler);
    addEventListener(element, mediaLoadEventName, loadHandler);
    addEventListener(element, errorEventName, errorHandler);
  };

  var removeEventListeners = function removeEventListeners(element, loadHandler, errorHandler) {
    removeEventListener(element, genericLoadEventName, loadHandler);
    removeEventListener(element, mediaLoadEventName, loadHandler);
    removeEventListener(element, errorEventName, errorHandler);
  };

  var eventHandler = function eventHandler(event, success, instance) {
    var settings = instance._settings;
    var className = success ? settings.class_loaded : settings.class_error;
    var callback = success ? settings.callback_loaded : settings.callback_error;
    var element = event.target;
    removeClass(element, settings.class_loading);
    addClass(element, className);
    safeCallback(callback, element, instance);
    updateLoadingCount(instance, -1);
  };

  var addOneShotEventListeners = function addOneShotEventListeners(element, instance) {
    var loadHandler = function loadHandler(event) {
      eventHandler(event, true, instance);
      removeEventListeners(element, loadHandler, errorHandler);
    };
    var errorHandler = function errorHandler(event) {
      eventHandler(event, false, instance);
      removeEventListeners(element, loadHandler, errorHandler);
    };
    addEventListeners(element, loadHandler, errorHandler);
  };

  var managedTags = ["IMG", "IFRAME", "VIDEO"];

  var onEnter = function onEnter(element, entry, instance) {
    var settings = instance._settings;
    safeCallback(settings.callback_enter, element, entry, instance);
    if (!settings.load_delay) {
      revealAndUnobserve(element, instance);
      return;
    }
    delayLoad(element, instance);
  };

  var revealAndUnobserve = function revealAndUnobserve(element, instance) {
    var observer = instance._observer;
    revealElement(element, instance);
    if (observer && instance._settings.auto_unobserve) {
      observer.unobserve(element);
    }
  };

  var onExit = function onExit(element, entry, instance) {
    var settings = instance._settings;
    safeCallback(settings.callback_exit, element, entry, instance);
    if (!settings.load_delay) {
      return;
    }
    cancelDelayLoad(element);
  };

  var cancelDelayLoad = function cancelDelayLoad(element) {
    var timeoutId = getTimeoutData(element);
    if (!timeoutId) {
      return; // do nothing if timeout doesn't exist
    }
    clearTimeout(timeoutId);
    setTimeoutData(element, null);
  };

  var delayLoad = function delayLoad(element, instance) {
    var loadDelay = instance._settings.load_delay;
    var timeoutId = getTimeoutData(element);
    if (timeoutId) {
      return; // do nothing if timeout already set
    }
    timeoutId = setTimeout(function () {
      revealAndUnobserve(element, instance);
      cancelDelayLoad(element);
    }, loadDelay);
    setTimeoutData(element, timeoutId);
  };

  /* 2019.12.05【針對非正方型尺寸圖片新增data-size撐出暫位空間】--加入暫位空間樣式*/
  var addImgStyle = function addImgStyle(element){
    if(element.tagName === "IMG"){
      element.classList.add('lazy_off'); //插入暫位背景圖css
      if(element.src === ""){
        element.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" //無src時放暫位元素1px空白gif  
      }
      if(element.dataset.size){
        if(element.style.cssText){ element.dataset.initialstyle = element.style.cssText; } //將原style值存起來
        var sizeArr = element.dataset.size.split(','); //拆字串轉陣列
        var height = ( sizeArr[3] / sizeArr[2] )*100; //撐出暫位空間
        element.style.width = '100%';
        element.style.height = '0';
        element.style.paddingBottom = height+'%';          
      }
    }
  };
  
  /* 2019.12.05【針對非正方型尺寸圖片新增data-size撐出暫位空間】--移除暫位空間樣式*/
  var removeImgStyle = function removeImgStyle(element){
    if(element.tagName === "IMG"){ 
      element.classList.remove('lazy_off'); //移除暫位背景圖css
      if(element.dataset.size){
        element.style.cssText = '';
        if(element.dataset.initialstyle){ element.style.cssText = element.dataset.initialstyle; element.dataset.initialstyle = '';} //將原style值拉回來
      }               
    }
  };
  
  var revealElement = function revealElement(element, instance, force) {
    var settings = instance._settings;
    if (!force && getWasProcessedData(element)) {
      return; // element has already been processed and force wasn't true
    }
    if (managedTags.indexOf(element.tagName) > -1) {
      addOneShotEventListeners(element, instance);
      addClass(element, settings.class_loading);
    }
    setSources(element, instance);
    removeImgStyle(element); //移除暫位空間樣式
    setWasProcessedData(element);
    safeCallback(settings.callback_reveal, element, instance);
    safeCallback(settings.callback_set, element, instance);
  };

  var isIntersecting = function isIntersecting(entry) {
    return entry.isIntersecting || entry.intersectionRatio > 0;
  };

  var getObserverSettings = function getObserverSettings(settings) {
    return {
      root: settings.container === document ? null : settings.container,
      rootMargin: settings.thresholds || settings.threshold + "px"
    };
  };

  var setObserver = function setObserver(instance) {
    if (!supportsIntersectionObserver) {
      return false;
    }
    instance._observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        return isIntersecting(entry) ? onEnter(entry.target, entry, instance) : onExit(entry.target, entry, instance);
      });
    }, getObserverSettings(instance._settings));
    return true;
  };

  var nativeLazyTags = ["IMG", "IFRAME"];

  var shouldUseNative = function shouldUseNative(settings) {
    return settings.use_native && "loading" in HTMLImageElement.prototype;
  };

  var loadAllNative = function loadAllNative(instance) {
    instance._elements.forEach(function (element) {
      if (nativeLazyTags.indexOf(element.tagName) === -1) {
        return;
      }
      element.setAttribute("loading", "lazy");
      revealElement(element, instance);
    });
  };

  var nodeSetToArray = function nodeSetToArray(nodeSet) {
    return Array.prototype.slice.call(nodeSet);
  };

  var queryElements = function queryElements(settings) {
    return settings.container.querySelectorAll(settings.elements_selector);
  };

  var getElements = function getElements(elements, settings) {
    return purgeProcessedElements(nodeSetToArray(elements || queryElements(settings)));
  };

  var retryLazyLoad = function retryLazyLoad(instance) {
    var settings = instance._settings;
    var errorElements = settings.container.querySelectorAll("." + settings.class_error);
    _toConsumableArray(errorElements).forEach(function (element) {
      removeClass(element, settings.class_error);
      resetWasProcessedData(element);
    });
    instance.update();
  };

  var setOnlineCheck = function setOnlineCheck(instance) {
    if (!runningOnBrowser) {
      return;
    }
    window.addEventListener("online", function (event) {
      retryLazyLoad(instance);
    });
  };
  
  var LazyLoad = function LazyLoad(customSettings, elements) {
    this._settings = getInstanceSettings(customSettings);
    this._loadingCount = 0;
    setObserver(this);
    this.update(elements);
    setOnlineCheck(this);
  };

  LazyLoad.prototype = {
    update: function update(elements) {
      var _this = this;
      var settings = this._settings;
      this._elements = getElements(elements, settings);
      if (isBot || !this._observer) {
        this.loadAll();
        return;
      }
      if (shouldUseNative(settings)) {
        loadAllNative(this);
        this._elements = getElements(elements, settings);
      }
      this._elements.forEach(function (element) {
        removeImgStyle(element); //移除暫位空間樣式
        addImgStyle(element); //加入暫位空間樣式
        _this._observer.observe(element);
      });
    },
    destroy: function destroy() {
      var _this2 = this;
      if (this._observer) {
        this._elements.forEach(function (element) {
          _this2._observer.unobserve(element);
        });
        this._observer = null;
      }
      this._elements = null;
      this._settings = null;
    },
    load: function load(element, force) {
      revealElement(element, this, force);
    },
    loadAll: function loadAll() {
      var _this3 = this;
      this._elements.forEach(function (element) {
        addImgStyle(element); //加入暫位空間樣式
        revealAndUnobserve(element, _this3);
      });
    }
  };
  /* Automatic instances creation if required (useful for async script loading) */
  if (runningOnBrowser) {
    autoInitialize(LazyLoad, window.lazyLoadOptions);
  }
  return LazyLoad;
});