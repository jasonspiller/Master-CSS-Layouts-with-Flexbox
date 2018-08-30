console.log('Hello Dave.');


// jquery ready
$(function(){

  var bedroomSliderValue = document.getElementById("bedroomSlider");
  bedrooms.innerHTML = bedroomSliderValue.value;
  var bathroomSliderValue = document.getElementById("bathroomSlider");
  bathrooms.innerHTML = bathroomSliderValue.value;
  var quoteTotal = 0;
  var discount = 0;
  $('.quote').html(quoteTotal); 


  // calculate quote total
  function calculateQuote(bedroomCount, bathroomCount, discountAmount) {

    var costPerHour = 50;
    var timePerBedroom = 30;
    var timePerBathroon = 20;

    // calculate total cost
    quoteTotal = ((bedroomCount * timePerBedroom + bathroomCount * timePerBathroon) / 60) * costPerHour;

    // apply discount
    quoteTotal -= (quoteTotal * discountAmount);

    // round to nearest dollar and output
    $('.quote').html(Math.round(quoteTotal));
  }
  

  // update room values
  bedroomSlider.oninput = function() {
    bedrooms.innerHTML = bedroomSliderValue.value;
    calculateQuote(bedroomSliderValue.value, bathroomSliderValue.value, discount)
  }

  bathroomSlider.oninput = function() {
    bathrooms.innerHTML = bathroomSliderValue.value;
    calculateQuote(bedroomSliderValue.value, bathroomSliderValue.value, discount)
  }

  // get discount, if any
  $('.interval').click(function(event) {
    event.preventDefault();

    // remove class from other buttons and add to selected button
    $('.interval').removeClass('selected');    
    $(this).addClass('selected');

    switch($(this).attr('id')) {
      case 'weekly':
          discount = .20;
          break;
      case 'bi-weekly':
          discount = .15;
          break;
      case 'monthly':
          discount = .10;
          break;
      default:
          discount = 0;
    }

    calculateQuote(bedroomSliderValue.value, bathroomSliderValue.value, discount)

  });

  calculateQuote(bedroomSliderValue.value, bathroomSliderValue.value, discount)

  // add focus to name on modal
  $('#quoteModal').on('shown.bs.modal', function() {
    $('#name').trigger('focus');
  });

});
