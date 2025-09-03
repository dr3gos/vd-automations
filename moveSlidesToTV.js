function moveSlidesToTV() {
  // get the VD slides
  var vd = SlidesApp.openById('13loW0kJZHpO3IZPtyfgSC3pz8uugrTXE2UgyTmh6afg')

  // get the VD TV slides
  var vdtv = SlidesApp.openById('1Po3iOGCtBvpo_erwZaoyPeOtn88M5tEZejsQQrH1Qg4')

  // get the slides themselves
  var vdtvslides = vdtv.getSlides()


  // see how many slides we need to keep (end to front)
  var numOfSlides = 0

  // dont take into account the last x amount of slides (they're supposed to be permanent)

  for (var x = 0; x < vdtvslides.length; x++) {

    var pageElements = vdtvslides[x].getPageElements()

    for (var i = 0; i < pageElements.length; i++) {
      var element = pageElements[i];
      
      // Check if the element is a text box
      if (element.getPageElementType() == SlidesApp.PageElementType.SHAPE) {

        var shape = element.asShape();
        
        // Get the text inside the shape
        try{

          var text = shape.getText();

          // Example: Check if this is the text box you want to edit
          if (text.asString().includes("Safe@AISB Reporting")) {

            // get the text from before
            numOfSlides = vdtvslides.length - x
            break;

          }
        }

        catch{}
        
      }
    }
  }

  // cut the "permanent slides"
  vdtvslides.splice(numOfSlides * -1)

  // clear all the nonpermanent slides on VDTV slide
  for (var i = 0; i < vdtvslides.length; i++) {
    vdtvslides[i].remove()
  }

  // get the slides from vamp diaries
  var vdslides = vd.getSlides()

  // see how many slides we need to keep (end to front)

  var numOfVdSlides = 0

  // dont take into account the last x amount of slides (they're supposed to be permanent)
  for (var x = 0; x < vdslides.length; x++) {

    var pageElements = vdslides[x].getPageElements()

    for (var i = 0; i < pageElements.length; i++) {
      var element = pageElements[i];
      
      // Check if the element is a text box
      if (element.getPageElementType() == SlidesApp.PageElementType.SHAPE) {

        var shape = element.asShape();
        
        // Get the text inside the shape
        try{

          var text = shape.getText();

          // Example: Check if this is the text box you want to edit
          if (text.asString().includes("Safe@AISB Reporting")) {
            // get the text from before
            numOfVdSlides = vdslides.length - x
            break;
          }
        }
        catch{}
      }
    }
  }

  // cut the "permanent slides"
  vdslides.splice(numOfVdSlides * -1)

  var vdtvslides = vdtv.getSlides()

  // copy over all non permanent slides over to vamp tv slide
  for (var i = 0; i < vdslides.length; i++) {
    vdtv.insertSlide(i, vdslides[i])
  }

  var vdtvslides = vdtv.getSlides()

  for (var i = 0; i < vdtvslides.length; i++) {

    var pageElements = vdtvslides[i].getPageElements()

    for (var x = 0; x < pageElements.length; x++) {
      var element = pageElements[x];
      
      // Check if the element is video & remove it
      if (element.getPageElementType() == SlidesApp.PageElementType.VIDEO) {
        element.remove();
      }
    }
  }
}
