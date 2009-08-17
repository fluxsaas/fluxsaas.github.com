if (!window.VCB) {
  var VCB = { };
}

VCB.VocabularyCreator = (function () { 
  var db;
  var databaseIsCreated = false;
  
  /**
   * Displays all vocabularys
   * @function
   * @private
   */
  var _displayVocabularys = function () {
    var vocabularys = [[], []];

    // Get the 3 most recent entries. Delete any others.
    var rs = db.execute('select * from EnglishGerman order by Timestamp desc');
    var index = 0;

    while ( rs.isValidRow() ) {
      vocabularys[0].push( rs.field(0) );
      vocabularys[1].push( rs.field(1) );
      ++index;
      rs.next();
    }
    rs.close();
    
    console.dir(
      vocabularys
    );
    
    for (var i = 0; i < vocabularys[0].length; ++i) {
      $('#vocabularys tbody').append(
        $('<tr><th>' + vocabularys[0][i] + '</th><th>' + vocabularys[1][i] + '</th></tr>')
      )
    }
  };
  
  var _addVocabularyToHtml = function (english, german) {
    $('#vocabularys tbody').append(
      $('<tr><th>' + english + '</th><th>' + german + '</th></tr>')
    )    
  };

  /**
   * Init the google gears database
   * @function
   * @private
   */  
  var _initDatabase = function () {    
    if (window.google && google.gears) {
      try {
        
        // Instantiate Gears objects, see: http://code.google.com/apis/gears/api_factory.html
        db = google.gears.factory.create('beta.database');

        if (db) {
          db.open('Vocabularys');
          db.execute('create table if not exists EnglishGerman' + 
                        ' (English varchar(255), German varchar(255), Timestamp int)');

          databaseIsCreated = true;

          // Initialize the UI at startup.
          _displayVocabularys();
        }

      } catch (ex) {
        console.log('Could not create database: ' + ex.message);
      }
    }
  };
  
  /**
   * Observes and handle the form submission the form
   * @function
   * @private
   */
  var _addObserver = function () {
    console.log("asd");
    
    $('#addVocabularyForm').submit(function (event) {
      console.log(event);
      
      var $this = $(this);

      var german = $this.find('#german').val();
      var english = $this.find('#english').val();

      // Insert the new item.
      try {
        var res = db.execute('insert into EnglishGerman values (?, ?, ?)', [english, german, new Date().getTime() ] );
        if (res) {
          _addVocabularyToHtml(english, german);
        }
      } catch (exaption) {
        console.log('could not insert entry:' + exaption);
      }

      event.preventDefault();
    })
  };

  return {
    init: function () {
      _initDatabase();
      _addObserver();
    }
  };
})();


