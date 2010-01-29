(function(){
  $(function(){    
    initSyntaxHighlighter();
    initTweet();
  });
  
  var initSyntaxHighlighter = function () {
    SyntaxHighlighter.config.clipboardSwf = '/javascripts/clipboard.swf';
    SyntaxHighlighter.defaults['html-script'] = true;
    SyntaxHighlighter.defaults['toolbar'] = true;  
    SyntaxHighlighter.config['tab-size'] = 2;      
  	SyntaxHighlighter.all();    
  };
  
  var initTweet = function () {
    $("#tweet").tweet({
        username: "fluxsaas",
        avatar_size: 32,
        count: 7
    });    
  }
})();