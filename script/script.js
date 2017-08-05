var main = function() {
  var num = '';
  var his = [];
  var ans = 0;
  var status = '0';
  
  //All clear, clear screens, status, his and num.
  $('#ac').click(function(){
    num = '';
    his = [];
    ans = 0;
    status = '0';
    $('.screen-t').html(ans);
    $('.screen-b').html(ans);
  });
  
  //CE, clears last entry.
  $('#ce').click(function(){
    //If entering numbers.
    if(status == '1') {
      var s = $('.screen-t').html();
      s = s.substring(0,(s.length-1));
      if(s.length === 0) {
        s = '0';
      }
      $('.screen-t').html(s);
      num = s;
    } else if (status == '2') {
      //If entering operators.  
      his.pop();
      his.pop();
      //Display updated history.
      var str = his.join('');
      if(str.length === 0) {
        str = '0';
      }
      $('.screen-b').html(str);
      //Display 0 if num is 0.
      var s = $('.screen-t').html();
      if(s.length === 0) {
        s = '0';
      }
      num = s;
      $('.screen-t').html(num);
    }
  });
  
  //Digit entry, update num.
  $('.dig').click(function() {
    status = '1';
    if(!checkLimit(num)) {
      if ($(this).html() == '.' && num.indexOf('.') > -1) {
        //Do nothing, no multiple .s .        
      } else {
        num = num + $(this).html();
        $('.screen-t').html(num);
      }
    } else {
      $('.screen-t').html('LIMIT');
      setTimeout(function() {
        $('.screen-t').html(num);
      }, 500);
    }
  });
  
  //Plus-Minus/Sign change.
  $('.pm').click(function() {
    status = 1;
    if(!checkLimit(num)) {
      var s = $('.screen-t').html();
      s = -1 * Number(s);
      $('.screen-t').html(s);
      num = s;
    } else {
      $('.screen-t').html('LIMIT');
      setTimeout(function() {
        $('.screen-t').html(num);
      }, 500);
    }
  });
  
  //Operator clicks.
  $('.opn').click(function() {
    status = 2;
    if(num=='') {
      num = ans;
    }
    
    //Push num to history.
    his.push(num);
    //Push operation to history. 
    his.push($(this).html());
    //Display updated history.
    var str = his.join('');
    $('.screen-b').html(str);
    
    //Clear num.
    num = '';
  });
  
  //Equal to.
  $('.eql').click(function() {
    status = '3';
    //Push num to history.
    his.push(num);
    //Display history with num and equal to.
    var str = his.join('');
    $('.screen-b').html(str + '=');
    
    //Calculate result via BODMAS.
    //History is reduced to only the result, stored in ans.
    
    //Exponent.
    while(his.indexOf('exp') > -1) {
      console.log(his.join(''));
      var ind = his.indexOf('exp');
      var num1 = Number(his[ind-1]);
      var num2 = Number(his[ind+1]);
      var res = Math.pow(num1,num2);
      his[ind-1] = res;
      his.splice(ind, 2);
    }
    
    //Percentage.
    while(his.indexOf('%') > -1) {
      console.log(his.join(''));
      var ind = his.indexOf('%');
      var num1 = Number(his[ind-1]);
      var num2 = Number(his[ind+1]);
      var res = (num1*100/num2);
      his[ind-1] = res;
      his.splice(ind, 2);
    }
    
    //Multiplication.
    while(his.indexOf('×') > -1) {
      console.log(his.join(''));
      var ind = his.indexOf('×');
      var num1 = Number(his[ind-1]);
      var num2 = Number(his[ind+1]);
      var res = (num1*num2);
      his[ind-1] = res;
      his.splice(ind, 2);
    }
    
    //Division.
    while(his.indexOf('÷') > -1) {
      console.log(his.join(''));
      var ind = his.indexOf('÷');
      var num1 = Number(his[ind-1]);
      var num2 = Number(his[ind+1]);
      var res = (num1/num2);
      his[ind-1] = res;
      his.splice(ind, 2);
    }
    
    //Subtraction.
    while(his.indexOf('-') > -1) {
      console.log(his.join(''));
      var ind = his.indexOf('-');
      var num1 = Number(his[ind-1]);
      var num2 = Number(his[ind+1]);
      var res = (num1-num2);
      his[ind-1] = res;
      his.splice(ind, 2);
    }
    
    //Addition.
    while(his.indexOf('+') > -1) {
      console.log(his.join(''));
      var ind = his.indexOf('+');
      var num1 = Number(his[ind-1]);
      var num2 = Number(his[ind+1]);
      var res = (num1 + num2);
      his[ind-1] = res;
      his.splice(ind, 2);
    }   
    
    //Display result.
    ans = his.join('');
    if(ans.length > 10) {
      if(Number(ans) > 9999999999) {
        ans = 0;
        $('.screen-t').html('LIMIT');
        console.log('LIMIT');
        setTimeout(function() {
          $('.screen-t').html(ans);
        }, 500);
      } else {
        var ind = ans.indexOf('.');        
        ans = parseFloat(parseFloat(ans).toFixed((9-ind)));
        $('.screen-t').html(ans);
      }
    }
    console.log(ans);
    var s = $('.screen-b').html();
    $('.screen-b').html(s + ans);
    
    //Reset num, his, status.
    num = '';
    his = [];
    status = '0';
  }); 
};

//Top screen digit limit.
var checkLimit = function(num) {
  if(num.length > 9 || $('.screen-t').html() == 'LIMIT') {
    return true;
  } else {
    return false;
  }
};


$(document).ready(main);