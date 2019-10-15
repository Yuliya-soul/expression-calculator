function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

    // write your solution here
    var str1=expr;
    var space = ' ';
    function splitString(stringToSplit, separator) {
      var arrayOfStrings = stringToSplit.split(separator);
      return arrayOfStrings;
    }
    
    var a= splitString(str1, space);
    var count=0;
      for (let i =0; i< a.length ; i++) {
      if (a[i]=='('){
       count+=1;
        }
        if (a[i]==')'){
          count+=-1;
          if(count<0){
            a.splice(i, 1); 
          }
    
        }
     }
    var istr=a.join('');
 
    
    
    var brackets_regex = /(\([^\(\)]+\))/;
    var primary_regex = /^(.+)([\/\*])([^\/\*]+)$/;
    var secondary_regex = /^(.*)([^\/\*])([\-\+])([^\-\+]+)$/;
 
    istr = istr.replace(/ +/g, '');
        
    function parse_brackets(istr)
    {
      for (var i=0;i<1000;i++)
      {
        if ( brackets_regex.test(istr) )
        {
        var match = RegExp.$1;
         var wo_brackets = match.replace(/^\(/,'').replace(/\)$/,'');
         var brackets_result = parse_brackets(wo_brackets); 
         istr = istr.replace(match, brackets_result)
          istr = istr.replace(/\-\-/, '+');
           continue;
        }
        
        break;
      }
      
      var parse_operands_result = parse_operands(istr);
   
      return parse_operands_result;
    }
    
    
    
    function parse_operands(istr)
    {
      var left_side_result = 0,
        right_side_result = 0,
        result = 0;
      
      
      if ( secondary_regex.test(istr) )
      {
        var operand = RegExp.$3,
          left_side = RegExp.$1+''+RegExp.$2,
          right_side = RegExp.$4;
        
        left_side_result = parse_operands(left_side);
        right_side_result = parse_operands(right_side);
        
        if ( operand == '+' )
        {
          result = left_side_result + right_side_result;
        }
        else
        {
          result = left_side_result - right_side_result;
        }
        
  
      }
      else if ( primary_regex.test(istr) )
      {
        var operand = RegExp.$2,
          left_side = RegExp.$1,
          right_side = RegExp.$3;
        
        left_side_result = parse_operands(left_side);
        right_side_result = parse_operands(right_side);
        
        if ( operand == '*' )
        {
          result = left_side_result * right_side_result;
        }
        else
        {
            result = left_side_result / right_side_result;
          
          
          
        }
    
      }
      else
      {
        result = parseFloat(istr);
      }
      
      return result;
    }
    
    var result = parse_brackets(istr);
    
    

return result;


    
}

module.exports = {
    expressionCalculator
}

 

