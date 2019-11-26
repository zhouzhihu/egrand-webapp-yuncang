import $ from 'jquery';

module.exports = {
    ajax: function(ajaxParams,opt) {
        opt = $.extend({
            cache:false,                     //是否开启缓存，
            cacheKey:null,                   //指定缓存的key,默认自动吧url+JSON.stringify(ajaxParams.data)作为key
            cacheAge:3 * 60 * 1000,          //默认缓存3分钟
            cacheModule:ajaxParams.url,      //默认用url做模块名，用于批量删除统一模块写所有缓存
            refresh:false,                   //强制刷新缓存
            mock:false,                       //是否读取mock数据,开启后url会加上/mock前缀
            noAbort:false                     //默认切换页面会把所有未完成的ajax请求都abort掉,可以指定不abort的请求,比如一些上报接口
        },opt);

        var self = this;
        var defer = $.Deferred();
        var uuid = ++this._ajaxUuid;

        ajaxParams.dataType = 'json';
        ajaxParams.timeout=2*1000*60;
        //如果开启mock数据
        if(opt.mock){
            ajaxParams.url = '/mock'+ajaxParams.url;
        }

        //是否强制刷新缓存
        if(opt.refresh){
            this.cleanAjaxCache(ajaxParams.url);
        }

        //开启缓存
        var cacheKey;
        var dataHash;
        if(opt.cache){
            dataHash = JSON.stringify(ajaxParams.data || {});
            cacheKey = ajaxParams.url + dataHash;
            self._ajaxCacheKeyMap[opt.cacheModule] = self._ajaxCacheKeyMap[opt.cacheModule] || [];
            self._ajaxCacheKeyMap[opt.cacheModule].push(cacheKey);
            if(self._ajaxCache[cacheKey] && (new Date() - self._ajaxCache[cacheKey].cacheTime <= opt.cacheAge)){
                return defer.resolve(self._ajaxCache[cacheKey].data);
            }
        }
        
        var jqxhr = $.ajax(ajaxParams).done(function(result) {
            if(result.success && opt.cache){
                self._ajaxCache[cacheKey] = {
                    cacheTime:new Date(),
                    data:result
                }
            }
            defer.resolve(result);
        }).fail(function(err) {
            //如果是abort掉的请求都忽略掉不处理了.
            if(err.statusText === 'abort'){
                return;
            }
            defer.reject(err)
        }).always(function(){
            self._ajaxMap[uuid] && delete self._ajaxMap[uuid];
        })

        if(!opt.noAbort){
            self._ajaxMap[uuid] = jqxhr;
        }
        
        return defer;
    },
    cleanAjaxCache:function(moduleName){
        var self = this;
        if(self._ajaxCacheKeyMap[moduleName]){
            self._ajaxCacheKeyMap[moduleName].forEach(function(key){
                delete self._ajaxCache[key];
            })
            self._ajaxCacheKeyMap[moduleName].length = 0;
        }
    },
    abortAjax:function(){
        for(var key in this._ajaxMap){
            this._ajaxMap[key].abort();
            delete this._ajaxMap[key];
        }
    },
    _ajaxCache:{},        //统一ajax缓存
    _ajaxCacheKeyMap:{},  //模块名映射射具体的url+data,用于通过模块名批量删除缓存
    _ajaxUuid:0,          //每个ajax请求都有分配一个id
    _ajaxMap:{}           //通过id索引还没完成的ajax请求
}