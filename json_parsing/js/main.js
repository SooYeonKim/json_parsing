$("document").ready(function(){
  var list_box = $('.list_box');
  var paging = $('.paging');
  var obj = null;
  var dataPerPage = 4;
  var currentPage = 0;

  parsingData();

  $(document).on("click", "#btnPage", function(){
    currentPage = $(this).index();
    showData();
  })

  function parsingData(){
    $.ajax({
      type: "GET",
      url: "http://15.165.194.195/api/v1/test/car_list",
      dataType: "json",
      success: function(data) {
        obj = data;
        showData();
      },
      error: function(xhr, status, error) {
        alert("에러 발생");
      }
    });
  }

  function showData(){
    var data = obj.body;
    var result = "";
    var setNum = currentPage*dataPerPage+dataPerPage;

    if(setNum > data.length) {
      setNum = data.length;
    }

    for (var i = currentPage*dataPerPage; i < setNum; i++) {
      result += '<li class="list">';
      result += '<p class="car_id">ID: ' + data[i].car_id + '</p>';
      result += '<h2 class="car_nm">' + data[i].car_nm + '</h2>';
      result += '<p class="car_num">' + data[i].car_num + '</p>';
      result += '<p class="car_type">' + data[i].car_type + '</p>';
      result += '<p class="loadable_cart_cnt">적재 가능: ' + data[i].loadable_cart_cnt + '개</p>';
      result += '<p class="create_dt">' + data[i].create_dt + '</p>';
      result += '</li>';
    }

    list_box.html(result);
    showBtnPage();
  }

  function showBtnPage(){
    var countPage = Math.ceil(obj.body.length/dataPerPage);
    var pageNum = "";

    for (var i = 0; i < countPage; i++) {
      if(i == currentPage) {
        pageNum += '<span class="select_btn" id="btnPage">' + (i+1) + '</span>';
      } else {
        pageNum += '<span id="btnPage">' + (i+1) + '</span>';
      }
    }

    paging.html(pageNum);
  }
});
