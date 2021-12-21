// 每一次调用$.ge或$.post、$.ajax、时都会调用这个函数
$.ajaxPrefilter(function (options) {
  // 在此函数中我们可以拿到ajax配置的对象信息
  options.url = "http://ajax.frontend.itheima.net" + options.url;
});
