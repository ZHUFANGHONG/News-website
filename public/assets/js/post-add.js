
$.ajax({
  url: '/categories',
  type: 'get',
  success: function(response){
    console.log(response)
    var html = template('categoryTpl',{data: response});
    $('#category').html(html);
  }
});

$('#feature').on('change',function(){
  var file = this.files[0];
  var formData = new FormData();
  formData.append('cover',file);
  $.ajax({
    type: 'post',
    url: '/upload',
    data: formData,
    processData: false,
    contentType: false,
    success: function(response){
      $('#thumbnail').val(response[0].cover)
    }
  })
});

$('#addForm').on('submit',function(){
  var formData = $(this).serialize();
  $.ajax({
    type: 'post',
    url: '/posts',
    data: formData,
    success: function(){
      location.href = '/admin/posts.html'
    }
  })
  return false;
});

var id = getUrlParams('id');
if(id != -1){
  $.ajax({
    type: 'get',
    url: '/posts/'+id,
    success: function(response){
      $.ajax({
        type: 'get',
        url: '/categories',
        success: function(categories){
          response.categories = categories;
          console.log(response);
          var html = template('modifyTpl', response);
          console.log(html);
          $('#parentBox').html(html);
        }
      })
    }
  })
}
// 从浏览器中的地址栏中获取查询参数
function getUrlParams(name){
  var paramsAry = location.search.substr(1).split('&');
  for(var i = 0; i<paramsAry.length; i++){
    var tmp = paramsAry[i].split('=');
    if(tmp[0] == name){
      return tmp[1];
    }
  }
  return -1;
}

$('#parentBox').on('submit', '#modifyForm', function(){
  var formData = $(this).serialize();
  var id = $(this).attr('data-id');
  $.ajax({
    type: 'put',
    url: '/posts/'+id,
    data: formData,
    success: function(){
      location.href = '/admin/posts.html';
    }
  })

  return false;
});

