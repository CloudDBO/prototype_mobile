/* Прототип клиентского интерфейса для мобильных устройств */
$(function() {

  //прокрутка workspace по горизонтали
  $("#workspace").draggable({
    axis: "x",  //перетаскивается только по горизонтали
    stop: function( event, ui ) {
      if(ui.position.left > 0)  //нельзя слишком утащить вправо
        $(this).css("left", "0");
      if($("div#viewspace").width() > $(this).width() + ui.position.left) //нельзя слишком утащить влево
        $(this).css("left", $("div#viewspace").width() - $(this).width());
    }
  });

  //перетаскивание объекта
  $("li.object img").draggable({
    helper: "clone",  //перетаскиваться будет клон
    revert: "invalid" //если объект не "донесли", он сам возвратится обратно
  });
  
  //приём объекта в зоне детализации
  $("div#detailes-zone").droppable({
    drop: function( event, ui ) {
      showDetails();
    },
    over: function( event, ui ) {
      //$(this).html("Drop here...");
    }
  });
  
  //закрытие панели детализации
  $("#hide-asset-details").click(function(event) {
    hideDetails();
  });
  
  //приём объекта в зоне операций
  $("div#oper-zone").droppable({
    drop: function( event, ui ) {
      addObjectToOperation(ui);
    },
    over: function( event, ui ) {
      //$(this).html("Drop here...");
    }
  });
  
  //закрытие панели операций
  $("#hide-asset-operation").click(function(event) {
    hideOperation();
  });
  
});

function addObjectToOperation(object) {
  var list_oper_objects = $("#list-oper-objects");  //список объектов
  if(list_oper_objects.children().length < 1) {
    //добавить объект в список
    var li = $("<li></li>");
    //следующие строки надо будет отрефакторить...
    li.addClass("object");
    li.append(object.draggable.clone());
    li.append(object.draggable.siblings(":not(img)").clone());
    //li.append(object.draggable.siblings().clone());
    li.children("img").draggable({
      helper: "clone",  //перетаскиваться будет клон
    });
    li.children("img").removeAttr('style');
    list_oper_objects.append(li);
  } else {
    //выполнить операцию
    showOperation();  //показать панель операции
    list_oper_objects.children().remove();  //очистить список объектов операции
  }
}

//открыть панель детализации
function showDetails() {
  $("#asset-details").appendTo("#viewspace");
}

//закрыть панель детализации
function hideDetails() {
  $("#asset-details").appendTo("#resources");
}

//открыть панель операции
function showOperation() {
  $("#asset-operation").appendTo("#viewspace");
}

//открыть панель операции
function hideOperation() {
  $("#asset-operation").appendTo("#resources");
}
