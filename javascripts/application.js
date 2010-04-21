(function(){
  $(function(){    
    initSyntaxHighlighter();
    initTweet();
  });
    
  var initTweet = function () {
    $("#tweet").tweet({
        username: "fluxsaas",
        avatar_size: 32,
        count: 7
    });    
  }
})();