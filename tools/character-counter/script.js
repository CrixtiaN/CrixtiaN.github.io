function lg(){
  //document.getElementById('c').value=document.getElementById('t').value.length;
  $('#counter').val($('#text-box').val().length);

}
function clr(){
  //document.getElementById('t').value='';
  //lg();
  $('#text-box').val('');
  lg();
}
