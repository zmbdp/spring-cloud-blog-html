const BaseUrl = "http://127.0.0.1:10030";
$(document).ajaxSend(function (e, xqr, op) {
    op.url = BaseUrl + op.url;
    var token = localStorage.getItem("user_token");
    xqr.setRequestHeader("user_token", token);
});
function getUserInfo(url) {
    console.log(url);
    $.ajax({
        type: "get",
        url: url,
        success: function (result) {
            console.log(result);
            if (result.code == 200 && result.data != null) {
                //页面填充
                var user = result.data;
                $(".left .card h3").text(user.userName);
                $(".left .card a").attr("href", user.githubUrl);
            } else {
                // 确保从正确的位置获取错误信息
                alert(result.errorMsg || "登录失败，请检查信息");
            }
        },
        error: function (error) {
            // 未登录
            if (error != null && error.status == 401) {
                alert("请先进行登录");
                location.href = "blog_login.html";
            }
        }
    });
}
function logout() {
    localStorage.removeItem("user_token");
    location.href = "blog_login.html";
}