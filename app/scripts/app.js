// import 'slick-carousel';

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


  function addValue() {
    let value = $creditRange.val();
    $creditInput.attr('value', value).addClass('is-changed')
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
    return false;
  }

  function add() {
    let count = parseFloat($creditRange.val()) + 1;
    count = count < 1 ? 1 : count;
    $creditRange.val(count);
    $creditInput.attr('value', count).addClass('is-changed');
    return false;
  }
})(jQuery);
