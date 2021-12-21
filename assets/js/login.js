$(function () {
  // 点击去注册账号
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  // 点击去登录
  $("#link_login").on("click", function () {
    $(".reg-box").hide();
    $(".login-box").show();
  });

  // 从layui中获取form对象
  var form = layui.form;
  var layer = layui.layer;
  // 通过form.verify()函数自定义校验规则
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repwd: function (value) {
      var pwd = $("#password").val();
      if (value != pwd) {
        return "两次密码不一致";
      }
    },
  });

  // 监听注册表单的提交
  $("#form_reg").on("submit", function (e) {
    e.preventDefault();
    $.post(
      "/api/reguser",
      { username: $("#username").val(), password: $("#password").val() },
      function (res) {
        console.log("1");
        if (res.status !== 0) {
          return layer.message(res.message);
        }
        layer.message("注册成功");
        $("#link_login").click();
      }
    );
  });
  $("#form_login").submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/api/login",
      data: "data",
      dataType: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("登录失败");
        }
        layer.msg("登录成功");

        //   将获取的token存入localstorage
        localStorage.setItem("token", res.token);

        location.href = "/index.html";
      },
    });
  });
});
