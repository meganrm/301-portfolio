var navControl = {};


navControl.mainNavHandler = function(){
  $('.menu-bar').on('click', '.tab', function(event){
    console.log($(this));
    var $clickedOn = $(this).attr('data-content');
    $('.tab-content').hide();
    $('#' + $clickedOn).fadeIn('slow');
  });
  $('.menu-bar .tab:first').click();

};


navControl.mainNavHandler();
