$( document ).ready(function() {
  (($) => {

    let $creditRange = $('.js-credit-range');
    let $creditInput = $('.js-credit-input');

    function init() {
      $creditRange.on('input', addValue);
      $('.minus').on('click', reduceValue);
      $('.plus').on('click', add);
      $creditRange.on('input', changeRangeBackground);
    }

    init();

    let monparent;

    $creditInput.val($creditRange.attr('value'));

    $creditRange.on('input', function(){
      //monparent=$(this).parent();
      monparent=this.parentNode;

      value=$(monparent).find($creditInput);
      $($creditInput).val(this.value);
    });

    $creditInput.on('input', function(){
      monparent=this.parentNode;
      $creditRange=$(monparent).find('.input-range');
      $($creditRange).val(this.value);
    });


    function addValue() {
      let value = $creditRange.val();
      $creditInput.attr('value', value).addClass('is-changed');
    }

    function changeRangeBackground (e) {
      let min = e.target.min,
        max = e.target.max,
        val = e.target.value;

      $(e.target).css({
        'backgroundSize': (val - min) * 100 / (max - min) + '% 100%'
      });
    }

    function reduceValue() {
      let count = parseFloat($creditRange.val()) - 1;
      count = count < 1 ? 1 : count;
      $creditRange.val(count);
      $creditInput.attr('value', count).addClass('is-changed');
      $creditInput.val(count);
      return false;
    }

    function add() {
      let count = parseFloat($creditRange.val()) + 1;
      count = count < 1 ? 1 : count;
      $creditRange.val(count);
      $creditInput.attr('value', count).addClass('is-changed');
      $creditInput.val(count);
      return false;
    }
  })(jQuery);


  $('select').each(function(){
    var $this = $(this), numberOfOptions = $(this).children('option').length;

    $this.addClass('select-hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());

    var $list = $('<ul />', {
      'class': 'select-options'
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
      $('<li />', {
        text: $this.children('option').eq(i).text(),
        rel: $this.children('option').eq(i).attr('value')
      }).appendTo($list);
    }

    $('li[rel="Трудоустроен"]').on('click', showHidden);

    function showHidden() {
      $(this).css('color', 'red!important')
    }


    var $listItems = $list.children('li');

    $styledSelect.click(function(e) {
      e.stopPropagation();
      $('div.select-styled.active').not(this).each(function(){
        $(this).removeClass('active').next('ul.select-options').hide();
      });
      $(this).toggleClass('active').next('ul.select-options').fadeToggle(120);
      $(this).find($('li[rel="hide"]')).addClass('js-options');
    });

    $listItems.click(function(e) {
      e.stopPropagation();
      $styledSelect.text($(this).text()).removeClass('active');
      $this.val($(this).attr('rel'));
      $list.hide();
      // $(this).addClass('js-options');
    });

    $(document).click(function() {
      $styledSelect.removeClass('active');
      $list.hide();
    });
  });

  $('.burger').on('click', showBurger);
  $('.close').on('click', hideBurger);

  function showBurger(e) {
    e.preventDefault();
    $('.burger-menu').slideDown(400);
  }

  function hideBurger(e) {
    e.preventDefault();
    $('.burger-menu').slideUp(400);
  }

  $('#surname').on('click', showField);

  function showField() {
    $('#js-hidden').slideToggle(300);
  }

  $('.language__option').on('click', langToggler);

  function langToggler() {
    $('.language__option').removeClass('is-active');
    $(this).addClass('is-active');
  }



  if ($(window).width() < 767) {
    $('.js-pill').on('click', hideMenu);
    $('.profile .signed').on('click', showMenu);
    $('.signed-back').on('click', hideMenu);

    function hideMenu() {
      $('.menu-part').slideUp();
    }

    function showMenu() {
      $('.menu-part').slideDown();
    }
  }

  $('#male').on('click', hideCheckbox);
  $('#female').on('click', showCheckbox);

  function hideCheckbox() {
    $('.register-form').find($('.surname')).slideUp();
    $('#js-hidden').slideUp();
  }

  function showCheckbox() {
    $('.register-form').find($('.surname')).slideDown();
  }

  $('.toggler').click(function () {
    if ($(this).is(':checked')) {

      $('.register-button').removeAttr('disabled'); //enable input

    } else {
      $('.register-button').attr('disabled', true); //disable input
    }
  });

  $('li[rel="js-options"]').on('click', showHidden);
  $('li[rel="js-revenue"]').on('click', showRevenue);

  function showHidden() {
    $('.js-hidden-block').show();
  }
  function showRevenue() {
    $('.js-revenue-block').slideDown();
  }

  $('#id-check').on('change', idCheck);
  $('#pass-check').on('change', passCheck);

  function idCheck() {

    if ($(this).is(':checked')) {
      $('.id').slideDown();
      $('.passport').hide();
    }
  }

  function passCheck() {

    if ($(this).is(':checked')) {
      $('.passport').slideDown();
      $('.id').hide();
    }
  }

  $('.js-check').on('click', showBlock);

  function showBlock() {
    $('.js-checked-block').stop().fadeToggle();
  }

  $(function() {
    'use strict';

    var body = $('js-phone-val');

    function goToNextInput(e) {
      var key = e.which,
        t = $(e.target),
        sib = t.next('input');

      if (key != 9 && (key < 48 || key > 57)) {
        e.preventDefault();
        return false;
      }

      if (key === 9) {
        return true;
      }

      if (!sib || !sib.length) {
        sib = body.find('input').eq(0);
      }
      sib.select().focus();
    }

    function onKeyDown(e) {
      var key = e.which;

      if (key === 9 || (key >= 48 && key <= 57)) {
        return true;
      }

      e.preventDefault();
      return false;
    }

    function onFocus(e) {
      $(e.target).select();
    }

    body.on('keyup', 'input', goToNextInput);
    body.on('keydown', 'input', onKeyDown);
    body.on('click', 'input', onFocus);
  });
});

$('.verified--error').on('click', function (e) {
  e.preventDefault();
  $('.verified-error__repeat').fadeIn();
});