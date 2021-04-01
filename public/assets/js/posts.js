
$.ajax({
  type: 'get',
  url: '/posts',
  success: function(response){
    var html = template('postsTpl',response);
    $('#postsBox').html(html);
    var page = template('pageTpl',response);
    $('#page').html(page);
  }
});


function changePage(page){
  $.ajax({
    type: 'get',
    url: '/posts',
    data:{
      page: page
    },
    success: function(response){
      var html = template('postsTpl',response);
      $('#postsBox').html(html);
      var page = template('pageTpl',response);
      $('#page').html(page);
    }
  });
}

$.ajax({
  type: 'get',
  url: '/categories',
  success: function(response){
    var html = template('categoryTpl', {data: response});
    $('#categoryBox').html(html);
  }
})

$('#filterForm').on('submit', function(){
  var formData = $(this).serialize();

  $.ajax({
    type: 'get',
    url: '/posts',
    data: formData,
    success: function(response){
      var html = template('postsTpl',response);
      $('#postsBox').html(html);
      var page = template('pageTpl',response);
      $('#page').html(page);
    }
  });
  return false;
});

$('#postsBox').on('click','.delete',function(){
  if(confirm('您确定要删除该文章?')){
    var id = $(this).attr('data-id');
    $.ajax({
      type: 'delete',
      url: '/posts/'+id,
      success: function(){
        location.reload();
      }
    })
  }
});