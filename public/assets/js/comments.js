
$.ajax({
  type: 'get',
  url: '/comments',
  success: function(response){
    console.log(response);
    var html = template('commentsTpl',response);
    $('#commentsBox').html(html);
    var pageHTML = template('pageTpl',response);
    $('#pageBox').html(pageHTML);
  }
})

function changePage(page){
  $.ajax({
    type: 'get',
    url: '/comments',
    data:{
      page:page
    },
    success: function(response){
      console.log(response);
      var html = template('commentsTpl',response);
      $('#commentsBox').html(html);
      var pageHTML = template('pageTpl',response);
      $('#pageBox').html(pageHTML);
    }
  })
}

// 处理日期时间格式
function formateDate(date){
  date = new Date(date);
  return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()
}

$('#commentsBox').on('click','.status',function(){
  var status = $(this).attr('data-status');
  var id = $(this).attr('data-id');
  $.ajax({
    type: 'put',
    url: '/comments/'+id,
    data: {
      state: status == 0 ? 1 : 0
    },
    success: function(){
      location.reload();
    }
  })
});

$('#commentsBox').on('click','.delete',function(){
  if(confirm('您确认要删除此条评论吗?')){
    var id = $(this).attr('data-id');
    $.ajax({
      type: 'delete',
      url: '/comments/'+id,
      success: function(){
        location.reload();
      }
    })
  }
})