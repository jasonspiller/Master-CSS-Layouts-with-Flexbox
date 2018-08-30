console.log('Hello Dave.');


// jquery ready
$(function(){

  var bedroomTotal = document.getElementById('bedroomSlider'),
      bathroomTotal = document.getElementById('bathroomSlider'),
      pricing,
      discount = 0,
      estimate = 0;

  // output values to UI
  bedrooms.innerHTML = bedroomTotal.value;
  bathrooms.innerHTML = bathroomTotal.value;
  

  // calculate quote total
  function calculateQuote() {

    // calculate total cost
    estimate = pricing[bedroomTotal.value][bathroomTotal.value];

    // apply discount
    estimate -= (estimate * discount);

    // round to nearest dollar and output
    $('.quote').html(Math.round(estimate));

    // set hidden field values
    $('#bedroomTotal').val(bedroomTotal.value);
    $('#bathroomTotal').val(bathroomTotal.value);
    $('#quote').val(Math.round(estimate));
  }

  // update room values
  bedroomSlider.oninput = function() {
    bedrooms.innerHTML = bedroomTotal.value;
    calculateQuote()
  }

  bathroomSlider.oninput = function() {
    bathrooms.innerHTML = bathroomTotal.value;
    calculateQuote()
  }

  // get discount, if any
  $('.interval').click(function(event) {
    event.preventDefault();

    // remove class from other buttons and add to selected button
    $('.interval').removeClass('selected');    
    $(this).addClass('selected');

    // determine discount value
    switch($(this).attr('id')) {
      case 'weekly':
          discount = .20;
          $('#interval').val('W');
          break;
      case 'bi-weekly':
          discount = .15;
          $('#interval').val('B');
          break;
      case 'monthly':
          $('#interval').val('M');
          discount = .10;
          break;
      default:
          $('#interval').val('O');
          discount = 0;
    }

    calculateQuote()

  });

  $.ajax({
    type: 'GET',
    dataType: "json",
    url: "pricing.json",
    success: function(result) {
      pricing = result;
      calculateQuote();
    },
    error: function() {
      alert('Unable to retrieve pricing. Please try again later.');
    }
  });
  

  // add focus to name on modal
  $('#quoteModal').on('shown.bs.modal', function() {
    $('#name').trigger('focus');
  });


  $('#contactForm').submit( function(event) {

    // make sure at least one contact method is filled out
    if ($('#phone').val().length < 9 && $('#email').val().length < 6) { 
      // display error     
      $('#messages').html('Please provide either an email or phone number.');
      event.preventDefault();
    } else {
      // prevent multiple submissions
      $('#submit').val('Submitting Request...').attr('disabled','disabled');
    }

  });

});
