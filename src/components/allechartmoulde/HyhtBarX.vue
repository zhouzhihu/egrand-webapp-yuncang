<template>
  <div class="echarts"></div>
</template>

<style>
.echarts {
  width: 600px;
  height: 400px;
}
</style>

<script>
import echarts from "echarts";
//import '../../node_modules/echarts/map/js/china'
import debounce from "lodash.debounce";
// enumerating ECharts events for now
const ACTION_EVENTS = [
  "legendselectchanged",
  "legendselected",
  "legendunselected",
  "datazoom",
  "datarangeselected",
  "timelinechanged",
  "timelineplaychanged",
  "restore",
  "dataviewchanged",
  "magictypechanged",
  "geoselectchanged",
  "geoselected",
  "geounselected",
  "pieselectchanged",
  "pieselected",
  "pieunselected",
  "mapselectchanged",
  "mapselected",
  "mapunselected",
  "axisareaselected",
  "brush",
  "brushselected"
];

const MOUSE_EVENTS = [
  "click",
  "dblclick",
  "mouseover",
  "mouseout",
  "mousedown",
  "mouseup",
  "globalout"
];

export default {
  props: {
    theme: String,
    initOptions: Object,
    group: String,
    autoResize: Boolean,
    autoPlay: Boolean
  },
  data() {
    return {
      chart: null,
      options: {}
    };
  },
  computed: {
    // Only recalculated when accessed from JavaScript.
    // Won't update DOM on value change because getters
    // don't depend on reactive values
    width: {
      cache: false,
      get() {
        return this.chart.getWidth();
      }
    },
    height: {
      cache: false,
      get() {
        return this.chart.getHeight();
      }
    },
    isDisposed: {
      cache: false,
      get() {
        return this.chart.isDisposed();
      }
    }
  },
  watch: {
    // use assign statements to tigger "options" and "group" setters
    options: {
      handler(options) {
        if (!this.chart && options) {
          this._initChart();
        } else {
          this.chart.setOption(this.options, true);
        }
      },
      deep: true
    },
		// 监听传入值变化重新渲染图表
		initOptions:{
			handler(options){
				if (!this.chart && options) {
					this._initChart();
				}else{
					this.FormatData(this.initOptions)
					this.chart.setOption(this.options, true);
				}
			
			}
		},
    group: {
      handler(group) {
        this.chart.group = group;
      }
    },
    autoPlay: {
      handler(flag) {
        if (flag) {
          this.__play();
        } else {
          this.__autoPlayId && clearTimeout(this.__autoPlayId);
        }
      }
    }
  },
  methods: {
    FormatData(data){
      // 处理纵向柱状图echart需要的标准数据
      var dealseries = [];
      data.series.forEach((el, index) => {
        var objseries = {
          name: el.name,
          barWidth: 8,
          itemStyle: {
            normal: {
              barBorderRadius: [5, 5, 5, 5]
            }
          },
          type: "bar",
          data: el.data
        };
        dealseries.push(objseries);
      });
      this.options = {
        yAxis: [
          {
            type: "value",
            name: "元",
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            nameTextStyle: {
              color: "#666"
            },
            axisLabel: {
              show: false,
              color: "#666"
            },
            axisLine: {
              lineStyle: {
                color: "#e9e9e9"
              }
            }
          }
        ],
        xAxis: [
          {
            type: "category",
            data: data.xAxis,
            axisLine: {
              lineStyle: {
                color: "#e9e9e9"
              }
            },
            axisLabel: {
              color: "#666"
            },
            axisTick: {
              show: false
            }
          }
        ],
        color: ["#80BAF9", "#98D87D", "#FFD86E", "#F3857B", "#8996E6", "#49A9EE"],
        legend: {
          data: data.legend,
          type: "scroll",
          bottom: 0,
          left: "center",
          icon: "circle"
        },
        series: dealseries,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            show: false,
            type: "shadow"
          }
        },
        title: {
          text: "",
          subtext: ""
        }
      };
    },
    // provide a explicit merge option method
    mergeOptions(options) {
      this._delegateMethod("setOption", options);
    },
    // just delegates ECharts methods to Vue component
    // use explicit params to reduce transpiled size for now
    // 重置
    resize(options) {
      this._delegateMethod("resize", options);
    },
    // 触发图表行为
    dispatchAction(payload) {
      this._delegateMethod("dispatchAction", payload);
    },
    // 转换坐标系上的点到像素坐标值
    convertToPixel(finder, value) {
      return this._delegateMethod("convertToPixel", finder, value);
    },
    // 转换像素坐标值到逻辑坐标系上的点
    convertFromPixel(finder, value) {
      return this._delegateMethod("convertFromPixel", finder, value);
    },
    // 判断给定的点是否在指定的坐标系或者系列上
    containPixel(finder, value) {
      return this._delegateMethod("containPixel", finder, value);
    },
    // 显示加载动画
    showLoading(type, options) {
      options = options || {
        text: "图表加载中...",
        color: "#3ad8fd",
        textColor: "#3ad8fd",
        maskColor: "rgba(255, 255, 255, 1)",
        zlevel: 0
      };
      this._delegateMethod("showLoading", type, options);
    },
    //隐藏加载动画
    hideLoading() {
      this._delegateMethod("hideLoading");
    },
    //导出图片
    getDataURL(options) {
      return this._delegateMethod("getDataURL", options);
    },
    //导出联动的图表图片
    getConnectedDataURL(options) {
      return this._delegateMethod("getConnectedDataURL", options);
    },
    // 清空当前实例，会移除实例中所有的组件和图表
    clear() {
      this._delegateMethod("clear");
    },
    // 销毁实例
    dispose() {
      this._delegateMethod("dispose");
    },
    _delegateMethod(name, ...args) {
      if (!this.chart) {
        console.error(
          `Cannot call [${name}] before the chart is initialized. Set prop [options] first.`
        );
        return;
      }
      return this.chart[name](...args);
    },
    //初始化图表事件
    _initChart() {
      if (this.chart) {
        return;
      }
      let chart = echarts.init(this.$el, this.theme, this.initOptions);
      chart.setOption(this.options, true);
      // expose ECharts events as custom events
      ACTION_EVENTS.forEach(event => {
        chart.on(event, params => {
          this.$emit(event, params);
        });
      });
      MOUSE_EVENTS.forEach(event => {
        chart.on(event, params => {
          this.$emit(event, params);

          // for backward compatibility, may remove in the future
          this.$emit("chart" + event, params);
        });
      });

      if (this.autoResize) {
        this.__resizeHanlder = debounce(
          () => {
            chart.resize();
          },
          100,
          { leading: true }
        );
        window.addEventListener("resize", this.__resizeHanlder);
      }

      var self = this;
      this.__playIndex = 0;
      this.__play = () => {
        this.__autoPlayId = setTimeout(function play() {
          if (
            self.options &&
            self.options.series &&
            self.options.series.length > 0
          ) {
            for (let i = 0; i < self.options.series.length; i++) {
              let len =
                self.options.series[i].data &&
                self.options.series[0].data.length;
              if (len > 0) {
                chart.dispatchAction({
                  type: "downplay",
                  seriesIndex: i,
                  dataIndex: self.__playIndex % len
                });
                chart.dispatchAction({
                  type: "highlight",
                  seriesIndex: i,
                  dataIndex: ++self.__playIndex % len
                });
              }
            }
          }
          this.__autoPlayId = setTimeout(play, 2000);
        }, 0);
      };

      if (this.autoPlay) {
        this.__play();
      }

      this.chart = chart;
    }
  },
  destroyed() {
    this.chart = this.dispose;
  },
  created() {
     // 处理echart需要的标准数据
    this.FormatData(this.initOptions);
  },
  mounted() {
    // auto init if `options` is already provided
    if (this.options) {
      this._initChart();
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    if (this.autoResize) {
      window.removeEventListener("resize", this.__resizeHanlder);
    }
    this.dispose();
  },
  connect(group) {
    if (typeof group !== "string") {
      group = group.map(chart => chart.chart);
    }
    echarts.connect(group);
  },
  disconnect(group) {
    echarts.disconnect(group);
  },
  registerMap(...args) {
    echarts.registerMap(...args);
  },
  registerTheme(...args) {
    echarts.registerTheme(...args);
  }
};
</script>
