function updateDate() {
  // get the slide 
  var slide = SlidesApp.openById('13loW0kJZHpO3IZPtyfgSC3pz8uugrTXE2UgyTmh6afg')
  
  // get the first slide
  var firstSlide = slide.getSlides()[0]

  var pageElements = firstSlide.getPageElements()

  
  // Loop through all elements to find the correct text box
  for (var i = 0; i < pageElements.length; i++) {
    var element = pageElements[i];
    
    // Check if the element is a text box
    if (element.getPageElementType() == SlidesApp.PageElementType.SHAPE) {
      var shape = element.asShape();
      
      // Get the text inside the shape
      var text = shape.getText();
      
      // Example: Check if this is the text box you want to edit
      if (text.asString().includes("DAY")) {
        // get the text from before
        var oldText = text.asString().trim()

        // get the day from before speficifally
        var currentDay = oldText.charAt(oldText.length -1)

        // get today's weekday
        var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][new Date().getDay()]
        // get today's month
        var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][new Date().getMonth()]
        // get today's date
        var date = new Date().getDate()
        var day = 0

        // exclude if it's a weekend
        if (!["Sunday", "Saturday"].includes(weekday)){
          // reset if we're on day 8
          if (parseInt(currentDay) == 8) {
            day = 1
          }
          else {
            day = parseInt(currentDay) + 1
          }
        }
        else {
          day = parseInt(currentDay)
        }


        // Set new text
        var newText = weekday + ", " + date + " " + month + ", DAY " + day

        text.setText(newText);
        
        break; // Exit loop once the correct text box is found and edited
      }
    }
  }
}
